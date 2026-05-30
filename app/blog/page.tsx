import Nav from "@/components/Nav";
import BlogFeed from "@/components/BlogFeed";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";

export const metadata = {
  title: "Blog — Rishiraj Paul",
  description: "GTM systems, AI tools, and building in public.",
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth:1100, margin:"0 auto", padding:"0 40px" }}>

        {/* Author row */}
        <div style={{ display:"flex", alignItems:"center", gap:16, padding:"36px 0 0" }}>
          <div style={{ width:52, height:52, background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:"var(--gold)", flexShrink:0 }}>RP</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:600, color:"var(--text)" }}>Rishiraj Paul</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.1em", color:"var(--gold)", background:"var(--gold-bg)", border:"1px solid var(--gold-border)", padding:"2px 8px", borderRadius:9999, display:"inline-flex", alignItems:"center", gap:5 }}>
                ● LIVE
              </span>
            </div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--text-muted)" }}>
              Live feed — everything I build: blog, LinkedIn, GitHub.
            </div>
          </div>
          <a href="https://linkedin.com/in/rishiraj-paul" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, padding:"8px 16px", background:"var(--surface-2)", border:"1px solid var(--border)", borderRadius:8, color:"var(--text-muted)", textDecoration:"none" }}>
            + Follow on LinkedIn
          </a>
        </div>

        {/* Feed with tabs */}
        <div style={{ paddingBottom:80 }}>
          <BlogFeed />
        </div>

        {/* Subscribe */}
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:60, paddingBottom:80, display:"flex", justifyContent:"space-between", alignItems:"center", gap:40, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--text-dim)", marginBottom:8 }}>// subscribe to follow the build</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:600, color:"var(--text)", letterSpacing:"-0.01em", marginBottom:5 }}>Build logs. GTM drops. No spam.</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:"var(--text-muted)" }}>Unsubscribe anytime.</div>
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
