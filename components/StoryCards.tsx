"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const cards = [
  { era: "OPS FLOOR · 2023–2024", title: "I managed 50+ reps. Watched every broken GTM tool fail in real time.", body: "every system has a logic. i just couldn't fix the tools i was handed." },
  { era: "MSc QMUL · 2024–2025",  title: "Moved to London. Studied innovation. Learned to code instead of complain.", body: "not to become a developer. to fix the infrastructure around sales." },
  { era: "GTM ENGINEER · 2025–NOW", title: "I stopped working inside the systems and started building them.", body: "fastapi + react on railway. real hubspot integrations. real revenue impact." },
];

function TiltCard({ card, delay }: { card: typeof cards[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{
        rotateX, rotateY,
        transformStyle: "preserve-3d",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "26px 24px",
        cursor: "default",
        transition: "border-color 0.2s",
      }}
      whileHover={{ borderColor: "var(--border-2)" }}
    >
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
        {card.era}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", lineHeight: 1.4, marginBottom: 10, letterSpacing: "-0.01em" }}>
        {card.title}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
        {card.body}
      </div>
    </motion.div>
  );
}

export default function StoryCards() {
  return (
    <div style={{ marginTop: 48 }}>
      <div className="grid-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, perspective: 1000 }}>
        {cards.map((c, i) => <TiltCard key={i} card={c} delay={i * 0.1} />)}
      </div>
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        href="/about"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}
      >
        Read the full arc →
      </motion.a>

      {/* GTM Daily social proof */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 36 }}
      >
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
          // as featured at
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px" }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
              <span style={{ background: "var(--gold)", color: "var(--bg)", padding: "1px 6px", borderRadius: 3, marginRight: 4, fontSize: 12 }}>GTM</span>
              daily
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-muted)" }}>Office Hours Speaker</div>
          </div>
          <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", maxWidth: 420, lineHeight: 1.7 }}>
            Hosted a live group session on how to use Claude Code for GTM engineers.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
