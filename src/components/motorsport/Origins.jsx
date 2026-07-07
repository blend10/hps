"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
// Images: none of these photos ship in /public yet, so each chapter renders an
// on-brand placeholder frame. To use a real photo, drop it in
// /public/motorsport/ and set `image: "/motorsport/<file>"` on the chapter —
// the placeholder is swapped for a Next.js <Image> automatically.

// Default content (Motorsport Heritage). Exported so callers can spread/extend
// it; pass your own `heading` + `chapters` props to reuse this layout for a
// different section (see the About Us / company page).
export const MOTORSPORT_HEADING = { line1: "Motorsport", line2: "Heritage" };

export const MOTORSPORT_CHAPTERS = [
  {
    id: "origins",
    nav: "The Origins of Protection",
    title: "The Origins of Protection",
    caption: "Bell Helmets · 1954",
    aspect: "10 / 6",
    image: "/image1.png",
    body: "Long before protection became a defence industry priority, it was a motorsport obsession. In the early days of racing, drivers took to the track with little more than leather helmets and determination. As speeds increased and the consequences of failure became undeniable, a new discipline was born — one dedicated entirely to keeping the human body alive at the limit. Bell Helmets, founded in 1954, pioneered the modern racing helmet, setting the standard for what protective equipment could and should be. That legacy of innovation — of refusing to accept that injury is inevitable — is the same philosophy that runs through everything HPS builds today.",
  },
  {
    id: "the-crash",
    nav: "The Crash That Proved Everything",
    title: "The Crash That Proved Everything",
    caption: "Bahrain Grand Prix · 2020",
    aspect: "10 / 6",
    image: "/Image2.png",
    body: "On 29 November 2020, at the Bahrain Grand Prix, Romain Grosjean's car split in two at over 190mph and erupted into a fireball on impact. He walked out of the flames 28 seconds later. What the world witnessed that day was not luck. It was decades of engineering, material science, and relentless testing compressed into a single, life-saving moment. The HANS device, the fireproof suit, the helmet — every layer of protection performed exactly as designed. For HPS, that moment was not a surprise. It was a proof of concept. It was the reason we exist.",
  },
  {
    id: "racetrack-to-frontline",
    nav: "From the Racetrack to the Frontline",
    title: "From the Racetrack to the Frontline",
    caption: "From track to frontline",
    aspect: "10 / 6",
    image: "/Image3.png",
    body: "The racetrack is the harshest laboratory on earth. No other environment demands that protective equipment withstand extreme heat, violent impact, and total structural failure all within fractions of a second. The lessons learned there — impact-absorption science and the human-fit engineering developed for Formula 1 and elite motorsport — do not disappear when the chequered flag drops. At HPS, we took that knowledge and carried it into a different question: what happens when the threat isn't a wall, but a bullet? The answer became our greatest range. Every helmet, every vest, every system we produce carries the precision and performance philosophy of motorsport in its construction.",
  },
  {
    id: "minds-who-trusted-us",
    nav: "The Drivers Who Trusted Us",
    title: "The Drivers Who Trusted Us",
    caption: "Trusted at the limit",
    aspect: "10 / 6",
    image: "/image4.png",
    body: "Trust at 200mph is not given lightly. The relationship between a racing driver and their protective equipment is one of the most demanding partnerships in sport — built on data, testing, and an uncompromising standard of performance. Through our parent company Racing Force Group, HPS has been part of the protection story for some of the greatest drivers in motorsport history. That association is not a marketing footnote. It is a validation. When the best drivers in the world choose to put their lives in your hands, the standard you are held to becomes the standard you build everything else around.",
  },
  {
    id: "a-legacy",
    nav: "A Legacy Still Being Written",
    title: "A Legacy Still Being Written",
    caption: "Since 1954",
    aspect: "10 / 6",
    image: "/Image2.png",
    body: "Motorsport taught us that protection is never finished. Every season brings new speeds, new impacts, new data and with it, new demands on what materials and engineering must deliver. That same restlessness drives HPS forward. We are not a company content with meeting yesterday's standards. We test harder, we research deeper, and we design with the understanding that the person wearing our equipment may one day depend on it completely. The legacy of motorsport lives in every product we make — not as history, but as a standard we refuse to let slip.",
  },
  {
    id: "comes-together",
    nav: "Where It All Comes Together",
    title: "Where It All Comes Together",
    caption: "Motorsport → Frontline",
    aspect: "16 / 10",
    image: "/Image2.png",
    body: "The same standards that protected drivers at the highest level of motorsport are built into the walls of our facility. HPS is headquartered in Ronco Scrivia, Italy, within the Racing Force Group manufacturing campus a purpose-built environment where research, development, and production happen under one roof. Every product is designed, tested, and manufactured in-house, giving us complete control over quality at every stage. From raw material to finished equipment, nothing leaves our facility without meeting the exact tolerances our clients and our history demand.",
  },
];

