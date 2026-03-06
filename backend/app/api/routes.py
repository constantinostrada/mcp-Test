"""API route definitions."""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# ── Response schemas ─────────────────────────────────────────────────────────


class HealthResponse(BaseModel):
    status: str
    service: str


class EchoPayload(BaseModel):
    message: str


class EchoResponse(BaseModel):
    echo: str


# ── Endpoints ────────────────────────────────────────────────────────────────


@router.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check() -> HealthResponse:
    """Return service liveness status."""
    return HealthResponse(status="ok", service="mcp-test")


@router.post("/echo", response_model=EchoResponse, tags=["Demo"])
async def echo(payload: EchoPayload) -> EchoResponse:
    """Echo back whatever message is sent."""
    return EchoResponse(echo=payload.message)
