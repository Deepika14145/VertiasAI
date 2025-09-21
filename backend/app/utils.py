# backend/app/utils.py
import os, json, uuid

def make_id() -> str:
    """Generate a unique ID"""
    return str(uuid.uuid4())

def save_json(path: str, data: dict):
    """Save dictionary as JSON file"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
