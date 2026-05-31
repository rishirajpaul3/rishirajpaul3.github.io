#!/usr/bin/env python3
"""
Weekly Build Tracker — Dashboard Generator
Reads the weekly JSON log and renders a Pillow PNG.

Run:  python3 scripts/tracker/weekly_dashboard.py data/weekly-log/2026-W22.json
      python3 scripts/tracker/weekly_dashboard.py           (uses latest log)
"""

import json
import sys
from datetime import datetime
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Install Pillow:  pip install Pillow")
    sys.exit(1)

# ── Design tokens ──────────────────────────────────────────────────────────────

BG        = (10,  11,  14)
PANEL     = (18,  20,  25)
PANEL2    = (24,  27,  33)
BORDER    = (38,  42,  52)
GOLD      = (201, 150, 59)
GOLD_DIM  = (140, 100, 38)
TEXT      = (220, 228, 240)
TEXT_MUT  = (130, 140, 158)
TEXT_DIM  = (72,  80,  96)
WHITE     = (240, 244, 252)

GRADE_COLORS = {
    "S+": (255, 107, 53),
    "S":  (255, 180, 40),
    "A+": (201, 150, 59),
    "A":  (160, 120, 40),
    "B":  (80,  190, 220),
    "C":  (220, 170, 60),
    "D":  (180, 70,  70),
}

PROJECT_COLORS = [
    (201, 150, 59),
    (80,  190, 220),
    (155, 138, 251),
    (74,  222, 128),
    (248, 113, 113),
    (251, 191, 36),
]

DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
DAY_KEYS   = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

W, H = 1600, 960
PAD  = 36

# ── Font loading ───────────────────────────────────────────────────────────────

def load_fonts():
    candidates = [
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/Monaco.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        "/usr/share/fonts/TTF/DejaVuSansMono.ttf",
    ]
    path = None
    for c in candidates:
        if Path(c).exists():
            path = c
            break

    def f(size):
        if path:
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
        return ImageFont.load_default()

    return {
        "xs":  f(11),
        "sm":  f(13),
        "md":  f(15),
        "lg":  f(18),
        "xl":  f(24),
        "xxl": f(32),
        "h1":  f(44),
    }

# ── Drawing helpers ────────────────────────────────────────────────────────────

def rect(draw, x, y, w, h, fill=PANEL, radius=8, border=None):
    draw.rounded_rectangle([x, y, x + w, y + h], radius=radius, fill=fill,
                           outline=border, width=1 if border else 0)

def text(draw, x, y, s, font, color=TEXT, anchor="lt"):
    draw.text((x, y), str(s), font=font, fill=color, anchor=anchor)

def pill(draw, x, y, label, font, fg, bg, border=None):
    bbox = font.getbbox(label)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x, pad_y = 14, 6
    pw, ph = tw + pad_x * 2, th + pad_y * 2
    draw.rounded_rectangle([x, y, x + pw, y + ph], radius=ph // 2, fill=bg,
                           outline=border or bg, width=1)
    draw.text((x + pad_x, y + pad_y), label, font=font, fill=fg, anchor="lt")
    return pw, ph

def hbar(draw, x, y, w, h, ratio, fill, bg=PANEL2, radius=4):
    rect(draw, x, y, w, h, fill=bg, radius=radius)
    if ratio > 0:
        rect(draw, x, y, max(int(w * ratio), radius * 2), h, fill=fill, radius=radius)

# ── Section renderers ──────────────────────────────────────────────────────────

