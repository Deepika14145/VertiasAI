# backend/app/schemas.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class Evidence(BaseModel):
    title: str
    url: str
    snippet: str
    credibility: float

class AnalysisResponse(BaseModel):
    id: str
    verdict: str
    credibility_score: float
    explanation: str
    evidences: List[Evidence]
    emotional_tone: Dict[str, float]
    claim_category: str
    political_bias: float
    persuasion_techniques: List[str]
    education_tips: List[str]
    analysis_plot_png_base64: Optional[str] = None
    source_text: str
