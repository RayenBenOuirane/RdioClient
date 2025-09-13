# backend/services/agents/script_generator_gemini.py

import os
import logging
from typing import Literal
from dotenv import load_dotenv

import google.generativeai as genai

from models.agent_response import ScriptJSON
from utils.json_utils import try_parse_json
from .prompt_templates import (
    SYSTEM_PROMPT,
    build_user_prompt_json,
    build_user_prompt_text,
)

load_dotenv()
log = logging.getLogger("agent_gemini")

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# Two model instances: one that enforces JSON, one for plain text
_model_json = genai.GenerativeModel(
    model_name=MODEL,
    system_instruction=SYSTEM_PROMPT,
    generation_config={
        "temperature": 0.7,
        "response_mime_type": "application/json",
    },
)

_model_text = genai.GenerativeModel(
    model_name=MODEL,
    system_instruction=SYSTEM_PROMPT,
    generation_config={
        "temperature": 0.8,
    },
)

def generate_script(
    topic: str,
    region: str,
    tone: str = "dynamic",
    hosts: int = 2,
    duration_min: int = 5,
    output: Literal["json","text"] = "json",
):
    """
    Generate a radio script with Gemini.
    - If output='json', we request strict JSON. On parse/validation failure, we fall back to text.
    - Returns (payload, "json"|"text")
    """
    hosts = max(1, min(4, hosts))
    duration_min = max(1, min(15, duration_min))

    if output == "json":
        prompt = build_user_prompt_json(topic, region, tone, hosts, duration_min)
        resp = _model_json.generate_content(prompt)
        content = (resp.text or "").strip()
        try:
            data = try_parse_json(content)
            script = ScriptJSON.model_validate(data)
            return script, "json"
        except Exception as e:
            log.warning(f"[Gemini] JSON parse failed, falling back to text. Error: {e}")

    # Text fallback (or explicit text request)
    prompt = build_user_prompt_text(topic, region, tone, hosts, duration_min)
    resp = _model_text.generate_content(prompt)
    return (resp.text or "").strip(), "text"
