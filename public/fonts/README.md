# Neue Montreal font files

`src/app/globals.css` loads Neue Montreal via `@font-face` and applies it to
every page. It expects these files **in this folder** (`public/fonts/`):

- `NeueMontreal-Regular.woff2`  (weight 400)
- `NeueMontreal-Medium.woff2`   (weight 500)
- `NeueMontreal-Bold.woff2`     (weight 700)

Add the files with those exact names and they go live on the next reload — no
code changes needed. Until then the app builds fine and falls back to
Arial/Helvetica.

## Notes

- `.woff2` is recommended for the web. If your files are `.otf` / `.ttf` / `.woff`,
  either convert them (e.g. https://cloudconvert.com/otf-to-woff2) or update the
  `url(...)`/`format(...)` in the `@font-face` blocks in `globals.css` to match.
- Want more weights (Light 300, Thin, italics, ...)? Drop the file here and add a
  matching `@font-face` block in `globals.css`.
