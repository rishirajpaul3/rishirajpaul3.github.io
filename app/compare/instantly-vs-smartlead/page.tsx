import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instantly vs Smartlead — Cold Email Tools Compared",
  description: "Both promise inbox placement at scale. The difference is in account management, analytics, and how they handle deliverability. A real comparison from running both.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", margin: "56px 0 20px", lineHeight: 1.2 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 20, maxWidth: 720 }}>{children}</p>
);
const Row = ({ label, instantly, smartlead }: { label: string; instantly: string; smartlead: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", padding: "14px 16px", borderRight: "1px solid var(--border)" }}>{label}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{instantly}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", lineHeight: 1.5 }}>{smartlead}</div>
  </div>
);

export default function InstantlyVsSmarLead() {
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
            {["Cold Email", "Deliverability", "5 min read"].map(t => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            Instantly vs Smartlead.<br /><G>Closer than you think.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            Both tools launched in 2022, both offer unlimited mailboxes, both promise inbox placement. The differences are real but subtle. Here is what actually matters when you are choosing between them.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>Rishiraj Paul · May 2026</div>
        </section>

        <div className="divider" />

        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>What they share</H2>
          <P>Both Instantly and Smartlead are cold email platforms built on the same core premise: unlimited sending accounts, automated warmup, and campaign management at scale. Before either of these tools existed, running outbound across multiple domains required juggling separate accounts, manual warmup processes, and fragile spreadsheet tracking. Both tools solved that problem at roughly the same time.</P>
          <P>The fundamentals are identical. You connect your sending accounts via SMTP or Google OAuth, the tool warms them up automatically using a network of real inboxes, you build your sequences, and you send. Both have A/B testing, open and reply tracking, and integrations with Clay and Apollo for lead imports.</P>

          <H2>Where Instantly has the edge</H2>
          <P>The warmup network. Instantly built its own warmup infrastructure called Instantly AI, which uses a proprietary network of real email accounts to simulate genuine engagement with your emails. When your inbox receives a warmup email, another Instantly account opens it, replies to it, and marks it as not spam. The network is large enough that warmup happens meaningfully rather than just technically. Most users see better inbox placement during warmup with Instantly than with Smartlead.</P>
          <P>The UI is cleaner and faster to navigate. Instantly made deliberate product choices to keep the interface minimal. Campaign setup takes less time, the inbox manager is more responsive, and finding what you need requires fewer clicks. For teams managing large numbers of campaigns, this adds up.</P>
          <P>Unibox. Instantly's unified inbox aggregates replies from all your sending accounts in one view. You can reply, label, and manage conversations without switching between accounts. Smartlead has a similar feature but Instantly's version is more polished and reliable.</P>

          <H2>Where Smartlead has the edge</H2>
          <P>Analytics depth. Smartlead's reporting goes further than Instantly's. You can break down performance by sender, by sequence step, by time of day, and by domain. If you want to understand exactly which inbox is performing best or where in your sequence people are dropping off, Smartlead gives you more data to work with.</P>
          <P>Multi-channel. On Smartlead's higher plans, you can add LinkedIn steps to your sequences alongside email. This matters if you want to run coordinated email and LinkedIn touchpoints without managing two separate tools. Instantly is email only.</P>
          <P>Webhook flexibility. Smartlead's webhook and API integration is more mature. If you are building GTM automation that needs to push data from Smartlead into other systems in real time, Smartlead handles this more reliably. Instantly's webhooks work but are simpler.</P>
          <P>Client management. Smartlead has a dedicated client management layer that lets agencies create sub-accounts, white-label the interface, and manage billing per client. For agencies running outbound for multiple clients, this is a significant advantage.</P>

          <H2>Pricing</H2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", background: "var(--surface-3)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>PLAN</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>INSTANTLY</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#5b9bd5", padding: "12px 16px", letterSpacing: "0.08em" }}>SMARTLEAD</div>
            </div>
            <Row label="Entry" instantly="Growth: $37/mo. 1,000 active leads. 5,000 emails/mo." smartlead="Basic: $39/mo. 2,000 active leads. 6,000 emails/mo." />
            <Row label="Mid" instantly="Hypergrowth: $97/mo. 25,000 active leads. 100,000 emails/mo." smartlead="Pro: $94/mo. 30,000 active leads. Unlimited email accounts." />
            <Row label="Agency" instantly="Light Speed: $358/mo. Unlimited leads and emails." smartlead="Custom from $174/mo. White-label, client management." />
            <Row label="Accounts" instantly="Unlimited sending accounts on all plans." smartlead="Unlimited sending accounts on all plans." />
          </div>
          <P>Pricing is nearly identical at the entry and mid levels. The divergence happens at agency scale where Smartlead's white-label and client management features justify its custom pricing. If you are running outbound for yourself or one company, either tool costs the same.</P>

          <H2>Who should use which</H2>
          <P>Use Instantly if you want a clean, fast tool for running email outbound and deliverability is your primary concern. The warmup network is better, the UI is more intuitive, and Unibox makes inbox management easier. Solo operators and small GTM teams who want something that just works will find Instantly easier to live in day to day.</P>
          <P>Use Smartlead if you are an agency managing multiple client campaigns, need deeper analytics to optimise sequences, or want to layer LinkedIn steps alongside email. The reporting depth alone makes it worth the switch for teams who are actively optimising campaign performance rather than just sending and hoping.</P>
          <P>The honest answer for most GTM engineers: either tool will get the job done. Run Instantly for simplicity. Run Smartlead when you need the data or the agency features.</P>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>Rishiraj Paul</div>
              <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>GTM Engineer. I have run campaigns on both tools across multiple clients.</div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
