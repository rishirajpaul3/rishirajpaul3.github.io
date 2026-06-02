#!/usr/bin/env python3
"""
Daily Pulse — Fetch & Generate
Pulls content from Reddit, Indie Hackers, Product Hunt, and GTM tool blogs.
Sends to Claude to write the daily digest. Writes JSON to public/pulse/.

Requires env vars:
  ANTHROPIC_API_KEY
  REDDIT_CLIENT_ID
  REDDIT_CLIENT_SECRET

Run: python3 scripts/pulse/fetch.py
"""

import json
import os
import sys
import time
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError
from urllib.parse import urlencode

# ── Config ─────────────────────────────────────────────────────────────────────

SUBREDDITS = [
    "n8n", "ClaudeAI", "SaaS", "sales",
    "hubspot", "artificial", "MachineLearning",
]

RSS_FEEDS = [
    ("Indie Hackers",  "https://www.indiehackers.com/feed.rss"),
    ("Product Hunt",   "https://www.producthunt.com/feed"),
    ("n8n Blog",       "https://blog.n8n.io/rss/"),
    ("Hacker News",    "https://hnrss.org/frontpage?count=20"),
]

OUTPUT_DIR  = Path(__file__).parent.parent.parent / "public" / "pulse"
INDEX_FILE  = OUTPUT_DIR / "index.json"

REDDIT_UA   = "DailyPulse/1.0 (GTM digest by rishiraj.paul)"
MAX_POSTS   = 5   # per subreddit
MAX_ITEMS   = 8   # per RSS feed

# ── HTTP helpers ────────────────────────────────────────────────────────────────

def get(url, headers=None, timeout=15):
    req = Request(url, headers={
        "User-Agent": REDDIT_UA,
        **(headers or {}),
    })
    try:
        with urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  [warn] GET {url} → {e}")
        return ""

def post_form(url, data, headers=None, timeout=15):
    body = urlencode(data).encode()
    req  = Request(url, data=body, headers={
        "User-Agent": REDDIT_UA,
        "Content-Type": "application/x-www-form-urlencoded",
        **(headers or {}),
    })
    try:
        with urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except Exception as e:
        print(f"  [warn] POST {url} → {e}")
        return {}

# ── Reddit ──────────────────────────────────────────────────────────────────────

def reddit_token():
    client_id     = os.environ.get("REDDIT_CLIENT_ID", "")
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET", "")
    if not client_id or not client_secret:
        return None
    import base64
    creds   = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    payload = {"grant_type": "client_credentials"}
    resp    = post_form(
        "https://www.reddit.com/api/v1/access_token",
        payload,
        headers={"Authorization": f"Basic {creds}"},
    )
    return resp.get("access_token")

def fetch_reddit(token):
    posts = []
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    base = "https://oauth.reddit.com" if token else "https://www.reddit.com"

    for sub in SUBREDDITS:
        url  = f"{base}/r/{sub}/hot.json?limit={MAX_POSTS}"
        raw  = get(url, headers=headers)
        if not raw:
            continue
        try:
            data = json.loads(raw)
            for child in data.get("data", {}).get("children", []):
                p = child.get("data", {})
                if p.get("stickied") or p.get("score", 0) < 10:
                    continue
                posts.append({
                    "source":   f"r/{sub}",
                    "title":    p.get("title", "")[:120],
                    "url":      f"https://reddit.com{p.get('permalink', '')}",
                    "score":    p.get("score", 0),
                    "comments": p.get("num_comments", 0),
                    "selftext": (p.get("selftext", "") or "")[:400],
                })
        except Exception:
            continue
        time.sleep(0.5)

    return sorted(posts, key=lambda x: x["score"], reverse=True)[:20]

# ── RSS feeds ───────────────────────────────────────────────────────────────────

def parse_rss(name, xml_text):
    items = []
    if not xml_text:
        return items
    try:
        root = ET.fromstring(xml_text)
        ns   = {"atom": "http://www.w3.org/2005/Atom"}

        # RSS 2.0
        for item in root.findall(".//item")[:MAX_ITEMS]:
            title = item.findtext("title", "").strip()
            link  = item.findtext("link", "").strip()
            desc  = item.findtext("description", "").strip()[:300]
            if title:
                items.append({"source": name, "title": title, "url": link, "desc": desc})

        # Atom
        if not items:
            for entry in root.findall(".//atom:entry", ns)[:MAX_ITEMS]:
                title = entry.findtext("atom:title", "", ns).strip()
                link  = ""
                for l in entry.findall("atom:link", ns):
                    if l.get("rel") in ("alternate", None):
                        link = l.get("href", "")
                        break
                summary = entry.findtext("atom:summary", "", ns).strip()[:300]
                if title:
                    items.append({"source": name, "title": title, "url": link, "desc": summary})
    except Exception:
        pass
    return items

def fetch_rss():
    items = []
    for name, url in RSS_FEEDS:
        raw = get(url)
        parsed = parse_rss(name, raw)
        items.extend(parsed)
        print(f"  {name}: {len(parsed)} items")
    return items

# ── Claude ──────────────────────────────────────────────────────────────────────

def call_claude(prompt):
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("  [error] ANTHROPIC_API_KEY not set")
        return None

    payload = json.dumps({
        "model":      "claude-haiku-4-5-20251001",
        "max_tokens": 2048,
        "messages":   [{"role": "user", "content": prompt}],
    }).encode()

    req = Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={
            "x-api-key":         api_key,
            "anthropic-version": "2023-06-01",
            "content-type":      "application/json",
        },
    )
    try:
        with urlopen(req, timeout=60) as r:
            resp = json.loads(r.read())
            return resp["content"][0]["text"]
    except Exception as e:
        print(f"  [error] Claude API → {e}")
        return None

