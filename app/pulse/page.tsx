"use client";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type IndexEntry = { date: string; headline: string };

type Digest = {
  date: string;
  the_signal:    { headline: string; body: string };
  tool_drop:     { name: string; what: string; why: string; url: string };
  thread_of_day: { title: string; source: string; takeaway: string; url: string };
  quote:         { text: string; source: string };
  whats_moving:  { topic: string; context: string }[];
  act_on_this:   string;
  numbers:       { stat: string; context: string };
};

const SECTION_TAGS = ["the signal", "tool drop", "thread of the day", "what's moving", "act on this", "numbers"];

const fmtFull = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

function Block({ label, children, gold = false }: { label: string; children: React.ReactNode; gold?: boolean }) {
  return (
    <div style={{ background: "var(--surface-2)", border: `1px solid ${gold ? "var(--gold-border)" : "var(--border)"}`, borderRadius: 10, padding: "20px 22px", marginBottom: 2 }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.12em", color: gold ? "var(--gold)" : "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function DigestView({ digest, onBack }: { digest: Digest; onBack: () => void }) {
  return (
    <>
      <div style={{ paddingTop: 48, marginBottom: 36 }}>
        <button onClick={onBack} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.04em" }}>
          ← daily pulse
        </button>
      </div>

      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginBottom: 10 }}>
          {fmtFull(digest.date)}
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1.1, margin: 0 }}>
          Daily Pulse
        </h1>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", marginBottom: 32 }} />

      <Block label="// the signal" gold>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.3 }}>
          {digest.the_signal.headline}
        </div>
        <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.85, margin: 0 }}>
          {digest.the_signal.body}
        </p>
      </Block>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
        <Block label="// tool drop">
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
            {digest.tool_drop.url
              ? <a href={digest.tool_drop.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", textDecoration: "none" }}>{digest.tool_drop.name} ↗</a>
              : digest.tool_drop.name}
          </div>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, margin: "0 0 8px" }}>{digest.tool_drop.what}</p>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--gold)", lineHeight: 1.75, margin: 0 }}>{digest.tool_drop.why}</p>
        </Block>
        <Block label="// thread of the day">
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", marginBottom: 8 }}>{digest.thread_of_day.source}</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 8, lineHeight: 1.4 }}>
            {digest.thread_of_day.url
              ? <a href={digest.thread_of_day.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text)", textDecoration: "none" }}>{digest.thread_of_day.title} ↗</a>
              : digest.thread_of_day.title}
          </div>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{digest.thread_of_day.takeaway}</p>
        </Block>
      </div>

      <Block label="// quote worth keeping">
        <blockquote style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 15, color: "var(--text)", lineHeight: 1.85, margin: "0 0 10px", fontStyle: "italic", borderLeft: "2px solid var(--gold)", paddingLeft: 18 }}>
          &ldquo;{digest.quote.text}&rdquo;
        </blockquote>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", paddingLeft: 18 }}>— {digest.quote.source}</div>
      </Block>

      <Block label="// what's moving">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {digest.whats_moving.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>0{i + 1}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{item.topic}</div>
                <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.context}</div>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 48 }}>
        <Block label="// act on this" gold>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 15, color: "var(--text)", lineHeight: 1.85, margin: 0, fontWeight: 500 }}>
            {digest.act_on_this}
          </p>
        </Block>
        <Block label="// numbers">
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 36, fontWeight: 700, color: "var(--gold)", letterSpacing: "-0.03em", marginBottom: 8 }}>
            {digest.numbers.stat}
          </div>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
            {digest.numbers.context}
          </p>
        </Block>
      </div>

      <div style={{ paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <button onClick={onBack} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          ← back to all digests
        </button>
      </div>
    </>
  );
}

