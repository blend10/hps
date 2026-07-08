"use client";

import { useState } from "react";
import { Arrow, NewsCard, NEWS_TAB_KEYS } from "./newsShared";
import { useI18n } from "@/i18n/client";

// "Latest News" — a paginated 2-column grid of news cards.
//
// A centred, bracketed title; a row of category tabs (HPS Show / Press Release
// / Events); a 2×3 grid of cards; and a footer with prev/next buttons, a dashed
// progress bar and a page counter. The card visuals (image, bottom gradient +
// blur, bracketed date badge, chevron, title/excerpt) mirror the News carousel
// so the two sections read as one system — this one just lays the cards out in
// a paged grid instead of a horizontal scroller.
//
// Articles come from the dictionary at `news.grid.<tabKey>`.

// Cards shown per page (2 columns × 3 rows).
const PER_PAGE = 6;

const LatestNews = () => {
  const { t } = useI18n();
  const [activeTabKey, setActiveTabKey] = useState(NEWS_TAB_KEYS[0]);
  const [page, setPage] = useState(0);

  const items = t(`news.grid.${activeTabKey}`) ?? [];
  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));

  // The slice of cards for the current page.
  const pageItems = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const selectTab = (key) => {
    setActiveTabKey(key);
    setPage(0);
  };

  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  return (
    <section
      className="bg-black text-white pt-30"
      aria-label={t("news.ariaLabel")}
    >
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-24">
        {/* Bracketed, centred title */}
        <div className="flex justify-center">
          <div className="relative px-6 py-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute start-0 top-0 h-5 w-5 border-s-4 border-t-4 border-[#EF4123] md:h-6 md:w-6"
            />
            <h2 className="text-center text-3xl font-medium tracking-tight md:text-8xl">
              {t("news.title")}
            </h2>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 end-0 h-5 w-5 border-b-4 border-e-4 border-[#EF4123] md:h-6 md:w-6"
            />
          </div>
        </div>

        {/* Tabs — centred */}
        <div
          role="tablist"
          aria-label={t("news.categoriesLabel")}
          className="mt-8 flex justify-center gap-8 border-b border-white/10"
        >
          {NEWS_TAB_KEYS.map((key) => {
            const isActive = key === activeTabKey;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`news-tab-${key}`}
                aria-selected={isActive}
                aria-controls="news-tabpanel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(key)}
                className={`relative -mb-px pb-3 text-base font-medium transition-colors md:text-lg ${
                  isActive
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {t(`news.tabs.${key}`)}
                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid — the tabpanel for the active category. */}
        <div
          id="news-tabpanel"
          role="tabpanel"
          aria-label={t("news.tabPanelLabel").replace(
            "{category}",
            t(`news.tabs.${activeTabKey}`),
          )}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {pageItems.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              sizes="(min-width: 640px) 520px, 100vw"
            />
          ))}
        </div>

        {/* Footer — prev / dashed progress + counter / next */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={atStart}
            aria-label={t("common.previousPage")}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400"
          >
            <Arrow className="h-5 w-5 rotate-180 rtl:rotate-0" />
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
            {/* Page counter reads left-to-right even in RTL (it is a numeric
                fraction, not prose), so pin its direction. */}
            <span dir="ltr" className="shrink-0 text-xs text-neutral-400">
              {page + 1} / {pageCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={atEnd}
            aria-label={t("common.nextPage")}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 transition hover:bg-white hover:text-black disabled:opacity-40 disabled:hover:bg-neutral-800 disabled:hover:text-neutral-400"
          >
            <Arrow className="h-5 w-5 rotate-0 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
