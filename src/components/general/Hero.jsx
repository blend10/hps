"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef } from "react";

// Full-viewport hero with an autoplaying, muted, looping background video.
// The "opening" reveal: the video appears as a small 1000×400 rounded frame,
// holds there for ~0.6s (everything else — nav, copy — hidden), then grows
// to fill the viewport (see globals.css → .hero-frame / @keyframes
// hpsHeroExpand). Only once it reaches fullscreen do the scrim, copy and
// "scroll to explore" hint cascade in (.hero-reveal / .hero-fade), while the
// global nav slides in (Header.jsx → .header-intro). The whole sequence is
// pure CSS so it plays on first paint without waiting for hydration, and is
// neutralised under prefers-reduced-motion.
const Hero = ({ variant = "home" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers only grant autoplay when muted is set as a property (not
    // just the attribute), so force it, then kick off playback. Swallow the
    // rejection browsers throw when autoplay is blocked (e.g. data-saver).
    video.muted = true;
    const started = video.play();
    if (started && typeof started.catch === "function") started.catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="relative h-svh min-h-140 w-full overflow-hidden bg-black"
    >
      {/* Expanding video frame — opens at 1000×400 (clamped on small screens so
          it never overflows), then grows smoothly to fill the viewport. */}
      <div
        className="hero-frame shadow-2xl"
        style={{ animationDelay: "0.15s" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={
            variant === "motorsport"
              ? "/videos/homePage-poster.png"
              : variant === "company"
                ? "/video222.png"
                : "/videos/homeVideo.png"
          }
          autoPlay
          muted
          loop
          playsInline
          // preload="none": the poster paints immediately as the LCP element,
          // and the large decorative MP4 streams in after, rather than blocking
          // first paint by eagerly downloading the whole file.
          preload="none"
          aria-hidden="true"
        >
          <source
            src={
              variant === "motorsport"
                ? "/videos/homePage.mp4"
                : variant === "company"
                  ? "/videos/video222.mp4"
                  : "/videos/homeVideo.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>

      {/* Scrim: darkens the top (so the overlaid nav stays legible) and the
          bottom (so the headline reads over a bright frame). */}
      <div
        aria-hidden="true"
        className="hero-fade pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/20"
        style={{ animationDelay: "1.75s" }}
      />

      {/* Centered "case file" card */}
      <div className="relative z-10 flex h-full items-center justify-center mt-40 px-5">
        <div
          className="hero-reveal w-full max-w-4xl rounded-lg   bg-[#2929294D] px-6 py-8 shadow-2xl backdrop-blur-md md:px-12 md:py-10"
          style={{ animationDelay: "1.9s" }}
        >
          {/* Top bar: label + HPS badge */}
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
          <div className="mt-9 flex  justify-center">
            <div className="relative px-5 py-3 md:px-7 md:py-4">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-4 md:boder-l-8 border-t-4 md:border-t-8 border-white md:h-10 md:w-10"
              />
              <h2 className="text-center text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-[90px]">
                {variant === "motorsport" ? (
                  "Built to Survive"
                ) : variant === "company" ? (
                  <>
                    Everything
                    <br />
                    About Us
                  </>
                ) : (
                  <>
                    Protecting
                    <br />
                    the Best
                  </>
                )}
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 border-b-4 md:border-b-8 border-r-4 md:border-r-8 border-white md:h-10 md:w-10"
              />
            </div>
          </div>

          {variant === "motorsport" ? (
            /* Story */
            <p className="mx-auto mt-7  text-center text-sm leading-relaxed text-[#D3D3D3] md:text-[20px]">
              On 29 November 2020, Romain Grosjean walked out of a 190mph <br />
              fireball. It wasn&apos;t luck. It was engineering.
            </p>
          ) : variant === "company" ? (
            /* CONTACT US CTA */
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact"
                className="relative flex items-center rounded-md bg-[#EF4123] px-10 py-3 text-black transition-colors hover:bg-[#d63a1e]"
              >
                <span className="text-[13px] font-semibold uppercase leading-tight tracking-tight">
                  Contact us
                </span>
                <Image
                  src="/orangeArrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="absolute right-1.5 top-1.5 h-2.5 w-2.5 shrink-0 brightness-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          ) : (
            /* CTA */
            <div className="mt-7 flex justify-center">
              <Link
                href="/products"
                className="relative flex items-center rounded-md bg-[#EF4123] py-2.5 pl-5 pr-7 text-black transition-colors hover:bg-[#d63a1e]"
              >
                <span className="text-[13px] font-semibold uppercase leading-tight tracking-tight">
                  Discover
                  <br />
                  our products
                </span>
                <Image
                  src="/orangeArrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="absolute right-1.5 top-1.5 h-2.5 w-2.5 shrink-0 brightness-0"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
