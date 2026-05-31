"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import StatCounter from "./StatCounter";

const words = ["Just", "addicted", "to"];

export default function Hero() {
  return (
    <section style={{ position: "relative", padding: "80px 0 100px", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position:"absolute", top:"-10%", left:"5%", width:700, height:700, background:"radial-gradient(circle, rgba(201,150,59,0.10) 0%, rgba(201,150,59,0.03) 50%, transparent 70%)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", top:"0%", right:"0%", width:600, height:600, background:"radial-gradient(circle, rgba(201,150,59,0.08) 0%, transparent 65%)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1 }}>

        {/* Two-column layout */}
        <div className="hero-layout" style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:60, alignItems:"center", marginBottom:64 }}>

          {/* Left — text */}
          <div>
            {/* Eyebrow */}
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
              style={{ marginBottom:28 }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"var(--text-dim)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>
                <span style={{ color:"var(--gold)" }}>// </span>hello
              </div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:600, color:"var(--text)", marginBottom:3 }}>Rishiraj Paul</div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:"var(--text-muted)" }}>
                <span style={{ color:"var(--gold)" }}>Open to work</span> · UK · India · Remote
              </div>
            </motion.div>

            {/* Headline */}
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(42px,5.5vw,80px)", fontWeight:700, lineHeight:1.02, letterSpacing:"-0.038em", marginBottom:6 }}>
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
              style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.82, marginBottom:36, marginTop:20 }}>
              GTM Engineer. I build things. Right now that means AI systems for revenue teams.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.85 }}
              style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
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
          </div>

          {/* Right — avatar */}
          <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.3, ease:[0.25,0.46,0.45,0.94] }}
            style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div style={{ position:"relative" }}>
              {/* Outer glow */}
              <div style={{ position:"absolute", inset:-24, borderRadius:"50%", background:"radial-gradient(circle, rgba(201,150,59,0.2) 0%, rgba(201,150,59,0.06) 50%, transparent 70%)", zIndex:0 }} />
              {/* Spinning ring */}
              <div style={{ position:"absolute", inset:-6, borderRadius:"50%", border:"1px solid var(--gold-border)", zIndex:1 }} />
              {/* Avatar */}
              <div style={{ width:360, height:360, borderRadius:"50%", overflow:"hidden", position:"relative", zIndex:2, boxShadow:"0 8px 60px rgba(201,150,59,0.2), 0 0 0 3px var(--gold-border)" }}>
                <Image src="/avatar.jpg" alt="Rishiraj Paul" width={360} height={360} style={{ width:"100%", height:"100%", objectFit:"cover" }} priority />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats grid — full width */}
        <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:1.0 }}
          className="grid-4col" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", border:"1px solid var(--border)", background:"var(--border)", gap:1 }}>
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

      <style>{"@media(max-width:768px){ .hero-layout { grid-template-columns: 1fr !important; } .hero-layout > div:last-child { order: -1; } .hero-layout > div:last-child > div > div:nth-child(3) { width: 200px !important; height: 200px !important; } }"}</style>
    </section>
  );
}
