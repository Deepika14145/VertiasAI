# backend/app/seed_index.py
from app.retriever import add_docs
docs = [
    {"title":"WHO guidance example", "url":"https://www.who.int/example","text":"WHO official guidance on X: ...", "credibility": 0.95},
    {"title":"FactCheck sample", "url":"https://www.factcheck.org/example","text":"FactCheck found no evidence ...", "credibility": 0.9}
]
if __name__ == "__main__":
    add_docs(docs)
    print("Seeded docs:", len(docs))
