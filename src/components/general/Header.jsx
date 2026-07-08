"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Products shown in the header hover menu — image + short blurb per system.
// hrefs map to the real product routes under src/app/product/*.
const productMenu = [
  {
    title: "RIOT",
    description:
      "The RH1.0 is a high-end head protection for crowd control application.",
    image: "/helmet1.png",
    href: "/product/riot",
  },
  {
    title: "Gladiator",
    description: "The GLADIATOR is the newest generation of SWAT-helmets.",
    image: "/helmet2.png",
    href: "/product/gladiator",
  },
  {
    title: "Lift Airborne AV2.2",
    description:
      "Designed for airborne forces, combat aviators, and special operations pilots.",
    image: "/helmet3.png",
    href: "/product/airborne",
  },
];

// Full navigation shown in the hamburger mega-menu. Rendered as a CSS grid:
// three columns on the first row (HPS · Products · Our Technology) and a second
// row where Latest News spans two columns (its links flow inline) with Contact
// Us in the third. `span2`/`inline` drive that layout per section.
// hrefs point at the real routes under src/app/*. Links whose destination page
// does not exist yet are marked `disabled` — they render as non-clickable
// labels until the page is built (see the mega-menu render below).
const menuSections = [
  {
    title: "HPS",
    links: [
      { label: "About Us", href: "/aboutUs" },
      { label: "Motorsport Heritage", href: "/motorsportHeritage" },
      { label: "Careers", href: "/company" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Gladiator", href: "/product/gladiator" },
      { label: "Riot Helmet 1.0", href: "/product/riot" },
      { label: "Lift Airborne AV2.2", href: "/product/airborne" },
    ],
  },
  {
    title: "Our Technology",
    links: [
      {
        label: "Certifications & Standards",
        href: "/technology/certifications",
        disabled: true,
      },
      {
        label: "R&D and Testing",
        href: "/technology/research",
        disabled: true,
      },
      {
        label: "Impact Absorption",
        href: "/technology/impact-absorption",
        disabled: true,
      },
    ],
  },
  {
    title: "Latest News",
    span2: true,
    inline: true,
    links: [
      { label: "HPS Show", href: "/news/hps-show", disabled: true },
      { label: "Press Release", href: "/news/press-release", disabled: true },
      { label: "Events", href: "/news/events", disabled: true },
    ],
  },
  {
    title: "Contact Us",
    links: [{ label: "Get in Touch", href: "/contact" }],
  },
];

const Header = () => {
  // The header floats transparently over the hero video at the top of the page.
  // On the homepage it also stays hidden through the hero's opening sequence and
  // only slides in once the video has grown to fullscreen (see .header-intro).
  const pathname = usePathname();
  const isHome = pathname === "/";

  // When expanded, the hover pill grows to the full container width and lays the
  // products out as side-by-side cards instead of the compact vertical list.
  const [expanded, setExpanded] = useState(false);

  // The mega-menu only opens when hovering the Products button itself, not the
  // translate/menu buttons that share the same pill.
  const [productsHovered, setProductsHovered] = useState(false);

  // The language list expands the pill downward (same accordion mechanism as the
  // products menu) so it rides on the pill's own backdrop blur — a nested
  // absolutely-positioned dropdown can't blur the page because the pill's
  // backdrop-filter becomes the backdrop root for anything inside it.
  const [langOpen, setLangOpen] = useState(false);

  // The hamburger opens a full-width navigation panel (the mega-menu in the
  // reference). It shares the products' full-width treatment: pill stretches to
  // the container, the brand mark returns on the left, buttons stay on the right.
  const [menuOpen, setMenuOpen] = useState(false);

  // Selected language. i18n itself is not wired yet, but the selector is a real
  // control: choosing an option updates the active state so keyboard/AT users
  // get feedback instead of pressing dead buttons. Swap this for a router
  // locale switch once localisation lands.
  const [lang, setLang] = useState("English");

  // Either full-width panel (products cards or the hamburger nav) puts the pill
  // into its wide, container-spanning layout.
  const wide = expanded || menuOpen;

  // The pill's layout (`wide`) switches between `absolute` (full-width) and
  // `relative` (compact) — a `position` change can't be transitioned by CSS.
  // Snapping `wide` to false the instant it closes yanks the pill back into
  // the flow mid-collapse, which is the "jumps to the bottom, then to a side"
  // glitch. So on close we keep rendering the wide/absolute layout for the
  // length of the grid-rows collapse animation (500ms) and only drop back to
  // compact after it's visually finished. Opening still flips immediately.
  const [wideVisual, setWideVisual] = useState(false);
  useEffect(() => {
    if (wide) {
      setWideVisual(true);
      return;
    }
    const timeout = setTimeout(() => setWideVisual(false), 500);
    return () => clearTimeout(timeout);
  }, [wide]);

  // True whenever any panel is showing — drives both the outside-click listener
  // and the click-catching backdrop below.
  const anyOpen = wideVisual || productsHovered || langOpen;

  // The pill element. Anything outside it counts as "outside the header".
  const pillRef = useRef(null);

  const closeAll = () => {
    setExpanded(false);
    setMenuOpen(false);
    setProductsHovered(false);
    setLangOpen(false);
  };

  // Collapse any open full-width panel back to the compact pill when the user
  // scrolls away.
  useEffect(() => {
    if (!wide) return;
    const collapse = () => {
      setExpanded(false);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", collapse, { passive: true });
    return () => window.removeEventListener("scroll", collapse);
  }, [wide]);

  // Close on click/tap anywhere outside the pill, and on Escape. `pointerdown`
  // (not `click`) so the panel closes on press rather than release, matching the
  // size dropdown and native menus.
  useEffect(() => {
    if (!anyOpen) return;
    const onPointerDown = (e) => {
      if (pillRef.current && !pillRef.current.contains(e.target)) closeAll();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [anyOpen]);

  // Close the menus after a route change (tapping a link inside them).
  useEffect(() => {
    closeAll();
  }, [pathname]);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent text-white ${
        isHome ? "header-intro" : ""
      }`}
    >
      {/* Top strip: parent group + sister brands */}
      <div className="pointer-events-auto bg-black border-b border-white/5">
        <div className="mx-auto flex h-[60px] container items-center justify-between px-6 text-[11px] md:px-8">
          <span className="text-[#8a8a8a] font-medium text-[16px]">
            A brand of Racing Force
          </span>

          {/* Sister-brand wordmarks */}
          <div className="hidden items-center gap-2 sm:flex">
            <Image
              src="/headerLogo1.svg"
              alt="OMP"
              width={70}
              height={24}
              className="h-6 w-auto"
            />
            <span className="h-6 w-px bg-neutral-600" />
            <Image
              src="/headerLogo2.svg"
              alt="Bell"
              width={70}
              height={24}
              className="h-6 w-auto"
            />
            <span className="h-6 w-px bg-neutral-600" />
            <Image
              src="/headerLogo3.svg"
              alt="Zeronoise"
              width={70}
              height={24}
              className="h-6 w-auto"
            />
            <span className="h-6 w-px bg-neutral-600" />
            <Image
              src="/HeadeLogo4.svg"
              alt="Racing Spirit"
              width={70}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main bar: brand + actions. `justify-between` only works while both the
          brand and the pill are in flow; once the brand goes `hidden` (see
          below) it's the pill alone, and `justify-between` collapses a single
          child to flex-start — i.e. the pill jumps to the LEFT edge instead of
          staying put on the right. `ml-auto` on the pill (further down) pins it
          right unconditionally, so this doesn't depend on justify-between at all. */}
      <div
        className={`relative mx-auto flex container px-6 py-4 md:px-8 ${
          expanded ? "items-center" : "items-start"
        }`}
      >
        {/* The brand mark yields to the pill: always when a full-width panel is
            open, and on small screens whenever the products/language panel is
            open too — below `sm` the widened pill has no room to sit beside it
            and would otherwise squash the logo and overhang the right gutter. */}
        <Link
          href="/"
          aria-hidden={anyOpen}
          tabIndex={anyOpen ? -1 : undefined}
          className={`pointer-events-auto shrink-0 items-center gap-2 transition-opacity duration-300 sm:gap-4 ${
            wideVisual
              ? // The pill is absolutely positioned here, so `invisible` (which
                // keeps the box in flow) is enough and avoids a reflow.
                "flex invisible opacity-0"
              : anyOpen
                ? // Compact pill is in normal flow: the brand must leave the flow
                  // entirely (`hidden`, not `invisible`) or it reserves ~187px and
                  // shoves the widened pill off the right edge. It only comes back
                  // at `md`, the first width where brand + 420px panel + gutters
                  // genuinely fit (at `sm`/640px it overhangs by ~7px).
                  "hidden md:flex md:opacity-100"
                : "flex opacity-100"
          }`}
          aria-label="High Protection Systems — home"
        >
          <Image
            src="/hpsFooterLogo.svg"
            alt="High Protection Systems"
            width={136}
            height={87}
            priority
            className="h-10 w-auto sm:h-14"
          />
          <span className="hidden h-12 w-px bg-neutral-600 sm:block" />
          <span className=" hidden sm:block md text-[13px] font-medium leading-[1.15] text-neutral-100">
            High
            <br />
            Protection
            <br />
            Systems
          </span>
        </Link>

        {/* The whole cluster is one hover group. On hover the dark pill expands
            downward to enclose the mega-menu, so buttons + menu share a single
            continuous background (matches the reference design). When the
            expand toggle is on, the pill stretches to the full container width
            and the products lay out as side-by-side cards. */}
        <div
          ref={pillRef}
          className={`pointer-events-auto group/products rounded-xl p-2 transition-[background-color,backdrop-filter] duration-300 ${
            wideVisual
              ? "absolute inset-x-6 top-4 z-10 max-h-[calc(100svh-5.5rem)] overflow-y-auto overscroll-contain bg-[#191919e6] backdrop-blur-3xl backdrop-saturate-150 md:inset-x-8"
              : "relative ml-auto w-max bg-[#19191999] backdrop-blur-2xl"
          }`}
        >
          {/* Wide header row. On phones the logo block and the button cluster
              can't share one line, so `flex-wrap` lets the buttons drop below the
              brand instead of overlapping it; from sm up it's the original
              single-row, space-between layout. */}
          <div
            className={`flex w-full items-center  gap-2 ${
              wideVisual
                ? "justify-start sm:flex-nowrap sm:justify-between"
                : "flex-row justify-end"
            }`}
          >
            {wideVisual && (
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={closeAll}
                  aria-label="Close navigation panel"
                  className="-m-1 flex h-9 w-9 items-center justify-center rounded-md p-1 transition hover:bg-white/10"
                >
                  {/* close.svg is a 25x11 pair of corner brackets, not a square
                      glyph — size by width and let height follow, or it renders
                      as a squashed sliver. */}
                  <Image
                    src="/close.svg"
                    alt=""
                    width={25}
                    height={11}
                    aria-hidden="true"
                    className="h-auto w-5"
                  />
                </button>
                <div className="flex items-center gap-3 py-3 pl-1">
                  <Image
                    src="/hpsFooterLogo.svg"
                    alt="High Protection Systems"
                    width={160}
                    height={60}
                    className="h-12 w-auto sm:h-14"
                  />
                  <span className="hidden sm:block h-8 w-px bg-white/20" />
                  <span className="hidden sm:block text-[13px] font-medium leading-[1.15] text-neutral-200">
                    High
                    <br />
                    Protection
                    <br />
                    Systems
                  </span>
                </div>
              </div>
            )}

            <div
              className={`flex items-center gap-2 ${
                wideVisual
                  ? "ml-auto w-fit justify-end"
                  : `w-fit justify-between ${productsHovered ? "w-full" : ""}`
              }`}
            >
              {!wideVisual && (
                <button
                  type="button"
                  aria-label="Expand menu"
                  aria-pressed={expanded}
                  onClick={() => {
                    setExpanded(true);
                    setMenuOpen(false);
                    setLangOpen(false);
                  }}
                  // Hidden below `sm`: the 44px button plus its right margin
                  // pushes the button row past a 320px viewport, and the
                  // "expanded" card layout it toggles is single-column on phones
                  // anyway, so it buys nothing there.
                  className={`order-first mr-3 h-11 w-11 items-center justify-center text-white transition hover:scale-110 hover:opacity-70 sm:mr-6 ${
                    productsHovered
                      ? "hidden sm:flex sm:opacity-100"
                      : "hidden opacity-0"
                  }`}
                >
                  <Image
                    src="/expand.svg"
                    alt="Expand Icon"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                </button>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={productsHovered}
                  onClick={() => {
                    setProductsHovered((open) => !open);
                    setExpanded(false);
                    setLangOpen(false);
                    setMenuOpen(false);
                  }}
                  className={`flex h-11 items-center rounded-md px-5 text-[13px] font-semibold uppercase tracking-tight transition-colors ${
                    menuOpen
                      ? "bg-white text-[#EF4123]"
                      : "bg-[#EF4123] text-white"
                  }`}
                >
                  Products
                </button>

                <button
                  type="button"
                  aria-label="Select language"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  onClick={() => {
                    setLangOpen((open) => !open);
                    setProductsHovered(false);
                    setExpanded(false);
                    setMenuOpen(false);
                  }}
                  className="flex h-11 w-11 items-center justify-center text-white transition hover:scale-110 hover:opacity-70"
                >
                  <Image
                    src="/translate.svg"
                    alt="Translate Icon"
                    className="h-5 w-5"
                    width={20}
                    height={20}
                  />
                </button>

                <button
                  type="button"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  onClick={() => {
                    setMenuOpen((open) => !open);
                    setExpanded(false);
                    setProductsHovered(false);
                    setLangOpen(false);
                  }}
                  className={`flex h-11 w-11 items-center justify-center rounded-md transition ${
                    menuOpen
                      ? "bg-[#EF4123] text-white"
                      : "text-white hover:scale-110 hover:opacity-70"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mega-menu — flows inside the same expanded pill. A grid-rows
              transition collapses it to zero height. When expanded it fills the
              pill width; otherwise w-0 keeps it out of the pill's width until
              hover so the collapsed pill hugs the buttons.

              Width is transitioned together with grid-template-rows/opacity so
              the cards visibly shrink instead of vanishing the instant `expanded`
              flips (a `w-full` -> `w-0` snap collapses the grid to zero width
              before the row-height animation has a chance to read). This relies
              on the pill itself staying in its wide/absolute layout for the
              same duration on close (see `wideVisual`), so the widening content
              never overhangs a pill that has already shrunk back to compact. */}
          <div
            className={`grid opacity-0 transition-[grid-template-rows,width,opacity] duration-500 ease-in-out ${
              productsHovered
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr]"
            } ${
              expanded
                ? "w-full"
                : productsHovered
                  ? // 26.25rem = the original 420px. Clamp to the viewport minus
                    // the page gutters (2x1.5rem) and the pill's own padding
                    // (2x0.5rem) so the panel never overhangs the right edge.
                    "w-[min(26.25rem,calc(100vw-5rem))]"
                  : "w-0"
            }`}
          >
            <div className="overflow-hidden">
              {expanded ? (
                /* Full-width layout: 3 side-by-side product cards */
                <div className="px-2 ">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {productMenu.map((product) => (
                      <Link
                        key={product.title}
                        href={product.href}
                        className="group/item relative flex flex-col overflow-hidden "
                      >
                        <span className="relative h-50 w-full overflow-hidden rounded-xs bg-white">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </span>

                        <span className="mt-3 flex items-center justify-between px-1 pb-1">
                          <span className="text-[13px] font-medium uppercase leading-tight tracking-tight text-white">
                            {product.title}
                          </span>
                          <Image
                            src="/orangeArrow.svg"
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 shrink-0 transition-transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* Compact layout: vertical product list */
                <div className="w-full px-2 pt-1.5">
                  {productMenu.map((product, i) => (
                    <Link
                      key={product.title}
                      href={product.href}
                      className={`group/item flex items-center gap-4 py-4 transition-colors hover:bg-white/4 ${
                        i > 0 ? "border-t border-white/10" : ""
                      }`}
                    >
                      <span className="relative h-16 w-16 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] font-semibold leading-tight text-white">
                          {product.title}
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-snug text-neutral-400">
                          {product.description}
                        </span>
                      </span>

                      <Image
                        src="/orangeArrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 shrink-0 self-center transition-transform group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Language list — same in-pill accordion as the products menu, so it
              is exactly the pill's width and rides on the pill's real backdrop
              blur. Only opens in the compact (non-expanded) state. Width is not
              transitioned, matching the products menu, so the pill never lingers
              wide on close. */}
          <div
            className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
              langOpen && !wideVisual
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden relative">
              <ul role="listbox" aria-label="Language" className="px-1 pt-2">
                {[
                  { code: "English", label: "English Language" },
                  { code: "Arabic", label: "Arabic Language" },
                  { code: "German", label: "German Language" },
                ].map((option, i) => {
                  const active = option.code === lang;
                  return (
                    <li key={option.code} role="option" aria-selected={active}>
                      <button
                        type="button"
                        onClick={() => {
                          setLang(option.code);
                          setLangOpen(false);
                        }}
                        className={`block w-full px-3 py-3 text-center text-[13px] transition-colors ${
                          i > 0 ? "border-t border-white/10" : ""
                        } ${
                          active
                            ? "text-[#EF4123]"
                            : "text-white hover:bg-white/5"
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Hamburger mega-menu — full-width navigation panel (opens on click).
              Layout is an explicit two-part grid: a "Company Overview" media
              card on the left and a link grid on the right. The right grid is
              three columns; Latest News spans two of them with its links flowing
              inline, and Contact Us takes the third — mirroring the reference.
              Width is transitioned alongside grid-template-rows/opacity (see the
              products panel above for why: an untransitioned width snap collapses
              the nav grid to zero before the row-height animation can play). */}
          <div
            className={`grid transition-[grid-template-rows,width,opacity] duration-500 ease-in-out ${
              menuOpen
                ? "grid-rows-[1fr] w-full opacity-100"
                : "grid-rows-[0fr] w-0 opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-6 px-2 pb-2 pt-4 lg:grid-cols-[minmax(240px,1fr)_2.4fr]">
                {/* Left: company overview media card */}
                <Link
                  href="/company"
                  onClick={() => setMenuOpen(false)}
                  className="group/card relative flex min-h-45 flex-col justify-end overflow-hidden rounded-lg"
                >
                  <Image
                    src="/videos/hero-poster.jpg"
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                    sizes="(max-width: 1024px) 100vw, 340px"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <span className="relative z-10 flex items-center justify-between gap-4 p-4">
                    <span className="text-[13px] font-semibold uppercase tracking-wide text-white">
                      Company Overview
                    </span>
                    <Image
                      src="/orangeArrow.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>

                {/* Right: navigation columns */}
                <nav className="grid grid-cols-2 gap-x-8 gap-y-7 self-center sm:grid-cols-3">
                  {menuSections.map((section) => (
                    <div
                      key={section.title}
                      className={section.span2 ? "sm:col-span-2" : ""}
                    >
                      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        {section.title}
                      </h3>
                      <ul
                        className={
                          section.inline
                            ? "flex flex-wrap gap-x-8 gap-y-2"
                            : "flex flex-col gap-2.5"
                        }
                      >
                        {section.links.map((link) =>
                          link.disabled ? (
                            // Page not built yet — show the label but make it
                            // non-clickable (dimmed, no navigation).
                            <li key={link.label}>
                              <span
                                aria-disabled="true"
                                title="Coming soon"
                                className="cursor-not-allowed text-[14px] leading-tight text-neutral-500"
                              >
                                {link.label}
                              </span>
                            </li>
                          ) : (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-[14px] leading-tight text-neutral-200 transition-colors hover:text-white"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
