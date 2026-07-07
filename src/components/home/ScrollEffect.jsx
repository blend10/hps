"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// "ScrollEffect" — a pinned deck of product cards that deal away on scroll.
//
// The section is tall (one viewport of scroll per card). A single `sticky top-0
// h-screen` stage pins to the viewport, and ALL cards sit stacked in the very
// same centred spot inside it — card 0 in front, the rest peeking behind. As
// you scroll down, the front card slides UP and fades out, uncovering the next
// card, which stays put in the centre. One card leaves per viewport of scroll.
//
// A scroll `progress` value (0 → panels.length-1) is derived from the section's
// position and drives both the per-card transform and the background swap. Cards
// stay fully opaque and simply slide up out of view. The backdrop lives in its
// own `sticky` layer and never moves; only which background is opaque changes
// (scroll1 → scroll2 → scroll3).
//
// Content is data-driven via `panels`. Each panel carries its background, hero
// shot, name, blurb and thumbnail strip. Assets live in /public; where a
// dedicated hero doesn't exist yet we reuse man1.png (swap `hero` per panel).

const thumbs = [
  { id: "riot", src: "/police1.png" },
  { id: "gladiator", src: "/police2.png" },
  { id: "patrol", src: "/police3.png" },
  { id: "guard", src: "/police4.png" },
  { id: "shield", src: "/police5.png" },
];
const thumbs2 = [
  // Filenames on disk are capitalised (Military1.png …). Match the exact case:
  // Linux/Vercel filesystems are case-sensitive and lowercase refs 404 there.
  { id: "riot", src: "/Military1.png" },
  { id: "gladiator", src: "/Military2.png" },
  { id: "patrol", src: "/Military3.png" },
  { id: "guard", src: "/Military4.png" },
  { id: "shield", src: "/Military5.png" },
];
const thumbs3 = [
  { id: "riot", src: "/policee1.png" },
  { id: "gladiator", src: "/policee2.png" },
  { id: "patrol", src: "/policee3.png" },
  { id: "guard", src: "/policee4.png" },
  { id: "shield", src: "/policee5.png" },
];

const panels = [
  {
    id: "riot",
    background: "/scroll1.png",
    hero: "/man1.png",
    name: "RIOT",
    thumbs: thumbs,
    blurb:
      "The RH1.0 is a high-end head protection for crowd control application. The interfaces on both sides enable the use as helmet-mask-combination while the use of tear gas. The lightweight aramid sandwich shell combined with F1 proven EPS features excellent shock and stab protection.",
  },
  {
    id: "gladiator",
    background: "/scroll2.png",
    hero: "/man2.png",
    name: "Lift Airborne AV2.2",
    thumbs: thumbs2,
    blurb:
      "The Lift Airborne AV2.2 is a Next Generation Fixed Wing Helmet (NGFWH), setting a new standard  as the lightest, most comfortable, and breathable design, while providing unmatched superior protection in helmet history.",
  },
  {
    id: "patrol",
    background: "/scroll3.png",
    hero: "/man3.png",
    name: "Gladiator",
    thumbs: thumbs3,
    blurb:
      "Based on the innovative HPS design and featuring a lightweight aramid sandwich shell, developed and tested using the latest scientific knowledge, the GLADIATOR is the newest generation of SWAT-helmets according to the Technical Guideline (TR) “Ballistic helmet” overall system of May 2010 German Police University (DHPol/Police Technical Institute-PTI).",
  },
];

