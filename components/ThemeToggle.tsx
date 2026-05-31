"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  const isDark = theme === "dark";

  return (
    <>
    <button
      onClick={toggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: isDark ? "var(--surface-2)" : "var(--gold)",
        border: `1px solid ${isDark ? "var(--gold-border)" : "var(--gold)"}`,
        borderRadius: 8,
        padding: "6px 13px",
        cursor: "pointer",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: isDark ? "var(--gold)" : "var(--bg)",
        lineHeight: 1,
        transition: "all 0.15s",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 14 }}>{isDark ? "☀" : "◗"}</span>
      <span className="theme-label">{isDark ? "light" : "dark"}</span>
    </button>
    <style>{"@media(max-width:900px){ .theme-label { display:none; } }"}</style>
    </>
  );
}
