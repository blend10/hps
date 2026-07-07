# HPS Next.js Production Audit

A full audit of the Next.js 16.2.9 / React 19.2.4 app was run across seven
dimensions (rendering, images/fonts/assets, SEO, accessibility, architecture,
correctness, and config). It surfaced **63 verified findings** (3 critical, 21
high, 19 medium, 20 low). This document records what was fixed in this pass and
what is deferred (and why).

Every change below was validated with a clean `next build` (all 14 routes
prerender static) and by driving the running production server (all routes 200;
security headers, sitemap, robots, JSON-LD, and previously-broken assets all
verified live).

---

## Critical — fixed

| # | Finding | Fix |
|---|---------|-----|
| cfg-01 | `my-app/` was committed as a **git submodule/gitlink** inside an outer `HPS/.git` (no `.gitmodules`). CI/Vercel would clone an **empty** `my-app` and the whole deploy would fail. | Flattened to a single repo: deleted the empty outer `HPS/.git` (0 commits, nothing lost). `my-app` is now the sole repo (remote `blend10/hps`). **Set the Vercel "Root Directory" to `my-app`.** |
| seo-01 | Only metadata in the app was `title:"HPS"`, `description:""` — a launch-blocker for search/social. | Full metadata in `layout.js`: `metadataBase`, title template, rich description, keywords, robots, Open Graph + Twitter cards, theme color. Per-page metadata added to every route. |
| assets-video-weight | Hero LCP is a raw multi-MB `<video>` (26–51 MB) served from `/public` with `preload="auto"`, bypassing all optimization. | `preload="none"` so the poster paints first and the video streams after. Long-cache headers on all videos. Re-encode is deferred to `scripts/optimize-assets.sh` (see below). |

## High — fixed

- **Case-sensitivity 404s** (`case-military-thumbs`, `case-arrowdown`, `case-headelogo4`): code referenced `/military*.png`, `/arrowdown.svg`, `/headeLogo4.svg` but the files on disk are `Military*.png`, `arrowDown.svg`, `HeadeLogo4.svg`. Worked on Windows, **would 404 on Linux/Vercel**. All refs corrected to match disk casing (verified 200 live).
- **Broken navigation** (`hero-products-cta-404`, `footer-nav-404s`, `header-products-button-broken`): the Hero CTA linked to a non-existent `/products`; the Footer linked to `/about`, `/technology`, `/careers`, `/products/*` (none exist); the Header "Products" control was a `<Link href="/">` that navigated home instead of opening the menu. Created a real `/products` index page, remapped all Footer links to real routes (Technology marked "coming soon"), and converted the Products control to a `<button>` that opens the menu on hover **and** click (also fixes keyboard access, a11y-02).
- **Needless `use client`** (`sc-01`, `sc-02`, `sc-03`, `sc-04`): `Helmets` (rendered on 9 routes) and `ProductDetails` were client components with zero interactivity — now Server Components. `HeroPageAboutUs` was split so only the interactive `HeroPanel` leaf is client. `FooterWordmark` (a decorative hover-only torch effect) is now lazy-loaded (`ssr:false`) off the critical path.
- **Duplicate News components** (`arch-01`): `News.jsx` and `LatestNews.jsx` copy-pasted card markup + `Chevron`/`Arrow` icons. Extracted shared `newsShared.jsx` (`NewsCard`, `Chevron`, `Arrow`, tab list).
- **Security headers** (`cfg-03`): none were set. Added CSP (Report-Only first), HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy in `next.config.mjs` (verified live).
- **Accessibility** (`a11y-01`, `a11y-02`, `a11y-03`): homepage News "tabs" claimed `role=tab` but were dead → rendered as plain labels; `/news` tabs got proper `tabpanel`/roving-tabindex wiring; mega-menu now keyboard-reachable; global `:focus-visible` ring added; skip-link added.
- **SEO** (`seo-02`…`seo-05`): `metadataBase`, canonicals, Open Graph/Twitter, `robots.js`, `sitemap.js` (all 11 routes) — all added and verified.
- **Oversized rasters** (`assets-oversized-rasters`): see deferred asset script; unused heavy assets removed.
- **Contact form has no backend** (`contact-form-no-backend`): **deferred** — needs your endpoint/email service (see below).

## Medium / Low — fixed highlights

- SEO: canonical URLs on every route, Organization + Product **JSON-LD**, `<h1>` on the home page (was starting at `<h2>`).
- Architecture: deleted dead `Cards.jsx` and leftover `_shot.mjs`; removed unused `playwright` devDependency; extracted shared `FullWidthRule`; removed stray `import React` from 6 RSC page files; renamed lowercase `const page` → `Page`.
- Fonts: migrated to `next/font/google` (Space Grotesk, a Neue Montreal stand-in) — self-hosted, optimized, zero CLS. The broken `@font-face` (pointing at non-existent files) is gone. See `public/fonts/README.md` to switch to licensed Neue Montreal via `next/font/local`.
- Config: `images.formats = ['image/avif','image/webp']`, `minimumCacheTTL`, `poweredByHeader:false`, `reactStrictMode:true`, long-cache headers on videos.
- Perf: removed `priority` from the 8 MB below-the-fold Frontline image (it competed with the true LCP).
- A11y: fixed low-contrast text (`#464646`/`#474747` → `#8a8a8a`, now AA), made the dead language selector a real listbox with feedback, `role="status"` on the Contact success message, corrected misleading alt text and the "+ Required"→"Optional" file label, fixed the "Qestions" typo.
- Removed ~13 MB of unused assets (`hero.mp4`, `riot2–5.png`, `headPhone.svg`).

---

## Deferred — needs your input or tools

1. **Media re-encoding** (per your "code-side only" choice). `public/` is ~270 MB;
   videos (up to 51 MB) and images (2–9 MB) dwarf their render boxes. Run
   `scripts/optimize-assets.sh` (needs `ffmpeg` + `cwebp`) — it re-encodes to
   `public_optimized/` non-destructively for review. Consider a streaming CDN
   (Mux / Cloudflare Stream / Bunny) for the hero videos. **This is the single
   biggest remaining performance win.**

2. **Set `NEXT_PUBLIC_SITE_URL`** to the real production origin in your host env.
   Canonicals, OG URLs, sitemap, and robots all use it (currently the
   `https://www.hps.example` placeholder). See `src/lib/site.js`.

3. **Contact form backend.** The form currently shows a local success state and
   discards submissions (`src/components/contact/Contact.jsx`). Wire the
   `handleSubmit` to a real endpoint (Route Handler + email service / CRM) and
   add server-side validation, sanitization, and anti-abuse (rate limit /
   CAPTCHA) before launch.

4. **Licensed Neue Montreal.** Currently using Space Grotesk. Drop the `.woff2`
   files in `public/fonts/` and switch to `next/font/local` per that folder's
   README.

5. **Missing pages referenced in nav**: `/technology` (Header + Footer link to it,
   now shown as "coming soon"). Build it or remove the links.

6. **Header refactor** (`arch-06`): `Header.jsx` is ~590 lines mixing nav data,
   three overlapping menu systems, and scroll logic. Functional, but a candidate
   for splitting into `TopStrip` / `ProductsMenu` / `MegaMenu` / `LangMenu` for
   maintainability. Low risk, deferred as non-blocking.
