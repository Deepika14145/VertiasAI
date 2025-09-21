FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN apt-get update && apt-get install -y build-essential tesseract-ocr libgl1 \
    && pip install --upgrade pip \
    && pip install -r requirements.txt
COPY app ./app
WORKDIR /app/app
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
