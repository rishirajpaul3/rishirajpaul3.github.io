"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/",              label: "home" },
  { href: "/builds",        label: "builds" },
  { href: "/how-to",        label: "how-to" },
  { href: "/glossary",      label: "glossary" },
  { href: "/compare",       label: "compare" },
  { href: "/case-studies",  label: "case studies" },
  { href: "/pulse",         label: "daily pulse" },
  { href: "/log",           label: "log" },
  { href: "/blog",          label: "blog" },
  { href: "/about",         label: "about" },
  { href: "/#contact",      label: "contact" },
];

export default function Nav() {
  const path = usePathname();
  const [closed, setClosed] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  return (
    <>
      {!closed && (
        <div className="announce">
          <span>// open to GTM engineering roles &amp; freelance in the UK — <a href="/#contact">reach out →</a></span>
          <button onClick={() => setClosed(true)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-dim)", fontSize:18, lineHeight:1 }}>×</button>
        </div>
      )}
      <nav style={{ position:"sticky", top:0, zIndex:100, height:56, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", background:"var(--nav-bg)", backdropFilter:"blur(14px)", borderBottom:"1px solid var(--border)" }}>
        <Link href="/" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:700, color:"var(--text)", textDecoration:"none", letterSpacing:"-0.01em" }}>
          rishiraj.paul
        </Link>

        <ul style={{ display:"flex", gap:4, listStyle:"none" }}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color: isActive(l.href) ? "var(--bg)" : "var(--text-muted)", textDecoration:"none", padding:"6px 13px", borderRadius:8, background: isActive(l.href) ? "var(--gold)" : "transparent", border:"1px solid", borderColor: isActive(l.href) ? "var(--gold)" : "transparent", transition:"all 0.15s", letterSpacing:"0.01em", whiteSpace:"nowrap" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <ThemeToggle />
          <Link href="/#contact" className="nav-cta" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"7px 18px", background:"var(--gold)", color:"var(--bg)", textDecoration:"none", borderRadius:8, fontWeight:600, letterSpacing:"0.02em", whiteSpace:"nowrap" }}>
            let&apos;s talk →
          </Link>
          <MobileNav />
        </div>
      </nav>

      <style>{`
        .announce { background:var(--surface); border-bottom:1px solid var(--border); padding:9px 40px; display:flex; align-items:center; justify-content:space-between; font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text-muted); }
        .announce a { color:var(--gold); text-decoration:none; }
        @media(max-width:900px){ nav ul { display:none !important; } .announce{padding:9px 16px} nav{padding:0 16px !important;} .nav-cta { display:none !important; } }
      `}</style>
    </>
  );
}
