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
    id: "linkedin-connection",
    name: "LinkedIn Connection Request",
    category: "Cold Email",
    model: "GPT-4o / Claude",
    desc: "Short, non-salesy LinkedIn connection requests that actually get accepted. I keep these under 200 characters — anything longer gets ignored.",
    prompt: `Write a LinkedIn connection request from Rishiraj Paul, a GTM engineer who builds AI-powered sales infrastructure.

Prospect:
- Name: {{first_name}}
- Role: {{job_title}} at {{company_name}}
- Reason to connect: {{signal}} (e.g. we share a connection, their post about outbound, their company is hiring SDRs)

Rules:
- Under 200 characters
- No pitch, no ask, no "I'd love to pick your brain"
- Sound like a human, not a template
- Reference something real about them or a shared interest
- No emojis

Output only the message. Nothing else.`,
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
    id: "objection-handler",
    name: "Objection Handler",
    category: "BANT & Qualification",
    model: "GPT-4o / Claude",
    desc: "Given an objection, generates 3 ways to handle it — a direct response, a reframe, and a question to redirect. I use this for coaching reps and prepping for hard conversations.",
    prompt: `You are a B2B sales coach specialising in GTM and outbound. A prospect has raised the following objection. Generate three distinct handling approaches.

Context:
- What we sell: {{product_or_service}}
- Stage: {{call_stage}} (e.g. cold outreach, discovery, proposal)
- Objection: {{objection}}

Return three approaches:
1. Direct — address the objection head-on with evidence or specifics
2. Reframe — shift the way they are thinking about the problem without dismissing their concern
3. Question — a question that redirects the conversation back to their pain

For each approach: write the exact words the rep should say (2–4 sentences max). Make it sound human, not scripted.`,
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
];

const CATEGORIES = ["All", "Prospecting", "Cold Email", "BANT & Qualification", "Reply Classification", "Account Research"];

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  "Prospecting":         { color: "#c9963b", bg: "rgba(201,150,59,0.1)",  border: "rgba(201,150,59,0.25)" },
  "Cold Email":          { color: "#5b9bd5", bg: "rgba(91,155,213,0.1)",  border: "rgba(91,155,213,0.25)" },
  "BANT & Qualification":{ color: "#9b8afb", bg: "rgba(155,138,251,0.1)", border: "rgba(155,138,251,0.25)" },
  "Reply Classification":{ color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.25)" },
  "Account Research":    { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
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
            Every prompt I use across my GTM stack — cold email, BANT extraction, account research, reply classification. Tested in production. Drop them into Claude, GPT-4o, or your Clay AI columns.
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
