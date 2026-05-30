"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Post = { slug?: string; title?: string; date: string; source: string; excerpt: string; url?: string; readTime?: string; tags?: string[]; name?: string; description?: string; html_url?: string; language?: string; updated_at?: string; stargazers_count?: number; };

// Add "substack" | "medium" here when you create those accounts
const TABS = ["all", "blog", "linkedin", "github"] as const;
type Tab = typeof TABS[number];

function ago(d: string) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

function Badge({ source }: { source: string }) {
  const styles: Record<string, { color: string; bg: string; border: string }> = {
    blog:     { color: "#c9963b", bg: "rgba(201,150,59,0.1)", border: "rgba(201,150,59,0.3)" },
    linkedin: { color: "#5b9bd5", bg: "rgba(91,155,213,0.1)", border: "rgba(91,155,213,0.3)" },
    github:   { color: "#9b8afb", bg: "rgba(155,138,251,0.1)", border: "rgba(155,138,251,0.3)" },
  };
  const s = styles[source] || styles.blog;
  return (
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 9999, border: `1px solid ${s.border}`, background: s.bg, color: s.color }}>
      {source}
    </span>
  );
}

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ghRepos, setGhRepos] = useState<Post[]>([]);
  const [tab, setTab] = useState<Tab>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetch("/data/posts.json").then(r => r.json()).catch(() => []),
      fetch("/data/content.json").then(r => r.json()).catch(() => []),
      (async () => {
        const K = "gh_blog_v3", TTL = 6 * 60 * 60 * 1000;
        const raw = localStorage.getItem(K);
        if (raw) { const { data, ts } = JSON.parse(raw); if (Date.now() - ts < TTL) return data; }
        const r = await fetch("https://api.github.com/users/rishirajpaul3/repos?sort=updated&per_page=20");
        const all = await r.json();
        const repos = all.filter((r: Post & { fork: boolean }) => !r.fork && r.name !== "rishirajpaul3");
        localStorage.setItem(K, JSON.stringify({ data: repos, ts: Date.now() }));
        return repos;
      })(),
    ]).then(([bp, li, gh]) => {
      const blog = ((bp as PromiseFulfilledResult<Post[]>).value || []).map(p => ({ ...p, source: "blog" }));
      const linkedin = ((li as PromiseFulfilledResult<Post[]>).value || []).map(p => ({ ...p, source: "linkedin" }));
      setPosts([...blog, ...linkedin].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setGhRepos(((gh as PromiseFulfilledResult<Post[]>).value || []).map((r: Post) => ({ ...r, source: "github", date: r.updated_at || "" })));
      setLoading(false);
    });
  }, []);

  const counts = { all: posts.length + ghRepos.length, blog: posts.filter(p => p.source === "blog").length, linkedin: posts.filter(p => p.source === "linkedin").length, github: ghRepos.length };

  const items = tab === "all" ? [...posts, ...ghRepos.slice(0, 4)] : tab === "github" ? ghRepos : posts.filter(p => p.source === tab);

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 6, paddingBottom: 0, borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12,
              color: tab === t ? "var(--bg)" : "var(--text-muted)",
              background: tab === t ? "var(--gold)" : "transparent",
              border: `1px solid ${tab === t ? "var(--gold)" : "transparent"}`,
              borderRadius: 9999,
              padding: "7px 16px",
              cursor: "pointer",
              transition: "all 0.15s",
              marginBottom: -1,
              letterSpacing: "0.02em",
            }}
          >
            {t} <span style={{ opacity: 0.65, fontSize: 10 }}>· {counts[t]}</span>
          </button>
        ))}
      </div>

      {/* Feed */}
      {loading ? (
        <div style={{ padding: 48, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)" }}>
          // loading feed...
        </div>
      ) : !items.length ? (
        <div style={{ padding: "64px 32px", textAlign: "center", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)" }}>
          // nothing here yet — check back soon.
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {items.map((p, i) => (
              <a
                key={i}
                href={p.source === "blog" ? "#" : p.source === "github" ? p.html_url : p.url}
                target={p.source !== "blog" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px 26px", textDecoration: "none", color: "inherit", display: "block", transition: "border-color 0.15s, background 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.background = "#221b12"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Badge source={p.source} />
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)" }}>
                    {p.source === "github" ? ago(p.date) : p.date}
                  </span>
                  {p.readTime && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)" }}>{p.readTime} read</span>}
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 8, lineHeight: 1.35 }}>
                  {p.title || p.name}
                </div>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 14, maxWidth: 680 }}>
                  {p.excerpt || p.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", letterSpacing: "0.03em" }}>
                    {p.source === "blog" ? "read post →" : p.source === "github" ? "view repo ↗" : "read on linkedin ↗"}
                  </span>
                  {(p.tags || []).map((t: string) => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "2px 9px", borderRadius: 9999 }}>{t}</span>)}
                  {p.stargazers_count !== undefined && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>★ {p.stargazers_count}</span>}
                </div>
              </a>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
