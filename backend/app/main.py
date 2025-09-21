# backend/app/main.py
import os, io, json, base64, re
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
from .schemas import AnalysisResponse, Evidence
from .utils import make_id, save_json
from .retriever import query as retrieve_query
from .genai_client import generate_text, get_embeddings, TEXT_MODEL
from bs4 import BeautifulSoup
import requests
from PIL import Image
import pytesseract
import fitz  # PyMuPDF
import matplotlib.pyplot as plt

app = FastAPI(title="TruthLens API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --------------------------
# Helper functions
# --------------------------
def extract_text_from_url(url: str) -> str:
    r = requests.get(url, timeout=10)
    soup = BeautifulSoup(r.text, "html.parser")
    paragraphs = [p.get_text(" ", strip=True) for p in soup.find_all("p")]
    return "\n".join(paragraphs)[:4000]

def extract_text_from_image_bytes(b: bytes) -> str:
    img = Image.open(io.BytesIO(b)).convert("RGB")
    return pytesseract.image_to_string(img)

def extract_text_from_pdf_bytes(b: bytes) -> str:
    doc = fitz.open(stream=b, filetype="pdf")
    pages = [p.get_text() for p in doc]
    return "\n".join(pages)[:4000]

def find_json_in_text(s: str):
    m = re.search(r"\{.*\}", s, flags=re.S)
    if m:
        try:
            return json.loads(m.group(0))
        except:
            return None
    return None

def plot_b64(scores: dict):
    labels = list(scores.keys()); vals = list(scores.values())
    plt.figure(figsize=(6,3))
    bars = plt.bar(labels, vals, color=["#4f46e5","#f97316","#10b981"])
    plt.ylim(0,100)
    for bar,v in zip(bars, vals):
        plt.text(bar.get_x()+bar.get_width()/2, v+1, f"{v:.1f}%", ha="center")
    buf = io.BytesIO()
    plt.tight_layout(); plt.savefig(buf, format="png"); plt.close()
    buf.seek(0)
    return base64.b64encode(buf.read()).decode("utf-8")

def combine_signals(confidence: float, retrieval_count: int) -> float:
    base = confidence*100
    if retrieval_count == 0:
        return round(base*0.6,2)
    return round(min(100, base + retrieval_count*5),2)

# --------------------------
# Analyze endpoint
# --------------------------
@app.post("/analyze", response_model=AnalysisResponse)
async def analyze(
    request: Request,
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
    url: Optional[str] = Form(None)
):
    """
    Handles both JSON (text/url) and form-data (text/url/file) requests.
    Priority: file > url > text
    """
    # 1️⃣ Try to read JSON body
    if request.headers.get("content-type", "").startswith("application/json"):
        try:
            body = await request.json()
            text = body.get("text") or text
            url = body.get("url") or url
        except:
            pass

    # 2️⃣ Check if at least one input is provided
    if not (text or url or file):
        raise HTTPException(status_code=400, detail="Provide text, url, or file")

    # 3️⃣ Extract source text
    source_text = ""
    kind = "text"
    if file:
        raw = await file.read()
        fn = (file.filename or "").lower()
        if fn.endswith(".pdf"):
            source_text = extract_text_from_pdf_bytes(raw); kind="pdf"
        elif fn.endswith((".png",".jpg",".jpeg",".bmp")):
            source_text = extract_text_from_image_bytes(raw); kind="image"
        else:
            try:
                source_text = raw.decode("utf-8")
            except:
                source_text = raw.decode("latin-1", errors="ignore")
            kind="file"
    elif url:
        source_text = extract_text_from_url(url); kind="url"
    else:
        source_text = text

    if not source_text.strip():
        raise HTTPException(status_code=400, detail="No text extracted")

    # 4️⃣ Naive claim extraction (first sentence)
    claim = source_text.strip().split("\n")[0][:600]

    # 5️⃣ Retrieve top evidences
    retrieved = retrieve_query(claim, k=4)
    evidences = []
    for r in retrieved:
        evidences.append({
            "title": r.get("title"),
            "url": r.get("url"),
            "snippet": r.get("text")[:300],
            "credibility": float(r.get("credibility", 0.5))
        })

    # 6️⃣ Prepare prompt for Gemini
    prompt = f"""
You are an expert fact-checker. Given a CLAIM and the SOURCE TEXT and TOP EVIDENCE list, return a JSON object:
{{
  "verdict": "credible|misleading|false|unverifiable",
  "confidence": 0.0-1.0,
  "explanation": "2-4 sentence grounded explanation referencing evidence by index",
  "emotional_tone": {{"anger":0,"fear":0,"joy":0,"sadness":0,"neutral":0}},
  "claim_category": "health|politics|finance|science|satire|other",
  "political_bias": -5.0 to 5.0,
  "persuasion_techniques": [],
  "education_tips": []
}}
CLAIM:
\"\"\"{claim}\"\"\"
SOURCE_TEXT:
\"\"\"{source_text[:2000]}\"\"\"
TOP_EVIDENCE:
"""
    for i,e in enumerate(evidences):
        prompt += f"\n[{i}] title: {e['title']}, url: {e['url']}, snippet: {e['snippet']}"

    # 7️⃣ Call Gemini
    try:
        gen_text = generate_text(prompt, max_output_tokens=700)
        parsed = find_json_in_text(gen_text) or {}
    except:
        parsed = {}

    # 8️⃣ Fallback defaults
    verdict = parsed.get("verdict","unverifiable")
    confidence = float(parsed.get("confidence",0.5))
    explanation = parsed.get("explanation", gen_text if isinstance(gen_text,str) else "")
    emotional_tone = parsed.get("emotional_tone", {"neutral":1.0})
    claim_category = parsed.get("claim_category","other")
    political_bias = float(parsed.get("political_bias",0.0))
    persuasion_techniques = parsed.get("persuasion_techniques", [])
    education_tips = parsed.get("education_tips", ["Check primary sources.","Verify dates and images.","Search reputable fact-checkers."])

    # 9️⃣ Compute credibility score and plot
    cred_score = combine_signals(confidence, len(evidences))
    scores = {"Credibility": cred_score, "ModelConfidence": round(confidence*100,2), "SupportCount": min(100, len(evidences)*25)}
    plot_png = plot_b64(scores)

    # 10️⃣ Prepare response
    resp = AnalysisResponse(
        id = make_id(),
        verdict = verdict,
        credibility_score = cred_score,
        explanation = explanation,
        evidences = [Evidence(**e) for e in evidences],
        emotional_tone = emotional_tone,
        claim_category = claim_category,
        political_bias = political_bias,
        persuasion_techniques = persuasion_techniques,
        education_tips = education_tips,
        analysis_plot_png_base64 = plot_png,
        source_text = source_text[:4000]
    )

    # 11️⃣ Save audit
    os.makedirs(os.path.join(os.path.dirname(__file__), "audits"), exist_ok=True)
    save_json(os.path.join(os.path.dirname(__file__), "audits", f"{resp.id}.json"),
              {"claim":claim, "parsed":parsed, "evidences":evidences, "scores":scores, "source_text": source_text[:4000]})

    return resp
