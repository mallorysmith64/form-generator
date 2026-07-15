# syntax=docker/dockerfile:1

# ---------- Stage 1: Build the React frontend ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

# Install deps first for better layer caching
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the frontend source and build it
COPY frontend/ ./
RUN yarn build
# Vite (this project) outputs to /app/frontend/dist

# ---------- Stage 2: Python/Flask backend + serve built frontend ----------
FROM python:3.11-slim AS backend

WORKDIR /app

# System deps (uncomment if you need build tools for any Python packages)
# RUN apt-get update && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*

# Install Python dependencies first for caching
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./

# Copy built frontend into a static folder Flask will serve
COPY --from=frontend-build /app/frontend/dist ./static

ENV FLASK_ENV=production \
    PYTHONUNBUFFERED=1

EXPOSE 5000

# gunicorn serves base.py's "app" Flask instance
RUN pip install --no-cache-dir gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "base:app"]