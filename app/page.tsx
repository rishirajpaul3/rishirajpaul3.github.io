import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StoryCards from "@/components/StoryCards";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";

const services = [
  { n:"01", title:"Outbound Infrastructure", desc:"Full cold outreach stack. ICP targeting, inbox setup, deliverability, sequencing, and reply handling. Ran this with 50+ reps. I know what breaks.", stack:["Clay","Instantly","Smartlead","Apollo","HeyReach"] },
  { n:"02", title:"Lead Enrichment Pipelines", desc:"Multi-waterfall enrichment combining Clay, Apollo, Hunter.io, and GPT-4o into one automated flow. Verified contacts with AI-generated first lines.", stack:["Clay","Hunter.io","Clearbit","GPT-4o","n8n"] },
  { n:"03", title:"CRM Operations & Automation", desc:"HubSpot setup, lead routing, deal enforcement, stale alerts, and AI call transcription with BANT extraction directly into deal records.", stack:["HubSpot","n8n","Zapier","Deepgram","GPT-4o"] },
  { n:"04", title:"GTM Signal Monitoring", desc:"Automated buying-signal tracking. Hiring surges, funding events, job changes, piped into your CRM so your team acts before a competitor even replies.", stack:["Clay","n8n","HubSpot","Webhook APIs"] },
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

        {/* Services */}
        <div className="divider" style={{ margin:"60px 0 0" }} />
        <section id="services" style={{ padding:"80px 0" }}>
          <div className="section-label">services</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", marginBottom:40 }}>
            What I build <G>for you.</G>
          </h2>
          <div className="grid-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {services.map((s,i) => (
              <div key={i} style={{ background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:14, padding:"28px 26px" }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-dim)", letterSpacing:"0.12em", marginBottom:14 }}>{s.n}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:600, color:"var(--text)", marginBottom:10, letterSpacing:"-0.01em" }}>{s.title}</div>
                <p style={{ fontFamily:"Inter, 'DM Sans', system-ui, sans-serif", fontSize:14, color:"var(--text-muted)", lineHeight:1.75, marginBottom:18 }}>{s.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{s.stack.map(tag)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <div className="divider" />
        <section id="contact" style={{ padding:"80px 0" }}>
          <div className="section-label">contact</div>
          <div className="grid-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64 }}>
            <div>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:700, letterSpacing:"-0.025em", color:"var(--text)", marginBottom:16 }}>
                Let&apos;s build <G>something.</G>
              </h2>
              <p style={{ fontFamily:"Inter, 'DM Sans', system-ui, sans-serif", fontSize:15, color:"var(--text-muted)", lineHeight:1.85, marginBottom:28 }}>
                Open to freelance GTM projects, consulting, and full-time roles in the UK. If you need revenue infrastructure that actually ships, reach out.
              </p>
              {[
                { icon:"@",  label:"Email",    val:"rishirajpaul3@gmail.com",          href:"mailto:rishirajpaul3@gmail.com" },
                { icon:"in", label:"LinkedIn", val:"linkedin.com/in/rishiraj-paul-gtm", href:"https://www.linkedin.com/in/rishiraj-paul-gtm/" },
                { icon:"x",  label:"X",        val:"@RishirajPa40653",                 href:"https://x.com/RishirajPa40653" },
                { icon:"gh", label:"GitHub",   val:"github.com/rishirajpaul3",          href:"https://github.com/rishirajpaul3" },
              ].map(c => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:14, textDecoration:"none", color:"var(--text)", fontSize:13, padding:"12px 16px", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:8, marginBottom:8 }}
                >
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--gold)", width:28, textAlign:"center" }}>{c.icon}</span>
                  <div>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-dim)", display:"block", marginBottom:1 }}>{c.label}</span>
                    <span style={{ fontFamily:"Inter, 'DM Sans', system-ui, sans-serif", fontSize:13 }}>{c.val}</span>
                  </div>
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
              <button type="submit" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"12px 24px", background:"var(--gold)", color:"var(--bg)", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer" }}>
                Send message
              </button>
            </form>
          </div>
        </section>

        {/* Subscribe */}
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:60, paddingBottom:80, display:"flex", justifyContent:"space-between", alignItems:"center", gap:40, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:600, color:"var(--text)", marginBottom:6 }}>Build Log</div>
            <div style={{ fontFamily:"Inter, 'DM Sans', system-ui, sans-serif", fontSize:14, color:"var(--text-muted)" }}>Every week I share what I&apos;m learning, building, and shipping in GTM and AI.</div>
          </div>
          <a href="https://build-logrishiraj.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"12px 28px", background:"var(--gold)", color:"var(--bg)", textDecoration:"none", borderRadius:8, fontWeight:600, letterSpacing:"0.03em", whiteSpace:"nowrap", boxShadow:"0 4px 24px rgba(201,150,59,0.2)" }}>
            subscribe to build log →
          </a>
        </div>

      </main>
      <Footer />
    </>
  );
}
