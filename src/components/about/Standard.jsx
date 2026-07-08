"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import Lines from "@/components/general/Lines";
import { useI18n } from "@/i18n/client";

// "Setting a New Standard" section: a headline on the left, an intro
// paragraph + FAQ button on the right, and a wide grayscale video below.
// The video sits desaturated with a centred play button; clicking plays it
// (and un-mutes to colour). Corner brackets frame the whole block.
//
// Asset (wired to an existing file — swap if you have a dedicated clip):
//   video: /videos/video222.mp4   (poster: /video222.png)
const Standard = () => {
  const { t, href } = useI18n();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    const started = v.play();
    if (started && typeof started.catch === "function") started.catch(() => {});
    setPlaying(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black  px-5 pb-16 md:px-12 md:pb-24 pt-60">
      <div className="mx-auto max-w-6xl">
        {/* Top row: headline (left) + intro & FAQ button (right) */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            {t("standard.heading")}
          </h2>

          <div className="flex max-w-md flex-col gap-5">
            <p className="text-sm leading-relaxed text-[#D3D3D3]">
              {t("standard.intro")}
            </p>

            <Link
              href={href("/faq")}
              className="group relative inline-flex w-fit items-center gap-6 rounded-sm bg-[#EF4123] px-4 py-2 text-black transition-colors hover:bg-[#d63a1e]"
            >
              <span className="text-[11px] font-semibold uppercase leading-tight tracking-tight">
                <Lines lines={t("standard.faqButton")} />
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="shrink-0 rtl:-scale-x-100"
              >
                <path
                  d="M1 13L13 1M13 1H4M13 1V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Wide video */}
        <div className="relative mt-12 aspect-video w-full h-150 rounded-sm bg-black">
          {/* Corner brackets framing the video. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -start-3 -top-3 z-20 h-8 w-8 border-s-4 border-t-4 border-white md:-start-5 md:-top-5 md:h-10 md:w-10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -end-3 z-20 h-8 w-8 border-b-4 border-e-4 border-white md:-bottom-5 md:-end-5 md:h-10 md:w-10"
          />

          <video
            ref={videoRef}
            poster="/video222.png"
            loop
            playsInline
            preload="none"
            onClick={playing ? undefined : play}
            className={`h-150 w-full cursor-pointer object-contain transition-[filter] duration-500 ${
              playing ? "grayscale-0" : "grayscale"
            }`}
          >
            <source src="/videos/video222.mp4" type="video/mp4" />
          </video>

          {/* Centred play button — hidden once playing. */}
          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label={t("common.playVideo")}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-transform hover:scale-110 md:h-20 md:w-20">
                {/* The play triangle always points in the media-playback
                    direction, which is not mirrored by locale. */}
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 22 26"
                  fill="none"
                  aria-hidden="true"
                  className="ml-1"
                >
                  <path d="M0 0L22 13L0 26V0Z" fill="white" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Standard;
