"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Lines from "@/components/general/Lines";
import { useI18n } from "@/i18n/client";

// "ProductShowcase" — a single, reusable product hero shared by the Riot,
// Gladiator and Airborne pages.
//
// The layout never changes between products; only the image and the copy do.
// Copy lives in the dictionary at `productShowcase.products.<id>`; the images
// and colour swatch hexes are presentation and stay here in PRODUCT_MEDIA. A
// page renders the right one with <ProductShowcase product="riot" /> (see
// src/app/[lang]/product/riot/page.jsx).
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

export const PRODUCT_MEDIA = {
  riot: {
    images: ["/riott1.png", "/rio2.png", "/rio3.png", "/rio4.png", "/rio5.png"],
    // Swatch hexes align 1:1 with `productShowcase.products.riot.colors`.
    colorHexes: ["#111111", "#4b5563"],
  },
  gladiator: {
    images: [
      "/gladiator1.png",
      "/gladiator2.png",
      "/gladiator3.png",
      "/gladiator4.png",
      "/gladiator5.png",
    ],
    colorHexes: ["#111111", "#8a6d4b"],
  },
  airborne: {
    images: [
      "/airbrone1.png",
      "/airbrone2.png",
      "/airbrone3.png",
      "/airbrone4.png",
      "/airbrone5.png",
      "/airbrone6.png",
    ],
    colorHexes: ["#111111"],
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
const SizeSelect = ({ options, value, onChange, label, listLabel }) => {
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
        aria-label={label}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white/5 py-2.5 ps-4 pe-3 text-start font-medium uppercase tracking-tight text-white backdrop-blur-sm transition-colors ${
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

      {/* Floating options panel. Opens *upward* — the control lives in the bar
          pinned to the bottom of the viewport, so a downward panel would run off
          the page. Kept mounted and animated via opacity/scale so it fades
          rather than snapping; pointer-events are disabled while closed so it
          never blocks the trigger. */}
      <ul
        role="listbox"
        aria-label={listLabel}
        className={`absolute bottom-full start-0 z-50 mb-2 w-max min-w-full max-w-[min(20rem,calc(100vw-2rem))] origin-bottom overflow-hidden rounded-xl border border-white/15 bg-neutral-900/90 p-1 shadow-2xl backdrop-blur-xl transition-all duration-200 ease-out ${
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
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start font-medium uppercase tracking-tight transition-colors ${
                  selected
                    ? "text-[#EF4123]"
                    : active
                      ? "bg-white/10 text-white"
                      : "text-neutral-300"
                }`}
              >
                <span className="whitespace-nowrap">{s}</span>
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
  const { t, href } = useI18n();

  const media = PRODUCT_MEDIA[product] ?? PRODUCT_MEDIA.riot;
  const key = PRODUCT_MEDIA[product] ? product : "riot";
  const name = t(`productShowcase.products.${key}.name`);
  const colors = t(`productShowcase.products.${key}.colors`);
  const sizes = t(`productShowcase.products.${key}.sizes`);

  const [image, setImage] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const fullName = name.join(" ");

  return (
    <section
      // overflow-x-clip (not overflow-hidden): still contains the render and the
      // gradient horizontally, but leaves the vertical axis unclipped so the size
      // dropdown can float above the bottom bar.
      className="relative flex min-h-svh w-full flex-col overflow-x-clip text-black"
      aria-label={t("productShowcase.productAria").replace("{name}", fullName)}
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
        {media.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setImage(i)}
            aria-label={t("productShowcase.viewImage").replace(
              "{index}",
              i + 1,
            )}
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
            src={media.images[image]}
            alt={t("productShowcase.helmetAlt").replace("{name}", fullName)}
            fill
            priority
            className={`object-contain ${flipClass(media.images[image])}`}
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
                  <Lines lines={name} />
                </h1>
                <Image
                  src="/shield.svg"
                  alt="HPS"
                  width={40}
                  height={40}
                  className="mt-0.5 h-11 w-11 shrink-0 md:h-14 md:w-14"
                />
                <Link
                  href={href("/contact")}
                  className="  ms-auto shrink-0 rounded-lg bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-tight text-[#EF4123] transition-colors hover:bg-neutral-100"
                >
                  {t("common.contactUs")}
                </Link>
              </div>
              <p className="mt-4 max-w-md text-[12px] leading-relaxed text-neutral-300">
                {t(`productShowcase.products.${key}.description`)}
              </p>
            </Cell>

            {/* 2 — helmet colour. Leftmost of the 3-across row (top rule only);
                at xl it joins the single row with a leading rule. */}
            <Cell border="border-t xl:border-s xl:border-t-0">
              <Label>
                <Lines lines={t("productShowcase.helmetColor")} />
              </Label>
              <div className="mt-4 flex items-center gap-3">
                {colors.map((colorName, i) => (
                  <button
                    key={colorName}
                    type="button"
                    onClick={() => setColor(i)}
                    aria-label={colorName}
                    aria-pressed={i === color}
                    className={`h-5 w-5 rounded-full border transition-all ${
                      i === color
                        ? "border-white ring-2 ring-white/40 ring-offset-2 ring-offset-transparent"
                        : "border-white/40 hover:border-white"
                    }`}
                    style={{ backgroundColor: media.colorHexes[i] }}
                  />
                ))}
              </div>
            </Cell>

            {/* 3 — sizes. Middle of the 3-across row (top + leading rule), same
                at xl. */}
            <Cell border="border-t sm:border-s xl:border-t-0">
              <Label>
                <Lines lines={t("productShowcase.differentSizes")} />
              </Label>
              <SizeSelect
                options={sizes}
                value={size}
                onChange={setSize}
                label={t("productShowcase.selectSize")}
                listLabel={t("productShowcase.sizesLabel")}
              />
            </Cell>

            {/* 4 — in the box. Rightmost of the 3-across row (top + leading
                rule), same at xl. */}
            <Cell
              border="border-t sm:border-s xl:border-t-0"
              className="flex items-center justify-between gap-3"
            >
              <div className="text-end md:ms-auto">
                <Label>
                  <Lines lines={t("productShowcase.inTheBox")} />
                </Label>
                <p className="mt-4 whitespace-pre-line font-medium uppercase leading-relaxed text-neutral-300">
                  {t(`productShowcase.products.${key}.inTheBox`)}
                </p>
              </div>
              <Image
                src="/arrowDown.svg"
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
