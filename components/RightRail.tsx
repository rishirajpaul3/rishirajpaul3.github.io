"use client";
import Link from "next/link";

const items = [
  { href: "https://www.linkedin.com/in/rishiraj-paul/", label: "in", title: "LinkedIn" },
  { href: "https://github.com/rishirajpaul3", label: "gh", title: "GitHub" },
  { href: "/blog", label: "✍", title: "Blog" },
  { href: "mailto:rishirajpaul3@gmail.com", label: "@", title: "Email" },
];

export default function RightRail() {
  return (
    <>
      <div className="right-rail">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            title={item.title}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rail-btn"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <style>{`
        .right-rail {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: var(--rail-bg);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 10px 8px;
          backdrop-filter: blur(8px);
        }
        .rail-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-muted);
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: background 0.15s, color 0.15s;
        }
        .rail-btn:hover {
          background: var(--gold-bg);
          color: var(--gold);
        }
        @media(max-width:1100px){ .right-rail { display: none } }
      `}</style>
    </>
  );
}
