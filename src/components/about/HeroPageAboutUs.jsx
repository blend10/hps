"use client";
import Image from "next/image";
import { useRef, useState } from "react";

// Four full-height panels shown side-by-side. Each sits desaturated
// (grayscale) at rest; on hover it blooms to full colour and a muted,
// looping video fades in over the still image and plays. Leaving the panel
// pauses + rewinds the video and drops it back to greyscale.
//
// Assets (add these to /public — the component is wired to these paths):
//   images: /about/panel1.png … panel4.png   (the still shown at rest, also the video poster)
//   videos: /videos/about1.mp4 … about4.mp4   (plays on hover)
const PANELS = [
  { label: "Motorsport", image: "/item1.png", video: "/videos/videoItem1.mp4" },
  { label: "Aviation", image: "/item2.png", video: "/videos/videoItem2.mp4" },
  { label: "Police", image: "/item3.png", video: "/videos/videoItem3.mp4" },
  {
    label: "Gendarmerie",
    image: "/item4.png",
    video: "/videos/videoItem4.mp4",
  },
];

const Panel = ({ label, image, video, priority }) => {
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);

  // Start playing the muted, looping clip.
  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const started = v.play();
    // Browsers reject play() when autoplay is disallowed — swallow it.
    if (started && typeof started.catch === "function") started.catch(() => {});
  };

  // Pause and rewind so the still shows again next time.
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const enter = () => {
    setActive(true);
    play();
  };

  const leave = () => {
    setActive(false);
    stop();
  };

  // Click / tap toggles the panel. This is what makes it work on touch
  // devices, where there is no hover to trigger `enter`/`leave`. On a mouse,
  // hover already handles activation, so a click there would just flicker the
  // effect off — hence we only toggle for non-hover (touch/pen) pointers.
  const handleClick = (e) => {
    if (e.nativeEvent?.pointerType === "mouse") return;
    setActive((wasActive) => {
      if (wasActive) stop();
      else play();
      return !wasActive;
    });
  };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={label}
      aria-pressed={active}
      className="group relative h-full flex-1 cursor-pointer overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {/* Still image: grayscale at rest, full colour when active. */}
      <Image
        src={image}
        alt={label}
        fill
        priority={priority}
        sizes="(min-width: 640px) 25vw, 50vw"
        className={`object-cover transition-[filter,transform] duration-500 ease-out ${
          active ? "grayscale-0 scale-105" : "grayscale scale-100 brightness-90"
        }`}
      />

      {/* Video: fades in over the still and plays on hover. */}
      <video
        ref={videoRef}
        poster={image}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Bottom scrim so the label stays legible over any frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent"
      />

      {/* Label */}
    </div>
  );
};

// Brand logos shown in the card. Add these to /public (drop-in, like the
// panels): /about/brand1.svg … brand4.svg
const BRANDS = [
  { name: "OMP", logo: "/headerLogo1.svg" },
  { name: "Bell", logo: "/headerLogo2.svg" },
  { name: "ZN", logo: "/headerLogo3.svg" },
  { name: "Racing Spirit", logo: "/headeLogo4.svg" },
];

const HeroPageAboutUs = () => {
  return (
    <section className="relative h-svh min-h-140 w-full bg-black">
      {/* Panel row — clips the grayscale/colour panels to the section, while
          leaving the overhanging card free to spill below (see below). On
          mobile the four panels form a 2×2 grid; from sm+ they sit in a row. */}
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 overflow-hidden sm:flex sm:flex-row">
        {PANELS.map((panel, i) => (
          <Panel key={panel.label} {...panel} priority={i === 0} />
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
                alt="Scroll down"
                width={15}
                height={15}
                className="animate-bounce"
              />
              <span className="font-medium uppercase tracking-tight text-[#EF4123]">
                SCROLL TO EXPLORE
              </span>
            </div>

            <Image src="/shield.svg" alt="HPS Badge" width={40} height={40} />
          </div>

          {/* Bracketed headline */}
          <div className="mt-6 flex justify-center">
            <div className="relative px-6 py-3">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-white md:h-8 md:w-8"
              />
              <h2 className="text-center text-4xl font-medium leading-tight tracking-tight text-white md:text-[96px]">
                Built for Your
                <br />
                Protection
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-white md:h-8 md:w-8"
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
