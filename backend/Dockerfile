# Multi-stage Dockerfile for DzShopi Backend

# --- Base Stage ---
FROM python:3.12-slim AS base

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH="/root/.local/bin:$PATH"

# Install curl to fetch uv
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && apt-get purge -y --auto-remove curl \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml uv.lock* ./

# Install production dependencies
RUN uv pip install --system --no-cache -r pyproject.toml

# --- Development Stage ---
FROM base AS dev

# Install dev dependencies as well
RUN uv pip install --system --no-cache -r pyproject.toml --extra dev || true

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# --- Test Stage ---
FROM base AS test

RUN uv pip install --system --no-cache pytest pytest-asyncio pytest-cov httpx ruff

COPY . .

CMD ["pytest", "-v"]

# --- Production Stage ---
FROM base AS production

RUN useradd -m -u 10001 appuser

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
