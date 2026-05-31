import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Rishiraj Paul",
  description: "Real results from GTM systems built in production. Pipeline generated, hours saved, reply rates improved.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const placeholders = [
  {
    title: "AI Call Transcription for B2B SaaS",
    category: "CRM Automation",
    desc: "Automated HubSpot call polling, Deepgram transcription, GPT-4o BANT extraction, and deal enrichment. Every call insight pushed back to the deal record without a human touching it.",
    stack: ["FastAPI", "Deepgram", "GPT-4o", "HubSpot", "Railway"],
    metrics: ["Hours saved per week", "Calls processed", "BANT accuracy"],
  },
  {
    title: "Outbound Enrichment Pipeline for GTM Agency",
    category: "Lead Enrichment",
    desc: "Three-table Clay pipeline detecting target accounts using live signals, waterfall enrichment across four providers, AI-generated openers, and direct push to HeyReach sequences.",
    stack: ["Clay", "HeyReach", "n8n", "Apollo", "OpenAI"],
    metrics: ["Reply rate lift", "Leads enriched", "Hours of prospecting replaced"],
  },
  {
    title: "Sales Reporting Infrastructure for 50+ Reps",
    category: "Sales Operations",
    desc: "Replaced ad-hoc spreadsheets with a repeatable reporting system across multiple territories. Pipeline visibility, territory analysis, and monthly performance tracking for leadership.",
    stack: ["HubSpot", "Google Sheets", "n8n", "Zapier"],
    metrics: ["Reps covered", "Reporting time saved per week", "Territories tracked"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        <section style={{ padding: "80px 0 60px" }}>
          <div className="section-label">case studies</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 20, color: "var(--text)" }}>
            Real systems.<br /><G>Real results.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8, marginBottom: 16 }}>
            Numbers take time to collect properly. These case studies are being documented and will be published with real metrics in the coming months.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", background: "var(--gold-bg)", border: "1px solid var(--gold-border)", padding: "8px 16px", borderRadius: 9999 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            Metrics being tracked. Back in 3 months with real numbers.
          </div>
        </section>

        <div className="divider" />

        <section style={{ padding: "60px 0 80px", display: "flex", flexDirection: "column", gap: 2 }}>
          {placeholders.map((c, i) => (
            <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "32px 28px", opacity: 0.75 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{c.category}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>{c.title}</div>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", background: "var(--surface)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999, flexShrink: 0 }}>
                  METRICS PENDING
                </span>
              </div>

              <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 680, marginBottom: 20 }}>
                {c.desc}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {c.metrics.map((m, j) => (
                  <div key={j} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-dim)", marginBottom: 4 }}>—</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", lineHeight: 1.4 }}>{m}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {c.stack.map(t => (
                  <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 9999 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

      </main>
      <Footer />
    </>
  );
}
