# ─── mcp-test Makefile ───────────────────────────────────────────────────────
.PHONY: help dev backend frontend test lint format install clean

PYTHON   := python3
UVICORN  := uvicorn app.main:app
BE_DIR   := backend
FE_DIR   := frontend

# Default goal
help:
	@echo ""
	@echo "  mcp-test — available targets"
	@echo ""
	@echo "  make install      Install all dependencies (backend + frontend)"
	@echo "  make dev          Start backend and frontend dev servers"
	@echo "  make backend      Start only the FastAPI backend"
	@echo "  make frontend     Start only the Vite frontend"
	@echo "  make test         Run backend pytest + frontend vitest"
	@echo "  make lint         Ruff (backend) + ESLint (frontend)"
	@echo "  make format       Ruff format (backend) + Prettier (frontend)"
	@echo "  make clean        Remove build artefacts and caches"
	@echo ""

# ── Install ───────────────────────────────────────────────────────────────────
install:
	cd $(BE_DIR) && $(PYTHON) -m pip install -e ".[dev]"
	cd $(FE_DIR) && npm install

# ── Dev servers ───────────────────────────────────────────────────────────────
dev:
	@echo "Starting backend and frontend in parallel..."
	@trap 'kill 0' SIGINT; \
		(cd $(BE_DIR) && $(UVICORN) --reload --port 8000) & \
		(cd $(FE_DIR) && npm run dev) & \
		wait

backend:
	cd $(BE_DIR) && $(UVICORN) --reload --port 8000

frontend:
	cd $(FE_DIR) && npm run dev

# ── Test ──────────────────────────────────────────────────────────────────────
test:
	cd $(BE_DIR) && $(PYTHON) -m pytest -v
	cd $(FE_DIR) && npm run test

# ── Lint ──────────────────────────────────────────────────────────────────────
lint:
	cd $(BE_DIR) && ruff check .
	cd $(FE_DIR) && npm run lint

# ── Format ───────────────────────────────────────────────────────────────────
format:
	cd $(BE_DIR) && ruff format .
	cd $(FE_DIR) && npm run format

# ── Clean ─────────────────────────────────────────────────────────────────────
clean:
	rm -rf $(BE_DIR)/.venv $(BE_DIR)/__pycache__ $(BE_DIR)/.pytest_cache $(BE_DIR)/.ruff_cache
	rm -rf $(FE_DIR)/node_modules $(FE_DIR)/dist $(FE_DIR)/coverage
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -name "*.pyc" -delete 2>/dev/null || true
