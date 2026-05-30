import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishiraj Paul — GTM Engineer",
  description: "I build the revenue systems that ops teams couldn't. AI-powered GTM infrastructure for B2B.",
  openGraph: {
    title: "Rishiraj Paul — GTM Engineer",
    description: "AI-powered outbound, CRM automation, and sales co-pilots that run in production.",
    type: "website",
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
