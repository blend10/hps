import Image from "next/image";

// Shared building blocks for the two "Latest News" sections (the homepage
// carousel in News.jsx and the paged grid in LatestNews.jsx). Extracted so the
// card markup and icons live in one place and the two layouts can't silently
// diverge.

// Category identity lives in these stable keys; the visible label is looked up
// per locale at `news.tabs.<key>`, and the articles at `news.grid.<key>`.
export const NEWS_TAB_KEYS = ["hpsShow", "pressRelease", "events"];

// Points inline-end. Mirrored under RTL so it still points "forward".
export const Chevron = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${className} rtl:-scale-x-100`}
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

// Full arrow (tail + head) used by the prev/next controls. Callers rotate it:
// the "previous" control passes `rotate-180 rtl:rotate-0` and the "next" control
// passes `rtl:rotate-180`, so both keep pointing the reading-direction way round
// in either script. (Combining rotate-180 with a scale-x flip would mirror the
// arrow vertically instead — hence rotation, not scaling, here.)
export const Arrow = ({ className = "" }) => (
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

// A single news card: image, date badge, chevron, bottom blur + gradient, and
// title/excerpt. `sizes` is passed by the caller because the carousel and the
// grid render the card at different widths.
export const NewsCard = ({ article, sizes }) => (
  <div className="group relative h-full overflow-hidden rounded-xl">
    <div className="relative aspect-16/10">
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes={sizes}
      />
      {/* Bottom gradient for legible overlay text */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/10" />

      {/* Date badge */}
      <span className="absolute end-3 top-3 rounded-md bg-[#68686866] px-3 py-1.5 text-xs font-medium uppercase tracking-tight text-neutral-200 backdrop-blur-sm md:end-4 md:top-4 md:px-5 md:py-2 md:text-base">
        {article.date}
      </span>

      {/* Chevron */}
      <span className="absolute bottom-5 end-5 z-10 flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:rotate-180">
        <Chevron className="h-8 w-8 rotate-270 hover:rotate-180" />
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
      <div className="absolute inset-x-5 -bottom-6 pe-14 transition-transform duration-300 group-hover:-translate-y-12">
        <h3 className="text-lg font-medium  uppercase tracking-[0.08em] md:text-xl">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-neutral-300 md:text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {article.excerpt}
          </p>
        )}
      </div>
    </div>
  </div>
);
