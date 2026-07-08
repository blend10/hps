"use client";

import { useState } from "react";
import FullWidthRule from "@/components/general/FullWidthRule";
import Lines from "@/components/general/Lines";
import { useI18n } from "@/i18n/client";

// "Faq" — a two-column FAQ. Left: a bracketed title and a sticky category
// index (— CONTACT & PROCUREMENT highlights the active one). Right: the active
// category's heading and its questions as an accordion (+ opens, × closes).
//
// Fully data-driven: everything lives in the dictionary at `faq.categories`.
// Add a category or a Q&A pair to every locale file and both the left index and
// the right panel update with no layout change.

const Faq = () => {
  const { t } = useI18n();
  const categories = t("faq.categories");

  // Contact & Procurement is the category shown first, per the mock.
  const [activeCat, setActiveCat] = useState(categories.length - 1);
  const [openItem, setOpenItem] = useState(null);

  const category = categories[activeCat];

  const selectCategory = (i) => {
    setActiveCat(i);
    setOpenItem(null); // reset the accordion when switching category
  };

  return (
    <section className="bg-black text-white" aria-label={t("faq.ariaLabel")}>
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-40">
        <FullWidthRule />
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-[minmax(260px,360px)_1fr] lg:gap-x-11">
          {/* LEFT — bracketed title + sticky category index. */}
          <aside className="py-16 md:sticky md:top-32 md:self-start md:py-24">
            <div className="relative inline-block px-4 py-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute start-0 top-0 h-6 w-6 border-s-4 border-t-4 border-[#EF4123] md:h-8 md:w-8"
              />
              <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-[#EF4123] md:text-[52px]">
                <Lines lines={t("faq.heading")} />
              </h2>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 end-0 h-6 w-6 border-b-4 border-e-4 border-[#EF4123] md:h-8 md:w-8"
              />
            </div>

            {/* Category index. */}
            <nav aria-label={t("faq.categoriesLabel")} className="mt-10">
              <ul className="space-y-3">
                {categories.map((cat, i) => {
                  const isActive = i === activeCat;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => selectCategory(i)}
                        aria-current={isActive ? "true" : undefined}
                        className={`text-start text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
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

          {/* RIGHT — active category heading + accordion. The dashed left
              border only divides the two columns, so it appears from md up
              where the layout is actually two columns. */}
          <div className="min-w-0 pb-24 md:border-s md:border-dashed md:border-white/20 md:ps-12 lg:ps-16">
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
                        className="flex w-full items-center justify-between gap-6 py-5 text-start transition-colors hover:text-[#EF4123]"
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
                          <p className="pb-6 pe-4 text-[14px] leading-relaxed text-neutral-400 md:pe-10">
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
