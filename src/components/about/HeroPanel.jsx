"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// One interactive panel of the About-Us hero row. Sits desaturated (grayscale)
// at rest; on hover it blooms to full colour and a muted, looping video fades in
// over the still image and plays. Leaving the panel pauses + rewinds the video
// and drops it back to greyscale.
//
// This is the ONLY client-side piece of the About-Us hero — it is split into its
// own "use client" file so the surrounding hero shell (card, headline, brand
// logos) stays a Server Component and ships no hydration for the static parts.
const HeroPanel = ({ label, image, video, priority }) => {
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
    </div>
  );
};

export default HeroPanel;
