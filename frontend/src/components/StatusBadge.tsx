interface StatusBadgeProps {
  status: "ok" | "error" | "loading";
  label?: string;
}

const styles: Record<StatusBadgeProps["status"], React.CSSProperties> = {
  ok: {
    backgroundColor: "rgba(34,197,94,0.15)",
    color: "#22c55e",
    border: "1px solid rgba(34,197,94,0.3)",
  },
  error: {
    backgroundColor: "rgba(239,68,68,0.15)",
    color: "#ef4444",
    border: "1px solid rgba(239,68,68,0.3)",
  },
  loading: {
    backgroundColor: "rgba(99,102,241,0.15)",
    color: "#6366f1",
    border: "1px solid rgba(99,102,241,0.3)",
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const text = label ?? status;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        ...styles[status],
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "currentColor",
        }}
      />
      {text}
    </span>
  );
}
