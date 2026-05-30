"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href:"/",         label:"Home"     },
  { href:"/blog",     label:"Blog"     },
  { href:"/projects", label:"Projects" },
  { href:"/about",    label:"About"    },
  { href:"/#services",label:"Services" },
  { href:"/#contact", label:"Contact"  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{ display:"none", background:"none", border:"1px solid var(--border)", borderRadius:6, padding:"6px 10px", color:"var(--text-muted)", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", fontSize:11 }}
        className="mobile-menu-btn"
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div style={{ position:"fixed", inset:0, top:56, background:"rgba(12,9,4,0.97)", zIndex:99, backdropFilter:"blur(12px)", display:"flex", flexDirection:"column", padding:"32px 24px", gap:4 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:700, color: path === l.href ? "var(--gold)" : "var(--text)", textDecoration:"none", padding:"14px 0", borderBottom:"1px solid var(--border)", letterSpacing:"-0.02em" }}>
              {l.label}
            </Link>
          ))}
          <a href="mailto:rishirajpaul3@gmail.com" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)", textDecoration:"none", marginTop:24 }}>
            rishirajpaul3@gmail.com
          </a>
        </div>
      )}

      <style>{`.mobile-menu-btn { display: none; } @media(max-width:900px){ .mobile-menu-btn { display: block !important; } }`}</style>
    </>
  );
}
