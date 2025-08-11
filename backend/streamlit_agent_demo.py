# backend/streamlit_agent_demo.py

# --- path patch (keeps both /app and /app/backend importable) ---
from pathlib import Path
import os
import sys
FILE_DIR = Path(__file__).resolve().parent       # /app/backend
ROOT = FILE_DIR.parent                           # /app
for p in (str(ROOT), str(FILE_DIR)):
    if p not in sys.path:
        sys.path.insert(0, p)
# ---------------------------------------------------------------

import json
from datetime import datetime
from typing import Any, Dict, Tuple, Optional

import streamlit as st

# Robust import: try modern layout first, then legacy
try:
    from services.agents.script_generator import generate_script
except Exception:
    from backend.services.agents.script_generator import generate_script  # type: ignore

# ---- Page config & a tiny bit of style ----
st.set_page_config(
    page_title=" AI Radio Script Generator",
    page_icon="🎙️",
    layout="wide",
    menu_items={"about": "AI Radio helper • Streamlined for OpenAI & Gemini"},
)

st.markdown(
    """
    <style>
      .small-muted { color: var(--text-color-secondary, #6b7280); font-size: 0.85rem; }
      .tight .stMarkdown p { margin-bottom: 0.4rem; }
    </style>
    """,
    unsafe_allow_html=True,
)

# ----------------- Helpers -----------------
def _env_default(name: str) -> str:
    # Pull once from env then keep in session so user edits persist
    return st.session_state.get(name, os.getenv(name, ""))

def _set_env_from_input(key_name: str, label: str, placeholder: str = "••••••••", help_txt: str = "") -> None:
    val = st.text_input(label, value=_env_default(key_name), type="password", placeholder=placeholder, help=help_txt)
    st.session_state[key_name] = val
    if val:
        os.environ[key_name] = val  # make available to the backend

def _coerce_to_dict(obj: Any) -> Dict[str, Any]:
    try:
        # pydantic v2
        if hasattr(obj, "model_dump"):
            return obj.model_dump()
        # pydantic v1
        if hasattr(obj, "dict"):
            return obj.dict()
    except Exception:
        pass
    if isinstance(obj, dict):
        return obj
    # try json string
    try:
        return json.loads(str(obj))
    except Exception:
        return {"content": str(obj)}

def _flatten_text(payload: Any) -> str:
    """Best-effort: build a human-readable plain text script from various shapes."""
    if isinstance(payload, str):
        return payload
    data = _coerce_to_dict(payload)

    # common shapes: {title, hosts, segments:[{speaker,text}, ...]}
    lines = []
    title = data.get("title") or data.get("program_title") or "Radio Script"
    lines.append(f"# {title}")
    if "summary" in data:
        lines.append(f"\nSummary: {data['summary']}\n")

    segments = data.get("segments") or data.get("script") or []
    if isinstance(segments, list):
        for i, seg in enumerate(segments, 1):
            speaker = seg.get("speaker") or seg.get("host") or f"Part {i}"
            text = seg.get("text") or seg.get("content") or ""
            lines.append(f"{speaker}: {text}")
    else:
        # fallback dump
        lines.append(json.dumps(data, ensure_ascii=False, indent=2))
    return "\n\n".join(lines).strip()

def _download_buttons(text_out: str, json_out: Optional[Dict[str, Any]]):
    col_a, col_b = st.columns(2)
    with col_a:
        st.download_button(
            "⬇️ Download TXT",
            data=text_out.encode("utf-8"),
            file_name=f"radio_script_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt",
            mime="text/plain",
        )
    with col_b:
        if json_out:
            st.download_button(
                "⬇️ Download JSON",
                data=json.dumps(json_out, ensure_ascii=False, indent=2).encode("utf-8"),
                file_name=f"radio_script_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                mime="application/json",
            )

