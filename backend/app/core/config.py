"""Application configuration via pydantic-settings."""

from __future__ import annotations

from functools import lru_cache
from typing import Literal

from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # ── App ──────────────────────────────────────────────────────────────────
    app_name: str = "mcp-test"
    app_env: Literal["development", "staging", "production"] = "development"
    debug: bool = False

    # ── API ──────────────────────────────────────────────────────────────────
    api_prefix: str = "/api/v1"

    # ── CORS ─────────────────────────────────────────────────────────────────
    cors_origins: list[str] = ["http://localhost:5173"]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",")]
        return value

    # ── Logging ──────────────────────────────────────────────────────────────
    log_level: str = "info"


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance (use as FastAPI dependency)."""
    return Settings()
