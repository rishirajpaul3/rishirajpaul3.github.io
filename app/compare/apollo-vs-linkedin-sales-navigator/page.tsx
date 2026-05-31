import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apollo vs LinkedIn Sales Navigator — Prospecting Tools Compared",
  description: "Apollo gives you a third-party database with built-in sequences. Sales Navigator gives you LinkedIn's own data with advanced search. Here is when each one wins.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", margin: "56px 0 20px", lineHeight: 1.2 }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 20, maxWidth: 720 }}>{children}</p>
);
const Row = ({ label, apollo, salesnav }: { label: string; apollo: string; salesnav: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", padding: "14px 16px", borderRight: "1px solid var(--border)" }}>{label}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{apollo}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", lineHeight: 1.5 }}>{salesnav}</div>
  </div>
);

export default function ApolloVsSalesNav() {
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
            {["Prospecting", "LinkedIn", "5 min read"].map(t => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            Apollo vs Sales Navigator.<br /><G>Different jobs entirely.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            People compare these two because they both help you find prospects. But they source data differently, they cost differently, and they are best used for different parts of the same workflow.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>Rishiraj Paul · May 2026</div>
        </section>

        <div className="divider" />

        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>The fundamental difference</H2>
          <P>Apollo is a third-party sales intelligence platform. It aggregates contact data from across the web, scrapes LinkedIn, and cross-references multiple sources to build a database of 275 million contacts with emails, phone numbers, and firmographic data. Apollo then lets you sequence those contacts via email directly inside the same tool.</P>
          <P>LinkedIn Sales Navigator is LinkedIn's own premium prospecting product. It gives you access to LinkedIn's full dataset with advanced search filters that are not available in the free product. The data is inherently accurate because it comes directly from the source. People update their own LinkedIn profiles. They do not update third-party databases.</P>
          <P>The key thing Sales Navigator does not do: give you emails. You get LinkedIn profile data, InMail credits, and the ability to save leads and accounts for tracking. To turn Sales Navigator data into email addresses, you need to export it and run it through an enrichment tool like Clay or Apollo.</P>

          <H2>Where Apollo wins</H2>
          <P>Email access. This is the main reason most people choose Apollo over Sales Navigator. Apollo surfaces verified email addresses alongside contact records. You can find a prospect, get their email, and load them into a sequence all in the same platform. Sales Navigator has no email data at all.</P>
          <P>All-in-one workflow. Apollo handles prospecting, enrichment, and email outreach in one tool. For a solo founder or small sales team that wants to go from company domain to sent email without switching platforms, Apollo is the most complete single option available.</P>
          <P>Price. Apollo Professional is $99 per month. Sales Navigator Core is $79.99 per month, but that is per user and it does not include any contact data or sequencing. Apollo is significantly better value if you need one tool to do everything.</P>
          <P>Coverage beyond LinkedIn. Apollo sources data from across the web, not just LinkedIn. This means you can find contacts at companies that are not active on LinkedIn or whose employees have minimal LinkedIn presence.</P>

          <H2>Where Sales Navigator wins</H2>
          <P>Data accuracy. LinkedIn's data comes from its users. When someone changes jobs, they update their LinkedIn profile. Third-party databases like Apollo catch these changes slowly, which means you may be calling someone at a company they left six months ago. Sales Navigator is always current because the source is always current.</P>
          <P>Search depth. Sales Navigator's filters are genuinely more granular than anything available elsewhere. You can filter by years in current role, seniority level, whether someone posted on LinkedIn in the last 30 days, company headcount growth, and dozens of other signals that simply do not exist in Apollo. For finding exactly the right person at exactly the right time, nothing matches it.</P>
          <P>TeamLink. Sales Navigator shows you when a prospect has a first or second-degree connection with someone at your company. This warm path to an introduction is one of the highest-converting outreach methods available and it only exists because LinkedIn controls the network data.</P>
          <P>Alerts. Sales Navigator sends you notifications when a saved lead changes jobs, when a saved account is in the news, or when someone at a target company starts hiring. These real-time signals are valuable triggers for outbound and Sales Navigator is better at surfacing them than any third-party tool.</P>

          <H2>Pricing</H2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", background: "var(--surface-3)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>FEATURE</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>APOLLO</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#0077b5", padding: "12px 16px", letterSpacing: "0.08em" }}>SALES NAVIGATOR</div>
            </div>
            <Row label="Price" apollo="$49 to $149/mo depending on plan." salesnav="$79.99 to $108.33/mo per user." />
            <Row label="Email data" apollo="Yes. Verified emails included." salesnav="No. LinkedIn profile data only." />
            <Row label="Sequences" apollo="Built-in email sequencing." salesnav="InMail only. No email sequences." />
            <Row label="Search depth" apollo="Good. Company, title, location, industry." salesnav="Excellent. 30+ advanced filters including tenure, activity, growth signals." />
            <Row label="Data source" apollo="Aggregated from multiple web sources." salesnav="LinkedIn's own database. Always current." />
            <Row label="Job change alerts" apollo="Delayed. Third-party data updates slowly." salesnav="Real-time. LinkedIn knows first." />
          </div>

          <H2>The setup that works best</H2>
          <P>The most effective prospecting workflow is not choosing one over the other. It is using both for different parts of the same pipeline. Use Sales Navigator to identify exactly the right people using its superior search filters and real-time data. Export those LinkedIn profiles. Push them into Clay to run waterfall enrichment and find verified emails. Load into Apollo or Instantly for sequencing.</P>
          <P>This costs more than either tool alone but the output quality is significantly higher. You get Sales Navigator's data accuracy and search depth combined with Apollo or Clay's email coverage and enrichment logic.</P>

          <H2>Which one if you can only pick one</H2>
          <P>If you need emails and a complete outbound workflow, use Apollo. It does more in one place for less money. The data quality is not as accurate as Sales Navigator but it is good enough for most use cases.</P>
          <P>If your outreach is primarily LinkedIn InMail, if data accuracy is critical because you are in a fast-moving market where job changes matter, or if your team relies heavily on warm introductions, Sales Navigator is worth the investment alongside your email tooling.</P>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>Rishiraj Paul</div>
              <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>GTM Engineer. I use Sales Navigator for sourcing and Clay for enrichment. Apollo when clients need an all-in-one solution.</div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
