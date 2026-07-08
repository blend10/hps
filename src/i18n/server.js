// Server-side dictionary access.
//
// The dictionaries are loaded with dynamic `import()` so each locale's JSON
// lands in its own chunk and only the requested one is read per render. This
// module must never be imported from a Client Component — doing so would pull
// every dictionary into the browser bundle. Client components read the active
// dictionary from `<I18nProvider>` via `useT()` instead (see ./client.jsx).

import { defaultLocale } from "./config";
import { createT } from "./translate";

const loaders = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

export async function getDictionary(locale) {
  return (loaders[locale] ?? loaders[defaultLocale])();
}

// The server-side twin of `useT()`. Server Components take a `lang` prop and
// build their translator with `const t = await getT(lang)`.
export async function getT(locale) {
  return createT(await getDictionary(locale));
}

// Top-level dictionary sections read by at least one Client Component. Only
// these are serialised into the RSC payload for <I18nProvider>; the rest —
// `metadata`, `footer`, `high`, `frontline`, `mission`, `helmets`, `aboutHero`,
// `products`, `productDetails` — are consumed exclusively by Server Components
// and would otherwise ride along in the HTML of every page for nothing (~12KB
// of ~32KB in English, more in Arabic).
//
// If you make a Server Component into a Client Component, add its section here.
// Forgetting to shows up immediately: `t()` returns the key itself and warns in
// development.
const CLIENT_SECTIONS = [
  "common", // Header, Hero, ScrollEffect, News, Standard, Contact, ProductShowcase
  "header", // Header
  "hero", // Hero
  "scrollEffect", // ScrollEffect
  "news", // News, LatestNews
  "ultimate", // Ultimate
  "standard", // Standard
  "origins", // Origins
  "faq", // Faq
  "contact", // Contact
  "productShowcase", // ProductShowcase
];

// The slice of the dictionary handed to <I18nProvider>. Keys keep their full
// paths ("contact.labels.email"), so client components are unaware of the split.
export async function getClientDictionary(locale) {
  const dict = await getDictionary(locale);
  return Object.fromEntries(
    CLIENT_SECTIONS.filter((section) => section in dict).map((section) => [
      section,
      dict[section],
    ]),
  );
}
