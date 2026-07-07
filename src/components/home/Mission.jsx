import Image from "next/image";

// "Mission" — a full-width call-to-action banner over a full-bleed photo.
//
// The image covers the whole section with a dark overlay for legibility. Centred
// on top: a heading wrapped in corner brackets (top-left + bottom-right, drawn
// with short border segments, echoing the design's ┌ ┐ marks), and an orange
// button beneath it.
//
// All content is prop-driven — the defaults reproduce the original home-page
// banner ("Protect the Mission" / MORE ABOUT US), so existing usages need no
// changes. Pass `heading`, `buttonLabel`, `buttonHref`, `image` to reuse it.

const Mission = ({
  heading = "Protect the Mission",
  buttonLabel = "More about us",
  buttonHref = "#about",
  image = "/change.png",
  ariaLabel = "Protect the mission",
}) => {
  return (
    <section
      aria-label={ariaLabel}
      className="relative flex min-h-105 items-center justify-center overflow-hidden bg-black px-6 py-20 text-white sm:min-h-135 sm:py-24 md:min-h-180"
    >
      {/* Background photo + darkening overlay */}
      <Image
        src={image}
        alt=""
        fill
        aria-hidden
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* Centred content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Heading with corner brackets (top-left + bottom-right). The bracket
            size/thickness scales up with the heading so it stays proportional on
            phones; desktop (md+) keeps its original 32px / 6px marks. */}
        <div className="relative inline-block px-3 py-2 sm:px-4">
          <span className="absolute left-0 top-0 h-5 w-5 border-l-3 border-t-3 border-white sm:h-6 sm:w-6 sm:border-l-4 sm:border-t-4 md:h-8 md:w-8 md:border-l-6 md:border-t-6" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b-3 border-r-3 border-white sm:h-6 sm:w-6 sm:border-b-4 sm:border-r-4 md:h-8 md:w-8 md:border-b-6 md:border-r-6" />
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-[120px]">
            {heading}
          </h2>
        </div>

        <a
          href={buttonHref}
          className="mt-6 inline-block rounded-md bg-[#EF4123] px-10 py-3 text-md font-semibold uppercase tracking-tight text-black transition-colors hover:bg-[#e63417] sm:px-16 sm:py-3.5"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
};

export default Mission;
