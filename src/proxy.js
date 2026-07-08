import { NextResponse } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

// Locale routing. Every page lives under `/[lang]/…`, so a request without a
// locale prefix ("/", "/contact") is redirected to the visitor's best-matching
// locale ("/en/contact").
//
// NOTE: in Next.js 16 the `middleware` file convention was renamed to `proxy`
// (see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
// This file must sit next to `app/`, i.e. at `src/proxy.js`.

// Cookie written by the header's language switcher so a returning visitor lands
// on the language they last chose rather than the one their browser prefers.
const LOCALE_COOKIE = "NEXT_LOCALE";

// Minimal Accept-Language negotiation. The docs suggest Negotiator +
// @formatjs/intl-localematcher; with three locales and no region variants a
// quality-ordered scan of the header is equivalent and keeps the dependency
// tree (and the edge bundle) empty.
function localeFromAcceptLanguage(header) {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter(({ tag }) => tag && tag !== "*")
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // Match the full tag first ("de"), then its base ("de-CH" -> "de").
    const base = tag.split("-")[0];
    const hit = locales.find((locale) => locale === tag || locale === base);
    if (hit) return hit;
  }
  return null;
}

function resolveLocale(request) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return localeFromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed — nothing to do.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and anything that looks like a static file
  // (it has a dot in the last segment: favicon.ico, robots.txt, /videos/x.mp4).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
