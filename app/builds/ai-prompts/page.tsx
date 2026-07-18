"use client";
import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import { motion } from "framer-motion";
import Link from "next/link";

type Prompt = {
  id: string;
  name: string;
  category: string;
  model: string;
  desc: string;
  prompt: string;
};

const prompts: Prompt[] = [
  {
    id: "icp-fit-scorer",
    name: "ICP Fit Scorer",
    category: "Prospecting",
    model: "GPT-4o / Claude",
    desc: "Paste in company data and get a structured ICP fit score with reasoning. I use this in Clay to triage lists before they hit any sequence.",
    prompt: `You are a B2B sales analyst. Given the following company data, score this company's fit against my ICP and explain your reasoning.

ICP criteria:
- Industry: SaaS, FinTech, or professional services
- Headcount: 20–500 employees
- Region: UK, US, or DACH
- Signals: Recently hired SDRs or RevOps, or raised a Series A/B in the last 18 months

Company data:
{{company_name}}, {{industry}}, {{headcount}}, {{location}}, {{recent_funding}}, {{recent_hires}}

Return a JSON object with:
- fit_score: number from 0 to 100
- tier: "Hot", "Warm", or "Cold"
- reasons: array of 2–4 bullet points explaining the score
- recommended_action: "Prioritise", "Monitor", or "Skip"`,
  },
  {
    id: "clay-icp-signal-scorer",
    name: "Clay AI Column: ICP Signal Scorer",
    category: "Clay & Enrichment",
    model: "GPT-4o / Claude",
    desc: "Runs as an AI column in Clay. Reads company data from multiple enrichment sources and returns a fit score, tier, and outreach angle per row — so you only write to the top accounts.",
    prompt: `You are a B2B sales analyst running inside a Clay AI column. Read the company data below and score how well this company fits the ICP for a GTM infrastructure vendor.

Company data:
- Company name: {{company_name}}
- Industry: {{industry}}
- Headcount: {{headcount}}
- Location: {{location}}
- Funding stage: {{funding_stage}}
- Recent funding: {{recent_funding}}
- Tech stack (known): {{tech_stack}}
- Recent hires (roles): {{recent_hires}}
- LinkedIn about section: {{linkedin_about}}
- Website description: {{website_description}}

ICP definition:
- Industry: B2B SaaS, FinTech, professional services, or agencies
- Headcount: 15–500 employees
- Has or is building a sales team (SDRs, AEs, RevOps, Sales Ops)
- Using or likely to need: CRM (HubSpot or Salesforce), outbound tools, or data enrichment
- Signals of active GTM investment: hiring for sales roles, recent funding, new market expansion

Return JSON only:
{
  "fit_score": <0-100>,
  "tier": <"Hot" | "Warm" | "Cold">,
  "icp_match_reasons": [<2-4 specific reasons why they match or do not>],
  "strongest_signal": <the single most compelling reason to reach out, or null>,
  "recommended_action": <"Reach out now" | "Add to nurture" | "Skip">,
  "suggested_angle": <one sentence on what to lead with in outreach, or null if Cold>
}

Return JSON only. No text outside the object.`,
  },
  {
    id: "signal-prioritisation",
    name: "Signal Prioritisation Ranker",
    category: "Prospecting",
    model: "GPT-4o / Claude",
    desc: "Paste all the enrichment signals you have on a prospect and get back a ranked top 5 with outreach hooks. Useful when Clay returns 20+ data points and you need to decide what to lead with.",
    prompt: `You are a GTM prioritisation analyst. A sales rep has enriched a prospect with multiple signals. Rank those signals by outreach priority and tell the rep exactly what to do.

Prospect:
- Company: {{company_name}}, {{industry}}, {{headcount}} employees
- Contact: {{contact_name}}, {{contact_title}}

Signals detected (unranked):
{{signals_list}}
(paste each signal as a bullet — e.g. "- Raised Series A 3 weeks ago", "- Hired 4 SDRs in last 60 days", "- CTO posted about scaling infrastructure", "- Using HubSpot based on job posts")

Rank the top 5 signals by outreach priority. For each:
- Rank: 1 (highest) to 5
- Signal: restate it clearly
- Why it matters: one sentence on what this reveals about buying intent or timing
- Urgency: "Act now" / "Act this week" / "Monitor"
- Outreach hook: one sentence that uses this signal as a natural opening without feeling like surveillance

Then give:
- Recommended first touch: which channel (email or LinkedIn), which signal to lead with, and why
- What to avoid: one thing that would kill the reply rate or feel creepy

Return as structured output. This goes directly into a sequence brief.`,
  },
  {
    id: "pain-from-jd",
    name: "Pain Point Extractor from Job Descriptions",
    category: "Prospecting",
    model: "GPT-4o / Claude",
    desc: "Paste a job description and extract what's broken in their GTM stack. Job ads are the most honest thing companies publish — they list exactly what's not working.",
    prompt: `You are a GTM analyst reading between the lines of a job description to understand what problems this company is trying to solve.

Job description:
{{job_description}}

Extract:
1. What process or function are they clearly struggling with right now?
2. What tools or skills are they looking for — and what does that reveal about their current stack gaps?
3. What buying signals does this JD contain for a B2B SaaS or services vendor?
4. What is the single most actionable outreach angle based on this JD?

Keep it practical. No fluff. This output goes directly into a cold email.`,
  },
  {
    id: "funding-outreach",
    name: "Funding Round Outreach Email",
    category: "Prospecting",
    model: "GPT-4o / Claude",
    desc: "A company just raised. Here's how I write the outreach — specifically for the 30-day window after a funding announcement when they are actively spending on growth infrastructure.",
    prompt: `Write a cold email to a company that recently raised a funding round. The email should be relevant to the funding news without being generic.

Context:
- Company: {{company_name}}
- Funding round: {{round}} (e.g. Series A, $8M)
- Contact: {{first_name}}, {{job_title}}
- What we help with: {{value_prop}} (e.g. building outbound infrastructure to support a new SDR team)

Rules:
- Reference the funding round naturally — do not lead with it
- Tie the funding to a specific growth challenge they are likely facing right now
- Show you understand what comes after raising (hiring pressure, pipeline targets, board metrics)
- Under 100 words
- One question at the end, not a calendar link

Output only the email body. No subject line.`,
  },
  {
    id: "cold-email-opener",
    name: "Cold Email First Line Generator",
    category: "Cold Email",
    model: "GPT-4o / Claude",
    desc: "Generates a personalised opening line from a LinkedIn profile or company page. Runs as an AI column in Clay — one line per row, no manual writing.",
    prompt: `You are writing a cold email first line for a B2B outreach campaign. Your goal is one highly specific, non-generic sentence that shows you actually looked at this person.

Prospect info:
- Name: {{first_name}}
- Role: {{job_title}} at {{company_name}}
- Recent activity or signal: {{signal}} (e.g. just hired 3 SDRs, launched in a new market, posted about pipeline problems)

Rules:
- Max 20 words
- No flattery ("I loved your post about...")
- Reference something real and specific
- Do not mention their company name more than once
- End with a natural transition into value, not a question

Output only the first line. No subject line. No explanation.`,
  },
  {
    id: "subject-line-gen",
    name: "Cold Email Subject Line Generator",
    category: "Cold Email",
    model: "GPT-4o / Claude",
    desc: "Generates 10 subject line variants across different angles — curiosity, specificity, social proof, pain. I A/B test the top 2 before scaling any sequence.",
    prompt: `Generate 10 cold email subject lines for a B2B outreach campaign. Each should use a different psychological angle.

Context:
- Sender: {{sender_name}}, {{sender_role}}
- Product or service: {{value_prop}}
- Target: {{target_title}} at {{target_company_type}}
- Main pain point being addressed: {{pain_point}}

Generate one subject line for each angle:
1. Specificity — a real number or outcome
2. Curiosity — makes them wonder without being clickbait
3. Pain — names the problem directly
4. Social proof — references a customer or result
5. Timing — references a signal or moment
6. Question — a short, direct question
7. Personalisation — uses their company or role
8. Contrarian — challenges a common assumption
9. Short — 3 words or fewer
10. Lowercased casual — like a message from a colleague

Output as a numbered list. No explanations.`,
  },
  {
    id: "follow-up-email",
    name: "Follow-Up Email After No Reply",
    category: "Cold Email",
    model: "GPT-4o / Claude",
    desc: "Writes a follow-up that adds value instead of just bumping the thread. The goal is to give them a reason to reply, not just remind them you exist.",
    prompt: `Write a follow-up email for a B2B cold outreach sequence. The prospect did not reply to the first email. This is touch {{touch_number}} (e.g. 2, 3, 4).

Context:
- Prospect: {{first_name}}, {{job_title}} at {{company_name}}
- First email topic: {{first_email_summary}}
- New angle or value to add: {{new_angle}} (e.g. a relevant case study, a stat, a recent news item about their company, a short loom video)

Rules:
- Do not say "just following up" or "circling back"
- Add something new — a resource, a stat, a question, or a short insight
- Keep it under 80 words
- One clear CTA at the end — a question or a soft ask
- Match the tone of the first email

Output only the email body. No subject line.`,
  },
  {
    id: "sequence-brief",
    name: "Outreach Sequence Brief Generator",
    category: "Sequences",
    model: "Claude / GPT-4o",
    desc: "Give it an ICP and a trigger signal, get back a full multi-step sequence strategy with angles, tone, subject lines, and message frameworks per step. What I write before building any sequence in Instantly or Smartlead.",
    prompt: `You are a GTM strategist writing a cold outreach sequence brief. A sales rep will use this to build a full multi-channel sequence.

Input:
- ICP: {{icp_description}} (e.g. "VP Sales at Series B SaaS companies, 50-200 employees, UK or US")
- Trigger or signal: {{signal}} (e.g. "company just raised Series A", "posted a job for Head of RevOps", "new VP Sales started 30 days ago")
- Our value proposition: {{value_prop}}
- Sequence length: {{num_steps}} steps
- Channels available: {{channels}} (e.g. "Email + LinkedIn")

Write a complete sequence brief. For each step include:
- Step number and channel
- Day to send (relative to step 1)
- Angle — the specific idea or hook for this touch
- Tone — (e.g. direct, curious, value-add, pattern interrupt, break-up)
- Subject line options (for email steps) — give 2 variants
- Message framework — not a written email, but a clear structure: opening hook, body point, CTA. Two to three sentences per section max. Use {{variables}} where personalisation should go.

After all steps, include:
- Primary objection this sequence should pre-empt and how
- What reply rate signals the angle is working (and when to kill it and rewrite)
- The one thing that will make or break deliverability for this sequence

Keep each step tight. This is a brief, not a final copy.`,
  },
  {
    id: "bant-extractor",
    name: "BANT Extractor from Call Transcript",
    category: "BANT & Qualification",
    model: "GPT-4o",
    desc: "Feed in a raw call transcript and get structured BANT fields back. This is the core prompt behind my HubSpot AI notetaker — runs after every Deepgram transcription.",
    prompt: `You are a sales analyst extracting qualification data from a B2B discovery call transcript. Extract the following BANT fields.

Transcript:
{{transcript}}

Return a JSON object with these fields:
- budget: string — what budget was mentioned or implied. If unclear, write "Not discussed".
- authority: string — who is the decision maker? What level of influence does the prospect have?
- need: string — what specific pain or problem did they describe? Quote directly where possible.
- timeline: string — when are they looking to solve this? Any urgency signals?
- primary_pain: string — the single most important problem they need solved, in one sentence.
- next_step: string — what was agreed as the next step?
- qualification_score: number from 0 to 10 — how qualified is this opportunity?
- summary: string — 3–5 sentence summary of the call for the CRM.

If a field cannot be determined from the transcript, set it to null. Do not invent information.`,
  },
  {
    id: "discovery-script",
    name: "Discovery Call Script",
    category: "BANT & Qualification",
    model: "Claude / GPT-4o",
    desc: "Generates a tailored discovery script before a first call. I run this with company context from Clay — so every call prep takes 2 minutes instead of 20.",
    prompt: `You are preparing a discovery call script for a B2B sales rep. The goal is to qualify the opportunity and uncover the real pain — not to pitch.

Company context:
- Company: {{company_name}}
- Industry: {{industry}}
- Headcount: {{headcount}}
- Contact: {{contact_name}}, {{contact_title}}
- Known signals: {{signals}}
- Our solution: AI-powered GTM infrastructure (outbound automation, CRM enrichment, AI transcription, lead pipelines)

Generate a 30-minute discovery script including:
1. Opening (2 min) — warm and specific, reference why this call is relevant
2. Agenda set (1 min) — clear structure, ask for their time limit
3. Situation questions (10 min) — 5 questions to understand their current GTM motion
4. Pain questions (10 min) — 5 questions to expose friction, inefficiency, or missed revenue
5. Implication questions (5 min) — 3 questions to quantify the cost of inaction
6. Next step close (2 min) — propose a specific next step with a date

Format as a script with stage labels, estimated timing, and space for notes.`,
  },
  {
    id: "call-summary",
    name: "Call Summary + CRM Update",
    category: "BANT & Qualification",
    model: "GPT-4o",
    desc: "Turns raw call notes or a transcript into a clean CRM entry. I run this as part of my HubSpot AI pipeline — every call gets a structured note pushed to the deal record automatically.",
    prompt: `You are a sales operations assistant. Convert the following call notes or transcript into a clean CRM update.

Raw notes or transcript:
{{call_notes}}

Return a structured CRM note with:
- Date: {{call_date}}
- Participants: {{participants}}
- Summary: 3–5 sentences covering what was discussed, what was learned, and what was agreed
- Key pain points identified: bullet list
- BANT status: Budget / Authority / Need / Timeline — what is confirmed, what is unknown
- Red flags: anything that could derail the deal
- Next steps: specific actions with owners and dates if mentioned
- Deal stage recommendation: should this move forward, hold, or be disqualified?

Write in past tense. Keep it factual — no editorialising. This goes directly into HubSpot.`,
  },
  {
    id: "reply-classifier",
    name: "Email Reply Intent Classifier",
    category: "Reply Classification",
    model: "GPT-4o / Claude",
    desc: "Classifies inbound cold email replies so each one gets routed correctly. I run this in n8n — interested replies fire a Slack alert, OOOs get auto-bumped, not-interested are logged and suppressed.",
    prompt: `You are classifying a cold email reply for a B2B sales team. Determine the intent of the reply and return a structured classification.

Reply:
{{email_reply}}

Classify into exactly one of these categories:
- "Interested" — they want to learn more, book a call, or asked a positive question
- "Not Interested" — clear rejection, asked to be removed, or no interest expressed
- "Price Question" — they are asking about cost or pricing before committing
- "Out of Office" — auto-reply or they are away temporarily
- "Referral" — they have forwarded you to another person
- "Objection" — they have a specific concern (timing, wrong person, already have a solution)
- "Unclear" — the intent cannot be determined

Return JSON:
- category: one of the above
- confidence: "High", "Medium", or "Low"
- summary: one sentence describing the reply
- suggested_action: what the rep should do next`,
  },
  {
    id: "account-research",
    name: "Account Research Brief",
    category: "Account Research",
    model: "Claude / GPT-4o",
    desc: "Deep research brief on a target account before a call or outreach. I use this before any strategic outreach — it takes 30 seconds and replaces 20 minutes of manual Googling.",
    prompt: `You are a senior GTM researcher preparing a pre-call brief on a target account. Research the company below and return a structured brief.

Company: {{company_name}}
Website: {{company_url}}
Contact: {{contact_name}}, {{contact_title}}

Return a brief covering:
1. Business model — how do they make money? What do they sell and to whom?
2. Current GTM motion — inbound, outbound, PLG, or enterprise sales?
3. Stack signals — any tools mentioned on their site, job posts, or tech stack data
4. Pain signals — what problems are they likely experiencing based on their stage, headcount, and recent news?
5. Talking points — 2–3 specific angles for outreach based on their situation
6. Risks — any red flags (no budget signals, wrong stage, recent layoffs, etc.)
7. Opening angle — one specific, non-generic sentence to open with

Keep each section to 2–3 sentences. Do not pad. If you cannot find information on a section, say so.`,
  },
  {
    id: "competitor-intel",
    name: "Competitor Review Intelligence Extractor",
    category: "Account Research",
    model: "Claude / GPT-4o",
    desc: "Paste G2 or Trustpilot reviews of a competitor and get back the pain points their customers complain about most. I use this to build outreach angles and update sequence positioning when a competitor is in the deal.",
    prompt: `You are a competitive intelligence analyst. I am going to paste customer reviews of a competitor product. Extract the patterns that matter for outreach — not a balanced product review.

Competitor: {{competitor_name}}
Reviews:
{{reviews}}

Extract the following:

1. Top 3 pain points — what do customers complain about most? Quote specific phrases where possible. These become outreach angles.

2. Jobs they hired this product to do — what were customers actually trying to accomplish? This reveals what they care about most.

3. Switch triggers — what events or frustrations caused customers to look for alternatives? These are the moments to reach out.

4. Language patterns — exact phrases customers use to describe their pain. Mirror this language in outreach copy.

5. Competitor weaknesses to exploit — specific gaps in their product, support, or pricing that a competitor can directly address.

6. Outreach angles — 3 specific, non-generic opening lines based on these reviews. Each should reference a real pain without naming the competitor directly.

Format each section clearly. This goes directly into a sequence brief or battlecard.`,
  },
  {
    id: "buyer-persona",
    name: "Buyer Persona Builder",
    category: "Account Research",
    model: "Claude / GPT-4o",
    desc: "Give it a job title and I get a full buyer persona back — what they care about, how they measure success, what keeps them up at night. I use this before building any outreach sequence.",
    prompt: `You are a B2B GTM strategist. Build a detailed buyer persona for the following role at a mid-market B2B SaaS company.

Role: {{job_title}}
Company stage: {{company_stage}} (e.g. Series B, 150 employees)
Industry: {{industry}}

Cover:
1. Day-to-day responsibilities — what does this person actually do all day?
2. Goals and success metrics — what are they measured on? What does a good quarter look like?
3. Pain points — what slows them down, causes stress, or creates friction?
4. Buying behaviour — are they the decision maker, influencer, or blocker? How do they typically buy?
5. Information sources — where do they learn? LinkedIn, newsletters, communities, podcasts?
6. What they respond to in outreach — specific triggers, angles, and formats that land with this persona
7. What they ignore — the outreach patterns that immediately get deleted

Keep each section practical. This goes directly into a sequence brief for a GTM team.`,
  },
  {
    id: "waterfall-enrichment",
    name: "Waterfall Enrichment Prompt",
    category: "Account Research",
    model: "GPT-4o / Claude",
    desc: "When automated enrichment fails, I use this to manually research a contact from a company domain. It tells the AI exactly what to look for and in what order — mirrors how I set up Clay waterfalls.",
    prompt: `You are a B2B data researcher. Find contact and company information for the following target using only publicly available sources.

Target:
- Company domain: {{domain}}
- Role to find: {{target_role}} (e.g. Head of Sales, VP RevOps, CTO)

Research in this order:
1. Company website — find team page, about page, leadership mentions
2. LinkedIn — find the target role at this company
3. Twitter/X — check if the company or team members are active
4. Crunchbase or PitchBook — funding stage, investors, founding date
5. Job boards — current open roles reveal stack and growth stage

Return:
- contact_name: best guess or "Not found"
- contact_linkedin: URL or "Not found"
- contact_email_pattern: e.g. first.last@domain.com based on any found emails
- company_size_estimate: headcount range
- tech_stack_signals: any tools mentioned publicly
- recent_news: anything notable in the last 6 months
- confidence: "High", "Medium", or "Low"

Only use what you can verify. Do not fabricate.`,
  },
  {
    id: "n8n-node-generator",
    name: "n8n Function Node Code Generator",
    category: "Automation",
    model: "Claude / GPT-4o",
    desc: "Describe what you need in plain English and get back a working n8n Function node in JavaScript. I use this when the built-in nodes don't cover the logic I need — saves 30 minutes of debugging v1 syntax.",
    prompt: `You are an expert n8n workflow developer. Write a working Function node (JavaScript) for the following task.

Context:
- What this node receives as input: {{input_description}} (describe the data coming in from the previous node)
- What this node needs to output: {{output_description}} (describe what the next node expects)
- Logic to implement: {{logic}} (describe in plain English what needs to happen)
- n8n version: n8n v1.x

Requirements:
- Use correct n8n v1 Function node syntax: const items = $input.all(); ... return items;
- Handle null or missing fields gracefully — the node must never crash on bad data
- If transforming or enriching data, preserve all existing fields and add new ones on top
- Add a short inline comment above any non-obvious logic
- If the task requires calling an external API, note it clearly but do not include credentials in the code

Return in this order:
1. The complete working JavaScript code block, ready to paste into an n8n Function node
2. A 2-line plain English explanation of what the code does and any assumptions made
3. Two edge cases the user should test before going live

Lead with the code. No boilerplate preamble.`,
  },
];

