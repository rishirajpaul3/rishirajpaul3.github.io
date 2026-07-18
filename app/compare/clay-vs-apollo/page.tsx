import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clay vs Apollo — What Each One Is Actually For",
  description: "Clay enriches. Apollo sources, enriches, and sends. They get compared constantly and they're not really solving the same problem — here's when each one is the right call.",
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
            Clay vs Apollo.<br /><G>Wrong question, usually.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            This one comes up in every GTM Slack I&apos;m in. Most of the takes miss why it&apos;s a weird comparison to make in the first place: Clay and Apollo aren&apos;t fighting for the same job.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>
            Rishiraj Paul · May 2026
          </div>
        </section>

        <div className="divider" />

        {/* Content */}
        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>What each one actually does</H2>
          <P>
            Clay is a spreadsheet that enriches itself. Give it a list of companies or contacts and it pulls from 75+ providers at once — emails, LinkedIn, tech stack, funding, headcount. Then an AI column writes something per row: an opener, a research summary, a fit score, whatever you tell it to produce. It doesn't send anything. It just makes the row better before it goes somewhere else.
          </P>
          <P>
            Apollo is the opposite bet. Its own database of 275 million contacts, sequencing built in, a LinkedIn extension, a dialer, light CRM. Source, enrich, and send without leaving the tab. It's built for a founder or small team who doesn't want to stitch together five subscriptions to run outbound.
          </P>
          <P>
            Clay is a workbench. Apollo is a finished workflow. That's really the whole comparison.
          </P>

          <H2>Where Clay wins</H2>
          <P>
            Coverage. A waterfall that tries Apollo's database, then Hunter.io, then Dropcontact, then Seamless.ai catches emails a single provider misses on its own. I haven't run a clean A/B on the exact lift, but the difference between one provider and a properly configured waterfall is usually the difference between a list worth sending to and one that's half-dead on arrival.
          </P>
          <P>
            Personalisation. Apollo gives you merge tags. Clay pulls a prospect's last LinkedIn post, a recent funding round, their tech stack, and writes an opener that references something actually true about them. Prospects notice the difference, and it's the main reason people keep paying for Clay even when Apollo would technically get the job done.
          </P>
          <P>
            Flexibility. Clay behaves more like a programmable spreadsheet than a tool with a fixed menu — lead scoring, CRM cleanup, signal detection, routing by ICP fit. If you can describe the logic in plain English, you can usually build it in a table.
          </P>

          <H2>Where Apollo wins</H2>
          <P>
            Speed. Sign up, pull a list against your ICP, load a sequence, send — same day. Clay makes you learn the credit system, connect providers, and build tables before your first email goes out. If you're a founder trying to get pipeline moving this week, that setup tax is real.
          </P>
          <P>
            The database. 275 million contacts is a lot of surface area for sourcing. Need people with a specific title, at companies of a certain size and funding stage — Apollo does that natively. Clay doesn't source. You bring a list, or go find domains somewhere else first.
          </P>
          <P>
            Fewer moving parts. One login, one bill, sequences and reporting in the same place. If you don't have a GTM engineer around to keep enrichment infrastructure running, that's not a small thing.
          </P>
          <P>
            Price. Apollo's Professional plan is $99/month. Clay starts at $149/month, and the credit system means anyone doing real volume ends up paying a lot more than the sticker price suggests.
          </P>

          <H2>Pricing, once you actually use it</H2>

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
            Clay's pricing looks fine on the page and then a real campaign hits it. A waterfall that tries five providers per contact burns five credits per row — a list of 2,000 contacts is 10,000 credits gone before a single AI column has run. Know how your credits burn before you commit to a plan. This is the part people get caught out by.
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

          <H2>What I actually run</H2>
          <P>
            Source from Apollo or LinkedIn. Enrich and personalise in Clay. Send through Instantly, Smartlead, or HeyReach. Three tools, each doing the one thing it's best at, instead of one tool doing everything adequately.
          </P>
          <P>
            It's more expensive and more to maintain than just living inside Apollo. Worth it once you're running enough volume that a couple of points of reply rate is real pipeline, not worth it before that.
          </P>

          <H2>Bottom line</H2>
          <P>
            If you're stuck deciding which one to use, you're asking the wrong question. Apollo is where you source and send when you need speed. Clay is where you enrich and personalise when you need quality. Every outbound setup I'd call good uses both, just for different parts of the funnel.
          </P>
          <P>
            If you can only run one: early stage, resource-constrained, use Apollo. Sending 50+ a day and reply rate is what's holding you back, bring in Clay.
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
