import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HubSpot vs GoHighLevel — CRM Comparison for GTM Teams",
  description: "HubSpot is the standard for B2B companies. GoHighLevel is what agencies and lean GTM teams use when they want everything in one place at a fraction of the cost. Here is the real difference.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", margin: "56px 0 20px", lineHeight: 1.2 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 20, maxWidth: 720 }}>{children}</p>
);
const Row = ({ label, hubspot, ghl }: { label: string; hubspot: string; ghl: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", padding: "14px 16px", borderRight: "1px solid var(--border)" }}>{label}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{hubspot}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", lineHeight: 1.5 }}>{ghl}</div>
  </div>
);

export default function HubSpotVsGoHighLevel() {
  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ paddingTop: 48 }}>
          <Link href="/compare" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", textDecoration: "none" }}>← back to comparisons</Link>
        </div>

        <section style={{ padding: "40px 0 48px" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {["CRM", "GTM", "6 min read"].map(t => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            HubSpot vs GoHighLevel.<br /><G>The pricing cliff is real.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            HubSpot is polished, well-integrated, and trusted by thousands of B2B companies. GoHighLevel is chaotic, overwhelming, and absurdly good value. Choosing between them is not just about features.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>Rishiraj Paul · May 2026</div>
        </section>

        <div className="divider" />

        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>The honest summary upfront</H2>
          <P>HubSpot starts free and stays affordable until you need automation and sequences, at which point it jumps to $800 per month. That is not a typo. The Professional plan, which is where most B2B teams actually need to be, costs $800 per month. This is HubSpot's biggest problem and the reason so many teams look at GoHighLevel.</P>
          <P>GoHighLevel costs $97 per month and includes a CRM, email sequences, SMS, landing pages, funnels, booking calendars, reputation management, and a white-label layer for agencies. It is overwhelming to set up and the UI is nowhere near as polished as HubSpot. But the value per dollar is genuinely difficult to argue with.</P>

          <H2>What HubSpot does well</H2>
          <P>The integrations ecosystem. HubSpot connects to nearly everything in the B2B tech stack. Salesforce sync, Slack, Zoom, every major data enrichment tool, Clay, n8n, Zapier. The native integrations are well-maintained and reliable. When your GTM stack has 8 to 10 tools, HubSpot usually sits in the middle and handles the connections without breaking.</P>
          <P>Contact and deal management. HubSpot's core CRM is genuinely excellent. The contact timeline, deal pipeline visualisation, task management, and reporting are best in class for the B2B use case. Sales teams that spend their day inside a CRM are more productive in HubSpot than in almost anything else.</P>
          <P>Trust and credibility. If you are selling to enterprise buyers or working at a company that will be acquired, being on HubSpot carries weight. Your CRM data is clean, your reporting is credible, and your sales process looks professional. This is an intangible advantage that is hard to quantify but real.</P>
          <P>Support and documentation. HubSpot Academy is one of the best free educational resources for revenue teams. Certifications, courses, detailed documentation. If your team is learning CRM operations, HubSpot has more learning infrastructure than anyone else.</P>

          <H2>What GoHighLevel does well</H2>
          <P>Everything in one place. At $97 per month, GoHighLevel includes a full CRM, unlimited contacts, email and SMS sequences, pipeline management, a landing page and funnel builder, booking calendar, reputation management, and a community platform. Replacing all of this with separate tools would cost 10 to 20 times more. For lean teams and agencies, this consolidation is genuinely transformative.</P>
          <P>Agency operations. GoHighLevel was built from the ground up for marketing agencies. The sub-account system lets you spin up a separate branded instance for each client, white-labelled with your agency's name. Each client gets their own CRM, sequences, and reporting. The economics of running an agency on GoHighLevel versus HubSpot are not comparable.</P>
          <P>Automation depth. GoHighLevel's workflow builder is complex and takes time to learn, but it can automate almost anything. Conditional logic, AI follow-ups, SMS replies, reputation review requests, appointment reminders. Teams that invest in learning the automation layer get capabilities that would require multiple tools in HubSpot.</P>

          <H2>Pricing</H2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", background: "var(--surface-3)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>PLAN</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>HUBSPOT</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#4ade80", padding: "12px 16px", letterSpacing: "0.08em" }}>GOHIGHLEVEL</div>
            </div>
            <Row label="Free" hubspot="CRM only. No sequences, no automation." ghl="14-day trial. No free plan." />
            <Row label="Entry" hubspot="Starter: $15/mo. Basic features only." ghl="Starter: $97/mo. Full feature set." />
            <Row label="Sequences" hubspot="Professional: $800/mo. This is the jump most teams hit." ghl="Included at $97/mo." />
            <Row label="Enterprise" hubspot="$3,600/mo. Enterprise-grade reporting and SSO." ghl="$297/mo for unlimited sub-accounts." />
            <Row label="Extra users" hubspot="Billed per seat on higher plans." ghl="Unlimited users on all plans." />
          </div>
          <P>The $800 per month Professional plan is where most honest HubSpot comparisons end the conversation. Sequences, custom reporting, A/B testing, and automation are locked behind this tier. For an early-stage company, that is a significant commitment before you have proven your outbound motion works.</P>

          <H2>Who should use which</H2>
          <P>Use HubSpot if you are at Series A or beyond, your investors or board expect standard reporting, you have a dedicated RevOps person to manage the system, or you are selling to enterprise buyers where HubSpot credibility matters. Also use HubSpot if your tech stack already revolves around it and switching costs are high.</P>
          <P>Use GoHighLevel if you are running a marketing or GTM agency, you want everything in one tool and cannot justify $800 per month for HubSpot Professional, or you are an early-stage company that needs automation before you can afford enterprise software pricing.</P>
          <P>The practical path many teams take: GoHighLevel to start, HubSpot when the business grows to a point where the $800 per month is not a meaningful budget line and the integrations ecosystem starts to matter.</P>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>Rishiraj Paul</div>
              <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>GTM Engineer. I have built automation on both HubSpot and GoHighLevel across multiple client engagements.</div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