const CATEGORIES = ["All", "Prospecting", "Cold Email", "Sequences", "BANT & Qualification", "Reply Classification", "Account Research", "Clay & Enrichment", "Automation"];

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  "Prospecting":          { color: "#c9963b", bg: "rgba(201,150,59,0.1)",  border: "rgba(201,150,59,0.25)" },
  "Cold Email":           { color: "#5b9bd5", bg: "rgba(91,155,213,0.1)",  border: "rgba(91,155,213,0.25)" },
  "Sequences":            { color: "#e879f9", bg: "rgba(232,121,249,0.1)", border: "rgba(232,121,249,0.25)" },
  "BANT & Qualification": { color: "#9b8afb", bg: "rgba(155,138,251,0.1)", border: "rgba(155,138,251,0.25)" },
  "Reply Classification": { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)" },
  "Account Research":     { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
  "Clay & Enrichment":    { color: "#38bdf8", bg: "rgba(56,189,248,0.1)",  border: "rgba(56,189,248,0.25)" },
  "Automation":           { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.25)" },
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 11,
        padding: "7px 16px",
        background: copied ? "var(--surface)" : "var(--gold)",
        color: copied ? "var(--text-muted)" : "var(--bg)",
        border: `1px solid ${copied ? "var(--border)" : "var(--gold)"}`,
        borderRadius: 8,
        cursor: "pointer",
        transition: "all 0.15s",
        fontWeight: 600,
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {copied ? "✓ copied" : "copy prompt"}
    </button>
  );
}

