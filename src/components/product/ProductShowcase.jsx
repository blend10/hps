"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// "ProductShowcase" — a single, reusable product hero shared by the Riot,
// Gladiator and Airborne pages.
//
// The layout never changes between products; only the image and the copy do.
// All of that lives in PRODUCTS below, keyed by product id. A page renders the
// right one with <ProductShowcase product="riot" /> (see
// src/app/product/riot/page.jsx).
//
// Design (matches the HPS product mock): a soft light-grey radial canvas with
// a centered row of thumbnails near the top, the background-less product render
// floating below (the pressed thumbnail is what renders large), and a single
// translucent dark bar pinned to the bottom. That bar is split by dashed
// vertical rules into four cells:
//   1. name + HPS shield badge + CONTACT US button + short description
//   2. HELMET COLOR  — label + selectable colour swatches
//   3. DIFFERENT SIZES — label + a size <select>
//   4. IN THE BOX — label + contents, with a down-arrow
//
// Images live in /public and are listed per product in `images` (index 0 is
// shown first). Only /riott1.png ships today; drop the rest in with the same
// numbered names (/riot2.png … /airborne5.png) and the thumbnails light up
// with no code change.

export const PRODUCTS = {
  riot: {
    name: ["Riot"],
    description:
      "The RH1.0 is a high-end head protection for crowd control application. The interfaces on both sides enable the use as helmet-mask-combination while the use of tear gas.",
    images: ["/riott1.png", "/rio2.png", "/rio3.png", "/rio4.png", "/rio5.png"],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Slate", hex: "#4b5563" },
    ],
    sizes: [
      "SHELL SIZE 1 / 46,47",
      "SHELL SIZE 2 / 48,49",
      "SHELL SIZE 3 / 50,51",
    ],
    inTheBox: "RH 1.0 INCL. VISOR, DRAW STRING\nHELMET BAG, MANUAL",
  },
  gladiator: {
    name: ["Gladiator"],
    description:
      "Based on the innovative HPS design and featuring a lightweight aramid sandwich shell, developed and tested using the latest scientific knowledge, the GLADIATOR is the newest generation of SWAT-helmets",
    images: [
      "/gladiator1.png",
      "/gladiator2.png",
      "/gladiator3.png",
      "/gladiator4.png",
      "/gladiator5.png",
    ],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Coyote", hex: "#8a6d4b" },
    ],
    sizes: [
      "SHELL SIZE 1 / 46,47",
      "SHELL SIZE 2 / 48,49",
      "SHELL SIZE 3 / 50,51",
    ],
    inTheBox: "RH 1.0 INCL. RAILS, DRAW STRING\nHELMET BAG, MANUAL",
  },
  airborne: {
    name: ["Lift Airborne", "AV2.2OT"],
    description:
      "The Lift Airborne AV2.2 is a Next Generation Fixed Wing Helmet (NGFWH), setting a new standard as the lightest, most comfortable, and breathable design, while providing unmatched superior protection in helmet history.",
    images: [
      "/airbrone1.png",
      "/airbrone2.png",
      "/airbrone3.png",
      "/airbrone4.png",
      "/airbrone5.png",
      "/airbrone6.png",
    ],
    colors: [{ name: "Black", hex: "#111111" }],
    sizes: [
      "SHELL SIZE 1 / 46,47",
      "SHELL SIZE 2 / 48,49",
      "SHELL SIZE 3 / 50,51",
    ],
    inTheBox: "RH 1.0 INCL. VISOR, DRAW STRING\nHELMET BAG, MANUAL",
  },
};

// One cell of the bottom bar. The dashed dividers between cells depend on how
// the grid is arranged at each breakpoint, so each caller passes the exact
// border classes for its position via `border`. Base padding + the shared
// dashed colour live here.
//
// Grid tiers:
//   • base  — 1 column, all cells stacked
//   • sm    — name spans a full row, then colour / sizes / box in a 3-across row
//   • lg    — the original single 4-column row
const Cell = ({ children, border = "", className = "" }) => (
  <div
    className={`border-dashed border-white/25 px-6 py-6 md:px-8 ${border} ${className}`}
  >
    {children}
  </div>
);

