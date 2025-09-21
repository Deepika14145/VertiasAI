# backend/app/genai_client.py
import random

TEXT_MODEL = "gemini-2.5-pro"

def generate_text(prompt: str, max_output_tokens: int = 700) -> str:
    """
    Mock Gemini 2.5 Pro API call.
    Returns a fake JSON string as if the model analyzed the claim.
    """
    # Generate random mock values
    verdict = random.choice(["credible", "misleading", "false", "unverifiable"])
    confidence = round(random.uniform(0.5, 0.95), 2)
    explanation = f"This is a mock explanation for the claim based on retrieved evidence."
    emotional_tone = {"anger":0, "fear":0, "joy":0.3, "sadness":0, "neutral":0.7}
    claim_category = random.choice(["health","politics","finance","science","satire","other"])
    political_bias = round(random.uniform(-3,3), 1)
    persuasion_techniques = ["Appeal to authority", "Loaded language"]
    education_tips = ["Check primary sources.", "Verify dates and images.", "Search reputable fact-checkers."]

    # Return as JSON string
    json_string = f"""
    {{
        "verdict": "{verdict}",
        "confidence": {confidence},
        "explanation": "{explanation}",
        "emotional_tone": {emotional_tone},
        "claim_category": "{claim_category}",
        "political_bias": {political_bias},
        "persuasion_techniques": {persuasion_techniques},
        "education_tips": {education_tips}
    }}
    """
    return json_string

def get_embeddings(text: str):
    """Mock embeddings"""
    return [0.0]*768
