"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, Chevron, NEWS_TAB_KEYS } from "./newsShared";
import { useI18n } from "@/i18n/client";

// "Latest News" — a filterable, horizontally-scrolling news carousel.
//
// A heading with prev/next controls, a row of category tabs (HPS Show / Press
// Release / Events), and a snap-scrolling track of cards. Each card is an image
// with a bracketed date badge, a title, and a chevron; the featured (first)
// card also shows a short excerpt. A dashed progress bar under the track tracks
// how far through the row the reader has scrolled.
//
// Articles come from the dictionary (`news.carousel`), which carries the image
// path alongside the copy.

// Number of segments in the dashed scroll-progress bar.
const DASHES = 40;

const News = () => {
  const { t, dir } = useI18n();
  const isRtl = dir === "rtl";

  // Tabs are display-only for now, so the active tab is fixed to the first one.
  const activeTabKey = NEWS_TAB_KEYS[0];
  const [progress, setProgress] = useState(0);
  const trackRef = useRef(null);

  const items = t("news.carousel");

  // Track scroll progress (0–1) so the dashed bar and arrow states stay in sync.
  // In an RTL container `scrollLeft` runs 0 → -(scrollWidth - clientWidth), so
  // take its magnitude and the same 0→1 ramp works in both directions.
  const updateProgress = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.abs(el.scrollLeft) / max : 0);
  };

  // Reset to the start whenever the tab changes.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setProgress(0);
  }, [activeTabKey]);

  // `dir` is +1 for "next" and -1 for "previous" in reading order. `scrollBy`
  // is always in physical pixels, so under RTL "next" means scrolling the
  // content the other way — hence the sign flip.
  const scrollByCards = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: (isRtl ? -1 : 1) * direction * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;

  return (
    <section className="bg-black text-white" aria-label={t("news.ariaLabel")}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        {/* Header — title + prev/next controls */}
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <h2 className="text-3xl font-medium tracking-tight md:text-[60px]">
            {t("news.title")}
          </h2>
          <div className="flex shrink-0 gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label={t("common.previous")}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400 md:h-14 md:w-14 md:rounded-2xl"
            >
              <Arrow className="h-5 w-5 rotate-180 rtl:rotate-0 md:h-6 md:w-6" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label={t("common.next")}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400 md:h-14 md:w-14 md:rounded-2xl"
            >
              <Arrow className="h-5 w-5 rtl:rotate-180 md:h-6 md:w-6" />
            </button>
          </div>
        </div>

        {/* Category labels. These are display-only on the homepage (only the
            active category has content here), so they are rendered as plain
            static labels rather than ARIA tabs — announcing non-functional
            role="tab" controls to assistive tech would be misleading. The full
            interactive tabs live on the /news page (LatestNews). */}
        <div className="mt-6 flex gap-4 overflow-x-auto border-b border-white/10 scrollbar-none [&::-webkit-scrollbar]:hidden md:gap-8 md:overflow-visible">
          {NEWS_TAB_KEYS.map((key) => {
            const isActive = key === activeTabKey;
            return (
              <span
                key={key}
                aria-current={isActive ? "true" : undefined}
                className={`relative -mb-px shrink-0 whitespace-nowrap pb-3 text-lg font-medium md:text-[30px] ${
                  isActive ? "text-white" : "text-neutral-500"
                }`}
              >
                {t(`news.tabs.${key}`)}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
                )}
              </span>
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
            const truncatedExcerpt = article.excerpt
              ? article.excerpt.length > 100
                ? article.excerpt.substring(0, 100) + "..."
                : article.excerpt
              : "";
            return (
              <li
                key={article.id}
                className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[calc(50%-10px)]"
              >
                <Link href="/news" className="block h-full">
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
                    <span className="absolute end-3 top-3 rounded-md bg-[#68686866] px-3 py-1.5 text-xs font-medium uppercase tracking-tight text-neutral-200 backdrop-blur-sm md:end-4 md:top-4 md:px-5 md:py-2 md:text-base">
                      {article.date}
                    </span>

                    {/* Chevron */}
                    <span className="absolute bottom-5 z-100 end-5 flex h-10 w-10 items-center justify-center transition-transform duration-300  group-hover:rotate-180">
                      <Chevron className="h-8 w-8 rotate-270" />
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
                    <div className="absolute inset-x-5 bottom-1 pe-14 transition-transform duration-300 group-hover:-translate-y-12">
                      <h3 className="text-lg font-semibold uppercase tracking-[0.08em] md:text-xl">
                        {article.title}
                      </h3>
                      {truncatedExcerpt && (
                        <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-neutral-300 md:text-sm line-clamp-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {truncatedExcerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Dashed progress bar — each dash lights up once the scroll passes it,
            so the bar visibly fills in reading order as the reader scrolls. */}
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
