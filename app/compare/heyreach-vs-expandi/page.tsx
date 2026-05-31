import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeyReach vs Expandi — LinkedIn Outreach Tools Compared",
  description: "HeyReach is built for agencies running LinkedIn outreach at scale across many accounts. Expandi is built for solo operators who want smarter sequences. Here is the real difference.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", margin: "56px 0 20px", lineHeight: 1.2 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 20, maxWidth: 720 }}>{children}</p>
);
const Row = ({ label, heyreach, expandi }: { label: string; heyreach: string; expandi: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", padding: "14px 16px", borderRight: "1px solid var(--border)" }}>{label}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{heyreach}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", lineHeight: 1.5 }}>{expandi}</div>
  </div>
);

export default function HeyReachVsExpandi() {
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
            {["LinkedIn", "Outreach", "4 min read"].map(t => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            HeyReach vs Expandi.<br /><G>Scale vs smarts.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            LinkedIn automation tools all face the same constraint: LinkedIn's daily limits. What separates HeyReach and Expandi is how they handle those limits and who they are designed for.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>Rishiraj Paul · May 2026</div>
        </section>

        <div className="divider" />

        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>The LinkedIn limit problem</H2>
          <P>LinkedIn restricts how many connection requests, messages, and profile views you can send per day. Exceed those limits and your account gets restricted or banned. Every LinkedIn automation tool exists to maximise outreach volume while staying within those limits. The difference between tools is in how intelligently they manage this, and how many accounts they can manage simultaneously.</P>

          <H2>What HeyReach is built for</H2>
          <P>HeyReach is designed for volume across many LinkedIn accounts. The headline feature is simple: connect unlimited LinkedIn accounts for one flat price and run campaigns across all of them simultaneously. Instead of being constrained by one account's daily limit of 20 to 30 connection requests, you can spread outreach across 10 or 20 accounts and hit 200 to 600 connections per day from the same campaign.</P>
          <P>For agencies running outbound for clients, this is the product they have been waiting for. Each client gets their own LinkedIn account connected, campaigns run independently, and everything is managed from one dashboard. The pricing model at $79 per month for unlimited accounts makes the unit economics of running LinkedIn for multiple clients actually work.</P>
          <P>HeyReach integrates natively with Clay, which is how most GTM engineers use it. You enrich a list in Clay, generate personalised message openers per contact, export to HeyReach, and launch. The loop between Clay and HeyReach is one of the most effective outbound setups available right now.</P>

          <H2>What Expandi is built for</H2>
          <P>Expandi is designed for smarter sequences on a single account. Where HeyReach solves the scale problem, Expandi solves the intelligence problem. Its sequence builder supports complex if/else branching. If someone viewed your profile after a connection request but did not accept, Expandi sends a follow-up. If they accepted but did not reply after the first message, it sends a second message a few days later. These conditional paths are what separate a properly built LinkedIn sequence from a basic blast.</P>
          <P>Expandi runs in the cloud rather than through a browser extension, which is safer for your LinkedIn account. It also has image and gif personalisation built in, where you can generate dynamic images with the prospect's name or photo overlaid. This level of personalisation in LinkedIn messages gets noticeably higher reply rates when done well.</P>
          <P>The pricing reflects the single-account focus. $99 per month per LinkedIn account. If you are managing multiple accounts, costs multiply quickly, which is where HeyReach becomes more economical.</P>

          <H2>Pricing</H2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", background: "var(--surface-3)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>PLAN</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>HEYREACH</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#5b9bd5", padding: "12px 16px", letterSpacing: "0.08em" }}>EXPANDI</div>
            </div>
            <Row label="Entry" heyreach="$79/mo. Unlimited LinkedIn accounts." expandi="$99/mo per LinkedIn account." />
            <Row label="3 accounts" heyreach="$79/mo. No change." expandi="$297/mo. Costs multiply per account." />
            <Row label="10 accounts" heyreach="$79/mo. Still no change." expandi="$990/mo. Prohibitive for agencies." />
            <Row label="Clay integration" heyreach="Native. Built specifically for Clay workflows." expandi="Via Zapier or webhooks. Less seamless." />
          </div>
          <P>For a single LinkedIn account, Expandi is only $20 more per month. As soon as you add a second or third account, HeyReach wins on price decisively. For agencies, there is no comparison.</P>

          <H2>Which one to use</H2>
          <P>Use HeyReach if you are running LinkedIn outbound for more than one LinkedIn account, working with Clay to enrich and personalise your lists, or managing outreach for clients. The native Clay integration and flat unlimited account pricing make it the better choice for GTM engineers building outbound infrastructure.</P>
          <P>Use Expandi if you are running your own single LinkedIn account and want the most sophisticated sequence logic available. The conditional branching, image personalisation, and cloud-based safety make it the better tool for a solo founder or SDR who is serious about reply rates on their own account.</P>
          <P>The pattern most GTM teams end up on: HeyReach for client accounts at scale, Expandi for their own personal outreach where they want maximum sequence intelligence.</P>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>Rishiraj Paul</div>
              <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>GTM Engineer. HeyReach is part of my standard outbound stack alongside Clay.</div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
