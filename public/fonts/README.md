# Fonts

Fonts are loaded via **`next/font`** in `src/app/layout.js`, which self-hosts,
optimizes, and eliminates layout shift automatically. There is no longer any
`@font-face` in `globals.css`.

## Current setup

The site ships **Space Grotesk** (a geometric-grotesque close to Neue Montreal)
via `next/font/google`. It loads with zero runtime request to Google and exposes
the `--font-sans` CSS variable that `globals.css` and Tailwind's `font-sans`
utility consume.

## Switching to the licensed Neue Montreal

Once you have the licensed `.woff2` files, drop them in this folder and swap the
Google import in `src/app/layout.js` for `next/font/local`:

```js
import localFont from "next/font/local";

const neueMontreal = localFont({
  src: [
    { path: "../../public/fonts/NeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/NeueMontreal-Medium.woff2",  weight: "500", style: "normal" },
    { path: "../../public/fonts/NeueMontreal-Bold.woff2",    weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-sans",
});
```

Then use `neueMontreal.variable` on `<html>` instead of `spaceGrotesk.variable`.
Nothing in `globals.css` needs to change — it already reads `--font-sans`.

Expected files (exact names):

- `NeueMontreal-Regular.woff2`  (weight 400)
- `NeueMontreal-Medium.woff2`   (weight 500)
- `NeueMontreal-Bold.woff2`     (weight 700)
