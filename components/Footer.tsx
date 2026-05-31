"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 0 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)" }}>
        <span>© 2026 Rishiraj Paul · GTM Engineer · UK</span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { href: "/blog", label: "Blog" },
            { href: "https://www.linkedin.com/in/rishiraj-paul-gtm/", label: "LinkedIn", external: true },
            { href: "https://x.com/RishirajPa40653", label: "X", external: true },
            { href: "https://github.com/rishirajpaul3", label: "GitHub", external: true },
            { href: "mailto:rishirajpaul3@gmail.com", label: "Email" },
          ].map(l => (
            <Link key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener noreferrer" : undefined}
              style={{ color: "var(--text-dim)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
