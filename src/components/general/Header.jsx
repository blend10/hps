"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
      { label: "R&D and Testing", href: "/technology/research", disabled: true },
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
  const isHome = usePathname() === "/";

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

      {/* Main bar: brand + actions */}
      <div className="relative mx-auto flex container items-start justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className={`pointer-events-auto flex items-center gap-4 transition-opacity duration-300 ${
            wide ? "invisible opacity-0" : "opacity-100"
          }`}
          aria-label="High Protection Systems — home"
        >
          <Image
            src="/hpsFooterLogo.svg"
            alt="High Protection Systems"
            width={136}
            height={87}
            priority
            className="h-14 w-auto"
          />
          <span className="h-12 w-px bg-neutral-600" />
          <span className="text-[13px] font-medium leading-[1.15] text-neutral-100">
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
          onMouseLeave={() => setLangOpen(false)}
          className={`pointer-events-auto group/products rounded-xl p-2 transition-[background-color,backdrop-filter] duration-300 ${
            wide
              ? "absolute inset-x-6 top-4 z-10 bg-[#191919e6] backdrop-blur-3xl backdrop-saturate-150 md:inset-x-8"
              : "relative w-max bg-[#19191999] backdrop-blur-2xl"
          }`}
        >
          <div
            className={`flex flex-row items-center w-full gap-2 ${
              wide ? "justify-between" : "justify-end"
            }`}
          >
            {wide && (
              <div>
                <Image
                  onClick={() => {
                    setExpanded(false);
                    setMenuOpen(false);
                  }}
                  src="/close.svg"
                  alt="Close menu"
                  width={30}
                  height={60}
                  className="cursor-pointer p-1"
                />
                <div className="flex items-center py-3 gap-3 pl-1">
                  <Image
                    src="/hpsFooterLogo.svg"
                    alt="High Protection Systems"
                    width={160}
                    height={60}
                    className="h-14 w-auto"
                  />
                  <span className="h-8 w-px bg-white/20" />
                  <span className="text-[13px] font-medium leading-[1.15] text-neutral-200">
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
              className={`flex items-center justify-between gap-2 ${
                wide ? "w-fit" : `w-fit ${productsHovered ? "w-full" : ""}`
              }`}
            >
              {!wide && (
                <button
                  type="button"
                  aria-label="Expand menu"
                  aria-pressed={expanded}
                  onClick={() => {
                    setExpanded(true);
                    setMenuOpen(false);
                    setLangOpen(false);
                  }}
                  className={`order-first mr-6 h-11 w-11 items-center justify-center text-white transition hover:scale-110 hover:opacity-70 ${
                    productsHovered ? "flex opacity-100" : "hidden opacity-0"
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
                  onMouseEnter={() => {
                    setProductsHovered(true);
                    setLangOpen(false);
                  }}
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
                  aria-expanded={langOpen}
                  onMouseEnter={() => {
                    setLangOpen(true);
                    setProductsHovered(false);
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
                  onMouseEnter={() => setLangOpen(false)}
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

              Only grid-template-rows + opacity are transitioned — NOT width.
              A width transition would keep the pill (w-max) stretched wide for
              the whole 500ms while it shrank, leaving a visible gap beside the
              buttons on close. Snapping width instead lets the pill hug the
              buttons immediately while the menu collapses vertically. */}
          <div
            className={`grid opacity-0 transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              productsHovered
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr]"
            } ${expanded ? "w-full" : productsHovered ? "w-105" : "w-0"}`}
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
                <div className="w-105 px-2 pt-1.5">
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
            className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              langOpen && !wide
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
              inline, and Contact Us takes the third — mirroring the reference. */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
                          )
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
