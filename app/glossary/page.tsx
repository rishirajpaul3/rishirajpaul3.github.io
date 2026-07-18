"use client";
import { useState, useMemo } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";

type Term = {
  term: string;
  category: string;
  definition: string;
};

const terms: Term[] = [
  // GTM Fundamentals
  { term: "ICP", category: "GTM Fundamentals", definition: "Ideal Customer Profile. The companies that actually get value from what you sell, not everyone who could theoretically buy. Define it narrow. Broad ICPs produce bad outreach." },
  { term: "BANT", category: "GTM Fundamentals", definition: "Budget, Authority, Need, Timeline. If all four show up, the deal is real. Missing one usually means it stalls." },
  { term: "Pipeline", category: "GTM Fundamentals", definition: "All the deals in progress, organised by stage. Healthy means spread across every stage, not bunched at the top." },
  { term: "ARR", category: "GTM Fundamentals", definition: "Annual Recurring Revenue. Yearly subscription revenue you can count on. The number SaaS companies live and die by." },
  { term: "MRR", category: "GTM Fundamentals", definition: "ARR but monthly. Better for tracking momentum and catching problems while they're small." },
  { term: "CAC", category: "GTM Fundamentals", definition: "Customer Acquisition Cost. What it costs to land one customer, sales, marketing, and tooling included. If it's higher than LTV, you lose money on every customer." },
  { term: "LTV", category: "GTM Fundamentals", definition: "Lifetime Value. Total revenue from a customer over the whole relationship. You want it at 3x CAC or better." },
  { term: "SDR", category: "GTM Fundamentals", definition: "Sales Development Representative. Does the outbound and books qualified meetings. Fills the top of the pipeline." },
  { term: "AE", category: "GTM Fundamentals", definition: "Account Executive. Closes what the SDR books. Owns the deal from first meeting to signed contract." },
  { term: "Churn", category: "GTM Fundamentals", definition: "A customer cancels or doesn't renew. High churn kills a SaaS business faster than almost anything else." },

  // Outbound
  { term: "Cold Email", category: "Outbound", definition: "Email to someone who never asked to hear from you. Works when it's short, specific, and references something real about them." },
  { term: "Sequence", category: "Outbound", definition: "A set of automated touches over time. Email, LinkedIn, or both. Usually 3 to 6 steps with delays in between." },
  { term: "Cadence", category: "Outbound", definition: "The timing between steps in a sequence. Too fast reads as spam. Too slow and the thread goes cold." },
  { term: "Deliverability", category: "Outbound", definition: "Whether your email lands in the inbox or in spam. Driven by domain reputation, volume, content, and setup like SPF and DKIM." },
  { term: "Intent Data", category: "Outbound", definition: "Signals that someone is actively researching a problem you solve. Web visits, content downloads, search behaviour." },
  { term: "Lead Scoring", category: "Outbound", definition: "A number on each lead for how well they fit your ICP. High scores get worked first. Keeps the team off bad conversations." },
  { term: "Waterfall Enrichment", category: "Outbound", definition: "Run providers in order until one returns the data. Apollo misses the email, try Hunter. Hunter misses, try Dropcontact. Stop at the first hit." },
  { term: "Signal-Based Outreach", category: "Outbound", definition: "Reaching out because something just happened. Funding round, new hire, job change. Converts better because the timing makes sense to the recipient." },
  { term: "Personalisation at Scale", category: "Outbound", definition: "Outreach that reads personal without writing each message by hand. Usually AI columns in Clay pulling real company or person data." },
  { term: "Bounce Rate", category: "Outbound", definition: "The share of emails that never got delivered. Above 2% your domain reputation starts to tank." },

  // AI & Automation
  { term: "LLM", category: "AI & Automation", definition: "Large Language Model. The AI that generates text. GPT-4o, Claude, Gemini. The engine behind most AI GTM tools." },
  { term: "Prompt Engineering", category: "AI & Automation", definition: "Writing instructions so an LLM gives you the same quality output every time. In GTM that means prompts that reliably produce openers, summaries, or classifications." },
  { term: "AI Agent", category: "AI & Automation", definition: "An LLM that takes actions, not just writes text. It browses, calls APIs, and decides its next step from what it finds." },
  { term: "Webhook", category: "AI & Automation", definition: "One app pinging another the moment something happens. New lead lands, webhook fires, n8n picks it up and runs the workflow." },
  { term: "API", category: "AI & Automation", definition: "Application Programming Interface. How two pieces of software talk. Connect Clay to HubSpot and everything moves over their APIs." },
  { term: "Intent Classification", category: "AI & Automation", definition: "AI sorting text by what the writer meant. In GTM, mostly tagging replies as Interested, Not Interested, Price Question, or Out of Office." },
  { term: "Chain of Thought Prompting", category: "AI & Automation", definition: "Making the LLM reason step by step before it answers. Big accuracy gains on things like lead qualification and research summaries." },
  { term: "RAG", category: "AI & Automation", definition: "Retrieval-Augmented Generation. Feed the LLM your own documents before it answers. Use it when the AI needs to reason over your data, not its training set." },
  { term: "n8n Workflow", category: "AI & Automation", definition: "A visual automation in n8n. Each node does one job and they chain into a full pipeline. Barely any code required." },
  { term: "Function Node", category: "AI & Automation", definition: "The n8n node where you write JavaScript. For when the built-in nodes don't do exactly what you need." },

  // Enrichment & Data
  { term: "Lead Enrichment", category: "Enrichment & Data", definition: "Start with a name or domain, add everything else. Tech stack, headcount, funding stage, LinkedIn URL, email." },
  { term: "Firmographics", category: "Enrichment & Data", definition: "Company data. Industry, size, location, revenue range, funding stage. Used to check ICP fit before you reach out." },
  { term: "Technographics", category: "Enrichment & Data", definition: "What tools a company runs. A company on HubSpot tells you something about maturity and budget. BuiltWith and Clearbit sell this data." },
  { term: "Buying Signals", category: "Enrichment & Data", definition: "Behaviour that says a company is in buying mode. Hiring sales roles, raising money, entering a new market. Reach out in those windows." },
  { term: "Job Change Tracking", category: "Enrichment & Data", definition: "Watching for contacts who move companies. New decision makers like bringing in their own vendors. One of the best converting triggers there is." },
  { term: "Funding Signal", category: "Enrichment & Data", definition: "A company announces a round. They have budget and pressure to grow fast. Strong trigger for outbound." },
  { term: "Data Waterfall", category: "Enrichment & Data", definition: "Run enrichment through providers in sequence until you get a hit. More coverage, and no single provider gets overpaid." },
  { term: "CRM Hygiene", category: "Enrichment & Data", definition: "A clean CRM. No contacts without emails, no duplicates, no stale deals sitting open. Bad hygiene means you can't trust your own pipeline numbers." },

  // Tools
  { term: "Clay", category: "Tools", definition: "Spreadsheet for enrichment and research automation. 75+ data providers plus an AI column that generates custom output per row. Nothing else comes close right now." },
  { term: "n8n", category: "Tools", definition: "Open source workflow automation. Connects apps, runs logic, handles webhooks, runs AI mid-workflow. What I build most of my automations in." },
  { term: "HeyReach", category: "Tools", definition: "LinkedIn outreach for agencies and GTM teams. Runs multiple LinkedIn accounts and sequences without tripping LinkedIn's limits." },
  { term: "Instantly", category: "Tools", definition: "Email outreach built around deliverability. Unlimited sending accounts, automatic warmup, open and reply tracking across all of them." },
  { term: "Smartlead", category: "Tools", definition: "Cold email at scale with the deliverability plumbing built in. Usually paired with Clay for enrichment and segmentation before sending." },
  { term: "HubSpot", category: "Tools", definition: "The default CRM for SMB and mid-market. Contacts, deals, pipelines, sequences, reporting. The integration I build against most." },
  { term: "Apollo", category: "Tools", definition: "Big contact database, sequencing, and a LinkedIn extension in one. Shows up both as a data source in waterfalls and as a standalone outreach tool." },
];

