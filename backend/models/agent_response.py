# backend/models/agent_response.py
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class ScriptLine(BaseModel):
    speaker: str = Field(..., example="Host 1")
    text: str = Field(..., example="Welcome to Vision Age Radio!")
    cue: Optional[str] = Field(None, example="[music sting]")

class ScriptSegment(BaseModel):
    name: Literal["cold_open", "intro", "segment_1", "segment_2", "closing"]
    lines: List[ScriptLine]

class ScriptJSON(BaseModel):
    topic: str
    region: str
    tone: str
    hosts: int
    duration_min: int
    segments: List[ScriptSegment]
    estimated_duration_sec: Optional[int] = 300
