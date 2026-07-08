import Image from "next/image";
import Link from "next/link";
import FullWidthRule from "@/components/general/FullWidthRule";
import { getT } from "@/i18n/server";
import { localeHref } from "@/i18n/config";

// Server Component: this is a pure data-to-markup renderer over the dictionary —
// no state, effects, or handlers — so it ships zero client JS.
//
// "ProductDetails" — the long-form spec section that sits under the
// ProductShowcase hero on each product page. Same data-driven logic as
// ProductShowcase: the layout is fixed and only the copy + images change. Copy
// lives in the dictionary at `productDetails.products.<id>`; a page renders the
// right one with <ProductDetails product="riot" lang={lang} />.
//
// Design (matches the HPS product mock): a black canvas with orange (#EF4123)
// accents and dashed dividers, stacked into four sections:
//   1. Bracketed product name + a long centered description.
//   2. IN THE BOX — an orange label over a row of contents.
//   3. ACCESSORIES — a row of white thumbnail cards with captions, an
//      "upon request" note and a CONTACT US button.
//   4. KEY FEATURES — an orange label over a bulleted feature list.

// The accessory strip is identical across products: same six images, same
// captions. `nameKey` resolves against `productDetails.accessoryNames`.
const ACCESSORIES = [
  { image: "/acc1.jpg", nameKey: "placeholder" },
  { image: "/acc2.jpg", nameKey: "placeholder" },
  { image: "/acc3.jpg", nameKey: "neckProtector" },
  { image: "/acc4.jpg", nameKey: "helmetBag" },
  { image: "/acc5.jpg", nameKey: "placeholder" },
  { image: "/acc6.jpg", nameKey: "placeholder" },
];

const PRODUCT_IDS = new Set(["riot", "gladiator", "airborne"]);

// Orange section label used above IN THE BOX / ACCESSORIES / KEY FEATURES.
const SectionLabel = ({
  children,
  className = "tracking-tight text-[20px] font-normal",
}) => (
  <span
    className={`text-[13px] font-semibold uppercase tracking-[0.15em] text-[#EF4123] ${className}`}
  >
    {children}
  </span>
);

const ProductDetails = async ({ product = "riot", lang }) => {
  const t = await getT(lang);
  const key = PRODUCT_IDS.has(product) ? product : "riot";

  const name = t(`productDetails.products.${key}.name`);
  const description = t(`productDetails.products.${key}.description`);
  const inTheBox = t(`productDetails.products.${key}.inTheBox`);
  const keyFeatures = t(`productDetails.products.${key}.keyFeatures`);

  return (
    <section
      className="relative w-full overflow-x-clip bg-black text-white"
      aria-label={t("productDetails.detailsAria").replace("{name}", name)}
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* 1 — Bracketed name + description */}
        <div className="flex flex-col border-s border-e border-dashed border-white/20 items-center pt-20 pb-14 text-center md:pt-24">
          <div className="relative inline-block px-5 py-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute start-0 top-0 h-7 w-7 border-s-4 border-t-4 border-[#EF4123] md:h-9 md:w-9"
            />
            <h2 className="text-5xl font-medium tracking-tight md:text-[100px]">
              {name}
            </h2>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 end-0 h-7 w-7 border-b-4 border-e-4 border-[#EF4123] md:h-9 md:w-9"
            />
          </div>

          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-white">
            {description}
          </p>
        </div>

        <FullWidthRule />

        {/* 2 — IN THE BOX */}
        <div className="py-12 text-center border-s border-e border-dashed border-white/20">
          <SectionLabel>{t("productDetails.inTheBox")}</SectionLabel>
          <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {inTheBox.map((item) => (
              <li
                key={item}
                className="text-[20px] font-medium tracking-tight text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <FullWidthRule />

        {/* 3 — ACCESSORIES */}
        <div className="py-12 text-center border-s border-e border-dashed border-white/20 px-12">
          <SectionLabel>{t("productDetails.accessories")}</SectionLabel>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {ACCESSORIES.map((acc, i) => {
              const accName = t(`productDetails.accessoryNames.${acc.nameKey}`);
              return (
                <li
                  key={`${acc.image}-${i}`}
                  className="flex flex-col items-center"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-md bg-white">
                    <Image
                      src={acc.image}
                      alt={accName}
                      fill
                      className="object-contain p-3"
                      sizes="(min-width: 768px) 15vw, 30vw"
                    />
                  </div>
                  <span className="mt-2.5 text-[14px] text-white">
                    {accName}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-[20px] font-medium text-white">
            {t("productDetails.uponRequest")}{" "}
            <span className="text-[#EF4123]">*</span>
          </p>

          <div className="mt-5 flex justify-center">
            <Link
              href={localeHref(lang, "/contact")}
              className="rounded-sm bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-tight text-[#EF4123] transition-colors hover:bg-neutral-100"
            >
              {t("common.contactUs")}
            </Link>
          </div>
        </div>
        <FullWidthRule />

        {/* 4 — KEY FEATURES — breaks out of the max-w-4xl wrapper to use the
            wider `container` width: a full-viewport-width band whose inner
            mx-auto container then constrains the content. Uses the same
            direction-safe negative inline-start margin as FullWidthRule — the
            `left-1/2 … -translate-x-1/2` idiom this replaced only centres under
            LTR (see the note in FullWidthRule.jsx). */}
        <div className="ms-[calc(50%-50vw)] w-screen py-12">
          <div className="mx-auto container px-6 md:px-8">
            <SectionLabel>{t("productDetails.keyFeatures")}</SectionLabel>
            <ul className="mt-6 space-y-2.5">
              {keyFeatures.map((feature, i) => {
                // Features written as "Label: description" render the label in
                // bold; plain one-line features (no colon) render as-is. Arabic
                // uses the same ASCII colon in the dictionary, so one split works
                // for every locale.
                const split = feature.indexOf(":");
                const label = split > -1 ? feature.slice(0, split) : null;
                const rest =
                  split > -1 ? feature.slice(split + 1).trim() : feature;
                return (
                  <li
                    key={i}
                    className="flex gap-2.5 text-[16px] leading-relaxed text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500"
                    />
                    <span>
                      {label && (
                        <span className="font-semibold">{label}: </span>
                      )}
                      {rest}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
