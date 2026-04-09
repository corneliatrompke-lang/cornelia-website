FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Hardcode Apps Script URL for Railway production
ENV APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxmSed99_GnX_hbOjGFpVB1TNf9yeVFfjETZGuzA1h6Eno5EgJv1JD9JceapRCe0jYn/exec

# Default port (Railway will override via PORT env var)
ENV PORT=8080
EXPOSE 8080

# Start the application using the PORT environment variable
CMD uvicorn server:app --host 0.0.0.0 --port $PORT
