"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Repo = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
};

function ago(d: string) {
  const s = (Date.now() - new Date(d).getTime()) / 1000;
  if (s < 3600)  return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

export default function RepoGrid() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const K = "gh_next_v1", TTL = 6 * 60 * 60 * 1000;
    const raw = localStorage.getItem(K);
    if (raw) {
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts < TTL) { setRepos(data); setLoading(false); return; }
    }
    fetch("https://api.github.com/users/rishirajpaul3/repos?sort=updated&per_page=20")
      .then(r => r.json())
      .then(all => {
        const filtered = all.filter((r: Repo & { fork: boolean }) => !r.fork && r.name !== "rishirajpaul3").slice(0, 6);
        localStorage.setItem(K, JSON.stringify({ data: filtered, ts: Date.now() }));
        setRepos(filtered);
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ padding: "48px", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)" }}>
      // fetching from github api...
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {repos.map((r, i) => (
        <motion.a
          key={r.name}
          href={r.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
            color: "inherit",
            transition: "border-color 0.15s, background 0.15s",
          }}
          whileHover={{ borderColor: "var(--border-2)" }}
        >
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.06em", marginBottom: 8 }}>
            {r.language || "—"}
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--gold)", marginBottom: 7, letterSpacing: "-0.01em" }}>
            {r.name}
          </div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, flex: 1, marginBottom: 14 }}>
            {r.description || "No description."}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>
            <span>★ {r.stargazers_count}</span>
            <span>{ago(r.updated_at)}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
