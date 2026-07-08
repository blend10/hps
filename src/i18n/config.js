// Locale configuration — the single source of truth for which languages the
// site speaks, how their URLs are shaped, and how their text flows.
//
// Adding a language is a three-step job:
//   1. add its code here + an entry in `localeConfig`
//   2. add `src/i18n/dictionaries/<code>.json`
//   3. register the loader in `src/i18n/server.js`
// Everything else (routing, the header switcher, <html lang/dir>, sitemap
// alternates) is driven off this file.

export const locales = ["en", "de", "ar"];

export const defaultLocale = "en";

export const localeConfig = {
  en: {
    // Shown in the header language list.
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
    // Value for <html lang> and Open Graph.
    htmlLang: "en",
    ogLocale: "en_US",
  },
  de: {
    label: "German",
    nativeLabel: "Deutsch",
    dir: "ltr",
    htmlLang: "de",
    ogLocale: "de_DE",
  },
  ar: {
    label: "Arabic",
    nativeLabel: "العربية",
    dir: "rtl",
    htmlLang: "ar",
    ogLocale: "ar_AE",
  },
};

export const isLocale = (value) => locales.includes(value);

export const getDirection = (locale) => localeConfig[locale]?.dir ?? "ltr";

// Hrefs that must never be locale-prefixed: absolute URLs, protocol-relative
// links, in-page anchors, mailto/tel.
const ABSOLUTE_HREF = /^([a-z][a-z0-9+.-]*:|\/\/|#)/i;

// Prefix an internal path with the active locale: ("de", "/contact") -> "/de/contact".
// Returns non-internal hrefs (https://…, #top, mailto:…) untouched, so callers
// can pipe every href through it without special-casing.
export function localeHref(locale, path) {
  if (typeof path !== "string" || ABSOLUTE_HREF.test(path)) return path;
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix}`;
}

// Strip a leading locale segment: "/de/contact" -> "/contact", "/de" -> "/".
// Used by the header's language switcher to re-point the current route at a
// different locale.
export function stripLocale(pathname) {
  const match = pathname.match(/^\/([^/]+)(\/.*)?$/);
  if (match && isLocale(match[1])) return match[2] || "/";
  return pathname || "/";
}

// The `alternates` block every page's metadata needs: a self-referencing
// canonical plus one hreflang per locale, and an `x-default` for visitors whose
// language we don't speak. `path` is the unprefixed route ("/contact").
export function alternatesFor(locale, path) {
  return {
    canonical: localeHref(locale, path),
    languages: {
      ...Object.fromEntries(
        locales.map((l) => [localeConfig[l].htmlLang, localeHref(l, path)]),
      ),
      "x-default": localeHref(defaultLocale, path),
    },
  };
}
