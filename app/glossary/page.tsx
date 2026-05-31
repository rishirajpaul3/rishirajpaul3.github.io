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
  { term: "ICP", category: "GTM Fundamentals", definition: "Ideal Customer Profile. The specific type of company or person most likely to get real value from what you sell. Not just anyone who might buy. The narrower you define it, the better your outreach converts." },
  { term: "BANT", category: "GTM Fundamentals", definition: "A framework for qualifying leads: Budget, Authority, Need, Timeline. If all four are present, the conversation is worth having. Missing any one of them usually means the deal stalls." },
  { term: "Pipeline", category: "GTM Fundamentals", definition: "All the deals currently in progress, organised by stage. A healthy pipeline has deals spread across every stage, not all bunched at the top." },
  { term: "ARR", category: "GTM Fundamentals", definition: "Annual Recurring Revenue. The predictable yearly revenue from subscriptions. The number SaaS companies live and die by." },
  { term: "MRR", category: "GTM Fundamentals", definition: "Monthly Recurring Revenue. Same as ARR but monthly. Useful for tracking momentum month to month and spotting problems early." },
  { term: "CAC", category: "GTM Fundamentals", definition: "Customer Acquisition Cost. How much it costs to land one new customer, including sales, marketing, and tooling. If CAC is higher than LTV, the business is losing money on every customer." },
  { term: "LTV", category: "GTM Fundamentals", definition: "Lifetime Value. The total revenue a customer brings over their entire relationship with you. You want LTV to be at least 3x CAC." },
  { term: "SDR", category: "GTM Fundamentals", definition: "Sales Development Representative. The person responsible for outbound prospecting and booking qualified meetings. They fill the top of the pipeline." },
  { term: "AE", category: "GTM Fundamentals", definition: "Account Executive. Closes the deals that SDRs book. Usually owns the relationship from first meeting through to signed contract." },
  { term: "Churn", category: "GTM Fundamentals", definition: "When a customer cancels or does not renew. High churn kills a SaaS business faster than almost anything else." },

  // Outbound
  { term: "Cold Email", category: "Outbound", definition: "An unsolicited email sent to someone who has not opted in to hear from you. Works when it is specific, short, and references something real about the recipient." },
  { term: "Sequence", category: "Outbound", definition: "A series of automated touchpoints sent over time. Could be email, LinkedIn, or a mix. Usually 3 to 6 steps with delays between each." },
  { term: "Cadence", category: "Outbound", definition: "The timing and frequency of outreach steps in a sequence. Getting cadence right matters more than most people think. Too fast feels spammy, too slow loses momentum." },
  { term: "Deliverability", category: "Outbound", definition: "Whether your emails actually land in the inbox or go to spam. Affected by domain reputation, sending volume, content, and technical setup like SPF and DKIM." },
  { term: "Intent Data", category: "Outbound", definition: "Signals that suggest a company or person is actively researching a problem you solve. Could be web traffic, content downloads, or search behaviour." },
  { term: "Lead Scoring", category: "Outbound", definition: "Assigning a numerical value to each lead based on how well they match your ICP. Higher score means higher priority. Keeps your team focused on the right conversations." },
  { term: "Waterfall Enrichment", category: "Outbound", definition: "Trying multiple data providers in sequence to find contact information. If Apollo does not have the email, try Hunter.io. If Hunter does not have it, try Dropcontact. You stop when you get a result." },
  { term: "Signal-Based Outreach", category: "Outbound", definition: "Using real-world events like a funding round, new hire, or job change as the reason to reach out. Converts better than generic outreach because the timing is relevant." },
  { term: "Personalisation at Scale", category: "Outbound", definition: "Writing outreach that feels personal to each recipient without writing each message manually. Usually done with AI columns in Clay that pull in specific company or person data." },
  { term: "Bounce Rate", category: "Outbound", definition: "The percentage of emails that could not be delivered. Over 2% and your domain reputation starts suffering fast." },

  // AI & Automation
  { term: "LLM", category: "AI & Automation", definition: "Large Language Model. The type of AI model that generates text. GPT-4o, Claude, and Gemini are all LLMs. The backbone of most AI GTM tools right now." },
  { term: "Prompt Engineering", category: "AI & Automation", definition: "Writing instructions to an LLM in a way that gets consistently good outputs. In GTM, this usually means structuring prompts so the AI generates useful email openers, summaries, or classifications." },
  { term: "AI Agent", category: "AI & Automation", definition: "A system where an LLM takes actions autonomously, not just generates text. It can browse the web, call APIs, and make decisions based on what it finds." },
  { term: "Webhook", category: "AI & Automation", definition: "A way for one app to notify another the moment something happens. New lead comes in, webhook fires, n8n picks it up and starts the workflow." },
  { term: "API", category: "AI & Automation", definition: "Application Programming Interface. The way two pieces of software talk to each other. When you connect Clay to HubSpot, they communicate through APIs." },
  { term: "Intent Classification", category: "AI & Automation", definition: "Using AI to categorise a piece of text by what the writer meant. In GTM, most commonly used to classify email replies as Interested, Not Interested, Price Question, or Out of Office." },
  { term: "Chain of Thought Prompting", category: "AI & Automation", definition: "Asking an LLM to reason step by step before giving a final answer. Dramatically improves accuracy on complex tasks like lead qualification or research summarisation." },
  { term: "RAG", category: "AI & Automation", definition: "Retrieval-Augmented Generation. Giving an LLM access to a specific set of documents or data before it generates a response. Useful when you want the AI to reason over your own data, not just its training." },
  { term: "n8n Workflow", category: "AI & Automation", definition: "A visual automation built in n8n that connects apps and runs logic without writing much code. Each node does one thing and they chain together into a full pipeline." },
  { term: "Function Node", category: "AI & Automation", definition: "In n8n, a node where you write JavaScript to transform data or run custom logic. Useful when the built-in nodes do not do exactly what you need." },

  // Enrichment & Data
  { term: "Lead Enrichment", category: "Enrichment & Data", definition: "Taking a basic piece of contact or company information, like a name or domain, and adding more data to it. Tech stack, headcount, funding stage, LinkedIn URL, email." },
  { term: "Firmographics", category: "Enrichment & Data", definition: "Data about a company. Industry, size, location, revenue range, funding stage. Used to qualify whether a company fits your ICP before you reach out." },
  { term: "Technographics", category: "Enrichment & Data", definition: "Data about what tools a company uses. Knowing a company runs HubSpot tells you something about their maturity and budget. Available via providers like BuiltWith and Clearbit." },
  { term: "Buying Signals", category: "Enrichment & Data", definition: "Events or behaviours that suggest a company is in buying mode. Hiring for sales roles, raising funding, launching in a new market. These are the moments to reach out." },
  { term: "Job Change Tracking", category: "Enrichment & Data", definition: "Monitoring when a contact moves to a new company. Newly placed decision makers often want to bring in new vendors. One of the highest-converting outreach triggers." },
  { term: "Funding Signal", category: "Enrichment & Data", definition: "A company announcing a new round of investment. Usually means they have money to spend and are scaling fast. A strong trigger for outbound." },
  { term: "Data Waterfall", category: "Enrichment & Data", definition: "Running enrichment through multiple providers in sequence until you get the data you need. Maximises coverage without overpaying any single provider." },
  { term: "CRM Hygiene", category: "Enrichment & Data", definition: "Keeping your CRM clean, accurate, and up to date. Contacts without emails removed, duplicate records merged, stale deals closed. Bad hygiene kills pipeline visibility." },

  // Tools
  { term: "Clay", category: "Tools", definition: "A spreadsheet-like tool for lead enrichment and research automation. Connects to 75+ data providers and has an AI column that generates custom outputs per row. The most powerful enrichment tool available right now." },
  { term: "n8n", category: "Tools", definition: "An open source workflow automation tool. Connects apps, runs logic, handles webhooks, and can run AI models as part of the workflow. The GTM engineer's most used automation platform." },
  { term: "HeyReach", category: "Tools", definition: "A LinkedIn outreach tool built for agencies and GTM teams. Manages multiple LinkedIn accounts and sequences at scale without triggering LinkedIn limits." },
  { term: "Instantly", category: "Tools", definition: "An email outreach platform focused on deliverability. Manages unlimited sending accounts, warms them up automatically, and tracks open and reply rates across all of them." },
  { term: "Smartlead", category: "Tools", definition: "Cold email at scale with deliverability infrastructure built in. Often used alongside Clay for enrichment and segmentation before sending." },
  { term: "HubSpot", category: "Tools", definition: "The most widely used CRM for SMBs and mid-market. Manages contacts, deals, pipelines, email sequences, and reporting. The GTM engineer's most common integration target." },
  { term: "Apollo", category: "Tools", definition: "A sales intelligence platform with a large contact database, email sequencing, and a LinkedIn extension. Commonly used as both a data provider in waterfall enrichment and as a standalone outreach tool." },
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
            Everything I&apos;ve learned,<br /><G>in one place.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.8 }}>
            GTM, AI, outbound, enrichment, tools. Plain explanations with no filler. {terms.length} terms and counting.
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
