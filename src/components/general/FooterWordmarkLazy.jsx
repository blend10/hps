"use client";

import dynamic from "next/dynamic";

// Client wrapper that defers the decorative cursor-tracking torch effect off the
// critical path. FooterWordmark is a hover-only flourish with no SEO value and
// no meaning on touch devices, so we lazy-load it with ssr:false — this keeps
// its JS out of the initial bundle and out of SSR. ssr:false is only permitted
// from a Client Component, which is why this thin wrapper exists (the server
// Footer cannot pass ssr:false itself).
//
// A lightweight placeholder preserves the wordmark's height so lazy-mounting the
// real component does not shift layout (CLS).
const FooterWordmark = dynamic(() => import("./FooterWordmark"), {
  ssr: false,
  // Reserve the wordmark's exact aspect ratio (matches the 1420×440 SVG) so
  // mounting the real component causes no layout shift.
  loading: () => (
    <div aria-hidden="true" className="my-10 aspect-1420/440 w-full" />
  ),
});

const FooterWordmarkLazy = () => <FooterWordmark />;

export default FooterWordmarkLazy;