// Shared card body. On desktop it lays out as a 3-column grid (copy | hero |
// copy). Below lg it collapses to a single stacked column that is deliberately
// kept SHORT enough to fit one phone screen (headline+thumbs → hero → name+CTAs)
// so the pinned deck can slide each card away on scroll, exactly like desktop.
// The desktop grid classes are unchanged; every mobile tweak is a non-lg class.
const PanelCard = ({ panel }) => {
  return (
    <div className="relative mx-auto flex max-h-[calc(120svh-2.5rem)] w-full max-w-7xl flex-col gap-0 overflow-hidden rounded-md bg-white/10 text-white shadow-2xl lg:grid lg:max-h-none lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-px lg:rounded-none">
      {/* LEFT — headline + thumbnails */}
      <div className="flex shrink-0 flex-col justify-between gap-4 bg-black p-4 lg:gap-10 lg:p-6 md:p-6">
        <div>
          <h2 className="text-2xl font-medium leading-[0.95] tracking-tight sm:text-3xl md:text-[50px]">
            Our toughest
            <br />
            protective shell.
          </h2>

          <p className="mt-6 text-sm font-medium uppercase tracking-wide text-[#ff3b1f] lg:mt-8">
            Police use
          </p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {panel.thumbs.map((thumb) => (
              <li key={thumb.id}>
                <div className="relative aspect-square w-14 overflow-hidden rounded-md bg-white sm:w-16 md:w-15">
                  <Image
                    src={thumb.src}
                    alt=""
                    fill
                    className="object-contain p-1"
                    sizes="48px"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="hidden border-t border-white/15 pt-3 text-xs font-medium uppercase tracking-tight text-neutral-400 lg:block">
          Pro-level protection
        </p>
      </div>

      {/* CENTRE — hero shot. On mobile it's the flexible middle row: flex-1 lets
          it GROW to fill the leftover height between the two copy blocks (so the
          photo is large on tall phones), while a modest min-height floor lets it
          SHRINK on short screens instead of pushing the text out of the clipped
          card. Crop from the top so the helmet/head stays in frame. Desktop
          fills its full column. */}
      <div className="relative min-h-90 w-full flex-1 overflow-hidden bg-black sm:min-h-120 lg:aspect-auto lg:h-full lg:min-h-0 lg:flex-none">
        <Image
          src={panel.hero}
          alt={`Officer wearing the ${panel.name} helmet and protective gear`}
          fill
          className="object-cover object-top lg:object-center"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </div>

      {/* RIGHT — product info */}
      <div className="flex shrink-0 flex-col justify-between gap-4 bg-black p-4 lg:gap-8 lg:p-6 md:p-6">
        <p className="hidden text-sm font-medium uppercase tracking-wide text-[#ff3b1f] lg:block">
          Police use
        </p>

        <div className="flex-1">
          <div className="mb-3 h-px w-full bg-white/15 lg:mb-8" />
          <h3 className="text-3xl font-medium tracking-tight sm:text-5xl lg:mt-50 md:text-6xl">
            {panel.name}
          </h3>
          {/* Blurb clamped on mobile so a long paragraph can't push the card
              past one screen (kept short to give the hero more room); shown in
              full on desktop. */}
          <p className="mt-2 line-clamp-3 max-w-md text-xs leading-relaxed text-neutral-300 sm:line-clamp-4 sm:text-sm lg:mt-5 lg:line-clamp-none lg:text-sm">
            {panel.blurb}
          </p>
        </div>

        {/* CTAs — the orangeArrow.svg is forced black via brightness-0 and
            pinned to each button's top-right corner; the label sits at the
            bottom-left. */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="#contact"
            className="group relative flex min-h-14 flex-col justify-end rounded-md bg-white px-5 py-3 text-sm font-medium uppercase tracking-tight text-black transition-colors hover:bg-neutral-200 lg:min-h-20 lg:py-4"
          >
            <Image
              src="/orangeArrow.svg"
              alt=""
              width={10}
              height={10}
              aria-hidden
              className="absolute right-4 top-4 brightness-0"
            />
            Contact us
          </a>
          <a
            href="#learn-more"
            className="group relative flex min-h-14 flex-col justify-end rounded-md bg-white/20 px-5 py-3 text-sm font-medium uppercase tracking-tight text-white transition-colors hover:bg-white/30 lg:min-h-20 lg:py-4"
          >
            <Image
              src="/orangeArrow.svg"
              alt=""
              width={10}
              height={10}
              aria-hidden
              className="absolute right-4 top-4 brightness-0 invert"
            />
            Learn more
          </a>
        </div>

        {/* Colour swatches — hidden on mobile to keep the card within a screen. */}
        <div className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Black colourway"
              className="h-4 w-4 rounded-full bg-neutral-900 ring-2 ring-white ring-offset-2 ring-offset-black"
            />
            <button
              type="button"
              aria-label="Slate colourway"
              className="h-4 w-4 rounded-full bg-slate-500"
            />
          </div>
          <span className="text-sm font-medium uppercase tracking-wide text-neutral-400">
            2 Colors
          </span>
        </div>
      </div>
    </div>
  );
};

// Card wrapper: absolutely stacked in the same centred spot inside the pinned
// stage; `style`/`zIndex` (passed in) position each one and animate it up-and-
// out as the scroll progress passes its index. Runs at every screen size.
const Panel = ({ panel, style, zIndex }) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-3 py-5 md:px-6 md:py-6"
      style={{ ...style, zIndex }}
    >
      <PanelCard panel={panel} />
    </div>
  );
};

const ScrollEffect = () => {
  const sectionRef = useRef(null);
  // progress: 0 at the section top, panels.length-1 at the bottom. Integer part
  // = how many cards have been dealt away; fractional part = the in-flight card.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Scrollable distance = section height minus the one pinned viewport.
      const scrollable = section.offsetHeight - window.innerHeight;
      // How far we've scrolled INTO the section (rect.top goes 0 → -scrollable).
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const ratio = scrollable > 0 ? scrolled / scrollable : 0;
      setProgress(ratio * (panels.length - 1));
    };
    const onScroll = () => {
      // rAF-throttle: coalesce scroll bursts into one measure per frame.
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The background nearest the current progress is the visible one.
  const activeBg = Math.round(progress);

  return (
    // Tall section: one viewport of scroll per card after the first. The inner
    // stage pins for the whole of it. The pinned deck runs at every screen size;
    // the card body is tuned to fit the viewport on mobile (see PanelCard).
    <section
      ref={sectionRef}
      aria-label="Riot helmet range"
      className="relative"
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background — stays locked in place; only which image is opaque
            changes (scroll1 → scroll2 → scroll3) as the deck advances. */}
        <div className="absolute inset-0" aria-hidden>
          {panels.map((panel, index) => (
            <Image
              key={panel.id}
              src={panel.background}
              alt=""
              fill
              priority={index === 0}
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                index === activeBg ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
            />
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* The deck. Each card is stacked in the same centred spot. `offset` is
            how far the current progress is past this card: negative = still
            ahead (peeking behind, nudged down + scaled a touch); 0..1 = this is
            the card leaving now (slides up out of view); >1 = already gone.
            Cards stay fully opaque — they slide away rather than fade. */}
        {panels.map((panel, index) => {
          const offset = progress - index;
          let transform;
          if (offset <= 0) {
            // Upcoming card: sits behind, slightly lower and smaller so its
            // edges peek out from under the front card.
            const depth = Math.min(-offset, 2);
            transform = `translateY(${depth * 1.5}rem) scale(${1 - depth * 0.04})`;
          } else {
            // Leaving card: slide straight up out of view.
            transform = `translateY(${-offset * 100}vh)`;
          }
          return (
            <Panel
              key={panel.id}
              panel={panel}
              // Front card (lowest index still on screen) must sit on top.
              zIndex={panels.length - index}
              style={{
                transform,
                // Once fully gone, drop it out of the paint/hit-testing.
                pointerEvents: offset > 1 ? "none" : "auto",
                transition: "transform 0.1s linear",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ScrollEffect;
