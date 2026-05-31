#!/usr/bin/env node
// Fetches published posts from Beehiiv and writes public/posts.json
// Run: node scripts/fetch-posts.js
// Requires: BEEHIIV_API_KEY env var

const fs = require("fs");
const path = require("path");

const PUB_ID = "efa50e56-7a2f-4d50-aa97-08f8fd3c5a36";
const API_KEY = process.env.BEEHIIV_API_KEY;

if (!API_KEY) {
  console.error("Missing BEEHIIV_API_KEY env var");
  process.exit(1);
}

async function fetchPosts() {
  const url = `https://api.beehiiv.com/v2/publications/${PUB_ID}/posts?status=confirmed&limit=100&expand[]=free_web_content`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  if (!res.ok) {
    console.error(`Beehiiv API error: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const { data } = await res.json();

  const posts = data.map((p) => ({
    title: p.subject || p.title,
    date: p.publish_date
      ? new Date(p.publish_date * 1000).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    excerpt: p.preview_text || p.subtitle || "",
    url: p.web_url,
    readTime: p.reading_time_minutes ? `${p.reading_time_minutes} min` : undefined,
    tags: p.tags?.map((t) => t.name) ?? [],
  }));

  const out = path.join(__dirname, "../public/posts.json");
  fs.writeFileSync(out, JSON.stringify(posts, null, 2));
  console.log(`✓ Wrote ${posts.length} posts to public/posts.json`);
}

fetchPosts().catch((e) => {
  console.error(e);
  process.exit(1);
});
