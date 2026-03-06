/**
 * Typed API client for the mcp-test FastAPI backend.
 * All fetch calls go through this module so base URL and headers
 * are managed in one place.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
const API_PREFIX = "/api/v1";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string;
  service: string;
}

export interface EchoPayload {
  message: string;
}

export interface EchoResponse {
  echo: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${API_PREFIX}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${res.status}] ${text}`);
  }

  return res.json() as Promise<T>;
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

export const api = {
  health: (): Promise<HealthResponse> => request<HealthResponse>("/health"),

  echo: (payload: EchoPayload): Promise<EchoResponse> =>
    request<EchoResponse>("/echo", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