export default function AIPromptsPage() {
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() =>
    category === "All" ? prompts : prompts.filter(p => p.category === category),
    [category]
  );

  const counts: Record<string, number> = { All: prompts.length };
  CATEGORIES.slice(1).forEach(c => { counts[c] = prompts.filter(p => p.category === c).length; });

  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Back */}
        <div style={{ paddingTop: 48 }}>
          <Link href="/builds" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.04em" }}>
            ← back to builds
          </Link>
        </div>

        {/* Header */}
        <section style={{ padding: "40px 0 48px" }}>
          <div className="section-label">ai prompt library</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            {prompts.length} GTM prompts. <G>Copy and run.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 15, color: "var(--text-muted)", maxWidth: 580, lineHeight: 1.8, marginBottom: 24 }}>
            Every prompt I use across my GTM stack — cold email, BANT extraction, account research, reply classification, Clay columns, and n8n automation. Tested in production. Drop them into Claude, GPT-4o, or your Clay AI columns.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", background: "var(--gold-bg)", border: "1px solid var(--gold-border)", padding: "8px 16px", borderRadius: 9999 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            {'All prompts include {{variables}} — replace with your actual data'}
          </div>
        </section>

        {/* Filters */}
        <div style={{ position: "sticky", top: 56, zIndex: 50, background: "var(--bg)", paddingBottom: 16, paddingTop: 10, borderBottom: "1px solid var(--border)", marginBottom: 32, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11,
                padding: "6px 14px",
                borderRadius: 9999,
                border: `1px solid ${category === cat ? "var(--gold)" : "var(--border)"}`,
                background: category === cat ? "var(--gold)" : "transparent",
                color: category === cat ? "var(--bg)" : "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.15s",
                letterSpacing: "0.02em",
              }}
            >
              {cat} <span style={{ opacity: 0.6, fontSize: 10 }}>· {counts[cat]}</span>
            </button>
          ))}
        </div>

        {/* Prompt list */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filtered.map((p, i) => {
              const c = categoryColors[p.category];
              const isOpen = expanded === p.id;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  style={{ background: "var(--surface-2)", border: `1px solid ${isOpen ? "var(--border-2)" : "var(--border)"}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.15s" }}
                >
                  {/* Header row */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : p.id)}
                    style={{ padding: "24px 26px", cursor: "pointer", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.08em",
                          textTransform: "uppercase", padding: "3px 9px", borderRadius: 9999,
                          border: `1px solid ${c.border}`, background: c.bg, color: c.color,
                        }}>
                          {p.category}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--text-dim)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: 9999 }}>
                          {p.model}
                        </span>
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 8 }}>
                        {p.name}
                      </div>
                      <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, margin: 0, maxWidth: 680 }}>
                        {p.desc}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, paddingTop: 4 }}>
                      <CopyButton text={p.prompt} />
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, color: "var(--text-dim)", transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                        ↓
                      </span>
                    </div>
                  </div>

                  {/* Expanded prompt */}
                  {isOpen && (
                    <div style={{ borderTop: "1px solid var(--border)", padding: "20px 26px 24px" }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", marginBottom: 10 }}>
                        // PROMPT
                      </div>
                      <pre style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 12,
                        color: "var(--text-muted)",
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        margin: 0,
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        padding: "16px 18px",
                      }}>
                        {p.prompt}
                      </pre>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
