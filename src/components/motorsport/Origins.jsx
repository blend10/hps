"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";

// "Motorsport Heritage" — a two-column editorial section.
//
// Left column: a bracketed title + an index of the chapters. It is
// `position: sticky` so it stays pinned in the viewport while the reader
// scrolls (pure CSS — no JS needed for the pinning itself).
//
// Right column: the chapters, stacked and scrolling normally.
//
// An IntersectionObserver watches the chapters and highlights the matching
// index entry (orange + a growing dash) as each one reaches the centre of the
// viewport, so the left index reads as a live table of contents. Clicking an
// index entry smooth-scrolls to its chapter.
//
// The same layout serves two sections: `variant="motorsport"` (the Motorsport
// Heritage page) and `variant="company"` (the Company Overview page). Copy for
// both lives in the dictionary under `origins.<variant>`; the photography and
// frame aspect ratios are presentation, so they stay here, keyed by chapter id.

const CHAPTER_MEDIA = {
  motorsport: {
    origins: { image: "/image1.png", aspect: "10 / 6" },
    "the-crash": { image: "/Image2.png", aspect: "10 / 6" },
    "racetrack-to-frontline": { image: "/Image3.png", aspect: "10 / 6" },
    "minds-who-trusted-us": { image: "/image4.png", aspect: "10 / 6" },
    "a-legacy": { image: "/Image2.png", aspect: "10 / 6" },
    "comes-together": { image: "/Image2.png", aspect: "16 / 10" },
  },
  company: {
    "who-we-are": { image: "/pic1.png", aspect: "10 / 6" },
    "our-mission": { image: "/pic2.png", aspect: "10 / 6" },
    "our-heritage": { image: "/pic3.png", aspect: "10 / 6" },
    "our-facility": { image: "/pic4.png", aspect: "16 / 10" },
  },
};

const SECTION_IDS = {
  motorsport: "motorsport-heritage",
  company: "about-hps",
};

// Small on-brand stand-in for a not-yet-shot photo: a dark gradient frame with
// the HPS corner-bracket motif and a caption. Replaced by <Image> the moment a
// chapter is given a real `image` path in CHAPTER_MEDIA.
const Placeholder = ({ label }) => (
  <>
    <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-black" />
    <span
      aria-hidden="true"
      className="absolute start-3 top-3 h-5 w-5 border-s-2 border-t-2 border-[#EF4123]/70"
    />
    <span
      aria-hidden="true"
      className="absolute bottom-3 end-3 h-5 w-5 border-b-2 border-e-2 border-[#EF4123]/70"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-500">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m3 17 5-4 4 3 3-2 6 5" />
      </svg>
      <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  </>
);

const Origins = ({ variant = "motorsport" }) => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const heading = t(`origins.${variant}.heading`);
  const chapters = t(`origins.${variant}.chapters`);
  const media = CHAPTER_MEDIA[variant] ?? {};

  // Highlight the chapter crossing the vertical centre of the viewport. The
  // negative top/bottom rootMargin collapses the observer's root to a thin band
  // through the middle, so whichever chapter occupies that band is "active".
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (index) => {
    const el = sectionRefs.current[index];
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      id={SECTION_IDS[variant]}
      className="bg-black text-white overflow-x-clip"
      aria-label={t(`origins.${variant}.ariaLabel`)}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-[minmax(240px,340px)_1fr] lg:gap-x-[65px]">
          {/* LEFT — sticky title + chapter index. Pinned near the top of the
              viewport (offset to clear the fixed header) while the chapters on
              the right scroll past. */}
          <aside className="py-16 md:sticky md:top-32 md:flex md:flex-col md:self-start md:py-16  ">
            {/* Full-bleed dashed baseline: symmetric about the column, so the
                physical left/width here mirror correctly on their own. */}
            <div className="absolute bottom-0 left-[-50vw] w-[200vw] border-b border-dashed border-white/40 z-0"></div>
            <div className="relative inline-block self-start px-4 py-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute start-0 top-0 h-5 w-5 border-s-4 border-t-4 border-[#EF4123]"
              />
              <h2 className="text-3xl font-medium leading-[1.05] tracking-tight text-[#EF4123] md:text-[42px]">
                {heading.line1}
                <br />
                {heading.line2}
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 end-0 h-5 w-5 border-b-4 border-e-4 border-[#EF4123]"
              />
            </div>

            {/* Chapter index — a live table of contents (md and up). */}
            <nav aria-label={t("origins.chaptersLabel")} className="mt-10 hidden md:block">
              <ol className="space-y-3.5">
                {chapters.map((chapter, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => scrollToChapter(i)}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex w-full items-center gap-3 text-start"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-px shrink-0 bg-[#EF4123] transition-all duration-300 ${
                            isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                          }`}
                        />
                        <span
                          className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                            isActive
                              ? "text-[#EF4123]"
                              : "text-neutral-500 group-hover:text-neutral-300"
                          }`}
                        >
                          {chapter.nav}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          {/* RIGHT — scrolling chapters. */}
          <div className="min-w-0 pb-24 md:pb-0">
            {chapters.map((chapter, i) => {
              const { image, aspect } = media[chapter.id] ?? {};
              return (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  ref={(el) => (sectionRefs.current[i] = el)}
                  data-index={i}
                  className="flex min-h-[70vh] scroll-mt-32 flex-col justify-center py-16 md:py-[8vh] relative "
                >
                  {/* Black band that bleeds to the inline-end screen edge. */}
                  <div className="absolute w-screen start-0 border-b border-s border-white/40 border-dashed inset-0 z-9999 bg-black"></div>
                  <h3 className="text-3xl font-medium tracking-tight md:text-4xl ms-4 md:ms-10 z-9999">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base ms-4 md:ms-10 z-9999">
                    {chapter.body}
                  </p>

                  <figure
                    className="relative mt-8 overflow-hidden rounded-lg border border-white/10 bg-neutral-900 ms-4 md:ms-10 z-9999"
                    style={{ aspectRatio: aspect ?? "10 / 6" }}
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt={chapter.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 60vw, 100vw"
                      />
                    ) : (
                      <Placeholder label={chapter.caption} />
                    )}
                  </figure>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origins;
