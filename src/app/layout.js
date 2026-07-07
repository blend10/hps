import { Space_Grotesk } from "next/font/google";
import Header from "@/components/general/Header";
import "./globals.css";
import Footer from "@/components/general/Footer";
import { siteConfig } from "@/lib/site";

// Optimized, self-hosted font via next/font — no layout shift, no external
// request to Google at runtime. Space Grotesk is a close geometric-grotesque
// stand-in for Neue Montreal; swap to next/font/local once the licensed
// Neue Montreal woff2 files are available (see public/fonts/README.md).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Ballistic & Tactical Helmets`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "ballistic helmet",
    "tactical helmet",
    "riot helmet",
    "SWAT helmet",
    "aviation helmet",
    "military head protection",
    "law enforcement helmet",
    "High Protection Systems",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Ballistic & Tactical Helmets`,
    description: siteConfig.description,
    images: [{ url: "/videos/hero-poster.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Ballistic & Tactical Helmets`,
    description: siteConfig.description,
    images: ["/videos/hero-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${spaceGrotesk.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}

// Site-wide Organization structured data — helps search engines build a
// knowledge-panel entity for the brand. Rendered once in the root layout.
function OrganizationJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: "High Protection Systems SA",
    url: siteConfig.url,
    logo: `${siteConfig.url}/hpsFooterLogo.svg`,
    description: siteConfig.description,
    parentOrganization: { "@type": "Organization", name: "Racing Force Group" },
    sameAs: ["https://www.linkedin.com"],
  };
  return (
    <script
      type="application/ld+json"
      // Static, developer-authored JSON — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
