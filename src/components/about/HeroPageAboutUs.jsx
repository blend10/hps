import Image from "next/image";
import HeroPanel from "./HeroPanel";
import Lines from "@/components/general/Lines";
import { getT } from "@/i18n/server";

// About-Us hero. The interactive grayscale/colour video panels are the only
// client-side piece and live in ./HeroPanel ("use client"); this shell — the
// panel grid wiring, gradient, overhanging card, headline and brand-logo row —
// is a Server Component and ships no client JS.
//
// Panel assets (add to /public — HeroPanel is wired to these paths):
//   images: /item1.png … item4.png   (the still shown at rest, also the video poster)
//   videos: /videos/videoItem1.mp4 … videoItem4.mp4   (plays on hover)
// Panel labels come from the dictionary at `aboutHero.panels.<id>`.
const PANELS = [
  { id: "motorsport", image: "/item1.png", video: "/videos/videoItem1.mp4" },
  { id: "aviation", image: "/item2.png", video: "/videos/videoItem2.mp4" },
  { id: "police", image: "/item3.png", video: "/videos/videoItem3.mp4" },
  { id: "gendarmerie", image: "/item4.png", video: "/videos/videoItem4.mp4" },
];

// Brand logos shown in the card.
const BRANDS = [
  { name: "OMP", logo: "/headerLogo1.svg" },
  { name: "Bell", logo: "/headerLogo2.svg" },
  { name: "ZN", logo: "/headerLogo3.svg" },
  { name: "Racing Spirit", logo: "/HeadeLogo4.svg" },
];

const HeroPageAboutUs = async ({ lang }) => {
  const t = await getT(lang);

  return (
    <section className="relative h-svh min-h-140 w-full bg-black">
      {/* Panel row — clips the grayscale/colour panels to the section, while
          leaving the overhanging card free to spill below (see below). On
          mobile the four panels form a 2×2 grid; from sm+ they sit in a row. */}
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 overflow-hidden sm:flex sm:flex-row">
        {PANELS.map((panel, i) => (
          <HeroPanel
            key={panel.id}
            label={t(`aboutHero.panels.${panel.id}`)}
            image={panel.image}
            video={panel.video}
            priority={i === 0}
          />
        ))}
      </div>

      {/* Small black gradient, bottom → top, so the card reads cleanly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-linear-to-t from-black via-black/70 to-transparent"
      />

      {/* Card, anchored to the bottom and pushed down so ~30% of it overhangs
          below the section, overlapping the component that follows. */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-[30%] justify-center px-5">
        <div className="relative w-full max-w-2xl rounded-sm border border-white/10 bg-black/40 px-6 py-8 shadow-2xl backdrop-blur-md md:px-10 md:py-10">
          {/* Top row: "unlock" tab + HPS badge */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src="/arrowdown1.svg"
                alt=""
                aria-hidden="true"
                width={15}
                height={15}
                className="animate-bounce"
              />
              <span className="font-medium uppercase tracking-tight text-[#EF4123]">
                {t("common.scrollToExplore")}
              </span>
            </div>

            <Image
              src="/shield.svg"
              alt={t("common.hpsBadge")}
              width={40}
              height={40}
            />
          </div>

          {/* Bracketed headline */}
          <div className="mt-6 flex justify-center">
            <div className="relative px-6 py-3">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute start-0 top-0 h-6 w-6 border-s-4 border-t-4 border-white md:h-8 md:w-8"
              />
              <h2 className="text-center text-4xl font-medium leading-tight tracking-tight text-white md:text-[96px]">
                <Lines lines={t("aboutHero.headline")} />
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 end-0 h-6 w-6 border-b-4 border-e-4 border-white md:h-8 md:w-8"
              />
            </div>
          </div>

          {/* Brand logos */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {BRANDS.map((brand, i) => (
              <div key={brand.name} className="flex gap-2    items-center ">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={70}
                  height={24}
                  className="h-6 w-auto  object-contain opacity-90 brightness-0 invert"
                />
                {i < BRANDS.length - 1 && (
                  <span aria-hidden="true" className="h-6 w-px bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPageAboutUs;
