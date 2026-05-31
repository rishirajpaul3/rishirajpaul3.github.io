import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RightRail from "@/components/RightRail";
import Link from "next/link";
import type { Metadata } from "next";
import { guides, categoryColors } from "@/data/how-to";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Rishiraj Paul`,
    description: guide.desc,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const c = categoryColors[guide.category];
  const related = guides.filter((g) => g.slug !== guide.slug && g.category === guide.category).slice(0, 2);

  return (
    <>
      <Nav />
      <RightRail />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Back */}
        <div style={{ paddingTop: 48, marginBottom: 40 }}>
          <Link href="/how-to" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.04em" }}>
            ← back to how-to
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 72, alignItems: "start" }}>

          {/* Article */}
          <article>

            {/* Header */}
            <header style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "4px 12px", borderRadius: 9999,
                  border: `1px solid ${c.border}`, background: c.bg, color: c.color,
                }}>
                  {guide.category}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>
                  {guide.readTime}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>
                  {guide.date}
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(28px,4vw,48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text)",
                marginBottom: 20,
              }}>
                {guide.title}
              </h1>

              <p style={{
                fontFamily: "Inter, 'DM Sans', system-ui, sans-serif",
                fontSize: 17,
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: 620,
                marginBottom: 28,
              }}>
                {guide.desc}
              </p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {guide.tools.map(t => (
                  <span key={t} style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                    color: "var(--text-muted)", background: "var(--surface-2)",
                    border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 9999,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </header>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 48 }} />

            {/* Sections */}
            <div style={{ paddingTop: 48, paddingBottom: 80 }}>
              {guide.sections.map((section, i) => (
                <section key={i} style={{ marginBottom: 52 }}>
                  <h2 style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    marginBottom: 20,
                    lineHeight: 1.3,
                  }}>
                    {section.heading}
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j} style={{
                        fontFamily: "Inter, 'DM Sans', system-ui, sans-serif",
                        fontSize: 16,
                        color: "var(--text-muted)",
                        lineHeight: 1.85,
                        margin: 0,
                      }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

          </article>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: 80 }}>

            {/* Table of contents */}
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px", marginBottom: 16 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 14 }}>
                // contents
              </div>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {guide.sections.map((s, i) => (
                  <li key={i}>
                    <span style={{
                      fontFamily: "Inter, 'DM Sans', system-ui, sans-serif",
                      fontSize: 12,
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                      display: "block",
                    }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "var(--gold)", marginRight: 8 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.heading}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 22px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 14 }}>
                  // related
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {related.map(r => (
                    <Link key={r.slug} href={`/how-to/${r.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{
                        background: "var(--surface)", border: "1px solid var(--border)",
                        borderRadius: 8, padding: "12px 14px",
                      }}>
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4, lineHeight: 1.35 }}>
                          {r.title}
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-dim)" }}>
                          {r.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>

      </main>
      <Footer />
    </>
  );
}
