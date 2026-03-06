"""Smoke tests for the FastAPI application."""

from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
async def client() -> AsyncClient:  # type: ignore[misc]
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac


# ── Health ────────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient) -> None:
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["service"] == "mcp-test"


# ── Echo ──────────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_echo(client: AsyncClient) -> None:
    payload = {"message": "hello world"}
    response = await client.post("/api/v1/echo", json=payload)
    assert response.status_code == 200
    assert response.json() == {"echo": "hello world"}


@pytest.mark.asyncio
async def test_echo_empty_message(client: AsyncClient) -> None:
    payload = {"message": ""}
    response = await client.post("/api/v1/echo", json=payload)
    assert response.status_code == 200
    assert response.json() == {"echo": ""}