export default function PulsePage() {
  const [index,   setIndex]   = useState<IndexEntry[]>([]);
  const [digest,  setDigest]  = useState<Digest | null>(null);
  const [loading, setLoading] = useState(true);
  const [view,    setView]    = useState<"landing" | "digest">("landing");

  useEffect(() => {
    fetch("/pulse/index.json")
      .then(r => r.ok ? r.json() : [])
      .then((idx: IndexEntry[]) => { setIndex(idx); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function openDigest(date: string) {
    setLoading(true);
    fetch(`/pulse/${date}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { setDigest(d); setView("digest"); setLoading(false); window.scrollTo(0, 0); })
      .catch(() => setLoading(false));
  }

  function back() {
    setView("landing");
    setDigest(null);
    window.scrollTo(0, 0);
  }

  const latest  = index[0] ?? null;
  const archive = index.slice(1);

  return (
    <>
      <Nav />
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 120px" }}>

        {view === "digest" && digest ? (
          <DigestView digest={digest} onBack={back} />
        ) : (
          <>
            {/* Hero */}
            <section style={{ padding: "80px 0 60px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40 }}>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.92, color: "var(--text)", marginBottom: 28, userSelect: "none" }}>
                    <div style={{ fontSize: "clamp(72px, 12vw, 120px)" }}>DAILY</div>
                    <div style={{ fontSize: "clamp(72px, 12vw, 120px)", color: "var(--gold)" }}>PULSE</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 32 }}>
                    the daily signal for gtm engineers.<br />
                    tools. threads. insights. what to act on.
                  </div>

                  {/* How it works */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                    {[
                      { n: "01", title: "it reads the internet for you", body: "every morning it pulls from product hunt, indie hackers, n8n blog, and hacker news. the stuff you'd spend an hour going through anyway." },
                      { n: "02", title: "claude figures out what actually matters", body: "claude reads everything and picks out the signal. one headline. one tool worth knowing. one thread. one thing to act on. no noise." },
                      { n: "03", title: "it's just there when you wake up", body: "github runs it at 7am utc every day. you open the page, it's ready. no newsletters, no apps, no tabs." },
                    ].map(s => (
                      <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>{s.n}</span>
                        <div>
                          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text)", marginBottom: 4 }}>{s.title}</div>
                          <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>{s.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", background: "var(--gold-bg)", border: "1px solid var(--gold-border)", padding: "4px 12px", borderRadius: 9999, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
                      LIVE
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>
                      {index.length} digests
                    </span>
                  </div>
                </div>

                <div style={{ flexShrink: 0, width: 120, height: 120, borderRadius: "50%", background: "var(--surface-2)", border: "2px solid var(--gold-border)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(201,150,59,0.15)" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 36, color: "var(--gold)", letterSpacing: "-0.04em" }}>DP</div>
                </div>
              </div>
            </section>

            <div style={{ borderTop: "1px solid var(--border)", marginBottom: 48 }} />

            {loading ? (
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)" }}>// loading…</div>
            ) : index.length === 0 ? (
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)" }}>// first digest coming tomorrow at 7am UTC</div>
            ) : (
              <>
                {/* Latest */}
                <section style={{ marginBottom: 60 }}>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>latest</div>
                  {latest && (
                    <div
                      onClick={() => openDigest(latest.date)}
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 30px", cursor: "pointer", transition: "border-color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-border)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                    >
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.3 }}>
                        Daily Pulse: {fmtFull(latest.date)}
                      </div>
                      <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)", marginBottom: 18, lineHeight: 1.6 }}>
                        {latest.headline}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                        {SECTION_TAGS.map(t => (
                          <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 9999 }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>{latest.date}</span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)" }}>read →</span>
                      </div>
                    </div>
                  )}
                </section>

                {/* Archive */}
                {archive.length > 0 && (
                  <section>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>archive</div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {archive.map((entry, i) => (
                        <div
                          key={entry.date}
                          onClick={() => openDigest(entry.date)}
                          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 4px", borderBottom: i < archive.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", transition: "color 0.15s" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--gold)"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "inherit"}
                        >
                          <span style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
                            Daily Pulse: {fmtFull(entry.date)}
                          </span>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", flexShrink: 0, marginLeft: 24 }}>
                            {entry.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}

      </main>
      <Footer />
    </>
  );
}
