"use client";

import Image from "next/image";
import Link from "next/link";

// "ProductDetails" — the long-form spec section that sits under the
// ProductShowcase hero on each product page. Same data-driven logic as
// ProductShowcase: the layout is fixed and only the copy + images change,
// driven by PRODUCT_DETAILS keyed by product id. A page renders the right one
// with <ProductDetails product="riot" />.
//
// Design (matches the HPS product mock): a black canvas with orange (#EF4123)
// accents and dashed dividers, stacked into four sections:
//   1. Bracketed product name + a long centered description.
//   2. IN THE BOX — an orange label over a row of contents.
//   3. ACCESSORIES — a row of white thumbnail cards with captions, an
//      "upon request" note and a CONTACT US button.
//   4. KEY FEATURES — an orange label over a bulleted feature list.
//
// Accessory images live in /public. None ship yet; drop them in with the
// numbered names referenced below (/riot-acc1.png … /airborne-acc6.png) and
// the cards light up with no code change.

export const PRODUCT_DETAILS = {
  riot: {
    name: "Riot",
    description:
      "The RH1.0 is a high-end head protection for crowd control application. The interfaces on both sides enable the use as helmet-mask-combination while the use of tear gas. The lightweight aramid sandwich shell combined with F1 proven EPS features excellent shock and stab protection. Flame resistant coating and inherent flame-retardant textile materials protect against the Molotov cocktail threat. The RH1.0 is the newest helmet developed according to the generation of Riot-helmets according to the Technical Guideline (TR) for a Modular System “Protective Helmet, Communication System, Respirator Mask” of February 2011 German Police University (DHPol/Police Technical Institute-PTI).",
    inTheBox: ["RH 1.0 incl. Visor", "Draw String Helmet Bag", "Manual Book."],
    accessories: [
      { name: "Lorem Ipsum", image: "/acc1.jpg" },
      { name: "Lorem Ipsum", image: "/acc2.jpg" },
      { name: "Neck Protector", image: "/acc3.jpg" },
      { name: "Helmet Bag", image: "/acc4.jpg" },
      { name: "Lorem Ipsum", image: "/acc5.jpg" },
      { name: "Lorem Ipsum", image: "/acc6.jpg" },
    ],
    keyFeatures: [
      "Lightweight aramid sandwich shell with FR coating for optimized shock and stab protection.",
      "3 shell sizes for lowest possible weight.",
      "Exchangeable anti-bacterial finished, inherent flame-retardant Nomex®-Lycra lining for highest comfort.",
      "Inherent flame-resistant Nomex® 3-point chinstrap with FR micro-lock ratchet fastener and emergency opening.",
      "Clear injection molded visor with F1 proven anti-fog (inside) and anti-scratch (outside) technology.",
      "Special visor fixing for tool free visor exchange.",
      "Aramid stab protection neck protector with flame-retardant PU-coated aramid cover, integrated D-ring for wearing on the tactical equipment.",
      "Color (FR): White, Black blue, Black other colors upon request.",
    ],
  },
  gladiator: {
    name: "Gladiator",
    description:
      "Based on the innovative HPS design and featuring a lightweight aramid sandwich shell, developed and tested using the latest scientific knowledge, the GLADIATOR is the newest generation of SWAT-helmets according to the Technical Guideline (TR) “Ballistic helmet” overall system of May 2010 German Police University (DHPol/Police Technical Institute-PTI), VPAM: HVN 2009 “Test Guideline Bullet-resistant helmet with visor and neck guard” of April 04, 2017 and NATO STANDARD (STANAG) AEP-2920. GLADIATOR is a new benchmark for safety, reduced weight, optimized balance and comfort",
    inTheBox: [
      "GLADIATOR incl. Visor",
      "Draw String Helmet Bag",
      "Manual Book.",
    ],
    accessories: [
      { name: "Lorem Ipsum", image: "/acc1.jpg" },
      { name: "Lorem Ipsum", image: "/acc2.jpg" },
      { name: "Neck Protector", image: "/acc3.jpg" },
      { name: "Helmet Bag", image: "/acc4.jpg" },
      { name: "Lorem Ipsum", image: "/acc5.jpg" },
      { name: "Lorem Ipsum", image: "/acc6.jpg" },
    ],
    keyFeatures: [
      "Lightweight aramid sandwich shell for VPAM 3 protection with minimum trauma.",
      "2 shell sizes for lowest possible weight.",
      "New designed NVG shroud.",
      "Liner with quick size adjustment.",
      "Inherent flame-resistant Nomex® chinstrap with F1 double D-ring fastener and proven emergency opening system.",
      "Optimized ballistic visor with new designed visor pivoting system for best balance (4 visor positions).",
      "Visor with F1 proven anti-fog (inside) and anti-scratch (outside) technology.",
      "Visor Quick Exchange System.",
      "Metallic Picatinny rails for accessory mounting.",
      "Compatible and tested with CBRN masks and headsets in SWAT use.",
      "Color (FR): Black, Blackblue, Browngrey, other colors upon request.",
    ],
  },
  airborne: {
    name: "Lift Airborne AV2.2",
    description:
      "The Lift Airborne AV2.2 is a Next Generation Fixed Wing Helmet (NGFWH), setting a new standard  as the lightest, most comfortable, and breathable design, while providing unmatched superior protection in helmet history. Developed by LIFT Airborne Technologies, this helmet delivers unmatched strength, modularity, and pilot-centered functionality in high-performance aviation environments. With a focus on breathability, stability, and ergonomic design, the AV2.2 combines intelligent airflow systems, quick-adjust fit mechanisms, and innovative materials to support mission-critical performance. It’s engineered to exceed current standards for fixed-wing aircraft helmets, while offering compatibility with a variety of mission setups and tactical systems.Designed for airborne forces, combat aviators, and special operations pilots, the AV2.2 supports extended missions with lightweight comfort, moisture control, and seamless modular integrations — including NVG, JHMCS, and dual-visor configurations.",
    inTheBox: ["RH 1.0 incl. Visor ", "Draw String Helmet Bag", "Manual Book."],
    accessories: [
      { name: "Lorem Ipsum", image: "/acc1.jpg" },
      { name: "Lorem Ipsum", image: "/acc2.jpg" },
      { name: "Neck Protector", image: "/acc3.jpg" },
      { name: "Helmet Bag", image: "/acc4.jpg" },
      { name: "Lorem Ipsum", image: "/acc5.jpg" },
      { name: "Lorem Ipsum", image: "/acc6.jpg" },
    ],
    keyFeatures: [
      "Shell Construction: Built with prepreg carbon fiber and 100% epoxy resin (chemically inert) for durability, impact performance, and ultra-lightweight strength. The shell design improves balance, stability, and field of vision, with a high-cut rear to accommodate life preservers.",
      "Impact Protection: Features a Koroyd and EPS frame liner, combining exceptional impact resistance with airflow-enhancing cooling properties.",
      "Comfort Liner: Includes Drifire moisture-wicking fabric and open-cell foam, available in multiple thicknesses to customize fit and comfort for long-duration missions.",
      "Innovative Fit System: Equipped with a rotary dial fit knob, enhanced nape pads, and occipital support basket for superior helmet stability and adjustment during flight.",
      "Chinstrap Assembly: Magnetic aramid/nylon strap with a high-strength buckle rated to 438 lbs of force — designed for fast application and maximum retention.",
      "Rotatable Bayonet Receivers: Offers up to 45° of tool-free adjustment per side for adaptable, drill-free customization.",
      "Dual Visor System: Includes a MIL-STD-rated visor (600 KEAS) and a secondary magnetic visor in multiple tints for mission-specific needs.",
      "Modular Configuration: Seamless compatibility with multiple setups Slick, Slick with NVG, JHMCS, and JHMCS + NV, all without requiring additional helmet modification.",
    ],
  },
};

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