def _tts_controls(text_for_tts: str):
    """If ELEVENLABS_API_KEY exists, offer a quick TTS preview."""
    api_key = os.getenv("ELEVENLABS_API_KEY", "")
    if not api_key:
        with st.expander("🔊 Text-to-Speech (optional)"):
            st.caption("Add `ELEVENLABS_API_KEY` in the sidebar to enable audio preview.")
        return

    import requests  # local import so app still runs if requests absent

    with st.expander("🔊 Text-to-Speech (ElevenLabs)"):
        voice = st.selectbox("Voice", ["Rachel", "Bella", "Antoni", "Adam", "Domi"], index=0)
        sample = st.text_area("Preview snippet", value=text_for_tts[:500], height=140)

        if st.button("Generate Audio Preview"):
            with st.spinner("Synthesizing audio..."):
                try:
                    # Simple ElevenLabs v1 text-to-speech (replace VOICE_ID mapping as needed)
                    voice_map = {
                        "Rachel": "21m00Tcm4TlvDq8ikWAM", "Bella": "EXAVITQu4vr4xnSDxMaL",
                        "Antoni": "ErXwobaYiN019PkySvjV", "Adam": "pNInz6obpgDQGcFmaJgB",
                        "Domi": "AZnzlk1XvdvUeBnXmlld",
                    }
                    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_map.get(voice, '21m00Tcm4TlvDq8ikWAM')}"
                    headers = {"xi-api-key": api_key, "accept": "audio/mpeg", "Content-Type": "application/json"}
                    body = {"text": sample, "voice_settings": {"stability": 0.4, "similarity_boost": 0.7}}
                    r = requests.post(url, headers=headers, json=body, timeout=60)
                    r.raise_for_status()
                    st.audio(r.content, format="audio/mp3")
                except Exception as e:
                    st.error(f"TTS failed: {e}")

def _call_generate(
    topic: str,
    region: str,
    tone: str,
    hosts: int,
    duration: int,
    output: str,
    provider: str,
    temperature: float,
    seed: Optional[int],
    language: Optional[str],
    audience: Optional[str],
    cta: Optional[str],
    constraints: Optional[str],
) -> Tuple[Any, str, Dict[str, Any]]:
    """
    Try the most expressive call first; gracefully fall back to the minimal signature.
    Returns: (script_obj_or_str, out_format, meta)
    """
    meta: Dict[str, Any] = {"provider": provider, "temperature": temperature, "seed": seed}

    # Try full kwargs
    try:
        return (
            *generate_script(  # type: ignore
                topic,
                region,
                tone,
                hosts,
                duration,
                output=output,
                provider=provider,
                temperature=temperature,
                seed=seed,
                language=language,
                audience=audience,
                cta=cta,
                constraints=constraints,
            ),
            meta,
        )
    except TypeError:
        # Fallback to your original shape: (topic, region, tone, hosts, duration, output)
        return (*generate_script(topic, region, tone, hosts, duration, output=output), meta)  # type: ignore

# ---------------- Sidebar ----------------
with st.sidebar:
    st.header("⚙️ Settings")
    provider = st.radio("Model provider", ["OpenAI", "Gemini"], horizontal=True)
    output_fmt = st.radio("Output format", ["json", "text"], horizontal=True)

    st.divider()
    st.subheader("🔐 API keys")
    if provider == "OpenAI":
        _set_env_from_input("OPENAI_API_KEY", "OpenAI API key")
    else:
        _set_env_from_input("GOOGLE_API_KEY", "Google (Gemini) API key")
    _set_env_from_input("ELEVENLABS_API_KEY", "ElevenLabs (optional)")

    st.divider()
    st.subheader("🎛️ Generation")
    temperature = st.slider("Creativity (temperature)", 0.0, 1.5, 0.7, 0.1)
    seed_enable = st.checkbox("Set random seed", value=False)
    seed_value = st.number_input("Seed", value=42, step=1) if seed_enable else None

    st.caption(
        '<span class="small-muted">Tip: Use JSON for programmatic control (segments, speakers, timing). '
        "Use Text to quickly copy into a teleprompter.</span>",
        unsafe_allow_html=True,
    )

# ---------------- Main Form ----------------
st.title("🎙️ AI Radio Script Generator")
st.caption("Craft fast, production-ready radio segments with structured outputs & optional audio preview.")

