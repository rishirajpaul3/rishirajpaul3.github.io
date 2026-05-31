"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    id: "n8n",
    label: "n8n Workflows",
    count: "8 workflows",
    desc: "Automation workflows for GTM teams. Email classifiers, lead enrichment, content repurposing, cold call machines. Import JSON, add credentials, run.",
    tags: ["Gmail", "OpenAI", "Slack", "Google Sheets", "Notion"],
    href: "/builds/n8n",
    status: "live",
    action: "Browse workflows →",
  },
  {
    id: "github",
    label: "GitHub",
    count: "11+ repos",
    desc: "All open source projects. Production apps, GTM tools, and automation scripts. Fork, clone, or just browse.",
    tags: ["FastAPI", "React", "Python", "Claude", "n8n"],
    href: "https://github.com/rishirajpaul3",
    status: "live",
    action: "View on GitHub ↗",
    external: true,
  },
  {
    id: "clay",
    label: "Clay Templates",
    count: "7 tables",
    desc: "Enrichment pipelines, ICP scoring tables, signal-based sourcing, and waterfall sequences. Copy any table directly into your Clay workspace.",
    tags: ["Clay", "ICP Scoring", "Enrichment", "HeyReach", "Signal-Based"],
    href: "/builds/clay",
    status: "live",
    action: "Browse templates →",
  },
  {
    id: "ai-prompts",
    label: "AI Prompt Library",
    count: "15 prompts",
    desc: "GTM-specific prompts for prospecting, BANT extraction, reply classification, cold email generation, and account research. Tested in production.",
    tags: ["Claude", "GPT-4o", "Prompting", "GTM"],
    href: "/builds/ai-prompts",
    status: "live",
    action: "Browse prompts →",
  },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const tag = (t: string) => (
  <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 9999 }}>{t}</span>
);

export default function BuildsPage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <section style={{ padding: "80px 0 60px" }}>
          <div className="section-label">open source</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 20, color: "var(--text)" }}>
            Everything I build,<br /><G>free to use.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 540, lineHeight: 1.8 }}>
            Workflows, templates, and tools I have built and use myself. No paywalls, no signups. Just take it and run.
          </p>
        </section>

        <div className="divider" />

        {/* Categories */}
        <section style={{ padding: "72px 0 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {categories.map((c, i) => {
              const isLive = c.status === "live";
              const CardWrapper = isLive
                ? ({ children }: { children: React.ReactNode }) => (
                    c.external
                      ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "block" }}>{children}</a>
                      : <Link href={c.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>{children}</Link>
                  )
                : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <CardWrapper>
                    <div
                      style={{
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        borderRadius: 16,
                        padding: "32px 28px",
                        height: "100%",
                        opacity: isLive ? 1 : 0.55,
                        cursor: isLive ? "pointer" : "default",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={e => isLive && ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)")}
                      onMouseLeave={e => isLive && ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
                          {c.label}
                        </div>
                        <span style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9,
                          padding: "3px 10px",
                          borderRadius: 9999,
                          letterSpacing: "0.06em",
                          color: isLive ? "var(--gold)" : "var(--text-dim)",
                          background: isLive ? "var(--gold-bg)" : "var(--surface)",
                          border: `1px solid ${isLive ? "var(--gold-border)" : "var(--border)"}`,
                          flexShrink: 0,
                        }}>
                          {isLive ? "● LIVE" : "SOON"}
                        </span>
                      </div>

                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", letterSpacing: "0.05em", marginBottom: 10 }}>
                        {c.count}
                      </div>

                      <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 20 }}>
                        {c.desc}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                        {c.tags.map(tag)}
                      </div>

                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: isLive ? "var(--gold)" : "var(--text-dim)", letterSpacing: "0.02em" }}>
                        {c.action}
                      </div>
                    </div>
                  </CardWrapper>
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
