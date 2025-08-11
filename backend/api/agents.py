# backend/api/agents.py

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Literal, Optional, Union
from backend.services.agents.script_generator import generate_script
from backend.models.agent_response import ScriptJSON

router = APIRouter()

class ScriptRequest(BaseModel):
    topic: str = Field(..., example="AI in Education")
    region: str = Field("Europe")
    tone: str = Field("dynamic")
    hosts: int = Field(2, ge=1, le=4)
    duration_min: int = Field(5, ge=1, le=15)

class ScriptTextResponse(BaseModel):
    format: Literal["text"] = "text"
    script: str

class ScriptJSONResponse(BaseModel):
    format: Literal["json"] = "json"
    script: ScriptJSON

@router.get("/ping")
def ping():
    return {"status": "ok"}

@router.post("/generate-script", response_model=Union[ScriptJSONResponse, ScriptTextResponse])
def api_generate_script(
    req: ScriptRequest,
    output: Literal["json","text"] = Query("json", description="Preferred output format"),
):
    try:
        script, fmt = generate_script(
            topic=req.topic,
            region=req.region,
            tone=req.tone,
            hosts=req.hosts,
            duration_min=req.duration_min,
            output=output
        )
        if fmt == "json":
            return {"format":"json","script": script}
        else:
            return {"format":"text","script": str(script)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
