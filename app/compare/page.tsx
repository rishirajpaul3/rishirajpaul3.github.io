"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";

const comparisons = [
  {
    slug: "clay-vs-apollo",
    title: "Clay vs Apollo",
    subtitle: "Enrichment powerhouse vs all-in-one sales platform",
    desc: "People compare these constantly but they don't do the same job. Clay enriches, Apollo sends. When to use each, and when you want both.",
    tags: ["Clay", "Apollo", "Enrichment", "Outbound"],
    readTime: "6 min",
    date: "May 2026",
    live: true,
  },
  {
    slug: "zapier-vs-n8n-vs-make",
    title: "Zapier vs n8n vs Make",
    subtitle: "Three automation platforms, three different philosophies",
    desc: "Zapier if you're non-technical and need it running today. n8n if you're technical and want full control. Make sits between them. Same category, very different users.",
    tags: ["Zapier", "n8n", "Make", "Automation"],
    readTime: "7 min",
    date: "May 2026",
    live: true,
  },
  {
    slug: "instantly-vs-smartlead",
    title: "Instantly vs Smartlead",
    subtitle: "Cold email deliverability head to head",
    desc: "Both promise inbox placement at scale. They differ on account management, deliverability infrastructure, and warmup. Written after running both on live campaigns.",
    tags: ["Instantly", "Smartlead", "Cold Email", "Deliverability"],
    readTime: "5 min",
    date: "May 2026",
    live: true,
  },
  {
    slug: "heyreach-vs-expandi",
    title: "HeyReach vs Expandi",
    subtitle: "LinkedIn outreach tools for GTM teams",
    desc: "LinkedIn has hard limits and each tool handles them its own way. HeyReach suits agencies juggling many accounts. Expandi suits solo operators. Here's what actually differs.",
    tags: ["HeyReach", "Expandi", "LinkedIn", "Outreach"],
    readTime: "4 min",
    date: "May 2026",
    live: true,
  },
  {
    slug: "hubspot-vs-gohighlevel",
    title: "HubSpot vs GoHighLevel",
    subtitle: "Enterprise CRM vs all-in-one GTM platform",
    desc: "HubSpot is the default B2B CRM. GoHighLevel is what agencies and lean GTM teams pick when they want everything in one tool for less money. Here's what you trade for that.",
    tags: ["HubSpot", "GoHighLevel", "CRM", "GTM"],
    readTime: "6 min",
    date: "May 2026",
    live: true,
  },
  {
    slug: "apollo-vs-linkedin-sales-navigator",
    title: "Apollo vs LinkedIn Sales Navigator",
    subtitle: "Third-party database vs native LinkedIn intelligence",
    desc: "Apollo bundles a huge database with sequencing. Sales Navigator has the most accurate LinkedIn data there is. It comes down to whether you need third party coverage or LinkedIn's own data.",
    tags: ["Apollo", "LinkedIn", "Sales Navigator", "Prospecting"],
    readTime: "5 min",
    date: "May 2026",
    live: true,
  },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

export default function ComparePage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        <section style={{ padding: "80px 0 60px" }}>
          <div className="section-label">compare</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 20, color: "var(--text)" }}>
            Which tool,<br /><G>when.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8 }}>
            I&apos;ve run every one of these on live campaigns. No sponsorships, no affiliate links. Just what works and when.
          </p>
        </section>

        <div className="divider" />

        <section style={{ padding: "60px 0 80px", display: "flex", flexDirection: "column", gap: 2 }}>
          {comparisons.map((c) => (
            c.live ? (
              <Link key={c.slug} href={`/compare/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--gold)", background: "var(--gold-bg)", border: "1px solid var(--gold-border)", padding: "3px 9px", borderRadius: 9999 }}>● LIVE</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)" }}>{c.date} · {c.readTime} read</span>
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", marginBottom: 12 }}>{c.subtitle}</div>
                    <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 620, marginBottom: 16 }}>{c.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {c.tags.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 9999 }}>{t}</span>)}
                    </div>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "var(--gold)", whiteSpace: "nowrap" }}>Read →</span>
                </div>
              </Link>
            ) : (
              <div key={c.slug} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", opacity: 0.5 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: 9999 }}>SOON</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)" }}>{c.date} · {c.readTime} read</span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>{c.subtitle}</div>
                  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 620 }}>{c.desc}</p>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", whiteSpace: "nowrap" }}>Coming soon</span>
              </div>
            )
          ))}
        </section>

      </main>
      <Footer />
    </>
  );
}
