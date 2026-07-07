"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// "Latest News" — a filterable, horizontally-scrolling news carousel.
//
// A heading with prev/next controls, a row of category tabs (HPS Show / Press
// Release / Events), and a snap-scrolling track of cards. Each card is an image
// with a bracketed date badge, a title, and a chevron; the featured (first)
// card also shows a short excerpt. A dashed progress bar under the track tracks
// how far through the row the reader has scrolled.
//
// Images reuse the /public photos as stand-ins — swap `image` per item.

const tabs = ["HPS Show", "Press Release", "Events"];

// Number of segments in the dashed scroll-progress bar.
const DASHES = 40;

const articles = {
  "HPS Show": [
    {
      id: "world-defence-show",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new1.jpg",
      excerpt:
        "Strong presence and key meetings with global operators and partners.",
    },
    {
      id: "eurosatory",
      title: "World Defence show",
      date: "Jun / 01 / 2026",
      image: "/new2.jpg",
    },
    {
      id: "milipol",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new3.jpg",
    },
    {
      id: "idex",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new4.jpg",
    },
    {
      id: "defense-expo",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new5.jpg",
    },
  ],
};

const Chevron = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);

// Full arrow (tail + head) used by the prev/next carousel controls.
const Arrow = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const News = () => {
  // Tabs are display-only for now, so the active tab is fixed to the first one.
  const activeTab = tabs[0];
  const [progress, setProgress] = useState(0);
  const trackRef = useRef(null);

  const items = articles[activeTab];

  // Track scroll progress (0–1) so the dashed bar and arrow states stay in sync.
  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  // Reset to the start whenever the tab changes.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setProgress(0);
  }, [activeTab]);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;

  return (
    <section className="bg-black text-white" aria-label="Latest News">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        {/* Header — title + prev/next controls */}
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <h2 className="text-3xl font-medium tracking-tight md:text-[60px]">
            Latest News
          </h2>
          <div className="flex shrink-0 gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400 md:h-14 md:w-14 md:rounded-2xl"
            >
              <Arrow className="h-5 w-5 rotate-180 md:h-6 md:w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400 md:h-14 md:w-14 md:rounded-2xl"
            >
              <Arrow className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="News categories"
          className="mt-6 flex gap-4 overflow-x-auto border-b border-white/10 scrollbar-none [&::-webkit-scrollbar]:hidden md:gap-8 md:overflow-visible"
        >
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                // Tabs are display-only for now — clicking does nothing.
                className={`relative -mb-px shrink-0 whitespace-nowrap pb-3 text-lg font-medium transition-colors md:text-[30px] ${
                  isActive
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        <ul
          ref={trackRef}
          onScroll={updateProgress}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {items.map((article) => {
            return (
              <li
                key={article.id}
                className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[calc(50%-10px)]"
              >
                <div className="relative aspect-16/10">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 640px) 520px, 85vw"
                  />
                  {/* Bottom gradient for legible overlay text */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />

                  {/* Date badge */}
                  <span className="absolute right-3 top-3 rounded-md bg-[#68686866] px-3 py-1.5 text-xs font-medium uppercase tracking-tight text-neutral-200 backdrop-blur-sm md:right-4 md:top-4 md:px-5 md:py-2 md:text-base">
                    {article.date}
                  </span>

                  {/* Chevron */}
                  <span className="absolute bottom-5 z-100 right-5 flex h-10 w-10 items-center justify-center">
                    <Chevron className="h-8 w-8" />
                  </span>

                  {/* Backdrop blur, fading from blurred (bottom) to clear
                      (top). The mask makes the blur itself ramp out toward the
                      top so only the lower area behind the text is frosted. */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-md"
                    style={{
                      maskImage:
                        "linear-gradient(to top, black 40%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, black 40%, transparent 100%)",
                    }}
                  />

                  {/* Title + excerpt */}
                  <div className="absolute inset-x-5 bottom-5 pr-14">
                    <h3 className="text-lg font-semibold uppercase tracking-[0.08em] md:text-xl">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-neutral-300 md:text-sm">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Dashed progress bar — each dash lights up once the scroll passes it,
            so the bar visibly fills left-to-right as the reader scrolls. */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex flex-1 justify-between gap-1">
            {Array.from({ length: DASHES }).map((_, i) => {
              // A dash is "filled" when progress has reached its fraction of the
              // track. +1 so the first dash lights as soon as scrolling starts.
              const filled = progress >= (i + 1) / DASHES;
              return (
                <span
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-200 ${
                    filled ? "bg-white" : "bg-white/20"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
