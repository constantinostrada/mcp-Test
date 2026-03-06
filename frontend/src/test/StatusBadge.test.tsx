import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "../components/StatusBadge";

describe("StatusBadge", () => {
  it("renders the ok status with default label", () => {
    render(<StatusBadge status="ok" />);
    expect(screen.getByText("ok")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<StatusBadge status="ok" label="All systems go" />);
    expect(screen.getByText("All systems go")).toBeInTheDocument();
  });

  it("renders the error status", () => {
    render(<StatusBadge status="error" label="Unreachable" />);
    expect(screen.getByText("Unreachable")).toBeInTheDocument();
  });

  it("renders the loading status", () => {
    render(<StatusBadge status="loading" label="Connecting..." />);
    expect(screen.getByText("Connecting...")).toBeInTheDocument();
  });
});
