FROM python:3.10-slim
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY . .

# Expose the port your service runs on
EXPOSE 5000

# Run the app (adjust if you use uvicorn or gunicorn)
CMD ["python", "app.py"]
