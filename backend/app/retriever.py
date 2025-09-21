# backend/app/retriever.py
from typing import List, Dict

def query(claim: str, k: int = 4) -> List[Dict]:
    """
    Mock retrieval function.
    Returns a list of top-k dummy evidences for the given claim.
    """
    dummy_evidences = [
        {
            "title": f"Evidence {i+1} for '{claim}'",
            "url": f"https://example.com/article{i+1}",
            "text": f"This is a snippet of evidence {i+1} supporting or refuting the claim.",
            "credibility": 0.6 + i*0.1  # just some dummy score
        }
        for i in range(k)
    ]
    return dummy_evidences
