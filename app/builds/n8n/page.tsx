"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import { motion } from "framer-motion";
import Link from "next/link";

const workflows = [
  {
    id: "company-research-agent",
    name: "Company Research Agent",
    desc: "Paste a list of company domains. This pulls firmographic data through Explorium, then hits Claude to extract what actually matters for GTM: pricing model, integrations, ICP signals, market position. Output goes straight to Google Sheets. Replaced hours of manual research per batch.",
    tools: ["n8n", "Claude AI", "Explorium", "SerpAPI", "Google Sheets"],
    file: "company-research-agent.json",
  },
  {
    id: "email-reply-classifier",
    name: "Email Reply Classifier",
    desc: "Cold email reply lands in Gmail, OpenAI classifies it: Interested, Not Interested, Price Question, or Out of Office. Each gets routed differently. Interested fires a Slack alert. Price questions get an auto rate card. Stops leads falling through the cracks.",
    tools: ["n8n", "Gmail", "OpenAI", "Slack"],
    file: "email-reply-classifier.json",
  },
  {
    id: "cold-call-machine",
    name: "Cold Call Machine",
    desc: "Searches LinkedIn for target companies via Sales Navigator, scores each one with OpenAI, finds the decision maker, and generates a personalised cold call script. Everything lands in a Google Sheet. For SDRs who need to prospect at scale without losing personalisation.",
    tools: ["n8n", "LinkedIn", "OpenAI", "Google Sheets"],
    file: "cold-call-machine.json",
  },
  {
    id: "lead-to-slack",
    name: "New Lead to Slack",
    desc: "New inbound lead comes in, workflow enriches with company data, formats a brief, drops it into a Slack channel with one-click links to LinkedIn and website. Everyone on the team knows the moment a hot lead arrives.",
    tools: ["n8n", "Webhook", "Hunter.io", "OpenAI", "Slack"],
    file: "lead-to-slack.json",
  },
  {
    id: "gmail-auto-labelling",
    name: "Auto Gmail Labelling",
    desc: "Your inbox gets messy fast when you are running outreach at scale. This checks Gmail every 5 minutes, reads each email, and uses OpenAI to label it automatically. Replies, interested leads, spam, follow-ups. No manual sorting. Works in the background.",
    tools: ["n8n", "Gmail", "OpenAI"],
    file: "gmail-auto-labelling.json",
  },
  {
    id: "video-to-content",
    name: "Video to Twitter Thread + LinkedIn + Blog",
    desc: "Record one video. This transcribes it, then GPT-4o-mini turns it into a 10-tweet thread, a LinkedIn post, and a 600-word blog post at the same time. Three pieces of content from one recording.",
    tools: ["n8n", "WayinVideo", "GPT-4o-mini", "Google Sheets"],
    file: "video-to-content.json",
  },
  {
    id: "job-application-auto-reply",
    name: "AI Job Application Auto-Reply",
    desc: "When a job application hits Gmail, OpenAI reads it and sends a personalised acknowledgement via SMTP automatically. Frees up whoever is reviewing applications to focus on actual decisions, not inbox admin.",
    tools: ["n8n", "Gmail", "OpenAI GPT-4o", "SMTP"],
    file: "job-application-auto-reply.json",
  },
  {
    id: "content-repurposing-pipeline",
    name: "Content Repurposing Pipeline",
    desc: "Paste a LinkedIn post or blog URL. Workflow scrapes the content, rewrites it for a different format, saves to Notion. Good for staying consistent across channels without writing everything from scratch twice.",
    tools: ["n8n", "OpenAI", "Notion"],
    file: "content-repurposing-pipeline.json",
  },
];

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const tag = (t: string) => (
  <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: 9999 }}>{t}</span>
);

export default function N8NPage() {
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
        <section style={{ padding: "40px 0 60px" }}>
          <div className="section-label">n8n workflows</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            8 workflows. <G>Free to import.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 15, color: "var(--text-muted)", maxWidth: 560, lineHeight: 1.8, marginBottom: 24 }}>
            Download the JSON, open n8n, go to Workflows and import. Replace the credential placeholders with your own API keys and run.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--text-dim)", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 16px", display: "inline-block" }}>
            // n8n → Workflows → Import from file → select JSON
          </div>
        </section>

        <div className="divider" />

        {/* Workflows */}
        <section style={{ padding: "60px 0 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {workflows.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "26px 28px", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}
              >
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 8 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em", marginBottom: 10 }}>
                    {w.name}
                  </div>
                  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 14, maxWidth: 680 }}>
                    {w.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {w.tools.map(tag)}
                  </div>
                </div>
                <a
                  href={`/templates/n8n/${w.file}`}
                  download
                  style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: "10px 20px", background: "var(--gold)", color: "var(--bg)", textDecoration: "none", borderRadius: 8, fontWeight: 600, letterSpacing: "0.02em", textAlign: "center", whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  ↓ Download JSON
                </a>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
