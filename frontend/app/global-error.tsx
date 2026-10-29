"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#faf8f5", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <div style={{ width: "4rem", height: "4rem", borderRadius: "9999px", backgroundColor: "#eef5f1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2d5f3f" strokeWidth="2" style={{ width: "1.75rem", height: "1.75rem" }}>
                <path d="M12 22V12M12 12C12 7 7 3 2 4c0 5 4 9 10 8M12 12c0-5 5-9 10-8-1 5-5 9-10 8" />
              </svg>
            </div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b9d7a", marginBottom: "0.5rem" }}>
              Kuyash Integrated Farm
            </p>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#080f0a", marginBottom: "0.75rem" }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "#6b7280", marginBottom: "2rem" }}>
              An unexpected error occurred. Please try again or return to the homepage.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <button
                onClick={reset}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", borderRadius: "9999px", backgroundColor: "#2d5f3f", padding: "0.625rem 1.5rem", fontSize: "0.875rem", fontWeight: 600, color: "white", border: "none", cursor: "pointer" }}
              >
                Try again
              </button>
              <a
                href="/"
                style={{ display: "inline-flex", alignItems: "center", borderRadius: "9999px", border: "1px solid #e8ede9", padding: "0.625rem 1.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#374151", textDecoration: "none" }}
              >
                Go to homepage
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
