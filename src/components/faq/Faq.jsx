"use client";

import { useState } from "react";

// "Faq" — a two-column FAQ. Left: a bracketed title and a sticky category
// index (— CONTACT & PROCUREMENT highlights the active one). Right: the active
// category's heading and its questions as an accordion (+ opens, × closes).
//
// Fully data-driven: everything lives in FAQ_CATEGORIES. Add a category or a
// Q&A pair and both the left index and the right panel update with no layout
// change.
const FullWidthRule = () => (
  <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-white/20" />
);
export const FAQ_CATEGORIES = [
  {
    id: "about",
    nav: "About HPS",
    heading: "About HPS",
    items: [
      {
        q: "Who is High Protection Systems?",
        a: "HPS designs and manufactures advanced head-protection systems, applying motorsport-grade engineering and material science to protective equipment for defence, law enforcement and aviation.",
      },
      {
        q: "Where are HPS products made?",
        a: "Every product is designed, tested and manufactured in-house at our facility within the Racing Force Group manufacturing campus, giving us complete control over quality at every stage.",
      },
      {
        q: "What makes HPS different?",
        a: "Our heritage is motorsport — the harshest laboratory on earth. The impact-absorption science and human-fit engineering developed there is carried into every helmet and system we build.",
      },
    ],
  },
  {
    id: "products",
    nav: "Our Products",
    heading: "Our Products",
    items: [
      {
        q: "What product ranges does HPS offer?",
        a: "Our range spans riot and public-order protection, tactical SWAT helmets, and next-generation airborne aviation helmets — each engineered for its mission environment.",
      },
      {
        q: "Can products be customised?",
        a: "Yes. Colours, liners, visors and accessory mounting can be configured to your operational requirements. Contact us to discuss a specification.",
      },
      {
        q: "Do products meet recognised standards?",
        a: "Our systems are developed and tested against the relevant technical guidelines and standards for each category, including VPAM, NATO STANAG and MIL-STD ratings where applicable.",
      },
    ],
  },
  {
    id: "technology",
    nav: "Our Technology",
    heading: "Our Technology",
    items: [
      {
        q: "What materials do HPS helmets use?",
        a: "Depending on the product, shells use lightweight aramid sandwich construction or prepreg carbon fibre with 100% epoxy resin, paired with Koroyd/EPS impact liners for optimised protection-to-weight.",
      },
      {
        q: "How is comfort engineered?",
        a: "Exchangeable, moisture-wicking comfort liners in multiple thicknesses, rotary-dial fit systems and occipital support are used to customise fit for long-duration wear.",
      },
    ],
  },
  {
    id: "certifications",
    nav: "Certifications & Standards",
    heading: "Certifications & Standards",
    items: [
      {
        q: "Which certifications do HPS products hold?",
        a: "Certification varies by product line and is aligned to the applicable technical guidelines and ballistic/impact standards. We can provide the relevant documentation on request.",
      },
      {
        q: "Can you provide test reports?",
        a: "Yes — test reports and compliance documentation are available to qualified buyers as part of a procurement enquiry.",
      },
    ],
  },
  {
    id: "contact",
    nav: "Contact & Procurement",
    heading: "Contact & Procurement",
    items: [
      {
        q: "How do I contact HPS?",
        a: "You can reach our team through the contact page. For procurement and technical enquiries, include your organisation and requirement details so we can route you to the right specialist.",
      },
      {
        q: "How do I procure HPS products?",
        a: "Procurement is handled directly with our sales team. Get in touch with your requirement and we'll guide you through specification, quotation and lead times.",
      },
      {
        q: "Does HPS offer product demonstrations?",
        a: "Yes. Demonstrations and evaluation units can be arranged for qualified organisations. Contact us to schedule a session.",
      },
      {
        q: "What information should I include in a procurement enquiry?",
        a: "Please include your organisation, the product range of interest, approximate quantities, required standards or certifications, and your target timeline.",
      },
      {
        q: "Does HPS attend defence exhibitions?",
        a: "HPS attends selected defence and law-enforcement exhibitions through the year. Reach out to find out where you can meet us next.",
      },
      {
        q: "Can HPS support urgent operational requirements?",
        a: "Where possible, yes. Flag the urgency in your enquiry and we'll do our best to prioritise and advise on the fastest available route.",
      },
    ],
  },
];

const Faq = () => {
  const [activeCat, setActiveCat] = useState(FAQ_CATEGORIES.length - 1); // Contact & Procurement, per the mock
  const [openItem, setOpenItem] = useState(null);

  const category = FAQ_CATEGORIES[activeCat];

  const selectCategory = (i) => {
    setActiveCat(i);
    setOpenItem(null); // reset the accordion when switching category
  };

  return (
    <section
      className="bg-black text-white"
      aria-label="Frequently asked questions "
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-40">
        <FullWidthRule />
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-[minmax(260px,360px)_1fr] lg:gap-x-11">
          {/* LEFT — bracketed title + sticky category index. */}
          <aside className="py-16 md:sticky md:top-32 md:self-start md:py-24">
            <div className="relative inline-block px-4 py-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-4 border-t-4 border-[#EF4123] md:h-8 md:w-8"
              />
              <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-[#EF4123] md:text-[52px]">
                Frequently
                <br />
                Asked
                <br />
                Qestions
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-[#EF4123] md:h-8 md:w-8"
              />
            </div>

            {/* Category index. */}
            <nav aria-label="FAQ categories" className="mt-10">
              <ul className="space-y-3">
                {FAQ_CATEGORIES.map((cat, i) => {
                  const isActive = i === activeCat;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => selectCategory(i)}
                        aria-current={isActive ? "true" : undefined}
                        className={`text-left text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                          isActive
                            ? "text-[#EF4123]"
                            : "text-neutral-500 hover:text-neutral-300"
                        }`}
                      >
                        {isActive ? `— ${cat.nav}` : cat.nav}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* RIGHT — active category heading + accordion. */}
          <div className="min-w-0 border-l border-dashed border-white/20 pb-24 pl-0 md:pl-12 lg:pl-16">
            <div className="py-16 md:py-24">
              <h3 className="border-b border-white/20 pb-6 text-3xl font-medium tracking-tight md:text-4xl">
                {category.heading}
              </h3>

              <ul>
                {category.items.map((item, i) => {
                  const isOpen = openItem === i;
                  return (
                    <li key={i} className="border-b border-white/20">
                      <button
                        type="button"
                        onClick={() => setOpenItem(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[#EF4123]"
                      >
                        <span className="text-[15px] tracking-tight md:text-base">
                          {item.q}
                        </span>
                        {/* + / × toggle. */}
                        <span
                          aria-hidden="true"
                          className={`shrink-0 text-xl leading-none text-neutral-400 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {/* Answer — grid-rows trick animates height from 0 → auto. */}
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-6 pr-10 text-[14px] leading-relaxed text-neutral-400">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
