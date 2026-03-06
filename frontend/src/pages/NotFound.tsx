import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "5rem", fontWeight: 800, lineHeight: 1 }}>404</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
        Page not found
      </p>
      <Link
        to="/"
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1.5rem",
          borderRadius: "var(--radius-md)",
          background: "var(--color-primary)",
          color: "#fff",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go home
      </Link>
    </main>
  );
}