const Label = ({ children }) => (
  <span className="text-[28px] font-semibold uppercase leading-none tracking-tight text-white">
    {children}
  </span>
);

// Small check-mark used to flag the selected option in the size dropdown.
const Check = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 5 5L20 7" />
  </svg>
);

// Custom "Different Sizes" dropdown — a styled replacement for a native
// <select>. A rounded trigger opens a floating glassy panel of options with
// hover + selected states; closes on outside-click, Escape, or selection, and
// supports arrow-key / Enter navigation.
const SizeSelect = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  // Which option the keyboard is currently on (for arrow-key navigation).
  const [activeIndex, setActiveIndex] = useState(value);
  const rootRef = useRef(null);

  // Close when clicking anywhere outside the control.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const select = (i) => {
    onChange(i);
    setOpen(false);
  };

  // Open the panel, starting the keyboard highlight on the current selection.
  const openPanel = () => {
    setActiveIndex(value);
    setOpen(true);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (
      !open &&
      (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      openPanel();
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(activeIndex);
    }
  };

  return (
    <div ref={rootRef} className="relative mt-4">
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select size"
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white/5 py-2.5 pl-4 pr-3 text-left font-medium uppercase tracking-tight text-white backdrop-blur-sm transition-colors ${
          open
            ? "border-white/70 bg-white/10"
            : "border-white/25 hover:border-white/50 hover:bg-white/10"
        }`}
      >
        <span className="truncate">{options[value]}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Floating options panel. Kept mounted and animated via opacity/scale so
          it fades rather than snapping; pointer-events are disabled while
          closed so it never blocks the trigger. */}
      <ul
        role="listbox"
        aria-label="Sizes"
        className={`absolute left-0 right-0 top-full z-50 mt-2 origin-top overflow-hidden rounded-xl border border-white/15 bg-neutral-900/80 p-1 shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {options.map((s, i) => {
          const selected = i === value;
          const active = i === activeIndex;
          return (
            <li key={s} role="option" aria-selected={selected}>
              <button
                type="button"
                onClick={() => select(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left font-medium uppercase tracking-tight transition-colors ${
                  selected
                    ? "text-[#EF4123]"
                    : active
                      ? "bg-white/10 text-white"
                      : "text-neutral-300"
                }`}
              >
                <span className="truncate">{s}</span>
                {selected && <Check className="h-4 w-4 shrink-0" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Images that should render horizontally mirrored (the source render faces the
// "wrong" way). Matched by src so it applies to both the big view and its thumb.
const FLIPPED_IMAGES = new Set(["/airbrone1.png"]);
const flipClass = (src) => (FLIPPED_IMAGES.has(src) ? "-scale-x-100" : "");

const ProductShowcase = ({ product = "riot" }) => {
  const data = PRODUCTS[product] ?? PRODUCTS.riot;
  const [image, setImage] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  return (
    <section
      className="relative flex min-h-svh w-full flex-col overflow-hidden text-black"
      aria-label={`${data.name.join(" ")} product`}
      // Soft light-grey radial canvas: bright at the centre, darker to the
      // edges — lets the background-less render sit cleanly.
      style={{
        background:
          "radial-gradient(120% 90% at 50% 35%, #ffffff 0%, #eef0f2 45%, #d7dade 100%)",
      }}
    >
      {/* Small black gradient, top → bottom, layered over the radial canvas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-transparent"
      />

      {/* Thumbnail gallery — a centered row near the top; the pressed thumb
          renders into the big picture below. Wraps on small screens so
          products with 5–6 thumbnails don't overflow the width. */}
      <div className="relative flex flex-wrap justify-center gap-2 px-6 pt-50 md:flex-nowrap md:gap-3 md:pt-40 xl:pt-20">
        {data.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setImage(i)}
            aria-label={`View ${i + 1}`}
            aria-pressed={i === image}
            className={`relative h-14 w-14 overflow-hidden rounded-md border bg-white/60 backdrop-blur-sm transition-all md:h-16 md:w-16 ${
              i === image
                ? "border-[#EF4123] ring-2 ring-[#EF4123]/30"
                : "border-black/10 hover:border-black/40"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className={`object-contain p-1.5 ${flipClass(src)}`}
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Product render — floats in the upper area above the bar. */}
      <div className="flex flex-1 items-center justify-center px-6 pt-2 pb-6">
        <div className="relative aspect-[16/10] w-full max-w-5xl">
          <Image
            src={data.images[image]}
            alt={`${data.name.join(" ")} helmet`}
            fill
            priority
            className={`object-contain ${flipClass(data.images[image])}`}
            sizes="(min-width: 768px) 70vw, 92vw"
          />
        </div>
      </div>

      {/* Bottom bar — translucent dark, dashed-divided into four cells. */}
      <div className="px-4 pb-6 md:px-8 md:pb-8">
        <div className="mx-auto container rounded-md bg-[#0000004D] text-white shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.3fr)]">
            {/* 1 — name + badge + contact + description. Spans the full width up
                to 1279px, then becomes the first column at xl. */}
            <Cell className="sm:col-span-3 xl:col-span-1">
              <div className="flex  items-start gap-3 md:flex-nowrap">
                <h1 className="text-[22px] font-medium uppercase leading-[1.0] tracking-tight md:text-[50px]">
                  {data.name[0]}
                  <br />
                  {data.name[1]}
                </h1>
                <Image
                  src="/shield.svg"
                  alt="HPS"
                  width={40}
                  height={40}
                  className="mt-0.5 h-11 w-11 shrink-0 md:h-14 md:w-14"
                />
                <Link
                  href="/contact"
                  className="  ml-auto shrink-0 rounded-lg bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-tight text-[#EF4123] transition-colors hover:bg-neutral-100"
                >
                  Contact us
                </Link>
              </div>
              <p className="mt-4 max-w-md text-[12px] leading-relaxed text-neutral-300">
                {data.description}
              </p>
            </Cell>

            {/* 2 — helmet colour. Leftmost of the 3-across row (top rule only);
                at xl it joins the single row with a left rule. */}
            <Cell border="border-t xl:border-l xl:border-t-0">
              <Label>
                Helmet
                <br />
                Color
              </Label>
              <div className="mt-4 flex items-center gap-3">
                {data.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(i)}
                    aria-label={c.name}
                    aria-pressed={i === color}
                    className={`h-5 w-5 rounded-full border transition-all ${
                      i === color
                        ? "border-white ring-2 ring-white/40 ring-offset-2 ring-offset-transparent"
                        : "border-white/40 hover:border-white"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </Cell>

            {/* 3 — sizes. Middle of the 3-across row (top + left rule), same at
                xl. */}
            <Cell border="border-t sm:border-l xl:border-t-0">
              <Label>
                Different
                <br />
                Sizes
              </Label>
              <SizeSelect
                options={data.sizes}
                value={size}
                onChange={setSize}
              />
            </Cell>

            {/* 4 — in the box. Rightmost of the 3-across row (top + left rule),
                same at xl. */}
            <Cell
              border="border-t sm:border-l xl:border-t-0"
              className="flex items-center justify-between gap-3"
            >
              <div className="text-right md:ml-auto">
                <Label>
                  In the
                  <br />
                  Box
                </Label>
                <p className="mt-4 whitespace-pre-line font-medium uppercase leading-relaxed text-neutral-300">
                  {data.inTheBox}
                </p>
              </div>
              <Image
                src="/arrowdown.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
                className="mt-1 h-[100px] w-[35px] shrink-0 brightness-20 invert"
              />
            </Cell>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
