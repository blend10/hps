import { siteConfig, routes } from "@/lib/site";

// Generates /sitemap.xml at build time from the central route list. Submit
// `${siteConfig.url}/sitemap.xml` to Google Search Console.
export default function sitemap() {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
