# Rishiraj Paul — Portfolio Design Spec

> One build. Done properly. Improved over time.

---

## Tech Stack Decision

### Why Next.js (not plain HTML)

| | Plain HTML (what we have) | **Next.js (recommended)** |
|---|---|---|
| URLs | `/blog.html` | `/blog` (clean) |
| Auto-updates | GitHub Action writes JSON, JS reads it | **ISR — page rebuilds itself every hour without any action** |
| Animations | Manual JS | Framer Motion — industry standard, buttery smooth |
| Components | Copy-paste HTML blocks | Reusable React components |
| SEO | Basic | Full control + Open Graph + sitemap |
| Routing | Multiple HTML files | Single codebase, instant navigation |
| Hosting | GitHub Pages | **Vercel (free) — deploys on every git push** |

**Verdict: Next.js 15 + TypeScript + Framer Motion + Tailwind CSS on Vercel.**

Shawn uses this exact stack. It is the industry standard for personal sites that need to look serious.

---

## Design Direction: Dark Luxury / Futuristic Cream

Inspiration: Rolls-Royce web, Linear.app, editorial magazine layouts.

### Color System

```
Background:    #0c0904   (deep warm black — like aged leather)
Surface:       #16110a   (warm dark surface)
Surface-2:     #1e1810   (card background)
Border:        #2e2518   (warm border)
Text:          #f0e6d0   (cream white)
Text-muted:    #9a8a72   (warm muted)
Text-dim:      #5a4e3c   (very dim)
Gold:          #c9963b   (primary accent — warm gold)
Gold-light:    #e8b84b   (hover/highlight)
Gold-bg:       rgba(201,150,59,0.10)
```

### Typography

| Use | Font | Notes |
|---|---|---|
| **Big headings** | `Space Grotesk` | Free on Google Fonts. Clean, futuristic, premium. |
| **Display / hero** | `Bricolage Grotesque` | Already used — keep it. Big, editorial. |
| **Body / labels / code** | `JetBrains Mono` | Technical identity — keep it. |

### Texture & Depth
- **Grain overlay**: 3–5% noise texture on background — gives that premium printed feel
- **Radial glow**: subtle gold gradient bloom behind hero text
- **Card depth**: warm inner glow on cards, not flat borders
- **Parallax**: hero elements move at different speeds on scroll

### Animations (Framer Motion)
- **Page transitions**: fade + slight upward slide, 0.4s
- **Scroll reveals**: staggered children, 0.6s ease out
- **Magnetic cursor**: cursor attracted to buttons on hover
- **Number counters**: stats count up when scrolled into view
- **Card tilt**: subtle 3D perspective tilt on mouse move
- **Hero text**: character-by-character reveal on load

---

## Site Structure

```
/                     Home
/blog                 Live feed — All / Blog / LinkedIn / GitHub tabs
/projects             All deployed projects with deep detail
/about                Full story + timeline
```

---

## Page Designs

### / — Home

