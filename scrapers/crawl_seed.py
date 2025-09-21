# scrapers/crawl_seed.py
import requests
from bs4 import BeautifulSoup
import json

SEEDS = [
    "https://www.who.int/news-room",
    "https://www.thehindu.com/",
    "https://www.altnews.in/"
]

def get_text(url):
    r = requests.get(url, timeout=10)
    soup = BeautifulSoup(r.text, "html.parser")
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")]
    return " ".join(paragraphs)[:4000]

def seed_out(path="backend/seed_docs.json"):
    docs = []
    for u in SEEDS:
        try:
            docs.append({"title":u, "url":u, "text": get_text(u)})
        except Exception as e:
            print("err", u, e)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(docs, f, ensure_ascii=False, indent=2)
    print("wrote", path)

if __name__ == "__main__":
    seed_out()
