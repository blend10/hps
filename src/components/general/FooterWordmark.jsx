"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// The torch is a big, roughly circular blob: near-round soft-edged radial
// "lobes" spread symmetrically around the cursor union into an organic circle
// (kept slightly irregular so it doesn't read as a mechanical hard circle).
// Each lobe is an ellipse (rx/ry px) placed at the cursor + (dx, dy); `solid`
// is the % of the radius that stays fully opaque before fading to transparent.
// SCALE grows the whole shape proportionally (both size and lobe spread).
const SCALE = 2.0;
const LOBES = [
  { dx: 0, dy: 0, rx: 132, ry: 128, solid: 44 }, // core, on the cursor
  { dx: 72, dy: -22, rx: 100, ry: 100, solid: 42 },
  { dx: -76, dy: 16, rx: 104, ry: 100, solid: 42 },
  { dx: 24, dy: 72, rx: 96, ry: 94, solid: 42 },
  { dx: -30, dy: -72, rx: 98, ry: 96, solid: 42 },
  { dx: 56, dy: 54, rx: 84, ry: 86, solid: 40 },
  { dx: -56, dy: -34, rx: 88, ry: 88, solid: 40 },
];

const BLOB_MASK = LOBES.map((l) => {
  const rx = l.rx * SCALE;
  const ry = l.ry * SCALE;
  const dx = l.dx * SCALE;
  const dy = l.dy * SCALE;
  return `radial-gradient(${rx}px ${ry}px at calc(var(--mx, -1000px) + ${dx}px) calc(var(--my, -1000px) + ${dy}px), #000 0%, #000 ${l.solid}%, transparent 100%)`;
}).join(", ");

const FooterWordmark = () => {
  const spotlightRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Write the cursor position straight to CSS vars — no React re-render, so the
  // mask follows the pointer smoothly.
  const trackCursor = (event) => {
    const node = spotlightRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const handleMouseEnter = (event) => {
    // Seed the position from the entry point so the reveal fades in under the
    // cursor rather than at a stale spot from a previous hover.
    trackCursor(event);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    const node = spotlightRef.current;
    if (node) {
      node.style.setProperty("--mx", "-1000px");
      node.style.setProperty("--my", "-1000px");
    }
    setIsHovering(false);
  };

  return (
    <div
      ref={spotlightRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={trackCursor}
      onMouseLeave={handleMouseLeave}
      className="relative my-10 w-full"
    >
      <Image
        src="/hpsFooter.svg"
        alt="High Protection Systems"
        width={1420}
        height={440}
        className="pointer-events-none h-auto w-full select-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none"
        style={{
          backgroundImage: "url('/FooterHover.svg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage: BLOB_MASK,
          maskImage: BLOB_MASK,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </div>
  );
};

export default FooterWordmark;