def draw_header(draw, fonts, data):
    s = data.get("stats", {})
    week      = data.get("week", "—")
    dr        = data.get("date_range", "")
    grade     = s.get("letter_grade", "?")
    grade_col = GRADE_COLORS.get(grade, GOLD)

    # Background header strip
    draw.rectangle([0, 0, W, 72], fill=(14, 16, 20))
    draw.line([0, 72, W, 72], fill=BORDER, width=1)

    # Left: week label
    text(draw, PAD, 16, "RISHIRAJ PAUL", fonts["sm"], TEXT_DIM)
    text(draw, PAD, 34, "WEEKLY BUILD LOG", fonts["lg"], GOLD)

    # Center: date range
    text(draw, W // 2, 36, dr, fonts["md"], TEXT_MUT, anchor="mm")

    # Right: week + grade badge
    grade_w, _ = pill(draw, W - PAD - 110, 18, f" {grade} ", fonts["xl"],
                      (10, 11, 14), grade_col)
    text(draw, W - PAD - 120 - grade_w, 28, week, fonts["md"], TEXT_DIM)


def draw_stats_row(draw, fonts, data, y):
    s   = data.get("stats", {})
    tok = data.get("token_usage", [])

    stats = [
        ("OUTPUT SCORE",   s.get("output_score", 0),          GOLD),
        ("COMMITS",        s.get("total_commits", 0),          TEXT),
        ("FILES TOUCHED",  s.get("total_files", 0),            TEXT),
        ("ACTIVE DAYS",    f"{s.get('active_days', 0)}/7",     TEXT),
        ("LINES ADDED",    f"+{s.get('lines_added', 0)}",      (74, 222, 128)),
        ("LINES REMOVED",  f"-{s.get('lines_removed', 0)}",    (248, 113, 113)),
        ("GRADE",          s.get("letter_grade", "?"),         GRADE_COLORS.get(s.get("letter_grade","?"), GOLD)),
        ("CLAUDE COST",    f"${s.get('claude_cost_usd', 0):.2f}", (80, 190, 220)),
    ]

    card_w = (W - PAD * 2 - 7 * 8) // 8
    for i, (label, value, color) in enumerate(stats):
        cx = PAD + i * (card_w + 8)
        rect(draw, cx, y, card_w, 76, fill=PANEL, border=BORDER, radius=8)
        text(draw, cx + 14, y + 12, label, fonts["xs"], TEXT_DIM)
        text(draw, cx + 14, y + 34, str(value), fonts["xl"], color)


def draw_day_heatmap(draw, fonts, data, y):
    s         = data.get("daily_breakdown", {})
    max_score = max((s.get(d, {}).get("score", 0) for d in DAY_KEYS), default=1) or 1

    text(draw, PAD, y, "// DAILY ACTIVITY", fonts["xs"], TEXT_DIM)
    y += 20

    bar_w   = (W - PAD * 2 - 6 * 12) // 7
    bar_max = 100

    for i, (key, label) in enumerate(zip(DAY_KEYS, DAY_LABELS)):
        day = s.get(key, {})
        score   = day.get("score", 0)
        commits = day.get("commits", 0)
        lines   = day.get("lines_added", 0)
        ratio   = score / max_score

        cx = PAD + i * (bar_w + 12)

        # Background bar
        rect(draw, cx, y, bar_w, bar_max, fill=PANEL2, radius=6)

        # Fill bar
        if ratio > 0:
            fill_h = max(int(bar_max * ratio), 8)
            fill_y = y + bar_max - fill_h
            alpha  = int(80 + 175 * ratio)
            color  = (GOLD[0], GOLD[1], GOLD[2])
            rect(draw, cx, fill_y, bar_w, fill_h, fill=color, radius=6)

        # Score text
        text(draw, cx + bar_w // 2, y + bar_max + 8,  label,         fonts["xs"], TEXT_DIM,  anchor="mt")
        text(draw, cx + bar_w // 2, y + bar_max + 22, f"{score}pts", fonts["xs"], TEXT_MUT,  anchor="mt")
        if commits:
            text(draw, cx + bar_w // 2, y + bar_max + 36, f"{commits}c",  fonts["xs"], GOLD_DIM, anchor="mt")


def draw_accomplishments(draw, fonts, data, x, y, w, h):
    accs    = data.get("accomplishments", [])
    manuals = data.get("manual", [])
    all_acc = accs[:20] + manuals

    rect(draw, x, y, w, h, fill=PANEL, border=BORDER, radius=10)
    text(draw, x + 16, y + 14, "// ACCOMPLISHMENTS", fonts["xs"], GOLD_DIM)

    cy = y + 38
    max_y = y + h - 10

    for acc in all_acc:
        if cy >= max_y:
            break
        type_code  = acc.get("type", "other")
        title      = acc.get("title", "")[:42]
        pts        = acc.get("value_score", 0)
        repo       = acc.get("repo", "")
        day        = acc.get("day", "")[:3].upper()

        # Type pill
        pill_w, pill_h = pill(draw, x + 14, cy, type_code, fonts["xs"],
                              (10, 11, 14), GOLD_DIM)

        # Title
        text(draw, x + 14 + pill_w + 8, cy + 1, title, fonts["xs"], TEXT_MUT)

        # Points (right align)
        pts_str = f"+{pts}"
        text(draw, x + w - 14, cy + 1, pts_str, fonts["xs"], GOLD, anchor="rt")

        cy += 20
        # Sub-line: repo + day
        text(draw, x + 14, cy, f"{repo}  ·  {day}", fonts["xs"], TEXT_DIM)
        cy += 18

        draw.line([x + 14, cy, x + w - 14, cy], fill=BORDER, width=1)
        cy += 8


def draw_projects(draw, fonts, data, x, y, w, h):
    pb = data.get("project_breakdown", {})
    if not pb:
        return

    rect(draw, x, y, w, h, fill=PANEL, border=BORDER, radius=10)
    text(draw, x + 16, y + 14, "// PROJECT BREAKDOWN", fonts["xs"], GOLD_DIM)

    total_score = sum(v.get("score", 0) for v in pb.values()) or 1
    sorted_pb   = sorted(pb.items(), key=lambda kv: kv[1].get("score", 0), reverse=True)

    cy = y + 38
    for i, (name, pdata) in enumerate(sorted_pb):
        if cy > y + h - 40:
            break
        score   = pdata.get("score", 0)
        commits = pdata.get("commits", 0)
        files   = pdata.get("files", 0)
        ratio   = score / total_score
        color   = PROJECT_COLORS[i % len(PROJECT_COLORS)]

        text(draw, x + 14, cy, name, fonts["sm"], TEXT)
        text(draw, x + w - 14, cy, f"{score}pts", fonts["xs"], color, anchor="rt")
        cy += 18
        hbar(draw, x + 14, cy, w - 28, 8, ratio, fill=color, radius=4)
        cy += 14
        text(draw, x + 14, cy, f"{commits} commits  ·  {files} files", fonts["xs"], TEXT_DIM)
        cy += 22


def draw_claude_usage(draw, fonts, data, x, y, w, h):
    tok = data.get("token_usage", [])
    s   = data.get("stats", {})

    rect(draw, x, y, w, h, fill=PANEL, border=BORDER, radius=10)
    text(draw, x + 16, y + 14, "// CLAUDE CODE", fonts["xs"], GOLD_DIM)

    if not tok:
        text(draw, x + 16, y + 44, "No sessions this week", fonts["sm"], TEXT_DIM)
        return

    total_in    = sum(t.get("input_tokens", 0)       for t in tok)
    total_out   = sum(t.get("output_tokens", 0)       for t in tok)
    total_cr    = sum(t.get("cache_read_tokens", 0)   for t in tok)
    total_cw    = sum(t.get("cache_write_tokens", 0)  for t in tok)
    total_cost  = s.get("claude_cost_usd", 0)
    efficiency  = s.get("efficiency_rating", 0)
    output_score= s.get("output_score", 0)

    def fmt_k(n):
        return f"{n/1000:.1f}K" if n >= 1000 else str(n)

    cy = y + 38
    rows = [
        ("Sessions",     str(len(tok)),          TEXT),
        ("Input",        fmt_k(total_in),        TEXT_MUT),
        ("Output",       fmt_k(total_out),       TEXT_MUT),
        ("Cache read",   fmt_k(total_cr),        TEXT_DIM),
        ("Cache write",  fmt_k(total_cw),        TEXT_DIM),
        ("Total cost",   f"${total_cost:.4f}",   (80, 190, 220)),
        ("Efficiency",   f"{efficiency} pts/$",   GOLD),
    ]

    for label, val, color in rows:
        text(draw, x + 16, cy, label, fonts["xs"], TEXT_DIM)
        text(draw, x + w - 16, cy, val, fonts["xs"], color, anchor="rt")
        cy += 20

    cy += 8
    draw.line([x + 14, cy, x + w - 14, cy], fill=BORDER, width=1)
    cy += 12

    # Model breakdown
    model_counts = {}
    for t in tok:
        m = t.get("model", "unknown")
        short = m.split("-")[-1] if "-" in m else m
        model_counts[m] = model_counts.get(m, 0) + 1

    text(draw, x + 16, cy, "Model", fonts["xs"], TEXT_DIM)
    cy += 18
    for model, count in sorted(model_counts.items(), key=lambda x: -x[1]):
        short = model.replace("claude-", "").replace("-20", " 20")[:24]
        text(draw, x + 16, cy, f"{short}  ×{count}", fonts["xs"], GOLD_DIM)
        cy += 16


def draw_footer(draw, fonts, data, y):
    s     = data.get("stats", {})
    week  = data.get("week", "")
    score = s.get("output_score", 0)
    grade = s.get("letter_grade", "?")
    gen   = datetime.now().strftime("%a %d %b %Y · %H:%M")

    draw.line([0, y, W, y], fill=BORDER, width=1)
    text(draw, PAD, y + 14, f"rishiraj.paul · {week} · Score {score} · Grade {grade}", fonts["xs"], TEXT_DIM)
    text(draw, W - PAD, y + 14, f"Generated {gen}", fonts["xs"], TEXT_DIM, anchor="rt")

# ── Main render ────────────────────────────────────────────────────────────────

def render(data, out_path):
    img   = Image.new("RGB", (W, H), BG)
    draw  = ImageDraw.Draw(img)
    fonts = load_fonts()

    # Header (0–72)
    draw_header(draw, fonts, data)

    # Stats row (84–168)
    draw_stats_row(draw, fonts, data, y=84)

    # Day heatmap (184–340)
    draw_day_heatmap(draw, fonts, data, y=184)

    # Bottom panels (340–900)
    panel_y = 350
    panel_h = H - panel_y - 58

    left_w  = int((W - PAD * 2) * 0.44)
    mid_w   = int((W - PAD * 2) * 0.30)
    right_w = W - PAD * 2 - left_w - mid_w - 16

    left_x  = PAD
    mid_x   = PAD + left_w + 8
    right_x = mid_x + mid_w + 8

    draw_accomplishments(draw, fonts, data, left_x,  panel_y, left_w,  panel_h)
    draw_projects(       draw, fonts, data, mid_x,   panel_y, mid_w,   int(panel_h * 0.56))
    draw_claude_usage(   draw, fonts, data, right_x, panel_y, right_w, panel_h)

    # Footer
    draw_footer(draw, fonts, data, H - 46)

    img.save(out_path, "PNG", optimize=True)
    print(f"✓ Dashboard saved → {out_path}")

# ── Entry point ────────────────────────────────────────────────────────────────

def main():
    log_dir = Path(__file__).parent.parent.parent / "data" / "weekly-log"

    if len(sys.argv) > 1:
        json_path = Path(sys.argv[1])
    else:
        # Find the latest JSON in the log dir
        logs = sorted(log_dir.glob("*.json"))
        if not logs:
            print("No weekly log found. Run weekly_scan.py first.")
            sys.exit(1)
        json_path = logs[-1]

    if not json_path.exists():
        print(f"File not found: {json_path}")
        sys.exit(1)

    with open(json_path) as f:
        data = json.load(f)

    out_path = json_path.with_suffix(".png")
    render(data, out_path)

if __name__ == "__main__":
    main()
