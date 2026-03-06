import { useState } from "react";
import { api } from "../api/client";
import { useHealth } from "../hooks/useHealth";
import { StatusBadge } from "../components/StatusBadge";

export default function Home() {
  const { data: health, isLoading, error } = useHealth();

  const [message, setMessage] = useState("");
  const [echo, setEcho] = useState<string | null>(null);
  const [echoLoading, setEchoLoading] = useState(false);

  const handleEcho = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setEchoLoading(true);
    try {
      const res = await api.echo({ message });
      setEcho(res.echo);
    } catch {
      setEcho("Error — is the backend running?");
    } finally {
      setEchoLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      {/* Hero */}
      <section style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
          }}
        >
          mcp-test
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
          Python FastAPI&nbsp;&bull;&nbsp;React + Vite + TypeScript
        </p>
      </section>

      {/* API Status */}
      <section
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem 2rem",
          minWidth: 320,
        }}
      >
        <h2
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-text-muted)",
            marginBottom: "0.75rem",
          }}
        >
          Backend Status
        </h2>

        {isLoading && <StatusBadge status="loading" label="Connecting..." />}
        {error && <StatusBadge status="error" label="Unreachable" />}
        {health && (
          <StatusBadge status="ok" label={`${health.service} — ${health.status}`} />
        )}
      </section>

      {/* Echo Demo */}
      <section
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem 2rem",
          minWidth: 320,
        }}
      >
        <h2
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-text-muted)",
            marginBottom: "1rem",
          }}
        >
          Echo API Demo
        </h2>

        <form
          onSubmit={handleEcho}
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type something..."
            style={{
              flex: 1,
              minWidth: 180,
              padding: "0.5rem 0.75rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              color: "var(--color-text)",
              fontSize: "0.95rem",
            }}
          />
          <button
            type="submit"
            disabled={echoLoading}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: "var(--color-primary)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              opacity: echoLoading ? 0.6 : 1,
              transition: "background 0.2s",
            }}
          >
            {echoLoading ? "Sending..." : "Send"}
          </button>
        </form>

        {echo !== null && (
          <p
            style={{
              marginTop: "1rem",
              padding: "0.5rem 0.75rem",
              background: "var(--color-bg)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              color: "var(--color-success)",
            }}
          >
            {echo}
          </p>
        )}
      </section>
    </main>
  );
}
