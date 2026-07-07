"use client";

import Image from "next/image";
import { useState } from "react";

// "Latest News" — a paginated 2-column grid of news cards.
//
// A centred, bracketed title; a row of category tabs (HPS Show / Press Release
// / Events); a 2×3 grid of cards; and a footer with prev/next buttons, a dashed
// progress bar and a page counter. The card visuals (image, bottom gradient +
// blur, bracketed date badge, chevron, title/excerpt) mirror the News carousel
// so the two sections read as one system — this one just lays the cards out in
// a paged grid instead of a horizontal scroller.
//
// Images reuse the /public photos as stand-ins — swap `image` per item.

const tabs = ["HPS Show", "Press Release", "Events"];

// Cards shown per page (2 columns × 3 rows).
const PER_PAGE = 6;

const articles = {
  "HPS Show": [
    {
      id: "wds-1",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new1.jpg",
      excerpt:
        "Strong presence and key meetings with global operators and partners.",
    },
    {
      id: "wds-2",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new2.jpg",
    },
    {
      id: "wds-3",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new3.jpg",
    },
    {
      id: "wds-4",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new4.jpg",
    },
    {
      id: "wds-5",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new5.jpg",
    },
    {
      id: "wds-6",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new1.jpg",
    },
    {
      id: "wds-7",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new2.jpg",
    },
    {
      id: "wds-8",
      title: "World Defence Show",
      date: "Jun / 01 / 2026",
      image: "/new3.jpg",
    },
  ],
  "Press Release": [
    {
      id: "pr-1",
      title: "Press Release",
      date: "Jun / 01 / 2026",
      image: "/new4.jpg",
    },
    {
      id: "pr-2",
      title: "Press Release",
      date: "Jun / 01 / 2026",
      image: "/new5.jpg",
    },
  ],
  Events: [
    {
      id: "ev-1",
      title: "Events",
      date: "Jun / 01 / 2026",
      image: "/new2.jpg",
    },
    {
      id: "ev-2",
      title: "Events",
      date: "Jun / 01 / 2026",
      image: "/new3.jpg",
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

// Full arrow (tail + head) used by the prev/next pagination controls.
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

const NewsCard = ({ article }) => (
  <div className="group relative overflow-hidden rounded-xl">
    <div className="relative aspect-16/10">
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(min-width: 640px) 520px, 100vw"
      />
      {/* Bottom gradient for legible overlay text */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />

      {/* Date badge */}
      <span className="absolute right-4 top-4 rounded-md bg-[#68686866] px-5 py-2 font-medium uppercase tracking-tight text-neutral-200 backdrop-blur-sm">
        {article.date}
      </span>

      {/* Chevron */}
      <span className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center">
        <Chevron className="h-8 w-8" />
      </span>

      {/* Backdrop blur, fading from blurred (bottom) to clear (top). */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-md"
        style={{
          maskImage: "linear-gradient(to top, black 40%, transparent 100%)",
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
  </div>
);

const LatestNews = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [page, setPage] = useState(0);

  const items = articles[activeTab] ?? [];
  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));

  // The slice of cards for the current page.
  const pageItems = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const selectTab = (tab) => {
    setActiveTab(tab);
    setPage(0);
  };

  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  return (
    <section className="bg-black text-white pt-30" aria-label="Latest News">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-24">
        {/* Bracketed, centred title */}
        <div className="flex justify-center">
          <div className="relative px-6 py-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-[#EF4123] md:h-6 md:w-6"
            />
            <h2 className="text-center text-3xl font-medium tracking-tight md:text-8xl">
              Latest News
            </h2>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-[#EF4123] md:h-6 md:w-6"
            />
          </div>
        </div>

        {/* Tabs — centred */}
        <div
          role="tablist"
          aria-label="News categories"
          className="mt-8 flex justify-center gap-8 border-b border-white/10"
        >
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectTab(tab)}
                className={`relative -mb-px pb-3 text-base font-medium transition-colors md:text-lg ${
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

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pageItems.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        {/* Footer — prev / dashed progress + counter / next */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={atStart}
            aria-label="Previous page"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400"
          >
            <Arrow className="h-5 w-5 rotate-180" />
          </button>

          {/* Dashed progress — one dash per page, filled up to the current one. */}
          <div className="flex flex-1 items-center justify-center gap-3">
            <div className="flex flex-1 justify-between gap-1">
              {Array.from({ length: pageCount }).map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-200 ${
                    i <= page ? "bg-white" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <span className="shrink-0 text-xs text-neutral-400">
              {page + 1} / {pageCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={atEnd}
            aria-label="Next page"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400"
          >
            <Arrow className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
