import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Log — Rishiraj Paul",
  description: "Weekly proof of work. What I shipped, what I learned, what broke.",
};

type Week = {
  week: string;
  date: string;
  shipped: string[];
  learned: string;
  status: "active" | "done";
};

const log: Week[] = [
  {
    week: "W22 2026",
    date: "May 26 – Jun 1",
    status: "active",
    shipped: [
      "Built AI Prompt Library — 15 GTM prompts across 5 categories, copy-to-clipboard, expandable cards",
      "Automated Beehiiv newsletter sync script (fetch-posts.js, wired into build)",
      "Renamed /knowledge to /glossary across site and nav",
      "Rewrote About page story section — less CV, more narrative",
      "Fixed blog page Beehiiv subscribe form pointing to wrong URL",
      "Launched /builds/ai-prompts — removed 'coming soon' status",
    ],
    learned: "Shawn's site wins because of obsessive specificity and daily proof of work — not design. Numbers beat aesthetics every time.",
  },
  {
    week: "W21 2026",
    date: "May 19 – May 25",
    status: "done",
    shipped: [
      "Built 6 compare pages (Clay vs Apollo, HeyReach vs Expandi, Zapier vs n8n vs Make, Instantly vs Smartlead, HubSpot vs GoHighLevel, Apollo vs LinkedIn Sales Nav)",
      "Launched /builds/clay — 7 Clay table templates with descriptions and stack tags",
      "Launched /builds/n8n — 8 n8n workflow JSONs, all downloadable",
      "Built /projects page with deployed apps and open source tools",
      "Set up Formspree on contact form and Beehiiv on subscribe form",
      "Created Beehiiv newsletter — build-logrishiraj.beehiiv.com",
    ],
    learned: "Compare pages are the fastest SEO play for a GTM site — high intent, low competition, easy to write if you actually use the tools.",
  },
  {
    week: "W20 2026",
    date: "May 12 – May 18",
    status: "done",
    shipped: [
      "Complete site rebuild in Next.js 15 + TypeScript + Framer Motion",
      "Built /glossary — 47 GTM terms with search + category filters",
      "Built /blog with live feed (LinkedIn, GitHub, newsletter tabs)",
      "Built /about with timeline, stack panel, credentials",
      "Added mobile nav, dark header, announcement bar",
      "OG image and sitemap live",
    ],
    learned: "Next.js App Router is fast to work with once you stop fighting it. framer-motion viewport animations add a lot for minimal effort.",
  },
  {
    week: "W18–19 2026",
    date: "Apr 28 – May 11",
    status: "done",
    shipped: [
      "SaravaSales Notetaker: migrated SQLite to PostgreSQL on Railway",
      "Added ffmpeg to nixpacks config for large recording transcription (>24MB)",
      "Fixed n8n webhook — skip when primary_pain is empty to stop blank Notion rows",
      "Added call summary fallback to n8n when BANT fields are sparse",
      "Removed hs_call_body garbage transcript fallback in HubSpot router",
    ],
    learned: "SQLite works fine locally but breaks the moment you have concurrent writes from a background poller. Postgres was overdue.",
  },
  {
    week: "W16–17 2026",
    date: "Apr 14 – Apr 27",
    status: "done",
    shipped: [
      "Built OutreachOS — unified dashboard for Smartlead + HeyReach campaigns",
      "DeepAccount v1 — paste a URL, get ICP fit score, buyer personas, cold opener",
      "Pipeline AI — paste CSV, get AI lead scores + personalised email drafts",
      "Spoke at GTM Daily Office Hours — Claude Code for GTM engineers",
    ],
    learned: "Building three tools in two weeks is possible when you reuse the same FastAPI + React pattern. The hard part is always the prompt, not the plumbing.",
  },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

export default function LogPage() {
  const totalShipped = log.reduce((sum, w) => sum + w.shipped.length, 0);
  const weeksActive = log.length;

  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <section style={{ padding: "80px 0 60px" }}>
          <div className="section-label">build log</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 20, color: "var(--text)" }}>
            Weekly proof<br />of <G>work.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8, marginBottom: 32 }}>
            What I shipped each week, what I learned, and what broke. No polish. Updated every Sunday.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {[
              { label: "weeks tracked", value: weeksActive },
              { label: "things shipped", value: totalShipped },
              { label: "updated", value: "weekly" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 24px", minWidth: 120 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Log entries */}
        <section style={{ padding: "60px 0 80px", display: "flex", flexDirection: "column", gap: 2 }}>
          {log.map((w, i) => (
            <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 32px" }}>

              {/* Week header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{w.week}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>{w.date}</span>
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  padding: "3px 10px",
                  borderRadius: 9999,
                  color: w.status === "active" ? "var(--gold)" : "var(--text-dim)",
                  background: w.status === "active" ? "var(--gold-bg)" : "var(--surface)",
                  border: `1px solid ${w.status === "active" ? "var(--gold-border)" : "var(--border)"}`,
                }}>
                  {w.status === "active" ? "● IN PROGRESS" : "✓ DONE"}
                </span>
              </div>

              {/* Shipped */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", marginBottom: 12 }}>// shipped</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {w.shipped.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", marginTop: 3, flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learned */}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", marginBottom: 8 }}>// learned</div>
                <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
                  {w.learned}
                </p>
              </div>

            </div>
          ))}
        </section>

      </main>
      <Footer />
    </>
  );
}
