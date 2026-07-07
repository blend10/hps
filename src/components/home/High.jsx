import Image from "next/image";

// "High" — a centred statement section on black.
//
// A small HPS shield badge sits above one large, tightly-leaded headline. The
// sentence runs white until the closing clause, which turns brand-orange and
// ends with the ↗ arrow (orangeArrow.svg, already orange to match the text).
// Everything is centre-aligned in a narrow measure so the lines break like the
// design.

const High = () => {
  return (
    <section
      aria-label="About High Protection Systems"
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

        <h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          High Protection <br /> Systems develops advanced ballistic and riot
          protection equipment{" "}
          <span className="text-[#ff3b1f]">
            engineered for the <br /> most extreme conditions
            <Image
              src="/orangeArrow.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden
              className="ml-1 inline-block h-[0.5em] w-[0.7em] align-baseline"
            />
          </span>
        </h2>
      </div>
    </section>
  );
};

export default High;
