# backend/services/agents/prompt_templates.py

SYSTEM_PROMPT = """You are a professional radio scriptwriter.
Write spoken-style scripts with natural back-and-forth between hosts.
Be concise and add light stage cues like [music sting], [transition].
Stay close to the requested duration."""

JSON_INSTRUCTIONS = """Return ONLY valid JSON (no markdown fence).
Schema:
{
  "topic": string,
  "region": string,
  "tone": string,
  "hosts": number,
  "duration_min": number,
  "segments": [
    {"name":"cold_open","lines":[{"speaker": "Host 1|Host 2", "text": "...", "cue": "[music sting]|[transition]|null"}]},
    {"name":"intro","lines":[...]},
    {"name":"segment_1","lines":[...]},
    {"name":"segment_2","lines":[...]},
    {"name":"closing","lines":[...]}
  ],
  "estimated_duration_sec": number
}
"""

def build_user_prompt_json(topic: str, region: str, tone: str, hosts: int, duration_min: int) -> str:
    return f"""
Write a ~{duration_min}-minute radio show script as JSON.
Constraints:
- Topic: "{topic}"
- Region focus: {region}
- Tone: {tone}
- Number of hosts: {hosts}  (speakers labeled "Host 1", "Host 2", etc.)
- Keep lines short and conversational. Include occasional cues in "cue" field.

{JSON_INSTRUCTIONS}
"""

def build_user_prompt_text(topic: str, region: str, tone: str, hosts: int, duration_min: int) -> str:
    host_tags = ", ".join([f"Host {i+1}" for i in range(hosts)])
    return f"""
Write a ~{duration_min}-minute radio show script.

Constraints:
- Topic: "{topic}"
- Region focus: {region}
- Tone: {tone}
- Number of hosts: {hosts} ({host_tags})
- Spoken, short sentences. Avoid long paragraphs.

Structure:
1) Cold open hook
2) Intro & show ID
3) Segment 1
4) Segment 2
5) Closing & CTA

Output format (labels required):
Host 1: ...
Host 2: ...
[transition] ...
[music sting] ...
"""