def recent_headlines(date_str, n=5):
    """Return the last n signal headlines before date_str, to avoid repetition."""
    if not INDEX_FILE.exists():
        return []
    try:
        index = json.loads(INDEX_FILE.read_text())
        return [
            entry["headline"]
            for entry in index
            if entry.get("date") != date_str and entry.get("headline")
        ][:n]
    except Exception:
        return []


def build_prompt(reddit_posts, rss_items, date_str):
    sections = []
    if reddit_posts:
        reddit_block = "\n".join(
            f"- [{p['source']}] {p['title']} ({p['score']} pts, {p['comments']} comments)\n  {p['selftext'][:200]}"
            for p in reddit_posts[:15]
        )
        sections.append(f"=== REDDIT ===\n{reddit_block}")

    rss_block = "\n".join(
        f"- [{i['source']}] {i['title']}\n  {i['desc'][:200]}"
        for i in rss_items[:25]
    )
    sections.append(f"=== FEEDS (Indie Hackers, Product Hunt, n8n Blog, Hacker News) ===\n{rss_block}")

    content_block = "\n\n".join(sections)

    past = recent_headlines(date_str)
    avoid_block = ""
    if past:
        avoid_block = "\nRecent Signal headlines already published (DO NOT repeat these topics):\n" + \
            "\n".join(f"- {h}" for h in past) + "\n"

    return f"""You are writing "Daily Pulse" — a sharp daily digest for GTM engineers and founders who build AI-powered revenue systems. Published at rishiraj.paul.

Today's date: {date_str}
{avoid_block}
Here is today's raw content:

{content_block}

Write a structured JSON digest. Be specific, direct, and opinionated. Write like a GTM engineer talking to another GTM engineer — no fluff, no hype. Reference real items from the content above.
For "the_signal", pick the most important story that has NOT already been covered in recent issues listed above.

Return ONLY valid JSON in this exact structure:
{{
  "date": "{date_str}",
  "the_signal": {{
    "headline": "one headline — the most important GTM or AI story today (max 12 words)",
    "body": "2-3 sentences explaining why it matters for GTM engineers specifically. Be direct and specific."
  }},
  "tool_drop": {{
    "name": "tool name",
    "what": "one sentence — what it does",
    "why": "one sentence — why a GTM engineer should care",
    "url": "url if found, else empty string"
  }},
  "thread_of_day": {{
    "title": "thread title",
    "source": "r/subreddit or Indie Hackers etc",
    "takeaway": "one sentence — the actual insight from the thread",
    "url": "url"
  }},
  "quote": {{
    "text": "a specific quote or insight pulled verbatim or summarised from today's content",
    "source": "where it came from"
  }},
  "whats_moving": [
    {{"topic": "topic name", "context": "one sentence on why this is moving today"}},
    {{"topic": "topic name", "context": "one sentence on why this is moving today"}},
    {{"topic": "topic name", "context": "one sentence on why this is moving today"}}
  ],
  "act_on_this": "one specific, concrete action a GTM engineer should take today based on what's in this digest. Start with a verb.",
  "numbers": {{
    "stat": "one interesting number or data point from today's content",
    "context": "one sentence explaining why it matters"
  }}
}}"""

# ── Write output ────────────────────────────────────────────────────────────────

def update_index(date_str, digest):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    index = []
    if INDEX_FILE.exists():
        try:
            index = json.loads(INDEX_FILE.read_text())
        except Exception:
            index = []

    # Remove existing entry for this date
    index = [i for i in index if i.get("date") != date_str]

    index.insert(0, {
        "date":     date_str,
        "headline": digest.get("the_signal", {}).get("headline", ""),
    })

    # Keep last 90 days
    index = index[:90]
    INDEX_FILE.write_text(json.dumps(index, indent=2))

# ── Main ────────────────────────────────────────────────────────────────────────

def main():
    import re as _re
    date_arg = next((a for a in sys.argv[1:] if _re.match(r"\d{4}-\d{2}-\d{2}", a)), None)
    date_str = date_arg if date_arg else datetime.now(timezone.utc).strftime("%Y-%m-%d")
    out_file = OUTPUT_DIR / f"{date_str}.json"

    print(f"Daily Pulse — {date_str}")
    reddit = []
    if os.environ.get("REDDIT_CLIENT_ID") and os.environ.get("REDDIT_CLIENT_SECRET"):
        print("Fetching Reddit…")
        token  = reddit_token()
        reddit = fetch_reddit(token) if token else []
        print(f"  {len(reddit)} posts collected")
    else:
        print("Reddit credentials not set — running RSS-only mode")

    print("Fetching RSS feeds…")
    rss = fetch_rss()
    print(f"  {len(rss)} items collected")

    if not rss:
        print("[error] No RSS content fetched. Check network.")
        sys.exit(1)

    print("Generating digest with Claude…")
    prompt = build_prompt(reddit, rss, date_str)
    raw    = call_claude(prompt)

    if not raw:
        print("[error] Claude returned nothing.")
        sys.exit(1)

    # Strip markdown code fences if present
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    try:
        digest = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"[error] Invalid JSON from Claude: {e}")
        print(raw[:500])
        sys.exit(1)

    digest["generated_at"] = datetime.now(timezone.utc).isoformat()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    out_file.write_text(json.dumps(digest, indent=2))
    update_index(date_str, digest)

    # Set env var for GitHub Action commit message
    env_file = os.environ.get("GITHUB_ENV", "")
    if env_file:
        with open(env_file, "a") as f:
            f.write(f"PULSE_DATE={date_str}\n")

    print(f"✓ Saved → {out_file}")
    print(f"  Signal: {digest.get('the_signal', {}).get('headline', '')}")

if __name__ == "__main__":
    main()
