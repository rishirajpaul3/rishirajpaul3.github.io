import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zapier vs n8n vs Make — GTM Automation Compared",
  description: "Three automation platforms built for three different types of people. Zapier for non-technical teams, n8n for engineers who want control, Make for the middle ground.",
};

const G = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: "var(--gold)" }}>{children}</span>;

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--text)", margin: "56px 0 20px", lineHeight: 1.2 }}>{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 20, maxWidth: 720 }}>{children}</p>
);

const Row = ({ label, zapier, n8n, make }: { label: string; zapier: string; n8n: string; make: string }) => (
  <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}>
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", padding: "14px 16px", borderRight: "1px solid var(--border)" }}>{label}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{zapier}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", borderRight: "1px solid var(--border)", lineHeight: 1.5 }}>{n8n}</div>
    <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)", padding: "14px 16px", lineHeight: 1.5 }}>{make}</div>
  </div>
);

export default function ZapierVsN8nVsMake() {
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
            {["Automation", "GTM Engineering", "7 min read"].map(t => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-muted)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999 }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.06, marginBottom: 16, color: "var(--text)" }}>
            Zapier vs n8n vs Make.<br /><G>Three tools, three philosophies.</G>
          </h1>
          <p style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 17, color: "var(--text-muted)", maxWidth: 620, lineHeight: 1.8 }}>
            They all automate workflows. But they are built for fundamentally different people. Picking the wrong one does not just slow you down, it shapes how you think about automation. Here is the honest breakdown.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", marginTop: 20 }}>Rishiraj Paul · May 2026</div>
        </section>

        <div className="divider" />

        <article style={{ padding: "48px 0 80px", maxWidth: 760 }}>

          <H2>What each tool is actually built for</H2>
          <P>Zapier launched in 2011 and practically invented the no-code automation category. Its core promise is simple: connect two apps without writing any code. You pick a trigger, pick an action, and Zapier handles the rest. Over 6,000 app integrations. Clean UI. Non-technical users can be up and running in under an hour. That is the point.</P>
          <P>n8n launched in 2019 as the open source alternative. You can self-host it on your own server for free, or pay for cloud hosting. Instead of a simplified drag-and-drop experience, n8n gives you full access to the underlying logic. Every node is inspectable, every piece of data is transformable, and you can write JavaScript directly in Function nodes when the built-in options do not cut it. GTM engineers use n8n because it does not hide the complexity.</P>
          <P>Make (previously Integromat) sits between the two. It launched in 2012 and has a visual canvas-based builder that feels more like a flowchart than a spreadsheet. More flexible than Zapier, less technical than n8n. 1,500+ integrations. The pricing is significantly cheaper than Zapier for equivalent volume, which is why many Zapier users migrate to Make once their automation costs start climbing.</P>

          <H2>Pricing: where the real difference shows</H2>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr 1fr", background: "var(--surface-3)", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>PLAN</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--gold)", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>ZAPIER</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#9b8afb", padding: "12px 16px", borderRight: "1px solid var(--border)", letterSpacing: "0.08em" }}>N8N</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#4ade80", padding: "12px 16px", letterSpacing: "0.08em" }}>MAKE</div>
            </div>
            <Row label="Free" zapier="100 tasks/mo. Single step only." n8n="Unlimited on self-hosted. Cloud: limited trial." make="1,000 operations/mo. Most features included." />
            <Row label="Entry" zapier="$19.99/mo. 750 tasks. Multi-step allowed." n8n="$20/mo cloud. Unlimited executions." make="$9/mo. 10,000 operations." />
            <Row label="Mid" zapier="$49/mo. 2,000 tasks." n8n="$50/mo. Unlimited. More concurrent workflows." make="$16/mo. 10,000 operations." />
            <Row label="Scale" zapier="Costs spiral fast. $299/mo for 50,000 tasks." n8n="Self-hosted is free at any volume. Cloud scales linearly." make="$29/mo for teams. Remains cheap at volume." />
          </div>
          <P>Zapier's task-based pricing looks fine at low volume and becomes painful the moment your automations run at scale. A workflow that runs 10 steps per trigger consumes 10 tasks per run. At any serious GTM volume, costs can hit $200 to $500 per month before you realise what happened. This is the single biggest reason teams move away from Zapier.</P>
          <P>Make charges per operation rather than per task, and its prices are roughly 3 to 5 times cheaper than Zapier for equivalent workloads. n8n on self-hosted costs whatever your server costs, which for most teams is $5 to $20 per month regardless of how many workflows you run.</P>

          <H2>Where Zapier wins</H2>
          <P>Simplicity and support. The Zapier documentation is excellent. If you get stuck, there are thousands of tutorials, YouTube videos, and community threads covering nearly every use case. No other tool has this level of accessible help content. For a non-technical founder or sales ops person who needs automation running today, Zapier removes almost all the friction.</P>
          <P>App coverage. 6,000 integrations including many niche tools that n8n and Make have not built native connectors for yet. If your stack has an obscure tool, Zapier probably supports it.</P>

          <H2>Where n8n wins</H2>
          <P>Control and flexibility. When you need to transform data in complex ways, run conditional logic with multiple branches, or call APIs that are not natively supported, n8n gives you full access to do it. Function nodes let you write arbitrary JavaScript. The HTTP Request node connects to any REST API. Nothing is hidden from you.</P>
          <P>Cost at scale. Self-hosted n8n has no per-task or per-operation costs. You can run 100,000 workflow executions per month on a $10 VPS. For GTM engineers running high-frequency automation like reply classification, enrichment pipelines, or daily digest generation, this is transformative.</P>
          <P>Open source. You own your data, your workflows, and your infrastructure. No vendor lock-in. If n8n shuts down tomorrow, your self-hosted instance keeps running.</P>

          <H2>Where Make wins</H2>
          <P>Visual clarity. Make's canvas-based builder makes complex workflows easier to understand at a glance than n8n's node grid. When a workflow has many branches and conditions, Make's layout keeps it readable. Teams that need to share workflows with less technical colleagues find Make easier to hand off.</P>
          <P>Price to features ratio. For teams that want more than Zapier but are not ready to self-host n8n, Make is the sweet spot. More flexible than Zapier, cheaper than Zapier, and no server to manage.</P>

          <H2>Which one for GTM work</H2>
          <P>If you are running GTM automation seriously, n8n is almost always the right answer. The workflows that matter in GTM — reply classification, enrichment pipelines, signal monitoring, CRM updates — run frequently and have enough logic that Zapier's task-based pricing becomes prohibitive. n8n on a small VPS handles all of it for almost nothing.</P>
          <P>The caveat is the learning curve. If your team does not have someone who is comfortable looking at JSON, reading API documentation, and debugging a failed node, n8n will frustrate you. In that case, Make is the better starting point. Move to n8n when the complexity and volume justify it.</P>
          <P>Zapier is best for simple, infrequent automations where you need something working immediately and are not worried about cost. Most mature GTM stacks eventually outgrow it.</P>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gold)", flexShrink: 0 }}>RP</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>Rishiraj Paul</div>
              <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>GTM Engineer. I use n8n for production GTM pipelines and Make for client workflows that need to be handed off.</div>
            </div>
          </div>

          <div style={{ marginTop: 48, padding: "24px 28px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 10 }}>UP NEXT</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>Instantly vs Smartlead</div>
            <div style={{ fontFamily: "Inter, 'DM Sans', system-ui, sans-serif", fontSize: 13, color: "var(--text-muted)" }}>Cold email deliverability head to head. Coming soon.</div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
