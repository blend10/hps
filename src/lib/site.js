// Central site configuration — single source of truth for SEO/metadata,
// sitemap, robots, and structured data.
//
// IMPORTANT: set NEXT_PUBLIC_SITE_URL to the real production origin (e.g.
// https://www.highprotectionsystems.com) in your Vercel/host env. The fallback
// is only a placeholder for local builds; canonical + Open Graph URLs depend on
// it being correct in production.
export const siteConfig = {
  name: "High Protection Systems",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.hps.example").replace(
    /\/$/,
    ""
  ),
  description:
    "HPS delivers next-generation ballistic and tactical helmets engineered for elite military, law enforcement, and special forces — built on motorsport safety excellence.",
};

// Every crawlable route in the app. Kept here so the sitemap stays in sync with
// the App Router without a filesystem scan. Update when routes are added.
export const routes = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/product/riot", priority: 0.8, changeFrequency: "monthly" },
  { path: "/product/gladiator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/product/airborne", priority: 0.8, changeFrequency: "monthly" },
  { path: "/aboutUs", priority: 0.7, changeFrequency: "yearly" },
  { path: "/company", priority: 0.6, changeFrequency: "yearly" },
  { path: "/motorsportHeritage", priority: 0.6, changeFrequency: "yearly" },
  { path: "/news", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
];
