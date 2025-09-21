
# VeritasAI

**VeritasAI** is a modern AI-powered tool designed to analyze the credibility of news, claims, and content. It leverages advanced NLP, machine learning, and retrieval-based evidence analysis to provide fact-checked results, explanations, and credibility scores. VeritasAI also supports Chrome Extension integration for real-time fact-checking on the web.

---

## Features

- Analyze **text, URLs, images, and PDFs** for credibility.
- Retrieve top evidence from trusted sources automatically.
- Classify claims into categories: `health`, `politics`, `finance`, `science`, `satire`, or `other`.
- Detect emotional tone, political bias, and persuasion techniques.
- Generate visual credibility plots for each analysis.
- Audit and save all analyses in **PostgreSQL** and local JSON.
- **Chrome Extension** integration for in-browser fact-checking.
- Real-time API built on **FastAPI** with CORS support.

---

## Tech Stack

- **Backend:** FastAPI, Python 3.13, Uvicorn
- **Database:** PostgreSQL
- **AI & ML:** OpenAI / Gemini API, Pytesseract, PyMuPDF
- **Web Scraping:** BeautifulSoup, Requests
- **Visualization:** Matplotlib
- **Docker:** Containerized environment for backend and database
- **Frontend/Extension:** React + Chrome Extension

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/veritasai.git
cd veritasai/backend
````

### Create Python environment

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate     # Windows
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://username:password@db:5432/veritasai
OPENAI_API_KEY=your_openai_api_key
```

---

## Database Setup

We use **PostgreSQL**. You can set it up locally or via Docker:

```bash
docker run -d \
  --name veritasai-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=veritasai \
  -p 5432:5432 \
  postgres:15
```

Run migrations (if using Alembic) or manually create tables using `db.py`.

---

## Running Locally

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: `http://localhost:8000`

Test endpoint:

```bash
curl -X POST "http://localhost:8000/analyze" -H "Content-Type: application/json" -d '{"text": "Your claim here"}'
```

---

## Docker & Docker Compose

`docker-compose.yml` for backend + database:

```yaml
version: '3.9'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: veritasai
    ports:
      - "5432:5432"
    volumes:
      - veritasai_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/veritasai
      - OPENAI_API_KEY=${OPENAI_API_KEY}

volumes:
  veritasai_data:
```

Run:

```bash
docker-compose up --build
```

---

## Chrome Extension

VeritasAI provides a Chrome Extension that:

* Allows users to highlight text on a webpage.
* Sends the text to the backend `/analyze` API.
* Displays credibility, explanation, and evidence popups in-browser.

---

## API Endpoints

* `POST /analyze` – Analyze text, URL, image, or PDF.

  * Body (JSON or form-data): `{ "text": "...", "url": "...", "file": ... }`
  * Response: JSON with verdict, credibility score, evidences, explanations, plots, etc.

* `GET /health` – Health check endpoint.

---

## Folder Structure

```
veritasai/
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ schemas.py
│  │  ├─ utils.py
│  │  ├─ retriever.py
│  │  ├─ genai_client.py
│  │  ├─ db.py
│  │  └─ audits/
│  └─ requirements.txt
├─ frontend/
├─ docker-compose.yml
└─ README.md
```

---

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

