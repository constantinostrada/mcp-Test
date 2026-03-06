# mcp-test

A full-stack application with a **Python (FastAPI)** backend and a **React (Vite + TypeScript)** frontend.

---

## Project Structure

```
mcp-test/
├── backend/                 # Python FastAPI service
│   ├── app/
│   │   ├── api/             # Route handlers
│   │   ├── core/            # Config, settings
│   │   └── main.py          # FastAPI entry point
│   ├── tests/               # Pytest test suite
│   └── pyproject.toml       # Python project + deps
├── frontend/                # React + Vite + TypeScript
│   ├── src/
│   │   ├── api/             # Typed API client
│   │   ├── components/      # Shared UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── hooks/           # Custom React hooks
│   │   └── main.tsx         # App entry point
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── .gitignore
├── Makefile                 # Developer shortcuts
└── README.md
```

---

## Prerequisites

| Tool | Min version |
|------|-------------|
| Python | 3.11+ |
| Node.js | 18+ |
| npm | 9+ |
| uv *(optional, fast)* | latest |

---

## Getting Started

### 1 — Clone & enter the repo

```bash
git clone <repo-url>
cd mcp-test
```

### 2 — Backend

```bash
cd backend

# Create a virtual environment and install dependencies
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e ".[dev]"

# Or with uv (faster)
uv sync

# Copy env template and fill in values
cp .env.example .env

# Run the development server (hot-reload)
uvicorn app.main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**
Interactive docs at **http://localhost:8000/docs**

### 3 — Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy env template
cp .env.example .env

# Start Vite dev server
npm run dev
```

The app will be available at **http://localhost:5173**

### 4 — Run both with Make (from project root)

```bash
make dev          # starts backend + frontend concurrently
make test         # runs backend pytest + frontend vitest
make lint         # ruff + eslint
make format       # ruff format + prettier
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_ENV` | `development` | `development` \| `production` |
| `API_PREFIX` | `/api/v1` | Global API route prefix |
| `CORS_ORIGINS` | `http://localhost:5173` | Allowed CORS origins (comma-separated) |
| `LOG_LEVEL` | `info` | Uvicorn / app log level |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend base URL |

---

## Running Tests

```bash
# Backend
cd backend && pytest -v

# Frontend
cd frontend && npm run test
```

---

## Linting & Formatting

```bash
# Backend — ruff
cd backend
ruff check .
ruff format .

# Frontend — ESLint + Prettier
cd frontend
npm run lint
npm run format
```

---

## Building for Production

```bash
# Frontend static bundle
cd frontend && npm run build   # outputs to frontend/dist/

# Backend (served by uvicorn / gunicorn)
cd backend
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

---

## License

MIT
