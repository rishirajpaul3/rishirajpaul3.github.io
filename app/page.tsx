import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StoryCards from "@/components/StoryCards";
import RepoGrid from "@/components/RepoGrid";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";

const projects = [
  { name: "SaravaSales Notetaker", desc: "AI sales co-pilot — polls HubSpot for new calls, transcribes with Deepgram, extracts BANT with GPT-4o, and pushes insights back to deals. Full React dashboard. Runs 24/7 on Railway.", stack: ["FastAPI","React","Deepgram","GPT-4o","HubSpot","Railway"], href: "https://github.com/rishirajpaul3" },
  { name: "Pipeline AI", desc: "Paste a prospect CSV and get a full outreach pipeline: AI lead scoring, deep research, personalised email drafts, and discovery call scripts — with human review gates.", stack: ["Python","GPT-4o","Claude","n8n","HubSpot"], href: "https://github.com/rishirajpaul3/pipeline-ai" },
  { name: "DeepAccount", desc: "B2B account intelligence in seconds. Paste a URL and your ICP, get back a fit score, buyer profiles, key objections, and a cold opener from live web data.", stack: ["Python","GPT-4o","Web scraping","React"], href: "https://github.com/rishirajpaul3/deepaccount" },
  { name: "OutreachOS", desc: "Unified outbound dashboard consolidating Smartlead email and HeyReach LinkedIn in one view. AI insights surface what's working and what's stalling.", stack: ["React","Smartlead API","HeyReach API","GPT-4o"], href: "https://github.com/rishirajpaul3/outreachos-app" },
];

const services = [
  { n:"01", title:"Outbound Infrastructure", desc:"Full cold outreach stack — ICP targeting, inbox setup, deliverability, sequencing, and reply handling. Ran this with 50+ reps. I know what breaks.", stack:["Clay","Instantly","Smartlead","Apollo","HeyReach"] },
  { n:"02", title:"Lead Enrichment Pipelines", desc:"Multi-waterfall enrichment combining Clay, Apollo, Hunter.io, and GPT-4o into one automated flow. Verified contacts with AI-generated first lines.", stack:["Clay","Hunter.io","Clearbit","GPT-4o","n8n"] },
  { n:"03", title:"CRM Operations & Automation", desc:"HubSpot setup, lead routing, deal enforcement, stale alerts, and AI call transcription with BANT extraction directly into deal records.", stack:["HubSpot","n8n","Zapier","Deepgram","GPT-4o"] },
  { n:"04", title:"GTM Signal Monitoring", desc:"Automated buying-signal tracking — hiring surges, funding events, job changes — piped into your CRM so your team acts before a competitor even replies.", stack:["Clay","n8n","HubSpot","Webhook APIs"] },
];

const G = ({ children }: { children: React.ReactNode }) => <span style={{ color: "var(--gold)" }}>{children}</span>;

const tag = (t: string) => (
  <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-muted)", background:"var(--surface)", border:"1px solid var(--border)", padding:"3px 10px", borderRadius:9999 }}>{t}</span>
);