with st.form("script_form", clear_on_submit=False):
    col1, col2 = st.columns([2, 1])
    with col1:
        topic = st.text_input("Topic", value="AI in Education")
        region = st.text_input("Region", value="Europe")
        language = st.text_input("Language (optional)", value="English")
        audience = st.text_input("Audience (optional)", value="General listeners")
    with col2:
        tone = st.selectbox("Tone", ["dynamic", "serious", "fun", "neutral"], index=0)
        hosts = st.slider("Number of hosts", 1, 4, 2)
        duration = st.slider("Duration (minutes)", 1, 30, 5)

    with st.expander("Advanced prompting (optional)"):
        cta = st.text_input("Call to action", value="", placeholder="e.g., Subscribe for deep dives every Monday")
        constraints = st.text_area(
            "Constraints",
            value="Keep it concise, clear, and engaging. Avoid jargon unless explained.",
            height=80,
        )

    submitted = st.form_submit_button("✨ Generate script", use_container_width=True)

# ---------------- Handle Generation ----------------
if submitted:
    if not topic.strip():
        st.warning("Please enter a topic.")
        st.stop()

    st.toast("Working on your script…")
    with st.spinner("Generating…"):
        try:
            script_obj, out_fmt, meta = _call_generate(
                topic=topic.strip(),
                region=region.strip(),
                tone=tone,
                hosts=int(hosts),
                duration=int(duration),
                output=output_fmt,
                provider=provider.lower(),
                temperature=float(temperature),
                seed=int(seed_value) if seed_enable and seed_value is not None else None,
                language=(language or "").strip() or None,
                audience=(audience or "").strip() or None,
                cta=(cta or "").strip() or None,
                constraints=(constraints or "").strip() or None,
            )
        except Exception as e:
            st.error(f"Generation failed: {e}")
            st.stop()

    # Normalize outputs
    json_payload: Optional[Dict[str, Any]] = None
    text_payload: str

    if out_fmt == "json":
        json_payload = _coerce_to_dict(script_obj)
        text_payload = _flatten_text(json_payload)
    else:
        text_payload = _flatten_text(script_obj)

    # Save to history
    st.session_state.setdefault("history", [])
    st.session_state["history"].insert(
        0,
        {
            "timestamp": datetime.now().isoformat(timespec="seconds"),
            "topic": topic,
            "region": region,
            "tone": tone,
            "hosts": hosts,
            "duration": duration,
            "provider": provider,
            "format": out_fmt,
            "text": text_payload,
            "json": json_payload,
            "meta": meta,
        },
    )

    # ---------- Results UI ----------
    st.success(f"Done with **{provider}** → **{out_fmt.upper()}**")
    tabs = st.tabs(["📄 Script", "🧩 JSON", "🗂️ Rundown", "ℹ️ Meta"])

    with tabs[0]:
        st.text_area("Script", value=text_payload, height=520)
        _download_buttons(text_payload, json_payload)

    with tabs[1]:
        if json_payload:
            st.json(json_payload)
        else:
            st.caption("No JSON available for text output.")

    with tabs[2]:
        # Build a lightweight rundown table from the JSON if present
        if json_payload and isinstance(json_payload.get("segments"), list):
            rows = []
            for i, seg in enumerate(json_payload["segments"], 1):
                rows.append(
                    {
                        "Part": i,
                        "Speaker": seg.get("speaker") or seg.get("host") or "",
                        "Approx. Time": seg.get("duration") or seg.get("time") or "",
                        "Summary": (seg.get("summary") or seg.get("text") or "")[:120],
                    }
                )
            st.dataframe(rows, use_container_width=True, hide_index=True)
        else:
            st.caption("Add JSON output to see a structured rundown.")

    with tabs[3]:
        st.write(
            {
                "topic": topic,
                "region": region,
                "tone": tone,
                "hosts": hosts,
                "duration": duration,
                **meta,
            }
        )
        st.markdown(
            '<div class="small-muted tight">If your backend returns token usage, cost, or safety notes, '
            "you can surface them here.</div>",
            unsafe_allow_html=True,
        )

    _tts_controls(text_payload)

# ---------------- History (Sidebar) ----------------
with st.sidebar:
    st.divider()
    st.subheader("🕘 History")
    history = st.session_state.get("history", [])
    if not history:
        st.caption("No runs yet.")
    else:
        for i, h in enumerate(history[:8], 1):
            with st.expander(f"{h['timestamp']} • {h['topic']} ({h['format']})"):
                st.caption(f"{h['provider']} • {h['tone']} • {h['hosts']} host(s) • {h['duration']} min")
                st.text(h["text"][:260] + ("..." if len(h["text"]) > 260 else ""))
                if h.get("json"):
                    st.json(h["json"])
