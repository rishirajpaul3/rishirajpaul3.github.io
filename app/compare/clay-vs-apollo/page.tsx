import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clay vs Apollo — Honest Comparison for GTM Engineers",
  description: "Clay and Apollo serve different purposes. Clay is an enrichment engine. Apollo is an outbound platform with its own database. Here is when to use each.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", margin: "56px 0 20px", lineHeight: 1.2 }}>
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 20, maxWidth: 720 }}>
    {children}
  </p>
);

const Verdict = ({ tool, score, reason }: { tool: string; score: string; reason: string }) => (
  <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 20px", marginBottom: 10, display: "flex", gap: 16, alignItems: "flex-start" }}>
    <div style={{ flexShrink: 0 }}>
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{tool}</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--gold)", marginLeft: 10 }}>{score}</span>
    </div>
    <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{reason}</p>
  </div>
);

const Row = ({ label, clay, apollo }: { label: string; clay: string; apollo: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", padding: "14px 16px", borderRight: "1px solid var(--border)" }}>{label}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{clay}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", lineHeight: 1.5 }}>{apollo}</div>
  </div>
);

export default function ClayVsApollo() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Back */}
        <div style={{ paddingTop: 48 }}>
          <Link href="/compare" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", textDecoration: "none" }}>
            ← back to comparisons
          </Link>
        </div>

        {/* Header */}
        <section style={{ padding: "40px 0 48px" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>Enrichment</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>Outbound</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>6 min read</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            Clay vs Apollo.<br /><G>They are not competing.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            This comparison comes up constantly in GTM channels and most of it misses the point. Clay and Apollo are not the same category of tool. Choosing between them is often the wrong question.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>
            Rishiraj Paul · May 2026
          </div>
        </section>

        <div className="divider" />

        {/* Content */}
        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>What each tool actually does</H2>
          <P>
            Clay is an enrichment engine. You bring a list of companies or contacts, and Clay enriches each row by pulling data from 75+ providers simultaneously. It finds emails, LinkedIn profiles, tech stacks, funding data, headcount, and anything else you need. Then its AI column generates custom content per row. Personalised email openers, research summaries, ICP fit scores, whatever you instruct it to produce. Clay does not send emails. It feeds data into the tools that do.
          </P>
          <P>
            Apollo is an all-in-one outbound platform. It has its own database of 275 million contacts, a built-in sequencing tool for sending emails, a LinkedIn extension for one-click enrichment, a dialer, and basic CRM functionality. You can source leads, enrich them, and send sequences all inside Apollo without touching another tool. It is designed to be the only tool a solo founder or small sales team needs to run outbound.
          </P>
          <P>
            The key distinction: Clay enriches data from many sources and passes it somewhere else. Apollo sources, enriches, and sends all in one place. One is infrastructure. One is a complete workflow.
          </P>

          <H2>Where Clay wins</H2>
          <P>
            Email coverage. Clay's waterfall enrichment is the best way to maximise the percentage of contacts you find verified emails for. Instead of relying on one provider's database, Clay tries Apollo, then Hunter.io, then Dropcontact, then Seamless.ai, one after another, until it finds a result. The difference in coverage between a single-provider approach and a well-configured waterfall can be 20 to 40 percentage points. That is the difference between a campaign that works and one that does not.
          </P>
          <P>
            Personalisation at scale. Apollo can add merge tags. Clay can pull the last LinkedIn post your prospect published, summarise their recent company news, analyse their tech stack, and generate a genuinely personalised opening line that references something real about them. When you are running outbound at any volume, this difference in personalisation depth is visible in reply rates.
          </P>
          <P>
            Flexibility. Clay is closer to a programmable spreadsheet than a traditional tool. You can build almost any enrichment logic. Score leads based on multiple signals, clean and normalise CRM data, detect buying signals, route contacts to different sequences based on ICP fit. If you can describe the workflow in plain English, Clay can usually do it.
          </P>

          <H2>Where Apollo wins</H2>
          <P>
            Speed to start. You can sign up for Apollo, pull a list of contacts matching your ICP, load them into a sequence, and be sending emails the same day. With Clay, you spend time understanding the credit system, connecting providers, building tables, and configuring waterfall logic before you send a single email. For a founder doing early sales who needs to move fast, Apollo wins on time to first send.
          </P>
          <P>
            Database breadth. Apollo has 275 million contacts. This is an enormous dataset for sourcing. If you need to build a list of people with a specific job title at companies in a certain industry and funding stage, Apollo's database handles this natively. Clay does not source leads. You have to bring your own list or use a different tool to get company domains first.
          </P>
          <P>
            All-in-one simplicity. One login, one platform, one bill. Sequences, emails, contacts, and reporting in one place. Less to manage, less to break. For smaller teams that do not have a dedicated GTM engineer to maintain infrastructure, Apollo's consolidation is genuinely valuable.
          </P>
          <P>
            Price. Apollo's Professional plan is $99 per month. Clay starts at $149 per month but the credits system means most teams doing real volume spend significantly more. If budget is a constraint, Apollo delivers more for less at the lower end.
          </P>

          <H2>The honest pricing reality</H2>

          {/* Pricing table */}
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", background: "var(--surface-3)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>PLAN</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>CLAY</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#5b9bd5", padding: "12px 16px", letterSpacing: "0.08em" }}>APOLLO</div>
            </div>
            <Row label="Entry" clay="Explorer plan. $149/mo. 2,000 credits. Limited for real campaigns." apollo="Basic plan. $49/mo. Unlimited email sends, limited sequences." />
            <Row label="Mid tier" clay="Pro plan. $498/mo. 10,000 credits. Enough for moderate volume." apollo="Professional plan. $99/mo. Full sequences, dialer, advanced filters." />
            <Row label="Serious use" clay="Enterprise plan. $800+/mo. Custom credits. Most teams doing real enrichment at scale." apollo="Organization plan. $149+/mo. Custom limits, advanced reporting." />
            <Row label="Credit burn" clay="Credits consumed per enrichment action. Waterfall can burn more than expected." apollo="No credit system. Flat monthly fee for most features." />
          </div>
          <P>
            Clay's pricing looks clean until you start running campaigns at volume. A waterfall that tries five providers per contact consumes five credits per row. On a list of 2,000 contacts, that is 10,000 credits gone before you have run any AI columns. Understanding exactly how credits burn is essential before committing to Clay at scale.
          </P>

          <H2>Who should use which</H2>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Use Clay when</div>
            <Verdict tool="You are serious about enrichment quality" score="Clay wins" reason="You need the best possible email coverage and are willing to pay for waterfall enrichment across multiple providers." />
            <Verdict tool="You want AI personalisation" score="Clay wins" reason="You are sending enough volume that generic openers are hurting reply rates and you need content generated per contact." />
            <Verdict tool="You have a GTM engineer" score="Clay wins" reason="Clay rewards people who can build. If you have someone who can configure tables, waterfalls, and AI prompts, the output is significantly better than any off-the-shelf tool." />
            <Verdict tool="You already have an outreach tool" score="Clay wins" reason="You are using Instantly, Smartlead, or HeyReach for sending and just need enrichment. Clay is purpose-built for this." />
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#5b9bd5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Use Apollo when</div>
            <Verdict tool="You need to move fast" score="Apollo wins" reason="You are a founder running early sales and need to get emails out this week, not build enrichment infrastructure." />
            <Verdict tool="You need to source leads too" score="Apollo wins" reason="You do not have a lead list. Apollo's database lets you build one and sequence it in the same tool." />
            <Verdict tool="Budget is a constraint" score="Apollo wins" reason="At $99/mo for the full feature set, Apollo is hard to beat on value if you do not need custom enrichment logic." />
            <Verdict tool="Your team is non-technical" score="Apollo wins" reason="No waterfalls, no credit logic, no table configuration. A trained SDR can run Apollo without any engineering support." />
          </div>

          <H2>The setup most serious GTM teams use</H2>
          <P>
            Source leads from Apollo or LinkedIn. Enrich and personalise in Clay. Send via Instantly, Smartlead, or HeyReach. Each tool does what it is best at. Apollo's database is excellent for sourcing at scale. Clay's waterfall and AI columns are the best available for enrichment and personalisation. Instantly or Smartlead handles deliverability and sending infrastructure.
          </P>
          <P>
            This is more expensive and more complex to maintain than using Apollo alone. It is worth it when you are running outbound at serious volume and reply rate differences of even 1 to 2 percentage points translate into meaningful pipeline.
          </P>

          <H2>Bottom line</H2>
          <P>
            If you are asking which one to use, the honest answer is that you are probably thinking about this the wrong way. Apollo is where you source leads and run outbound when you need simplicity. Clay is where you enrich and personalise when you need quality. The best outbound teams use both for different parts of the workflow.
          </P>
          <P>
            If you can only pick one: early stage and resource-constrained, use Apollo. Past 50 emails per day and serious about reply rates, bring in Clay.
          </P>

          {/* Author */}
          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>Rishiraj Paul</div>
              <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>GTM Engineer. I have used both Clay and Apollo in production across multiple campaigns.</div>
            </div>
          </div>

          {/* Next comparison */}
          <div style={{ marginTop: 48, padding: "24px 28px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 10 }}>UP NEXT</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Zapier vs n8n vs Make</div>
            <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)" }}>Three automation platforms, three different philosophies. Coming soon.</div>
          </div>

        </article>

      </main>
      <Footer />
    </>
  );
}
