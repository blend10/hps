import Image from "next/image";
import Lines from "@/components/general/Lines";
import { getT } from "@/i18n/server";

// "Frontline" — a split hero on black. The copy (heading, intro, three feature
// rows) sits on the LEFT inside the normal max-w container; the soldier photo
// (rightImage.jpg) bleeds OUTSIDE the container to the right screen edge, full
// height, behind/beside the text.
//
// The heading is wrapped in corner brackets (top-left + bottom-right) drawn with
// short border segments, echoing the design's ┌ ┐ marks.
//
// The three features are data-driven from the dictionary (`frontline.features`);
// each entry's `id` selects its icon here. Icons (white on black) live in
// /public as shock/bullet/operational.svg.

const featureIcons = {
  shock: "/shock.svg",
  bullet: "/bullet.svg",
  operational: "/operational.svg",
};

const Frontline = async ({ lang }) => {
  const t = await getT(lang);
  const features = t("frontline.features");

  return (
    <section
      aria-label={t("frontline.ariaLabel")}
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Right image — bleeds outside the container to the right screen edge,
          full height. Absolutely positioned so the text column keeps the normal
          max-w flow while the photo escapes it. Hidden on small screens where
          there's no room beside the copy. Under RTL the whole composition
          mirrors: the photo moves to the left edge and its gradient and its own
          horizontal flip follow. */}
      <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[55%] lg:block">
        {/* No `priority`: this image is below the fold, so eager-loading it
            would compete for bandwidth with the true above-the-fold LCP. It
            lazy-loads by default. */}
        <Image
          src="/rightImage.jpg"
          alt={t("frontline.imageAlt")}
          fill
          loading="lazy"
          className="object-contain object-left transform-[scaleX(-1.15)_scaleY(1.15)] rtl:object-right rtl:transform-[scaleX(1.15)_scaleY(1.15)]"
          sizes="55vw"
        />
        {/* Fade the photo's inner edge into the black background so it blends
            with the copy column instead of showing a hard seam. */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent rtl:bg-linear-to-l" />
      </div>

      {/* Copy — inside the container, occupying roughly the left half. */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="max-w-xl">
          {/* Heading with corner brackets (top-left + bottom-right). */}
          <div className="relative inline-block px-3 py-2">
            <span className="absolute start-0 top-0 h-5 w-5 border-s-2 border-t-2 border-white" />
            <span className="absolute bottom-0 end-0 h-5 w-5 border-b-2 border-e-2 border-white" />
            <h2 className="text-4xl font-medium leading-[0.95] tracking-tight md:text-5xl">
              <Lines lines={t("frontline.heading")} />
            </h2>
          </div>

          <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-300">
            {t("frontline.intro")}
          </p>

          <div className="mt-8 h-px w-full max-w-md bg-white/15" />

          {/* Feature rows */}
          <ul className="mt-10 flex flex-col gap-9">
            {features.map((feature) => (
              <li key={feature.id} className="max-w-md">
                <div className="flex items-center gap-3">
                  <Image
                    src={featureIcons[feature.id]}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="h-6 w-6 object-contain"
                  />
                  <h3 className="text-xl font-medium tracking-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-3 ps-9 text-sm leading-relaxed text-neutral-400">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Frontline;
