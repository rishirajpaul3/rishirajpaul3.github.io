"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href:"/",             label:"Home"         },
  { href:"/pulse",        label:"Daily Pulse"  },
  { href:"/blog",         label:"Blog"         },
  { href:"/how-to",       label:"How-To"       },
  { href:"/case-studies", label:"Case Studies" },
  { href:"/glossary",     label:"Glossary"     },
  { href:"/compare",      label:"Compare"      },
  { href:"/log",          label:"Log"          },
  { href:"/about",        label:"About"        },
  { href:"/#contact",     label:"Contact"      },
];

export default function MobileNav() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  useEffect(() => { setMounted(true); }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [path]);

  const isActive = (href: string) =>
    href === "/#contact" ? false : href === "/" ? path === "/" : path.startsWith(href);

  const overlay = (
    <div style={{
      position:"fixed", inset:0, top:56,
      background:"var(--overlay-bg)",
      zIndex:9999,
      overflowY:"auto",
    }}>
      <nav style={{ padding:"8px 0" }}>
        {links.map(l => (
          <Link key={l.href} href={l.href}
            onClick={() => setOpen(false)}
            style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              fontFamily:"'Space Grotesk',sans-serif",
              fontSize:17, fontWeight:600,
              color: isActive(l.href) ? "var(--gold)" : "var(--text)",
              textDecoration:"none",
              padding:"16px 24px",
              borderBottom:"1px solid var(--border)",
              background: isActive(l.href) ? "var(--gold-bg)" : "transparent",
            }}>
            {l.label}
            {isActive(l.href) && <span style={{ fontSize:8, color:"var(--gold)" }}>●</span>}
          </Link>
        ))}
      </nav>
      <div style={{ padding:"20px 24px" }}>
        <a href="mailto:rishirajpaul3@gmail.com"
          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--text-muted)", textDecoration:"none" }}>
          rishirajpaul3@gmail.com
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="mobile-menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        style={{
          display:"none",
          background: open ? "var(--gold-bg)" : "var(--surface-2)",
          border:`1px solid ${open ? "var(--gold-border)" : "var(--border)"}`,
          borderRadius:8, padding:"8px 12px",
          color: open ? "var(--gold)" : "var(--text-muted)",
          cursor:"pointer",
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:15, lineHeight:1,
          transition:"all 0.15s",
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {mounted && open && createPortal(overlay, document.body)}

      <style>{"@media(max-width:900px){ .mobile-menu-btn { display:block !important; } }"}</style>
    </>
  );
}
