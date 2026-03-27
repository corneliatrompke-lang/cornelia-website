FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Hardcode Apps Script URL for Railway production
ENV APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbwhvZ_jYrd6TwABMWOGj_XVUw7i43dFKrvG2fLOpHeCk5LLe9QzyrY50rUjPRpZAaVN/exec

# Expose port
EXPOSE 8001

# Start the application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
