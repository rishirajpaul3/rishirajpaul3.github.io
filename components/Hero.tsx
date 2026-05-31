"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import StatCounter from "./StatCounter";

const words = ["Just", "addicted", "to"];

export default function Hero() {
  return (
    <section style={{ position: "relative", padding: "80px 0 100px", overflow: "hidden" }}>
      {/* Dramatic gold glow */}
      <div style={{ position:"absolute", top:"-20%", left:"15%", width:800, height:800, background:"radial-gradient(circle, rgba(201,150,59,0.13) 0%, rgba(201,150,59,0.03) 50%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"10%", right:"5%", width:400, height:400, background:"radial-gradient(circle, rgba(201,150,59,0.06) 0%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1 }}>

        {/* Avatar + eyebrow */}
        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          style={{ display:"flex", alignItems:"center", gap:20, marginBottom:36 }}>
          <div style={{ position:"relative", flexShrink:0 }}>
            {/* Glow ring */}
            <div style={{ position:"absolute", inset:-4, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,150,59,0.3) 0%, transparent 70%)", zIndex:0 }} />
            <div style={{ width:80, height:80, borderRadius:"50%", border:"2px solid var(--gold-border)", overflow:"hidden", position:"relative", zIndex:1, boxShadow:"0 0 24px rgba(201,150,59,0.15)" }}>
              <Image src="/avatar.jpg" alt="Rishiraj Paul" width={80} height={80} style={{ width:"100%", height:"100%", objectFit:"cover" }} priority />
            </div>
          </div>
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--text-dim)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>
              <span style={{ color:"var(--gold)" }}>// </span>hello
            </div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, fontWeight:600, color:"var(--text)", marginBottom:2 }}>Rishiraj Paul</div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--text-muted)" }}>
              <span style={{ color:"var(--gold)" }}>Open to work</span> · UK · India · Remote
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(48px,7.5vw,96px)", fontWeight:700, lineHeight:1.02, letterSpacing:"-0.038em", marginBottom:6, maxWidth:1000 }}>
          {words.map((word, i) => (
            <motion.span key={i} initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.08 + i * 0.07, ease:[0.25,0.46,0.45,0.94] }}
              style={{ display:"inline-block", marginRight:"0.26em", color:"var(--text)" }}>
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.55, ease:[0.25,0.46,0.45,0.94] }}
            className="gold-gradient" style={{ display:"inline-block" }}>
            solving hard problems.
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.72 }}
          style={{ fontSize:17, color:"var(--text-muted)", maxWidth:600, lineHeight:1.82, marginBottom:44, marginTop:22 }}>
          GTM Engineer. I build things. Right now that means AI systems for revenue teams.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.85 }}
          style={{ display:"flex", gap:12, alignItems:"center", marginBottom:80, flexWrap:"wrap" }}>
          <Link href="/blog" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"13px 28px", background:"var(--gold)", color:"var(--bg)", textDecoration:"none", borderRadius:8, fontWeight:700, letterSpacing:"0.03em", boxShadow:"0 4px 24px rgba(201,150,59,0.25)" }}>
            read the build log →
          </Link>
          <Link href="/builds" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"13px 28px", background:"transparent", color:"var(--text-muted)", textDecoration:"none", borderRadius:8, border:"1px solid var(--border-2)", letterSpacing:"0.03em" }}>
            see projects
          </Link>
          <a href="https://app.notion.com/p/Rishiraj-Paul-GTM-E-Portfolio-32e4fc4568a980df833eea7faf5a6087" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, padding:"13px 28px", background:"transparent", color:"var(--text-muted)", textDecoration:"none", borderRadius:8, border:"1px solid var(--border-2)", letterSpacing:"0.03em" }}>
            GTM portfolio ↗
          </a>
          <Link href="/about" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--text-dim)", textDecoration:"none", letterSpacing:"0.03em" }}>
            read the story →
          </Link>
        </motion.div>

        {/* Stats grid */}
        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:1.0 }}
          style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", border:"1px solid var(--border)", background:"var(--border)", gap:1 }}>
          {[
            { value:10, suffix:"+", label:"Systems shipped" },
            { value:2,  suffix:"×", label:"Reply rate lift"  },
            { value:80, suffix:"%", label:"SDR automated"    },
            { value:50, suffix:"+", label:"Reps managed"     },
          ].map((s) => (
            <div key={s.label} style={{ background:"var(--surface)", padding:"22px 26px" }}>
              <StatCounter value={s.value} suffix={s.suffix} />
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"var(--text-muted)", letterSpacing:"0.05em", marginTop:6 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
