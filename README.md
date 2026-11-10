# DzShopi

**DzShopi is a full-stack e-commerce platform designed to support online product discovery, shopping, and order management.**

The platform allows customers to browse products across multiple categories, explore product variants, manage shopping carts, and place orders with cash on delivery. It follows a guest-first approach: customers can complete purchases without creating an account, while registered users gain additional capabilities such as order tracking and product reviews.

The project is built as a modular monolith, with a clear separation between the frontend, backend, business logic, and data-access layers. Its architecture is intended to remain maintainable and extensible as new features are introduced.

## Tech Stack

**Frontend**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

**Backend**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![Alembic](https://img.shields.io/badge/Alembic-333333?style=for-the-badge)

**Database & Storage**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-2563EB?style=for-the-badge)

**Deployment & Infrastructure**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Requirements

Make sure the following tools are installed:

- **Git** — repository management.
- **Python 3.12+** — backend runtime.
- **uv** — Python dependency and environment management.
- **Node.js (LTS)** — frontend development and build tooling.
- **Docker & Docker Compose** — containerized deployment.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohammed-ouali/e-commerce.git
cd e-commerce
```

### 2. Backend setup

```bash
cd backend
uv sync
```

Configure the required environment variables using the provided `.env.example` file.

Run database migrations and start the development server:

```bash
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

The API documentation is available at:

`http://localhost:8000/docs`

### 3. Frontend setup

Navigate to the frontend directory:

```bash
npm install
npm run dev
```

## Docker

Build and start the application:

```bash
docker compose build
docker compose up -d
```

Useful commands:

```bash
# View service logs
docker compose logs -f

# Stop services
docker compose down
```

## Documentation

| Document | Description |
|---|---|
| [Architecture](docs/architecture.md) | System components, backend architecture, and deployment design. |
| [Database](docs/database.md) | Entity relationship diagram, entity responsibilities, relationships, deletion policies, constraints, and indexes. |
| [API](docs/api.md) | API groups, endpoints, accepted schemas, response schemas, and expected status codes. |
| [Decisions](docs/decisions.md) | Key engineering decisions covering the technology stack, architecture, database, security, and infrastructure. |