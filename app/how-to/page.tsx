"use client";
import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import { motion } from "framer-motion";
import Link from "next/link";
import { guides, CATEGORIES, categoryColors } from "@/data/how-to";

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

export default function HowToPage() {
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() =>
    category === "All" ? guides : guides.filter(g => g.category === category),
    [category]
  );

  const counts: Record<string, number> = { All: guides.length };
  CATEGORIES.slice(1).forEach(c => { counts[c] = guides.filter(g => g.category === c).length; });

  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        <section style={{ padding: "80px 0 48px" }}>
          <div className="section-label">how-to</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            {guides.length} guides.<br /><G>No filler.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8 }}>
            Written after building the thing, not before. Each one is a full article, not a bullet list.
          </p>
        </section>

        {/* Filters */}
        <div style={{ position: "sticky", top: 56, zIndex: 50, background: "var(--bg)", paddingBottom: 16, paddingTop: 10, borderBottom: "1px solid var(--border)", marginBottom: 40, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
                padding: "6px 14px", borderRadius: 9999,
                border: `1px solid ${category === cat ? "var(--gold)" : "var(--border)"}`,
                background: category === cat ? "var(--gold)" : "transparent",
                color: category === cat ? "var(--bg)" : "var(--text-muted)",
                cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.02em",
              }}
            >
              {cat} <span style={{ opacity: 0.6, fontSize: 10 }}>· {counts[cat]}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {filtered.map((g, i) => {
              const c = categoryColors[g.category];
              return (
                <motion.div
                  key={g.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link href={`/how-to/${g.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}>
                    <div
                      style={{
                        background: "var(--surface-2)", border: "1px solid var(--border)",
                        borderRadius: 14, padding: "28px 26px", height: "100%",
                        transition: "border-color 0.15s", cursor: "pointer",
                        display: "flex", flexDirection: "column", gap: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                    >
                      {/* Category + read time */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.08em",
                          textTransform: "uppercase", padding: "3px 9px", borderRadius: 9999,
                          border: `1px solid ${c.border}`, background: c.bg, color: c.color,
                        }}>
                          {g.category}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)" }}>
                          {g.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700,
                        color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.3,
                        marginBottom: 12, flex: 1,
                      }}>
                        {g.title}
                      </h2>

                      {/* Desc */}
                      <p style={{
                        fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13,
                        color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 20,
                      }}>
                        {g.desc}
                      </p>

                      {/* Tools */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                        {g.tools.slice(0, 4).map(t => (
                          <span key={t} style={{
                            fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
                            color: "var(--text-dim)", background: "var(--surface)",
                            border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 9999,
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", letterSpacing: "0.02em" }}>
                        Read guide →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
