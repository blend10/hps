/** @type {import('next').NextConfig} */

// Security response headers applied to every route. CSP ships as Report-Only
// first so you can watch for violations before enforcing; once the report queue
// is clean, rename the header to "Content-Security-Policy".
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    // HSTS only takes effect over HTTPS. Harmless (and belt-and-suspenders) on
    // hosts like Vercel that already set it at the edge.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      // Next injects a small inline hydration bootstrap; 'unsafe-inline' for
      // style is required by Tailwind's inlined styles. Tighten with nonces if
      // you later need a strict script policy.
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self'",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  // Don't advertise the framework on every response.
  poweredByHeader: false,
  images: {
    // Prefer modern formats; the optimizer negotiates per Accept header.
    formats: ["image/avif", "image/webp"],
    // Cache optimized image variants for 31 days.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        // Apply the security headers to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Long-cache the large, unhashed /public videos. (Hashed /_next/static
        // assets already get immutable caching automatically.)
        source: "/:path*.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
