import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Rishiraj Paul",
  description: "Sales ops to AI builder. Not through a CS degree. Through years of watching broken GTM systems and eventually deciding to just fix them myself.",
};

const timeline = [
  {
    year: "Jan 2023 – Aug 2023",
    role: "Sales & CRM Coordinator, Anhad Pharma",
    body: "My first real ops role. Managed monthly sales and marketing reporting for a team of 10 reps, moved them off manual spreadsheets onto structured dashboards, and led the team to roll out a new CRM process. Got a feel for how broken most sales infrastructure actually is.",
  },
  {
    year: "Sep 2023 – May 2024",
    role: "Sales Operations, Rose Pharmaco",
    body: "Stepped up to a bigger scope. Managed the reporting infrastructure for 50+ reps across territories, closed a commercial partnership with Roche Diabetic Care as the sole liaison for North-East India, and won 4 tenders by building a proper pricing and sourcing workflow. Also launched a full product line from scratch. That was the year I really understood GTM from the inside.",
  },
  {
    year: "2024 – 2025",
    role: "MSc Entrepreneurship & Innovation, QMUL London",
    body: "Moved to London. Studied at Queen Mary University. First Class. The frameworks were useful but the real shift happened just by being around people who were building things. Something clicked.",
  },
  {
    year: "Dec 2025 – Now",
    role: "GTM Engineer, Building",
    body: "First pipelines, then production apps. FastAPI backends, React dashboards, AI integrations running on real deal pipelines. Spoke at GTM Daily Office Hours. Building in public.",
  },
];

const stack = [
  { category: "Core Stack",       items: ["Clay", "Instantly", "HubSpot", "n8n", "Claude Code"] },
  { category: "Outbound",         items: ["Instantly", "Smartlead", "Apollo", "HeyReach"] },
  { category: "Enrichment & Data",items: ["Clay", "Apollo"] },
  { category: "Automation",       items: ["Zapier", "n8n"] },
  { category: "CRM",              items: ["GoHighLevel", "HubSpot", "Salesforce"] },
  { category: "Data",             items: ["SQL", "SQLite", "Python", "JavaScript"] },
  { category: "AI & APIs",        items: ["REST APIs", "Webhooks", "Postman", "Claude Code", "LLM Prompting"] },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

export default function AboutPage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <section style={{ padding: "80px 0 60px" }}>
          <div className="section-label">about</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 24, color: "var(--text)" }}>
            The long way round<br />to <G>building.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 580, lineHeight: 1.8 }}>
            Sales ops to AI builder. Not through a CS degree. Through years of watching broken GTM systems and eventually deciding to just fix them myself.
          </p>
        </section>

        <div className="divider" />

        {/* Story + Stack */}
        <section style={{ padding: "72px 0", display: "grid", gridTemplateColumns: "1fr 400px", gap: 80, alignItems: "start" }}>
          <div>
            <div className="section-label">the story</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.9 }}>
              <p>
                I spent two years in sales operations, first at Anhad Pharma and then at Rose Pharmaco in Mumbai.
                Managing reporting for <strong style={{ color: "var(--text)" }}>50+ reps</strong>, building pricing workflows,
                closing a commercial deal with Roche Diabetic Care, launching a product line from scratch.
              </p>
              <p>
                The work was real. The tools weren&apos;t. We ran campaigns off spreadsheets. Leads fell through.
                Follow-ups got missed. I kept building workarounds and kept thinking someone should just fix this properly.
              </p>
              <p>
                Then I moved to London for my MSc. Something changed there. Everyone around me was just building things.
                Not waiting for permission or a bigger team. Just figuring it out and shipping it.
              </p>
              <p>
                I wanted that. I wanted to use AI to help companies actually grow revenue.
                Not talk about it. Build it.
              </p>
              <p>
                That&apos;s what I&apos;ve been doing since.
              </p>
            </div>

            {/* Credentials */}
            <div style={{ marginTop: 40, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "MSc QMUL London · First Class", highlight: false },
                { label: "UK Work Visa", highlight: false },
                { label: "GTM Daily Speaker", highlight: false },
                { label: "Open to Work", highlight: true },
                { label: "50+ Reps Managed", highlight: false },
                { label: "7 Systems Shipped", highlight: false },
              ].map(b => (
                <span key={b.label} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: b.highlight ? "var(--gold)" : "var(--text-muted)",
                  background: b.highlight ? "var(--gold-bg)" : "var(--surface-2)",
                  border: `1px solid ${b.highlight ? "var(--gold-border)" : "var(--border)"}`,
                  padding: "5px 13px",
                  borderRadius: 9999,
                  letterSpacing: "0.04em",
                }}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Stack panel */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>// stack</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {stack.map(s => (
                <div key={s.category} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "14px 18px" }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{s.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.items.map(t => (
                      <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: 9999 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Timeline */}
        <section style={{ padding: "72px 0" }}>
          <div className="section-label">timeline</div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 40 }}>
            Every step that <G>led here.</G>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "28px 32px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, alignItems: "start" }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 6 }}>{t.year}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{t.role}</div>
                </div>
                <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.85 }}>{t.body}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* What drives me + Outside work */}
        <section style={{ padding: "72px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <div className="section-label">what drives me</div>
            <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 16 }}>
              Exploring random ideas and shipping them fast. Learning something and immediately finding a use for it.
              I get genuinely bored if I&apos;m not building something.
            </p>
            <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.9 }}>
              Right now I just want to get my hands dirty on something great.
            </p>
          </div>
          <div>
            <div className="section-label">outside work</div>
            <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.9 }}>
              I box. Read a lot. Spend time with my friends and go out when I can. And I cook. Maybe.
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* CTA */}
        <section style={{ padding: "72px 0 80px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 14 }}>
            Want to build something <G>together?</G>
          </h2>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 15, color: "var(--text-muted)", marginBottom: 32 }}>
            Open to freelance projects, consulting, and full-time GTM engineering roles in the UK.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "12px 28px", background: "var(--gold)", color: "var(--bg)", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
              Get in touch
            </a>
            <a href="/projects" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "12px 28px", background: "transparent", color: "var(--text-muted)", textDecoration: "none", borderRadius: 8, border: "1px solid var(--border)" }}>
              See what I have built
            </a>
            <a href="https://app.notion.com/p/Rishiraj-Paul-GTM-E-Portfolio-32e4fc4568a980df833eea7faf5a6087" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "12px 28px", background: "transparent", color: "var(--gold)", textDecoration: "none", borderRadius: 8, border: "1px solid var(--gold-border)" }}>
              GTM portfolio ↗
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