// Small on-brand stand-in for a not-yet-shot photo: a dark gradient frame with
// the HPS corner-bracket motif and a caption. Replaced by <Image> the moment a
// chapter is given a real `image` path.
const Placeholder = ({ label }) => (
  <>
    <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-black" />
    <span
      aria-hidden="true"
      className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-[#EF4123]/70"
    />
    <span
      aria-hidden="true"
      className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-[#EF4123]/70"
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

const Origins = ({
  heading = MOTORSPORT_HEADING,
  chapters = MOTORSPORT_CHAPTERS,
  sectionId = "motorsport-heritage",
  ariaLabel = "Motorsport Heritage",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

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
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      id={sectionId}
      className="bg-black text-white overflow-x-clip"
      aria-label={ariaLabel}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-[minmax(240px,340px)_1fr] lg:gap-x-[65px]">
          {/* LEFT — sticky title + chapter index. Pinned near the top of the
              viewport (offset to clear the fixed header) while the chapters on
              the right scroll past. */}
          <aside className="py-16 md:sticky md:top-32 md:flex md:flex-col md:self-start md:py-16  ">
            <div className="absolute bottom-0 left-[-50vw] w-[200vw] border-b border-dashed border-white/40 z-0"></div>
            <div className="relative inline-block self-start px-4 py-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-4 border-t-4 border-[#EF4123]"
              />
              <h2 className="text-3xl font-medium leading-[1.05] tracking-tight text-[#EF4123] md:text-[42px]">
                {heading.line1}
                <br />
                {heading.line2}
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-4 border-r-4 border-[#EF4123]"
              />
            </div>

            {/* Chapter index — a live table of contents (md and up). */}
            <nav aria-label="Chapters" className="mt-10 hidden md:block">
              <ol className="space-y-3.5">
                {chapters.map((chapter, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => scrollToChapter(i)}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex w-full items-center gap-3 text-left"
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
            {chapters.map((chapter, i) => (
              <article
                key={chapter.id}
                id={chapter.id}
                ref={(el) => (sectionRefs.current[i] = el)}
                data-index={i}
                className="flex min-h-[70vh] scroll-mt-32 flex-col justify-center py-16 md:py-[8vh] relative "
              >
                <div className="absolute w-screen left-0 border-b border-l border-white/40 border-dashed inset-0 z-9999 bg-black"></div>
                <h3 className="text-3xl font-medium tracking-tight md:text-4xl ml-4 md:ml-10 z-9999">
                  {chapter.title}
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base ml-4 md:ml-10 z-9999">
                  {chapter.body}
                </p>

                <figure
                  className="relative mt-8 overflow-hidden rounded-lg border border-white/10 bg-neutral-900 ml-4 md:ml-10 z-9999"
                  style={{ aspectRatio: chapter.aspect }}
                >
                  {chapter.image ? (
                    <Image
                      src={chapter.image}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origins;
