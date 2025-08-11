# backend/utils/json_utils.py
import json

def try_parse_json(s: str):
    """
    Best-effort JSON parsing. Strips code fences and whitespace.
    Raises ValueError if it can't parse.
    """
    s = s.strip()
    if s.startswith("```"):
        # strip common fenced blocks
        s = s.strip("`")
        nl = s.find("\n")
        if nl != -1:
            s = s[nl+1:].strip()
    return json.loads(s)
