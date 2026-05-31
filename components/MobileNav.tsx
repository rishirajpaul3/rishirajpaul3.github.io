"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href:"/",             label:"Home"         },
  { href:"/builds",       label:"Builds"       },
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
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{ display:"none", background: open ? "var(--gold-bg)" : "var(--surface-2)", border:`1px solid ${open ? "var(--gold-border)" : "var(--border)"}`, borderRadius:8, padding:"8px 12px", color: open ? "var(--gold)" : "var(--text-muted)", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:15, lineHeight:1, transition:"all 0.15s" }}
        className="mobile-menu-btn"
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div style={{ position:"fixed", left:0, right:0, top:56, bottom:0, background:"var(--overlay-bg)", zIndex:200, backdropFilter:"blur(16px)", overflowY:"auto" }}>
          <div style={{ padding:"8px 0" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:600,
                  color: path === l.href ? "var(--gold)" : "var(--text)",
                  textDecoration:"none", padding:"15px 24px",
                  borderBottom:"1px solid var(--border)",
                  letterSpacing:"-0.01em",
                  background: path === l.href ? "var(--gold-bg)" : "transparent",
                }}>
                {l.label}
                {path === l.href && <span style={{ fontSize:10, color:"var(--gold)", fontFamily:"'JetBrains Mono',monospace" }}>●</span>}
              </Link>
            ))}
          </div>
          <div style={{ padding:"20px 24px", borderTop:"1px solid var(--border)" }}>
            <a href="mailto:rishirajpaul3@gmail.com" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--text-muted)", textDecoration:"none" }}>
              rishirajpaul3@gmail.com
            </a>
          </div>
        </div>
      )}

      <style>{`.mobile-menu-btn { display: none; } @media(max-width:900px){ .mobile-menu-btn { display: block !important; } }`}</style>
    </>
  );
}
