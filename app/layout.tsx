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
    url: "https://rishirajpaul.com",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishiraj Paul — GTM Engineer",
    description: "I build the revenue systems that ops teams couldn't.",
    images: ["/og.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rishiraj Paul",
  "url": "https://rishirajpaul.com",
  "image": "https://rishirajpaul.com/avatar.jpg",
  "jobTitle": "GTM Engineer",
  "description": "GTM Engineer building AI-powered revenue systems. Specialises in outbound infrastructure, CRM automation, lead enrichment pipelines, and AI sales co-pilots.",
  "knowsAbout": ["GTM Engineering", "AI Sales Automation", "CRM Automation", "Outbound Infrastructure", "HubSpot", "Clay", "n8n", "Lead Enrichment", "Sales Operations"],
  "sameAs": [
    "https://www.linkedin.com/in/rishiraj-paul-gtm/",
    "https://github.com/rishirajpaul3",
    "https://x.com/RishirajPa40653",
    "https://build-logrishiraj.beehiiv.com"
  ],
  "address": { "@type": "PostalAddress", "addressCountry": "GB" },
  "email": "rishirajpaul3@gmail.com"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
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
