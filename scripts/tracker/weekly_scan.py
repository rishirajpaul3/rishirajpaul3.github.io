#!/usr/bin/env python3
"""
Weekly Build Tracker — Scanner
Scans git history across all repos + Claude Code usage for the current ISO week.
Writes to data/weekly-log/YYYY-WXX.json

Run:  python3 scripts/tracker/weekly_scan.py
      python3 scripts/tracker/weekly_scan.py --week 2026-W22   (specific week)
      python3 scripts/tracker/weekly_scan.py add "built something cool"
      python3 scripts/tracker/weekly_scan.py todo "finish X"
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

REPOS = [
    ("personal-site",    "/Users/rishirajpaul/Desktop/rishirajpaul3.github.io"),
    ("sarava-notetaker", "/Users/rishirajpaul/Desktop/saravasales-notetaker"),
    ("lead-engine",      "/Users/rishirajpaul/Desktop/sarava-lead-engine"),
    ("pipeline-ai",      "/Users/rishirajpaul/Desktop/pipeline-ai"),
    ("deepaccount",      "/Users/rishirajpaul/Desktop/deepaccount"),
    ("outreachos",       "/Users/rishirajpaul/Desktop/outreachos-app"),
]

CLAUDE_PROJECTS_DIR = Path.home() / ".claude" / "projects"

OUTPUT_DIR = Path(__file__).parent.parent.parent / "public" / "weekly-log"

# Token pricing per million tokens
PRICING = {
    "claude-opus-4":     {"input": 15.00, "output": 75.00, "cache_read": 1.50,  "cache_write": 18.75},
    "claude-opus-4-5":   {"input": 15.00, "output": 75.00, "cache_read": 1.50,  "cache_write": 18.75},
    "claude-sonnet-4-6": {"input":  3.00, "output": 15.00, "cache_read": 0.30,  "cache_write":  3.75},
    "claude-haiku-4-5":  {"input":  0.25, "output":  1.25, "cache_read": 0.025, "cache_write":  0.3125},
}

# File classification: (regex pattern, type_code, points)
TYPE_RULES = [
    # Next.js pages and routes
    (r"app/.+/page\.(tsx|ts|jsx|js)$",             "new_page",       25),
    (r"app/.+/route\.(tsx|ts|js)$",                "new_api_route",  20),
    (r"pages/.+\.(tsx|ts|jsx|js)$",                "new_page",       25),
    # Components and UI
    (r"components/.+\.(tsx|jsx)$",                 "new_component",  10),
    # FastAPI services and routers
    (r"services/.+\.py$",                          "new_service",    20),
    (r"routers/.+\.py$",                           "new_router",     15),
    # Data files
    (r"data/.+\.(ts|tsx|json)$",                   "data_file",       8),
    # Scripts and automation
    (r"scripts/.+\.(py|js|sh)$",                   "script",          8),
    # Config and infra
    (r"\.(toml|yaml|yml|nixpacks|Procfile)$",       "config",          5),
    (r"(package\.json|requirements\.txt|tsconfig)", "config",          5),
    # Styles
    (r"\.(css|module\.css|scss)$",                  "style",           3),
    # General TypeScript / Python
    (r"\.(tsx|ts|jsx|js)$",                         "code_change",     8),
    (r"\.py$",                                       "code_change",     8),
    # Markdown / docs
    (r"\.(md|mdx)$",                                "doc",             3),
]

GRADE_THRESHOLDS = [
    (500, "S+"), (350, "S"), (200, "A+"), (100, "A"),
    (40,  "B"),  (10,  "C"), (0,   "D"),
]

DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

# ── Week helpers ───────────────────────────────────────────────────────────────

def current_week_bounds():
    today = datetime.now().date()
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
    return monday, sunday

def parse_week_arg(arg):
    m = re.match(r"(\d{4})-W(\d{2})", arg)
    if not m:
        raise ValueError(f"Invalid week format: {arg}. Use YYYY-WXX")
    year, week = int(m.group(1)), int(m.group(2))
    monday = datetime.strptime(f"{year}-W{week:02d}-1", "%G-W%V-%u").date()
    sunday = monday + timedelta(days=6)
    return monday, sunday

def week_label(monday):
    iso = monday.isocalendar()
    return f"{iso[0]}-W{iso[1]:02d}"

def date_range_label(monday, sunday):
    if monday.month == sunday.month:
        return f"{monday.strftime('%b %d')}–{sunday.strftime('%d, %Y')}"
    return f"{monday.strftime('%b %d')} – {sunday.strftime('%b %d, %Y')}"

# ── Classification ─────────────────────────────────────────────────────────────

def classify_file(path):
    for pattern, type_code, points in TYPE_RULES:
        if re.search(pattern, path, re.IGNORECASE):
            return type_code, points
    return "other", 1

def grade(score):
    for threshold, letter in GRADE_THRESHOLDS:
        if score >= threshold:
            return letter
    return "D"

# ── Git scanning ───────────────────────────────────────────────────────────────

def is_git_repo(path):
    return (Path(path) / ".git").exists()

def get_commits(repo_path, since, until):
    """Return list of {hash, date, message, files, lines_added, lines_removed}."""
    try:
        log_out = subprocess.check_output([
            "git", "log",
            f"--after={since}T00:00:00",
            f"--before={until}T23:59:59",
            "--pretty=format:COMMIT|%H|%ad|%s",
            "--date=format:%Y-%m-%dT%H:%M:%S",
            "--name-only",
        ], cwd=repo_path, stderr=subprocess.DEVNULL, text=True)
    except subprocess.CalledProcessError:
        return []

    commits = []
    current = None
    for line in log_out.splitlines():
        if line.startswith("COMMIT|"):
            if current:
                commits.append(current)
            _, chash, date_str, message = line.split("|", 3)
            current = {"hash": chash, "date": date_str, "message": message, "files": []}
        elif line.strip() and current:
            current["files"].append(line.strip())
    if current:
        commits.append(current)

    # Add line stats per commit
    for c in commits:
        try:
            stat = subprocess.check_output([
                "git", "show", "--stat", "--format=", c["hash"]
            ], cwd=repo_path, stderr=subprocess.DEVNULL, text=True)
            added = removed = 0
            for stat_line in stat.splitlines():
                m = re.search(r"(\d+) insertion", stat_line)
                if m:
                    added += int(m.group(1))
                m = re.search(r"(\d+) deletion", stat_line)
                if m:
                    removed += int(m.group(1))
            c["lines_added"] = added
            c["lines_removed"] = removed
        except Exception:
            c["lines_added"] = 0
            c["lines_removed"] = 0

    return commits

# ── Claude Code usage ──────────────────────────────────────────────────────────

def model_short(model_id):
    if "opus" in model_id:
        return "opus"
    if "sonnet" in model_id:
        return "sonnet"
    if "haiku" in model_id:
        return "haiku"
    return model_id

def calc_cost(model_id, input_t, output_t, cache_read_t, cache_write_t):
    key = None
    for k in PRICING:
        if k in model_id:
            key = k
            break
    if not key:
        key = "claude-sonnet-4-6"
    p = PRICING[key]
    return (
        input_t      / 1_000_000 * p["input"]       +
        output_t     / 1_000_000 * p["output"]      +
        cache_read_t / 1_000_000 * p["cache_read"]  +
        cache_write_t/ 1_000_000 * p["cache_write"]
    )

def scan_claude_usage(since_dt, until_dt):
    sessions = []
    if not CLAUDE_PROJECTS_DIR.exists():
        return sessions

    for project_dir in CLAUDE_PROJECTS_DIR.iterdir():
        if not project_dir.is_dir():
            continue
        for jsonl_file in project_dir.glob("*.jsonl"):
            mtime = datetime.fromtimestamp(jsonl_file.stat().st_mtime)
            if not (since_dt <= mtime <= until_dt + timedelta(days=1)):
                continue

            agg = {
                "project":          project_dir.name,
                "file":             jsonl_file.name,
                "input_tokens":     0,
                "output_tokens":    0,
                "cache_read_tokens":  0,
                "cache_write_tokens": 0,
                "model":            "claude-sonnet-4-6",
                "source":           "claude-code",
                "logged_at":        mtime.strftime("%H:%M"),
                "cost":             0.0,
            }
            try:
                with open(jsonl_file, encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        line = line.strip()
                        if not line:
                            continue
                        try:
                            msg = json.loads(line)
                        except json.JSONDecodeError:
                            continue
                        if "usage" in msg:
                            u = msg["usage"]
                            agg["input_tokens"]       += u.get("input_tokens", 0)
                            agg["output_tokens"]      += u.get("output_tokens", 0)
                            agg["cache_read_tokens"]  += u.get("cache_read_input_tokens", 0)
                            agg["cache_write_tokens"] += u.get("cache_creation_input_tokens", 0)
                        if "model" in msg and msg["model"]:
                            agg["model"] = msg["model"]
            except Exception:
                continue

            agg["cost"] = calc_cost(
                agg["model"],
                agg["input_tokens"], agg["output_tokens"],
                agg["cache_read_tokens"], agg["cache_write_tokens"],
            )
            if agg["input_tokens"] > 0:
                sessions.append(agg)

    return sessions

# ── Core scan ──────────────────────────────────────────────────────────────────

def scan_week(monday, sunday):
    since_str = monday.isoformat()
    until_str = sunday.isoformat()
    since_dt  = datetime.combine(monday, datetime.min.time())
    until_dt  = datetime.combine(sunday, datetime.max.time())

    accomplishments = []
    project_breakdown = {}
    daily_breakdown = {d: {"score": 0, "commits": 0, "files": 0, "lines_added": 0, "lines_removed": 0} for d in DAYS}
    seen_files = set()  # (repo, path) — deduplicate

    total_lines_added = total_lines_removed = 0

    for repo_name, repo_path in REPOS:
        if not os.path.isdir(repo_path) or not is_git_repo(repo_path):
            continue

        commits = get_commits(repo_path, since_str, until_str)
        if not commits:
            continue

        repo_score = 0
        repo_commits = len(commits)
        repo_files = set()

        for commit in commits:
            commit_dt = datetime.fromisoformat(commit["date"])
            day_name  = DAYS[commit_dt.weekday()]

            daily_breakdown[day_name]["commits"]       += 1
            daily_breakdown[day_name]["lines_added"]   += commit["lines_added"]
            daily_breakdown[day_name]["lines_removed"] += commit["lines_removed"]
            total_lines_added   += commit["lines_added"]
            total_lines_removed += commit["lines_removed"]

            for file_path in commit["files"]:
                key = (repo_name, file_path)
                if key in seen_files:
                    continue
                seen_files.add(key)
                repo_files.add(file_path)

                type_code, pts = classify_file(file_path)
                filename = Path(file_path).name

                acc = {
                    "repo":        repo_name,
                    "type":        type_code,
                    "title":       commit["message"][:60] if len(commit["files"]) == 1 else filename,
                    "path":        file_path,
                    "source":      "git",
                    "day":         day_name,
                    "timestamp":   commit_dt.isoformat(),
                    "value_score": pts,
                    "commit_msg":  commit["message"][:80],
                }
                accomplishments.append(acc)

                repo_score += pts
                daily_breakdown[day_name]["score"] += pts
                daily_breakdown[day_name]["files"] += 1

        project_breakdown[repo_name] = {
            "score":   repo_score,
            "commits": repo_commits,
            "files":   len(repo_files),
        }

    # Sort accomplishments by score desc
    accomplishments.sort(key=lambda x: x["value_score"], reverse=True)

    # Claude Code usage
    token_usage = scan_claude_usage(since_dt, until_dt)
    total_cost  = sum(s["cost"] for s in token_usage)
    total_input = sum(s["input_tokens"] for s in token_usage)
    total_output= sum(s["output_tokens"] for s in token_usage)

    output_score = sum(a["value_score"] for a in accomplishments)
    letter       = grade(output_score)
    active_days  = sum(1 for d in daily_breakdown.values() if d["commits"] > 0)
    total_commits= sum(c["commits"] for c in project_breakdown.values())
    total_files  = len(seen_files)
    efficiency   = round(output_score / total_cost, 1) if total_cost > 0 else 0

    return {
        "week":             week_label(monday),
        "date_range":       date_range_label(monday, sunday),
        "generated_at":     datetime.now().isoformat(),
        "version":          1,
        "repos_scanned":    [r[0] for r in REPOS if os.path.isdir(r[1]) and is_git_repo(r[1])],
        "accomplishments":  accomplishments,
        "daily_breakdown":  daily_breakdown,
        "project_breakdown":project_breakdown,
        "token_usage":      token_usage,
        "todos":            [],
        "manual":           [],
        "stats": {
            "output_score":     output_score,
            "letter_grade":     letter,
            "total_commits":    total_commits,
            "total_files":      total_files,
            "lines_added":      total_lines_added,
            "lines_removed":    total_lines_removed,
            "lines_net":        total_lines_added - total_lines_removed,
            "active_days":      active_days,
            "claude_cost_usd":  round(total_cost, 4),
            "total_input_tokens":  total_input,
            "total_output_tokens": total_output,
            "efficiency_rating":   efficiency,
            "score_breakdown": sorted(
                [{"repo": a["repo"], "type": a["type"], "title": a["title"], "points": a["value_score"]}
                 for a in accomplishments],
                key=lambda x: x["points"], reverse=True
            )[:15],
        },
    }

# ── Merge with existing ────────────────────────────────────────────────────────

def merge(existing, fresh):
    """Preserve manual entries, todos, and cursor token entries."""
    fresh["todos"]  = existing.get("todos",  [])
    fresh["manual"] = existing.get("manual", [])
    # Preserve non-claude-code token entries
    manual_tokens = [t for t in existing.get("token_usage", []) if t.get("source") != "claude-code"]
    fresh["token_usage"] = manual_tokens + [t for t in fresh["token_usage"] if t.get("source") == "claude-code"]
    return fresh

# ── CLI commands ───────────────────────────────────────────────────────────────

def load_or_init(out_path, monday, sunday):
    if out_path.exists():
        with open(out_path) as f:
            return json.load(f)
    return {"week": week_label(monday), "todos": [], "manual": [], "token_usage": []}

def update_index(label, merged):
    index_path = OUTPUT_DIR / "index.json"
    index = []
    if index_path.exists():
        try:
            index = json.loads(index_path.read_text())
        except Exception:
            index = []
    index = [w for w in index if w.get("week") != label]
    index.insert(0, {
        "week":       label,
        "date_range": merged.get("date_range", ""),
        "grade":      merged.get("stats", {}).get("letter_grade", "?"),
        "score":      merged.get("stats", {}).get("output_score", 0),
        "commits":    merged.get("stats", {}).get("total_commits", 0),
    })
    index_path.write_text(json.dumps(index, indent=2))

def cmd_scan(monday, sunday):
    label = week_label(monday)
    out_path = OUTPUT_DIR / f"{label}.json"
    print(f"Scanning week {label} ({date_range_label(monday, sunday)})…")
    fresh = scan_week(monday, sunday)
    existing = load_or_init(out_path, monday, sunday)
    merged = merge(existing, fresh)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(merged, f, indent=2)
    update_index(label, merged)
    s = merged["stats"]
    print(f"\n✓ {label} saved → {out_path}")
    print(f"  Score: {s['output_score']}  Grade: {s['letter_grade']}  Commits: {s['total_commits']}  Files: {s['total_files']}")
    print(f"  Lines +{s['lines_added']} / -{s['lines_removed']}  Claude cost: ${s['claude_cost_usd']}")
    return out_path

def cmd_add(monday, sunday, description):
    label = week_label(monday)
    out_path = OUTPUT_DIR / f"{label}.json"
    data = load_or_init(out_path, monday, sunday)
    entry = {
        "type":        "manual",
        "title":       description,
        "source":      "manual",
        "timestamp":   datetime.now().isoformat(),
        "value_score": 5,
    }
    data.setdefault("manual", []).append(entry)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"✓ Added manual entry: {description}")

def cmd_todo(monday, sunday, task):
    label = week_label(monday)
    out_path = OUTPUT_DIR / f"{label}.json"
    data = load_or_init(out_path, monday, sunday)
    data.setdefault("todos", []).append({"task": task, "done": False, "added": datetime.now().isoformat()})
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"✓ Added TODO: {task}")

def cmd_done(monday, sunday, idx):
    label = week_label(monday)
    out_path = OUTPUT_DIR / f"{label}.json"
    data = load_or_init(out_path, monday, sunday)
    todos = data.get("todos", [])
    if 0 <= idx < len(todos):
        todos[idx]["done"] = True
        with open(out_path, "w") as f:
            json.dump(data, f, indent=2)
        print(f"✓ Marked done: {todos[idx]['task']}")
    else:
        print(f"No TODO at index {idx}")

def cmd_next(monday, sunday):
    label = week_label(monday)
    out_path = OUTPUT_DIR / f"{label}.json"
    if not out_path.exists():
        print("No log for this week yet. Run the scanner first.")
        return
    data = json.load(open(out_path))
    todos = [t for t in data.get("todos", []) if not t.get("done")]
    print(f"\n── Pending TODOs ({len(todos)}) ──")
    for i, t in enumerate(todos):
        print(f"  [{i}] {t['task']}")

def cmd_week(monday, sunday):
    # Show last 7 weeks summary
    print("\n── Last 7 weeks ──")
    for w in range(7):
        m = monday - timedelta(weeks=w)
        label = week_label(m)
        path  = OUTPUT_DIR / f"{label}.json"
        if path.exists():
            data = json.load(open(path))
            s = data.get("stats", {})
            print(f"  {label}  {s.get('letter_grade','?'):3}  score={s.get('output_score',0):4}  commits={s.get('total_commits',0):3}  +{s.get('lines_added',0)} lines")
        else:
            print(f"  {label}  —")

# ── Entry point ────────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]

    # Determine week
    monday, sunday = current_week_bounds()
    for i, a in enumerate(args):
        if re.match(r"\d{4}-W\d{2}", a):
            monday, sunday = parse_week_arg(a)
            args.pop(i)
            break

    if not args or args[0] == "scan":
        out_path = cmd_scan(monday, sunday)
        # Auto-generate dashboard if script exists
        dashboard = Path(__file__).parent / "weekly_dashboard.py"
        if dashboard.exists():
            import subprocess as sp
            sp.run(["python3", str(dashboard), str(out_path)], check=False)
    elif args[0] == "add" and len(args) > 1:
        cmd_add(monday, sunday, " ".join(args[1:]))
    elif args[0] == "todo" and len(args) > 1:
        cmd_todo(monday, sunday, " ".join(args[1:]))
    elif args[0] == "done" and len(args) > 1:
        cmd_done(monday, sunday, int(args[1]))
    elif args[0] == "next":
        cmd_next(monday, sunday)
    elif args[0] == "week":
        cmd_week(monday, sunday)
    else:
        print(__doc__)

if __name__ == "__main__":
    main()
