import Image from "next/image";
import { getT } from "@/i18n/server";

// "High" — a centred statement section on black.
//
// A small HPS shield badge sits above one large, tightly-leaded headline. The
// sentence runs white until the closing clause, which turns brand-orange and
// ends with the ↗ arrow (orangeArrow.svg, already orange to match the text).
// Everything is centre-aligned in a narrow measure so the lines break like the
// design. The original hard <br>s were tuned to English word lengths, so the
// two clauses now wrap naturally within the measure instead.

const High = async ({ lang }) => {
  const t = await getT(lang);

  return (
    <section
      aria-label={t("high.ariaLabel")}
      className="bg-black px-6 py-24 text-white md:py-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* HPS shield badge */}
        <Image
          src="/shield.svg"
          alt="High Protection Systems"
          width={30}
          height={36}
          className="mb-8 h-9 w-auto"
        />

        {/* German compounds ("Aufruhrschutzausrüstung") are wider than a 390px
            phone's text column and, having nothing to break on, push the heading
            past the viewport. `hyphens-auto` gets real German hyphenation from
            the <html lang> the layout sets; `wrap-break-word` is the fallback for
            a word the hyphenation dictionary doesn't know. */}
        <h2 className="text-4xl font-medium leading-[1.05] tracking-tight hyphens-auto wrap-break-word sm:text-5xl md:text-6xl">
          {t("high.lead")}{" "}
          <span className="text-[#ff3b1f]">
            {t("high.accent")}
            <Image
              src="/orangeArrow.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden
              className="ms-1 inline-block h-[0.5em] w-[0.7em] align-baseline rtl:-scale-x-100"
            />
          </span>
        </h2>
      </div>
    </section>
  );
};

export default High;
