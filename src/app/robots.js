import { siteConfig } from "@/lib/site";

// Generates /robots.txt. Allows all crawlers and points them at the sitemap.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
