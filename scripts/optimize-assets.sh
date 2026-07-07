#!/usr/bin/env bash
#
# Asset optimization for the HPS site. The single biggest performance problem is
# raw media weight: public/ is ~270MB, dominated by multi-MB videos and images
# far larger than the boxes they render into. This script re-encodes them to
# web-appropriate sizes. It is DESTRUCTIVE (it overwrites originals), so it
# writes to public_optimized/ first — review, then swap it in.
#
# Requirements: ffmpeg, cwebp (from libwebp). On Windows use Git Bash / WSL.
#   winget install Gyan.FFmpeg
#   winget install Google.libwebp   (or download libwebp and add to PATH)
#
# Usage:
#   bash scripts/optimize-assets.sh
#   # inspect public_optimized/, then:
#   # mv public public_original && mv public_optimized public
#
set -euo pipefail

SRC="public"
OUT="public_optimized"
rm -rf "$OUT"
cp -r "$SRC" "$OUT"

echo "==> Re-encoding videos (H.264 1080p, no audio, faststart)"
# Muted decorative loops don't need audio (-an) or >1080p. CRF 26 is a good
# quality/size balance; +faststart moves the moov atom to the front so the
# browser can start playback before the whole file downloads.
find "$OUT" -type f -name '*.mp4' | while read -r f; do
  tmp="${f%.mp4}.tmp.mp4"
  echo "    $f"
  ffmpeg -y -loglevel error -i "$f" \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libx264 -profile:v high -crf 26 -preset slow -movflags +faststart -an \
    "$tmp"
  mv "$tmp" "$f"
done

echo "==> Generating a WebM (VP9) sibling for each MP4 (optional 2nd <source>)"
find "$OUT" -type f -name '*.mp4' | while read -r f; do
  webm="${f%.mp4}.webm"
  ffmpeg -y -loglevel error -i "$f" \
    -c:v libvpx-vp9 -crf 34 -b:v 0 -an "$webm" || true
done

echo "==> Recompressing large PNG/JPG backgrounds to WebP (q72, max 1920px wide)"
# The Next.js image optimizer will still serve AVIF/WebP variants at runtime,
# but it ingests the ORIGINAL, so shrinking the source cuts build time, repo
# size, and the optimizer's memory use. Only touch files over ~500KB.
find "$OUT" -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) | while read -r f; do
  size=$(wc -c < "$f")
  if [ "$size" -gt 512000 ]; then
    webp="${f%.*}.webp"
    echo "    $f -> $webp"
    cwebp -quiet -q 72 -resize 1920 0 "$f" -o "$webp"
    # If you switch component src paths to .webp, delete the original:
    # rm "$f"
  fi
done

echo ""
echo "Done. Before/after:"
du -sh "$SRC" "$OUT"
echo ""
echo "Next steps:"
echo "  1. Review $OUT/ visually."
echo "  2. If you converted images to .webp, update the src paths in src/ to match."
echo "  3. Swap in:  mv public public_original && mv $OUT public"
echo "  4. Consider hosting the hero videos on a streaming CDN (Mux / Cloudflare"
echo "     Stream / Bunny) with HLS for adaptive bitrate on mobile — a 1080p MP4"
echo "     is still heavy on a phone."