const CATEGORIES = ["All", "GTM Fundamentals", "Outbound", "AI & Automation", "Enrichment & Data", "Tools"];

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  "GTM Fundamentals": { color: "#c9963b", bg: "rgba(201,150,59,0.1)", border: "rgba(201,150,59,0.25)" },
  "Outbound":         { color: "#5b9bd5", bg: "rgba(91,155,213,0.1)", border: "rgba(91,155,213,0.25)" },
  "AI & Automation":  { color: "#9b8afb", bg: "rgba(155,138,251,0.1)", border: "rgba(155,138,251,0.25)" },
  "Enrichment & Data":{ color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)" },
  "Tools":            { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return terms.filter(t => {
      const matchCat = category === "All" || t.category === category;
      const q = search.toLowerCase();
      const matchSearch = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <section style={{ padding: "80px 0 48px" }}>
          <div className="section-label">knowledge</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            Every term I actually use,<br /><G>explained plainly.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8 }}>
            GTM, AI, outbound, enrichment, tools. Short and plain. {terms.length} terms and counting.
          </p>
        </section>

        {/* Search + Filters */}
        <div style={{ position: "sticky", top: 56, zIndex: 50, background: "var(--bg)", paddingBottom: 20, paddingTop: 12, borderBottom: "1px solid var(--border)", marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "12px 16px",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 13,
              color: "var(--text)",
              outline: "none",
              marginBottom: 14,
            }}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
                {cat}
                {cat === "All" && <span style={{ opacity: 0.6, marginLeft: 4 }}>· {terms.length}</span>}
                {cat !== "All" && <span style={{ opacity: 0.6, marginLeft: 4 }}>· {terms.filter(t => t.category === cat).length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginBottom: 20, letterSpacing: "0.04em" }}>
          {filtered.length === terms.length ? `// all ${terms.length} terms` : `// ${filtered.length} of ${terms.length} terms`}
        </div>

        {/* Terms grid */}
        {filtered.length === 0 ? (
          <div style={{ padding: "64px 32px", textAlign: "center", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "var(--text-dim)" }}>
            // nothing found — try a different search
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 2, paddingBottom: 80 }}>
            {filtered.map((t) => {
              const c = categoryColors[t.category];
              return (
                <div
                  key={t.term}
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "22px 24px", transition: "border-color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
                      {t.term}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 9999, border: `1px solid ${c.border}`, background: c.bg, color: c.color, flexShrink: 0 }}>
                      {t.category}
                    </span>
                  </div>
                  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>
                    {t.definition}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
