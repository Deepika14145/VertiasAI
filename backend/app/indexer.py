# backend/app/indexer.py
"""
Simple indexer to load a small set of curated articles into the retriever.
Run: python -m app.indexer
"""
from .retriever import Retriever

def seed():
    docs = [
        {"title":"WHO on India COVID guidance", "url":"https://www.who.int/example", "text":"The WHO recommends ..."},
        {"title":"AltNews factcheck example", "url":"https://www.altnews.in/fc", "text":"Claim: X. Factcheck: No evidence found..."}
    ]
    r = Retriever()
    r.add_docs(docs)
    print("Seeded docs:", len(docs))

if __name__ == "__main__":
    seed()
