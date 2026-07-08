import { siteConfig, routes } from "@/lib/site";
import { defaultLocale, localeConfig, localeHref, locales } from "@/i18n/config";

// Generates /sitemap.xml at build time from the central route list, once per
// locale. Each entry also carries the `alternates.languages` map so crawlers see
// every translation of a page as one document rather than three competing ones.
// Submit `${siteConfig.url}/sitemap.xml` to Google Search Console.
export default function sitemap() {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}${localeHref(locale, route.path)}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      // The default locale is the one we want ranked; translations sit slightly
      // lower so a crawler prefers it when several match a query equally.
      priority:
        locale === defaultLocale
          ? route.priority
          : Math.round(route.priority * 0.9 * 10) / 10,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            localeConfig[l].htmlLang,
            `${siteConfig.url}${localeHref(l, route.path)}`,
          ]),
        ),
      },
    })),
  );
}
