"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Products shown in the header hover menu — image + short blurb per system.
const productMenu = [
  {
    title: "RIOT",
    description:
      "The RH1.0 is a high-end head protection for crowd control application.",
    image: "/helmet1.png",
    href: "/products/riot-helmet",
  },
  {
    title: "Gladiator",
    description: "The GLADIATOR is the newest generation of SWAT-helmets.",
    image: "/helmet2.png",
    href: "/products/gladiator",
  },
  {
    title: "Lift Airborne AV2.2",
    description:
      "Designed for airborne forces, combat aviators, and special operations pilots.",
    image: "/helmet3.png",
    href: "/products/lift-airborne",
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

  // Collapse the pill back to its compact size when the user scrolls away.
  useEffect(() => {
    if (!expanded) return;
    const collapse = () => setExpanded(false);
    window.addEventListener("scroll", collapse, { passive: true });
    return () => window.removeEventListener("scroll", collapse);
  }, [expanded]);

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent text-white ${
        isHome ? "header-intro" : ""
      }`}
    >
      {/* Top strip: parent group + sister brands */}
      <div className="pointer-events-auto bg-black border-b border-white/5">
        <div className="mx-auto flex h-[60px] container items-center justify-between px-6 text-[11px] md:px-8">
          <span className="text-[#474747] font-medium text-[16px]">
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
              src="/headeLogo4.svg"
              alt="Zeronoise"
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
          className="pointer-events-auto flex items-center gap-4"
          aria-label="High Protection Systems — home"
        >
          <img
            src="/hpsFooterLogo.svg"
            alt="High Protection Systems"
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
          onMouseLeave={() => setExpanded(false)}
          className={`pointer-events-auto group/products rounded-xl bg-[#191919CC] backdrop-blur-lg p-2 ${
            expanded
              ? "absolute inset-x-6 top-4 z-10 md:inset-x-8"
              : "relative w-max"
          }`}
        >
          <div className="flex flex-row items-center w-full justify-between gap-2">
            {expanded && (
              <div className="flex items-center py-6 gap-3 pl-1">
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
            )}

            <div
              className={`flex items-center justify-between gap-2 ${
                expanded ? "w-fit" : `w-fit ${productsHovered ? "w-full" : ""}`
              }`}
            >
              {!expanded && (
                <button
                  type="button"
                  aria-label="Expand menu"
                  aria-pressed={expanded}
                  onClick={() => setExpanded(true)}
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
                <Link
                  href="/products"
                  onMouseEnter={() => setProductsHovered(true)}
                  onMouseLeave={() => setProductsHovered(false)}
                  className="flex h-11 items-center rounded-md bg-[#EF4123] px-5 text-[13px] font-semibold uppercase tracking-tight text-white transition-colors"
                >
                  Products
                </Link>

                <div className="group/lang relative">
                  <button
                    type="button"
                    aria-label="Select language"
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

                  <div className="invisible absolute right-0 top-full z-20 w-44 translate-y-1 rounded-lg bg-[#191919] p-1 opacity-0 shadow-lg transition group-hover/lang:visible group-hover/lang:translate-y-2 group-hover/lang:opacity-100">
                    {[
                      { label: "English Language", active: true },
                      { label: "Arabic Language", active: false },
                      { label: "German Language", active: false },
                    ].map((lang) => (
                      <button
                        key={lang.label}
                        type="button"
                        className={`block w-full rounded-md px-3 py-2.5 text-left text-[13px] transition-colors ${
                          lang.active
                            ? "text-[#EF4123]"
                            : "text-white hover:bg-white/5"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Open menu"
                  className="flex h-11 w-11 items-center justify-center text-white transition hover:scale-110 hover:opacity-70"
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
              hover so the collapsed pill hugs the buttons. */}
          <div
            onMouseEnter={() => setProductsHovered(true)}
            onMouseLeave={() => setProductsHovered(false)}
            className={`grid opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              productsHovered ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]"
            } ${
              expanded
                ? "w-full"
                : productsHovered
                  ? "w-105"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
