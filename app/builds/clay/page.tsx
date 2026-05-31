"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import { motion } from "framer-motion";
import Link from "next/link";

const templates = [
  {
    id: "hiring-icp",
    name: "Find Companies Hiring Your ICP",
    desc: "Companies actively hiring for GTM roles have budget, intent, and a scaling team. This table finds them using live LinkedIn job data, enriches the right contact, and feeds them into your outreach sequence automatically.",
    tags: ["LinkedIn Jobs", "Lead Sourcing", "Signal-Based"],
    href: "https://app.clay.com/shared-table/share%5F8ZgobfBJuP5e",
  },
  {
    id: "account-score",
    name: "Build Account List and Score from Tech and Firmographic Data",
    desc: "Paste your ICP criteria. The table pulls matching companies, enriches each with tech stack, headcount, and funding data, then scores them 1 to 10. No more guessing who to go after first.",
    tags: ["ICP Scoring", "Technographics", "Firmographics", "Account Lists"],
    href: "https://app.clay.com/shared-table/share%5FDmTWzkMgiXpU",
  },
  {
    id: "decision-makers",
    name: "Find Decision Makers from Just a Website URL",
    desc: "Paste a list of domains. Get back the name, title, LinkedIn, and email of the person you actually need to talk to. Waterfall enrichment across multiple providers so you get coverage even on harder contacts.",
    tags: ["Contact Finding", "Waterfall Enrichment", "Email", "LinkedIn"],
    href: "https://app.clay.com/shared-table/share%5Fx6FoeEJVNMdR",
  },
  {
    id: "lead-scoring",
    name: "Score Leads Based on Multiple Signals",
    desc: "Takes a messy lead list and runs each one through a multi-signal scoring model. Company size, funding stage, tech stack, hiring activity. Output is a clean ranked list sorted by ICP fit.",
    tags: ["Lead Scoring", "Multi-Signal", "Prioritisation"],
    href: "https://app.clay.com/shared-table/share%5FPI2cSCbHoDHa",
  },
  {
    id: "inbound-enrich",
    name: "Enrich Inbound Leads and Write Personalised Emails",
    desc: "When a lead comes in, this enriches them with company data, finds what they actually care about, and generates a first email that references something real. Not a template. An actual personalised message.",
    tags: ["Inbound", "Enrichment", "AI Email", "Personalisation"],
    href: "https://app.clay.com/shared-table/share%5FKId7qqyJ5JuL",
  },
  {
    id: "viral-heyreach",
    name: "Scrape Viral Posts, Qualify, Push to HeyReach",
    desc: "Find a viral LinkedIn post in your niche. This scrapes the comments, qualifies each commenter against your ICP, and pushes the ones that fit directly into a HeyReach sequence. Intent-based sourcing from people already engaged.",
    tags: ["LinkedIn", "HeyReach", "Intent-Based", "Comment Scraping"],
    href: "https://app.clay.com/shared-table/share%5FpQ4RF2dH2uau",
  },
  {
    id: "buying-signals",
    name: "Track Funding, New Locations, Acquisitions via RSS",
    desc: "Set it up once. It checks RSS feeds for funding announcements, new office openings, and acquisitions in your target market. Buying signals delivered before your competitors see them.",
    tags: ["Buying Signals", "RSS", "Funding", "Acquisitions"],
    href: "https://app.clay.com/shared-table/share%5FRxafj8Hearlt",
  },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const tag = (t: string) => (
  <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 9999 }}>{t}</span>
);

export default function ClayPage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Back */}
        <div style={{ paddingTop: 48 }}>
          <Link href="/builds" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.04em" }}>
            ← back to builds
          </Link>
        </div>

        {/* Header */}
        <section style={{ padding: "40px 0 60px" }}>
          <div className="section-label">clay templates</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            7 tables. <G>Copy and run.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 15, color: "var(--text-muted)", maxWidth: 540, lineHeight: 1.8, marginBottom: 24 }}>
            Clay tables I use for GTM enrichment, ICP scoring, and signal-based outreach. Click any template to open it in Clay and copy it to your workspace.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 16px", display: "inline-block" }}>
            // Click template → Open in Clay → Copy to workspace → Tweak and run
          </div>
        </section>

        <div className="divider" />

        {/* Templates */}
        <section style={{ padding: "60px 0 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {templates.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "26px 28px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}
              >
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 8 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 10 }}>
                    {t.name}
                  </div>
                  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 14, maxWidth: 680 }}>
                    {t.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {t.tags.map(tag)}
                  </div>
                </div>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: "10px 20px", background: "var(--gold)", color: "var(--bg)", textDecoration: "none", borderRadius: 8, fontWeight: 600, letterSpacing: "0.02em", textAlign: "center", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Open in Clay ↗
                </a>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