export default function Home() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px" }}>

        <Hero />
        <StoryCards />

        {/* Projects */}
        <div className="divider" style={{ margin:"60px 0 0" }} />
        <section id="projects" style={{ padding:"80px 0" }}>
          <div className="section-label">deployed</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:40, color:"var(--text)" }}>
            Production systems <G>running right now.</G>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {projects.map((p,i) => (
              <div key={i} style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:14, padding:"28px 26px", display:"flex", flexDirection:"column" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-dim)", letterSpacing:"0.12em", marginBottom:12 }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:600, color:"var(--text)", letterSpacing:"-0.01em" }}>{p.name}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"var(--gold)", background:"var(--gold-bg)", border:"1px solid var(--gold-border)", padding:"3px 9px", borderRadius:9999, flexShrink:0, display:"flex", alignItems:"center", gap:5 }}>● live</span>
                </div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)", lineHeight:1.75, flex:1, marginBottom:18 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>{p.stack.map(tag)}</div>
                <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--gold)", textDecoration:"none" }}>view on github ↗</a>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub */}
        <div className="divider" />
        <section style={{ padding:"80px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:24 }}>
            <div>
              <div className="section-label">open source</div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", margin:0 }}>
                Latest from <G>GitHub</G>
              </h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--gold)", background:"var(--gold-bg)", border:"1px solid var(--gold-border)", padding:"5px 12px", borderRadius:9999, display:"flex", alignItems:"center", gap:6 }}>● live</span>
              <a href="https://github.com/rishirajpaul3" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--text-dim)", textDecoration:"none" }}>github.com/rishirajpaul3 ↗</a>
            </div>
          </div>
          <RepoGrid />
        </section>

        {/* Services */}
        <div className="divider" />
        <section id="services" style={{ padding:"80px 0" }}>
          <div className="section-label">services</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", marginBottom:40 }}>
            What I build <G>for you.</G>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {services.map((s,i) => (
              <div key={i} style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:14, padding:"28px 26px" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-dim)", letterSpacing:"0.12em", marginBottom:14 }}>{s.n}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:600, color:"var(--text)", marginBottom:10, letterSpacing:"-0.01em" }}>{s.title}</div>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)", lineHeight:1.75, marginBottom:18 }}>{s.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{s.stack.map(tag)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <div className="divider" />
        <section id="contact" style={{ padding:"80px 0" }}>
          <div className="section-label">contact</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64 }}>
            <div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", marginBottom:16 }}>Let&apos;s build <G>something.</G></h2>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, color:"var(--text-muted)", lineHeight:1.85, marginBottom:28 }}>
                Open to freelance GTM projects, consulting, and full-time roles in the UK. If you need revenue infrastructure that actually ships — reach out.
              </p>
              {[
                { icon:"@",  label:"Email",    val:"rishirajpaul3@gmail.com",       href:"mailto:rishirajpaul3@gmail.com" },
                { icon:"in", label:"LinkedIn", val:"linkedin.com/in/rishiraj-paul",  href:"https://linkedin.com/in/rishiraj-paul" },
                { icon:"gh", label:"GitHub",   val:"github.com/rishirajpaul3",       href:"https://github.com/rishirajpaul3" },
                { icon:"UK", label:"Phone",    val:"+44 7587 260808",                href:"tel:+447587260808" },
              ].map(c => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:14, textDecoration:"none", color:"var(--text)", fontSize:13, padding:"12px 16px", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:8, marginBottom:8 }}
                >
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--gold)", width:28, textAlign:"center" }}>{c.icon}</span>
                  <div><span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-dim)", display:"block", marginBottom:1 }}>{c.label}</span>{c.val}</div>
                </a>
              ))}
            </div>
            <form action="https://formspree.io/f/mlgvkeja" method="POST" style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[{name:"name",label:"NAME",type:"text",ph:"Your name",req:true},{name:"company",label:"COMPANY",type:"text",ph:"Your company",req:false},{name:"email",label:"EMAIL",type:"email",ph:"your@company.com",req:true}].map(f=>(
                <div key={f.name} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.1em", color:"var(--text-dim)" }}>{f.label}</label>
                  <input type={f.type} name={f.name} placeholder={f.ph} required={f.req} />
                </div>
              ))}
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.1em", color:"var(--text-dim)" }}>WHAT DO YOU NEED?</label>
                <textarea name="message" placeholder="Tell me about your GTM challenge..." required style={{ minHeight:110, resize:"vertical" }} />
              </div>
              <button type="submit" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"12px 24px", background:"var(--gold)", color:"var(--bg)", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer" }}>Send message</button>
            </form>
          </div>
        </section>

        {/* Subscribe */}
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:60, paddingBottom:80, display:"flex", justifyContent:"space-between", alignItems:"center", gap:40, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:600, color:"var(--text)", marginBottom:6 }}>// follow the build</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)" }}>GTM systems, AI tools, and what I&apos;m shipping — no noise.</div>
          </div>
          <form action="https://formspree.io/f/mlgvkeja" method="POST" style={{ display:"flex", gap:8 }}>
            <input type="email" name="email" placeholder="your@email.com" required style={{ width:220, borderRadius:8 }} />
            <button type="submit" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"11px 22px", background:"var(--gold)", color:"var(--bg)", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>Subscribe</button>
          </form>
        </div>

      </main>
      <Footer />
    </>
  );
}
