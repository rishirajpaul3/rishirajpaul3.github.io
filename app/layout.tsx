import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: { default: "Rishiraj Paul — GTM Engineer", template: "%s — Rishiraj Paul" },
  description: "I build the revenue systems that ops teams couldn't. AI-powered outbound, CRM automation, and sales co-pilots that run in production.",
  openGraph: {
    title: "Rishiraj Paul — GTM Engineer",
    description: "I build the revenue systems that ops teams couldn't.",
    type: "website",
    url: "https://rishirajpaul3.github.io",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishiraj Paul — GTM Engineer",
    description: "I build the revenue systems that ops teams couldn't.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <Cursor />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