// A dashed horizontal rule that breaks out of the centered content container to
// span the full page width. It lives inside the max-w container but stretches
// to 100vw via a centered full-viewport-width box.
const FullWidthRule = () => (
  <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-white/20" />
);

const ProductDetails = ({ product = "riot" }) => {
  const data = PRODUCT_DETAILS[product] ?? PRODUCT_DETAILS.riot;

  return (
    <section
      className="relative w-full overflow-x-clip bg-black text-white"
      aria-label={`${data.name} details`}
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* 1 — Bracketed name + description */}
        <div className="flex flex-col border-l border-r border-dashed border-white/20 items-center pt-20 pb-14 text-center md:pt-24">
          <div className="relative inline-block px-5 py-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-4 border-t-4 border-[#EF4123] md:h-9 md:w-9"
            />
            <h2 className="text-5xl font-medium tracking-tight md:text-[100px]">
              {data.name}
            </h2>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-7 w-7 border-b-4 border-r-4 border-[#EF4123] md:h-9 md:w-9"
            />
          </div>

          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-white">
            {data.description}
          </p>
        </div>

        <FullWidthRule />

        {/* 2 — IN THE BOX */}
        <div className="py-12 text-center border-l border-r border-dashed border-white/20">
          <SectionLabel>In the Box</SectionLabel>
          <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.inTheBox.map((item) => (
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
        <div className="py-12 text-center border-l border-r border-dashed border-white/20 px-12">
          <SectionLabel>Accessories</SectionLabel>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {data.accessories.map((acc, i) => (
              <li
                key={`${acc.name}-${i}`}
                className="flex flex-col items-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-white">
                  <Image
                    src={acc.image}
                    alt={acc.name}
                    fill
                    className="object-contain p-3"
                    sizes="(min-width: 768px) 15vw, 30vw"
                  />
                </div>
                <span className="mt-2.5 text-[14px] text-white">
                  {acc.name}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[20px] font-medium text-white">
            For other accessories upon request{" "}
            <span className="text-[#EF4123]">*</span>
          </p>

          <div className="mt-5 flex justify-center">
            <Link
              href="/contact"
              className="rounded-sm bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-tight text-[#EF4123] transition-colors hover:bg-neutral-100"
            >
              Contact us
            </Link>
          </div>
        </div>
        <FullWidthRule />

        {/* 4 — KEY FEATURES — breaks out of the max-w-4xl wrapper to use the
            wider `container` width. left-1/2 + w-screen + -translate-x-1/2
            centers a full-viewport-width band; the inner mx-auto container then
            constrains the content to container width. */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 py-12">
          <div className="mx-auto container px-6 md:px-8">
            <SectionLabel>Key Features</SectionLabel>
            <ul className="mt-6 space-y-2.5">
              {data.keyFeatures.map((feature, i) => {
                // Features written as "Label: description" render the label in
                // bold; plain one-line features (no colon) render as-is.
                const split = feature.indexOf(":");
                const label = split > -1 ? feature.slice(0, split) : null;
                const rest = split > -1 ? feature.slice(split + 1).trim() : feature;
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
