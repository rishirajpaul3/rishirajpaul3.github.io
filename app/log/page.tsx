"use client";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";

type WeekIndex = { week: string; date_range: string; grade: string; score: number; commits: number };

type Accomplishment = {
  repo: string; type: string; title: string; day: string;
  value_score: number; commit_msg?: string; source: string;
};

type WeekData = {
  week: string;
  date_range: string;
  accomplishments: Accomplishment[];
  manual: { title: string; value_score: number }[];
  stats: {
    output_score: number; letter_grade: string; total_commits: number;
    total_files: number; lines_added: number; lines_removed: number; active_days: number;
  };
  project_breakdown: Record<string, { score: number; commits: number; files: number }>;
};

const GRADE_COLORS: Record<string, string> = {
  "S+": "#ff6b35", "S": "#ffc83c", "A+": "var(--gold)", "A": "var(--gold)",
  "B": "#50bed4", "C": "#dcaa3c", "D": "#b44646",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

function WeekCard({ entry, onOpen }: { entry: WeekIndex; onOpen: () => void }) {
  const gradeColor = GRADE_COLORS[entry.grade] || "var(--gold)";
  const isCurrent = entry.week === currentWeekLabel();

  return (
    <div
      onClick={onOpen}
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px 32px", cursor: "pointer", transition: "border-color 0.15s" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>{entry.week}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>{entry.date_range}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: gradeColor }}>{entry.grade}</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 9999, color: isCurrent ? "var(--gold)" : "var(--text-dim)", background: isCurrent ? "var(--gold-bg)" : "var(--surface)", border: `1px solid ${isCurrent ? "var(--gold-border)" : "var(--border)"}` }}>
            {isCurrent ? "● IN PROGRESS" : "✓ DONE"}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {[
          { label: "score", val: entry.score },
          { label: "commits", val: entry.commits },
        ].map(s => (
          <div key={s.label}>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{s.val}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", marginLeft: 6 }}>{s.label}</span>
          </div>
        ))}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", alignSelf: "center", marginLeft: "auto" }}>
          view details →
        </div>
      </div>
    </div>
  );
}

function WeekDetail({ data, onBack }: { data: WeekData; onBack: () => void }) {
  const s = data.stats;
  const gradeColor = GRADE_COLORS[s.letter_grade] || "var(--gold)";

  // Top accomplishments by score
  const topItems = [...data.accomplishments, ...data.manual.map(m => ({ ...m, repo: "manual", type: "manual", day: "", source: "manual" }))]
    .sort((a, b) => b.value_score - a.value_score)
    .slice(0, 20);

  // Group by repo
  const byRepo: Record<string, Accomplishment[]> = {};
  topItems.forEach(a => {
    if (!byRepo[a.repo]) byRepo[a.repo] = [];
    byRepo[a.repo].push(a);
  });

  return (
    <>
      <div style={{ paddingTop: 0, marginBottom: 28 }}>
        <button onClick={onBack} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          ← back to log
        </button>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", marginBottom: 6 }}>{data.date_range}</div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text)", margin: 0 }}>{data.week}</h2>
        </div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 56, fontWeight: 700, color: gradeColor, letterSpacing: "-0.04em" }}>{s.letter_grade}</div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 32 }}>
        {[
          { label: "output score", val: s.output_score, color: "var(--gold)" },
          { label: "commits", val: s.total_commits, color: "var(--text)" },
          { label: "files", val: s.total_files, color: "var(--text)" },
          { label: "active days", val: `${s.active_days}/7`, color: "var(--text)" },
          { label: "lines +", val: `+${s.lines_added.toLocaleString()}`, color: "#4ade80" },
          { label: "lines -", val: `-${s.lines_removed.toLocaleString()}`, color: "#f87171" },
        ].map(st => (
          <div key={st.label} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px", minWidth: 100 }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: st.color, marginBottom: 4 }}>{st.val}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.08em" }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Shipped by project */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", marginBottom: 16 }}>// shipped</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 32 }}>
        {Object.entries(byRepo).map(([repo, items]) => (
          <div key={repo} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 12 }}>{repo}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.slice(0, 6).map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>→</span>
                  <span style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {item.commit_msg || item.title}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", flexShrink: 0, marginLeft: "auto" }}>+{item.value_score}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project breakdown */}
      {Object.keys(data.project_breakdown).length > 0 && (
        <>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", marginBottom: 16 }}>// by project</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 32 }}>
            {Object.entries(data.project_breakdown).sort((a, b) => b[1].score - a[1].score).map(([name, pb]) => {
              const max = Math.max(...Object.values(data.project_breakdown).map(p => p.score));
              return (
                <div key={name} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)" }}>{pb.score}pts · {pb.commits}c · {pb.files}f</span>
                  </div>
                  <div style={{ height: 4, background: "var(--surface)", borderRadius: 2 }}>
                    <div style={{ height: 4, width: `${(pb.score / max) * 100}%`, background: "var(--gold)", borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

function currentWeekLabel() {
  const now = new Date();
  const jan4 = new Date(now.getFullYear(), 0, 4);
  const weekNum = Math.ceil(((now.getTime() - jan4.getTime()) / 86400000 + jan4.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

export default function LogPage() {
  const [index,   setIndex]   = useState<WeekIndex[]>([]);
  const [detail,  setDetail]  = useState<WeekData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/weekly-log/index.json")
      .then(r => r.ok ? r.json() : [])
      .then((idx: WeekIndex[]) => { setIndex(idx); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function openWeek(week: string) {
    setLoading(true);
    fetch(`/weekly-log/${week}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { setDetail(d); setLoading(false); window.scrollTo(0, 0); })
      .catch(() => setLoading(false));
  }

  const totalCommits = index.reduce((s, w) => s + w.commits, 0);
  const weeksActive  = index.length;

  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {detail ? (
          <div style={{ padding: "48px 0 80px" }}>
            <WeekDetail data={detail} onBack={() => { setDetail(null); window.scrollTo(0, 0); }} />
          </div>
        ) : (
          <>
            <section style={{ padding: "80px 0 60px" }}>
              <div className="section-label">build log</div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 20, color: "var(--text)" }}>
                Weekly proof<br />of <G>work.</G>
              </h1>
              <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8, marginBottom: 32 }}>
                Every commit, every build, every week. Auto-tracked across all repos. Updated every Sunday.
              </p>
              <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {[
                  { label: "weeks tracked",    value: weeksActive },
                  { label: "total commits",     value: totalCommits },
                  { label: "updated",           value: "weekly" },
                ].map(s => (
                  <div key={s.label} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 24px", minWidth: 120 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="divider" />

            <section style={{ padding: "60px 0 80px", display: "flex", flexDirection: "column", gap: 2 }}>
              {loading ? (
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)", padding: "40px 0" }}>// loading…</div>
              ) : index.length === 0 ? (
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)", padding: "40px 0" }}>// no weeks tracked yet</div>
              ) : (
                index.map(entry => (
                  <WeekCard key={entry.week} entry={entry} onOpen={() => openWeek(entry.week)} />
                ))
              )}
            </section>
          </>
        )}

      </main>
      <Footer />
    </>
  );
}
