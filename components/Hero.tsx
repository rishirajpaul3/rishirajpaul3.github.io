"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import StatCounter from "./StatCounter";

const words = ["I", "build", "the", "revenue", "systems", "that", "ops teams", "couldn't."];

export default function Hero() {
  return (
    <section style={{ position: "relative", padding: "72px 0 96px", overflow: "hidden" }}>
      {/* Gold radial glow */}
      <div style={{
        position: "absolute", top: "-15%", left: "25%",
        width: 700, height: 700,
        background: "radial-gradient(circle, rgba(201,150,59,0.11) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Avatar + eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 32 }}
        >
          <div style={{
            width: 64, height: 64,
            borderRadius: "50%",
            border: "2px solid var(--gold-border)",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 0 4px rgba(201,150,59,0.08)",
          }}>
            <Image
              src="/avatar.jpg"
              alt="Rishiraj Paul"
              width={64}
              height={64}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              priority
            />
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <span style={{ color: "var(--gold)" }}>// </span>hello
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              GTM Engineer · UK · Open to work
            </div>
          </div>
        </motion.div>

        {/* Animated headline */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(44px, 7vw, 88px)",
          fontWeight: 700,
          lineHeight: 1.04,
          letterSpacing: "-0.035em",
          marginBottom: 28,
          maxWidth: 900,
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.065, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                display: "inline-block",
                marginRight: "0.28em",
                color: word === "couldn't." ? "var(--gold)" : "var(--text)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.72 }}
          style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 580, lineHeight: 1.8, marginBottom: 40 }}
        >
          From pharma sales &amp; running 50+ reps to building AI pipelines that do it without them.
          Every system, every deployment, runs through a single codebase.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 80, flexWrap: "wrap" }}
        >
          <Link href="/blog" style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
            padding: "12px 26px", background: "var(--gold)", color: "var(--bg)",
            textDecoration: "none", borderRadius: 8, fontWeight: 600, letterSpacing: "0.03em",
          }}>
            read the build log →
          </Link>
          <Link href="#projects" style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
            padding: "12px 26px", background: "transparent", color: "var(--text-muted)",
            textDecoration: "none", borderRadius: 8, border: "1px solid var(--border)", letterSpacing: "0.03em",
          }}>
            see projects
          </Link>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.0 }}
          style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid var(--border)", background: "var(--border)", gap: 1,
          }}
        >
          {[
            { value: 10, suffix: "+", label: "Systems shipped" },
            { value: 2,  suffix: "×", label: "Reply rate lift" },
            { value: 80, suffix: "%", label: "SDR work automated" },
            { value: 50, suffix: "+", label: "Reps managed" },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--surface)", padding: "22px 26px" }}>
              <StatCounter value={s.value} suffix={s.suffix} />
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.05em", marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