```
┌─────────────────────────────────────────────────────────┐
│  NAV: rishiraj.paul  [home] [blog] [projects] [about]  │
│       [contact]                                          │
│       ──────────────────────── [· open to work]         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  // GTM ENGINEER                                         │
│                                                          │
│  I build the revenue                                     │
│  systems that ops teams        (Space Grotesk, ~80px)   │
│  couldn't.                     (em: gold highlight)      │
│                                                          │
│  From 50+ reps on the ops floor to AI pipelines         │
│  running 24/7 on Railway.                               │
│                                                          │
│  [See what I've built →]  [Work with me]               │
│                                                          │
│  ──────────────────────────────────────────             │
│  10+ systems · 2× reply lift · 80% automated · 11 repos │
│  (stats count up on scroll)                             │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  STORY CARDS (3-col, slight 3D tilt on hover)           │
│  [OPS FLOOR 2018–22] [MSc LONDON 22–23] [BUILDER NOW]  │
│                                                          │
│  Read the full arc →                                     │
├─────────────────────────────────────────────────────────┤
│  DEPLOYED — Production systems running right now        │
│  (4 project cards, LIVE badge, tech stack, links)       │
├─────────────────────────────────────────────────────────┤
│  OPEN SOURCE — Latest from GitHub (live via API)        │
│  (6 repo cards, auto-updates every page load)           │
├─────────────────────────────────────────────────────────┤
│  SERVICES — 4 cards (outbound, enrichment, CRM, signal) │
├─────────────────────────────────────────────────────────┤
│  IMPACT — 2× · 10+ · 80% · 50+ (animated counters)    │
├─────────────────────────────────────────────────────────┤
│  // FOLLOW THE BUILD (subscribe strip)                  │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

### /blog — Live Feed

```
┌─────────────────────────────────────────────────────────┐
│  RP  Rishiraj Paul  · LIVE                               │
│      GTM Engineer · building in public                   │
│                              [+ Follow on LinkedIn]      │
├─────────────────────────────────────────────────────────┤
│  [All · N]  [Blog · N]  [LinkedIn · N]  [GitHub · N]    │
│  ─────────────────────────────────────────              │
│  Feed cards (auto-loaded, sorted by date)               │
│  Each card: source badge · date · title · excerpt       │
│             tags · read more link                        │
├─────────────────────────────────────────────────────────┤
│  // subscribe to follow the build                        │
└─────────────────────────────────────────────────────────┘
```

---

## Auto-Update Architecture

```
┌─────────────────────────────────────────────────────────┐
│  SOURCE              METHOD              UPDATE FREQ    │
├─────────────────────────────────────────────────────────┤
│  GitHub repos/stars  GitHub API          Every page     │
│                      Next.js ISR         Every 1 hour   │
├─────────────────────────────────────────────────────────┤
│  Blog posts          /posts/*.md files   On git push    │
│                      build-posts action  Instant        │
├─────────────────────────────────────────────────────────┤
│  LinkedIn posts      data/content.json  Manual update  │
│                      (LinkedIn has no   + GitHub Action │
│                       public posts API) trigger        │
├─────────────────────────────────────────────────────────┤
│  GitHub stats        /api/github route  Every 1 hour   │
│  (follower count,    Next.js ISR        (revalidate)   │
│   repo count,                                          │
│   total stars)                                         │
└─────────────────────────────────────────────────────────┘
```

**The big unlock with Next.js ISR:**
The site automatically fetches fresh GitHub data and rebuilds pages on a schedule — no GitHub Actions, no manual pushes, no stale data. This is what "automatically updates" really means.

---

## Component Plan

```
src/
├── app/
│   ├── page.tsx              Home
│   ├── blog/page.tsx         Blog feed
│   ├── projects/page.tsx     All projects
│   ├── about/page.tsx        Full story
│   └── api/
│       └── github/route.ts   GitHub data endpoint (cached)
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── StoryCards.tsx
│   ├── ProjectCard.tsx
│   ├── RepoGrid.tsx          (live GitHub)
│   ├── BlogFeed.tsx          (tabs + feed)
│   ├── StatCounter.tsx       (animated numbers)
│   ├── ContactForm.tsx
│   └── Subscribe.tsx
├── lib/
│   ├── github.ts             GitHub API client
│   └── posts.ts              Markdown post parser
└── styles/
    └── globals.css           Design tokens + base styles
```

---

## What This Beats vs. Shawn

| | Shawn | Rishiraj (this build) |
|---|---|---|
| Design | Clean minimal light | **Dark luxury, gold accents, grain texture** |
| Animations | Basic | **Framer Motion — magnetic cursor, 3D tilt, counters** |
| Deployed apps | n8n workflows only | **4 real production AI systems** |
| Story | "Plumber" hook | **Ops floor → code — equally strong** |
| Auto-update | Blog feed (empty) | **GitHub live + blog + LinkedIn + ISR** |
| Contact form | None | **Working form** |

---

## Build Order

1. `npx create-next-app@latest` — scaffold
2. Design tokens + globals.css (color system, fonts, grain texture)
3. Layout: Nav + right rail + footer
4. Home page (hero, story cards, projects, GitHub, services, stats)
5. Blog page (tabs, feed)
6. GitHub API route + ISR
7. Blog post markdown system
8. Animations (Framer Motion — last, so they're additive not blocking)
9. Deploy to Vercel

---

*Approve this spec → then we build. One time. Done right.*
