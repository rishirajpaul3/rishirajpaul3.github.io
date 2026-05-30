import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "From pharma sales and 50+ reps in East India to building AI GTM systems in London.",
};

const timeline = [
  {
    year: "2015–2018",
    role: "Commercial Sales · East India",
    body: "Started on the ground — building distribution networks and commercial partnerships across East India. Learned how revenue actually moves: through people, relationships, and process. Not through dashboards.",
  },
  {
    year: "2018–2022",
    role: "Sales Operations · 50+ Reps",
    body: "Moved into managing sales teams at scale. 50+ reps, inbound and outbound, across multiple territories. Watched every broken CRM workflow, every missed follow-up, every lead that fell through the cracks. Built workarounds in spreadsheets. Hated it.",
  },
  {
    year: "2022–2023",
    role: "MSc Entrepreneurship & Innovation · QMUL London",
    body: "Moved to London. Studied at Queen Mary University. The MSc gave me the frameworks — but the real shift was deciding to stop waiting for engineers to fix the tools and just learning to build them myself.",
  },
  {
    year: "2023–2024",
    role: "First Systems · n8n + APIs",
    body: "First pipelines: n8n workflows, Apollo enrichment, HubSpot integrations. Rough but functional. Started freelancing. Realised I could ship things clients actually used. Got faster.",
  },
  {
    year: "2024–now",
    role: "GTM Engineer · Production AI Systems",
    body: "FastAPI backends on Railway. React dashboards. Deepgram transcription. GPT-4o extraction. Real HubSpot integrations on real deal pipelines. Invited to speak at GTM Daily Office Hours. Building in public.",
  },
];

const stack = [
  { category: "Backend",        items: ["FastAPI", "Python", "PostgreSQL", "Railway"] },
  { category: "Frontend",       items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { category: "AI",             items: ["GPT-4o", "Claude", "Deepgram", "Whisper"] },
  { category: "GTM Tools",      items: ["HubSpot", "Clay", "Apollo", "Instantly", "Smartlead", "HeyReach"] },
  { category: "Automation",     items: ["n8n", "Make", "Zapier", "Webhook APIs"] },
  { category: "Enrichment",     items: ["Hunter.io", "Clearbit", "ZoomInfo", "Seamless.ai"] },
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
            The long way round<br />to <G>building systems.</G>
          </h1>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.85 }}>
            I&apos;m a GTM Engineer with a background in sales operations and commercial partnerships.
            I got here the unconventional way — not through a CS degree, but through years on the
            ops floor watching every broken GTM tool fail in real time.
          </p>
        </section>

        <div className="divider" />

        {/* The story */}
        <section style={{ padding: "72px 0", display: "grid", gridTemplateColumns: "1fr 420px", gap: 80, alignItems: "start" }}>
          <div>
            <div className="section-label">the story</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9 }}>
              <p>
                I spent years on the ops floor — managing <strong style={{ color: "var(--text)" }}>50+ sales reps</strong> across East India,
                building commercial distribution networks from scratch, watching every broken CRM
                workflow, every missed follow-up, every lead that fell through the cracks because
                nobody had time to fix the systems.
              </p>
              <p>
                I knew the process better than anyone. I just couldn&apos;t fix the tools. So I
                built workarounds in spreadsheets. Hated it.
              </p>
              <p>
                In 2022 I moved to London, got an <strong style={{ color: "var(--text)" }}>MSc in Entrepreneurship &amp; Innovation</strong> from
                Queen Mary University, and made a decision: stop waiting for engineers to fix the
                infrastructure and learn to build it myself.
              </p>
              <p>
                Not to become a developer. To fix the <strong style={{ color: "var(--text)" }}>job the code was supposed to do</strong>.
              </p>
              <p>
                That background is the difference. Most GTM engineers know the code. I know
                what it feels like when it breaks — at 9pm, mid-campaign, with a team of 50
                waiting on a lead list that never arrived.
              </p>
              <p>
                Now I build AI-powered GTM systems that run in production: outbound pipelines,
                CRM automation, AI call transcription, lead enrichment stacks. Things that
                actually ship and actually work.
              </p>
            </div>

            {/* Credentials */}
            <div style={{ marginTop: 40, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                "MSc QMUL London",
                "UK Work Visa",
                "GTM Daily Speaker",
                "Open to Work",
                "50+ Reps Managed",
                "4 Deployed Apps",
              ].map(b => (
                <span key={b} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: b === "Open to Work" ? "var(--gold)" : "var(--text-muted)", background: b === "Open to Work" ? "var(--gold-bg)" : "var(--surface-2)", border: `1px solid ${b === "Open to Work" ? "var(--gold-border)" : "var(--border)"}`, padding: "5px 13px", borderRadius: 9999, letterSpacing: "0.04em" }}>
                  {b}
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
              <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "28px 32px", display: "grid", gridTemplateColumns: "180px 1fr", gap: 40, alignItems: "start" }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 6 }}>{t.year}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{t.role}</div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8 }}>{t.body}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* CTA */}
        <section style={{ padding: "72px 0 80px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", marginBottom: 14 }}>
            Want to build something <G>together?</G>
          </h2>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}>
            Open to freelance projects, consulting, and full-time GTM engineering roles in the UK.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "12px 28px", background: "var(--gold)", color: "var(--bg)", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
              Get in touch →
            </a>
            <a href="/blog" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: "12px 28px", background: "transparent", color: "var(--text-muted)", textDecoration: "none", borderRadius: 8, border: "1px solid var(--border)" }}>
              Read the build log
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
