"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import RepoGrid from "@/components/RepoGrid";
import { motion } from "framer-motion";

const deployed = [
  {
    name: "SaravaSales Notetaker",
    desc: "AI sales co-pilot that polls HubSpot every 5 minutes, transcribes calls with Deepgram, extracts BANT with GPT-4o, and pushes structured insights back to deals automatically. Full React dashboard for review.",
    stack: ["FastAPI","React","Deepgram","GPT-4o","HubSpot","PostgreSQL","Railway"],
    href: "https://github.com/rishirajpaul3",
    status: "live",
  },
  {
    name: "Pipeline AI",
    desc: "Paste a prospect CSV and get a full outreach pipeline: AI lead scoring, deep company research, personalised email drafts, and discovery call scripts — all with human review gates before anything sends.",
    stack: ["Python","GPT-4o","Claude","n8n","HubSpot"],
    href: "https://github.com/rishirajpaul3/pipeline-ai",
    status: "live",
  },
  {
    name: "DeepAccount",
    desc: "B2B account intelligence in seconds. Paste a company URL and your ICP criteria, get back a fit score, buyer personas, key objections, and a personalised cold opener — all generated from live web data.",
    stack: ["Python","GPT-4o","Web scraping","React","TypeScript"],
    href: "https://github.com/rishirajpaul3/deepaccount",
    status: "live",
  },
  {
    name: "OutreachOS",
    desc: "Unified outbound dashboard consolidating Smartlead email and HeyReach LinkedIn campaigns in one place. AI insights surface what's working, what's stalling, and what to fix next.",
    stack: ["React","TypeScript","Smartlead API","HeyReach API","GPT-4o"],
    href: "https://github.com/rishirajpaul3/outreachos-app",
    status: "live",
  },
];

const tools = [
  {
    name: "GTM Job Hunter",
    desc: "Finds hidden GTM engineering and RevOps roles not listed on LinkedIn — searches Greenhouse, Lever, Ashby, Wellfound, Otta, and Himalayas simultaneously.",
    stack: ["Python","Multi-source scraping"],
    href: "https://github.com/rishirajpaul3/gtm-job-hunter",
    status: "open source",
  },
  {
    name: "GTM Daily Digest",
    desc: "Daily GTM intelligence powered by Claude AI — top signal from Reddit and HackerNews delivered for GTM engineers. Automated pipeline.",
    stack: ["Claude","n8n","Reddit API","HN API"],
    href: "https://github.com/rishirajpaul3/gtm-daily",
    status: "open source",
  },
  {
    name: "raj-prachi",
    desc: "AI hiring platform — two agents (one for job seekers, one for employers) that make introductions when both sides match on criteria.",
    stack: ["Python","Claude","FastAPI"],
    href: "https://github.com/rishirajpaul3/raj-prachi",
    status: "open source",
  },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const tag = (t: string) => (
  <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-muted)", background:"var(--surface)", border:"1px solid var(--border)", padding:"3px 10px", borderRadius:9999 }}>{t}</span>
);

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <section style={{ padding: "80px 0 60px" }}>
          <div className="section-label">projects</div>
          <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px,6vw,72px)", fontWeight:700, letterSpacing:"-0.035em", lineHeight:1.06, marginBottom:20, color:"var(--text)" }}>
            Systems I&apos;ve built.<br /><G>Open source. In production.</G>
          </h1>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:15, color:"var(--text-muted)", maxWidth:580, lineHeight:1.8 }}>
            4 deployed AI applications running in production + open source GTM tools.
            Everything is on GitHub.
          </p>

          {/* Quick stats */}
          <div style={{ display:"flex", gap:24, marginTop:32, flexWrap:"wrap" }}>
            {[
              { val:"4", label:"deployed apps" },
              { val:"11+", label:"public repos" },
              { val:"100%", label:"open source" },
              { val:"3", label:"languages" },
            ].map(s => (
              <div key={s.label} style={{ display:"flex", flexDirection:"column" }}>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:28, fontWeight:700, color:"var(--gold)", letterSpacing:"-0.02em" }}>{s.val}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-dim)", letterSpacing:"0.06em" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Deployed */}
        <section style={{ padding:"72px 0" }}>
          <div className="section-label">deployed</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(24px,3vw,36px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", marginBottom:32 }}>
            Running in production <G>right now.</G>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {deployed.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.4, delay:i*0.08 }}
                style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:14, padding:"28px 26px", display:"flex", flexDirection:"column" }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:600, color:"var(--text)", letterSpacing:"-0.01em" }}>{p.name}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"var(--gold)", background:"var(--gold-bg)", border:"1px solid var(--gold-border)", padding:"3px 9px", borderRadius:9999, display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>● {p.status}</span>
                </div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)", lineHeight:1.75, flex:1, marginBottom:18 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>{p.stack.map(tag)}</div>
                <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--gold)", textDecoration:"none" }}>view on github ↗</a>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Open source tools */}
        <section style={{ padding:"72px 0" }}>
          <div className="section-label">open source tools</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(24px,3vw,36px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", marginBottom:32 }}>
            GTM tools I&apos;ve <G>released publicly.</G>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12 }}>
            {tools.map((p, i) => (
              <motion.a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.4, delay:i*0.08 }}
                style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:14, padding:"22px", display:"flex", flexDirection:"column", textDecoration:"none", color:"inherit" }}
                whileHover={{ borderColor:"var(--border-2)" }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, fontWeight:600, color:"var(--text)", letterSpacing:"-0.01em" }}>{p.name}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#9b8afb", background:"rgba(155,138,251,0.1)", border:"1px solid rgba(155,138,251,0.25)", padding:"2px 8px", borderRadius:9999, flexShrink:0 }}>{p.status}</span>
                </div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--text-muted)", lineHeight:1.7, flex:1, marginBottom:14 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>{p.stack.map(tag)}</div>
              </motion.a>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* All GitHub repos live */}
        <section style={{ padding:"72px 0 80px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
            <div>
              <div className="section-label">all repos</div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(24px,3vw,36px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", margin:0 }}>
                Everything on <G>GitHub</G>
              </h2>
            </div>
            <a href="https://github.com/rishirajpaul3" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--text-dim)", textDecoration:"none" }}>
              github.com/rishirajpaul3 ↗
            </a>
          </div>
          <RepoGrid />
        </section>

      </main>
      <Footer />
    </>
  );
}
