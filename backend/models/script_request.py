from pydantic import BaseModel, Field

class URLScriptRequest(BaseModel):
    url: str = Field(..., example="https://exemple.com")
    mode: str = Field("Monologue", example="Monologue ou Dialogue entre intervenants")
    min_score: float = Field(7, ge=0, le=10)

class URLScriptResponse(BaseModel):
    script: str
    evaluation: str
    score: float
