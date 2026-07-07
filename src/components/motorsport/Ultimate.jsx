"use client";

import Image from "next/image";

// "Built for ultimate protection" — a full-bleed hero-style section.
//
// A darkened, blurred photograph fills the viewport; a frosted-glass panel
// floats at the centre carrying the eyebrow row, a bracket-framed headline,
// the development-process copy, and a small "FAQ" jump field. Below the panel
// sit two feature blocks (Global Support / Certified Excellence), each a
// translucent card with an icon, a title, and a short description.
//
// Background reuses a /public photo as a stand-in — swap `BG_IMAGE`.

const BG_IMAGE = "/ultimeImg.jpg";

// Little colour strip under the copy — echoes the brand palette.
const swatches = [
  "#2f6bff",
  "#5b6470",
  "#9aa1a9",
  "#c9ccd1",
  "#EF4123",
  "#f6a04b",
  "#3b3f46",
];

const HeadsetIcon = ({ className = "" }) => (
  <Image
    src="/headSet.svg"
    alt="Headset Icon"
    width={20}
    height={20}
    className={className}
  />
);

const ShieldIcon = ({ className = "" }) => (
  <Image
    src="/certified.svg"
    alt="Shield Icon"
    width={20}
    height={20}
    className={className}
  />
);

const features = [
  {
    id: "global-support",
    title: "Global Support",
    Icon: HeadsetIcon,
    body: (
      <>
        HPS delivers worldwide to defense forces, law enforcement agencies, and
        authorized partners.{" "}
        <a
          href="#contact"
          className="font-medium text-[#EF4123] hover:underline"
        >
          Contact our team
        </a>{" "}
        for tailored logistics, volume orders, and mission-specific delivery
        solutions.
      </>
    ),
  },
  {
    id: "certified-excellence",
    title: "Certified Excellence",
    Icon: ShieldIcon,
    body: (
      <>
        All HPS helmets meet the highest international standards (NIJ, VPAM,
        EN397 and more). Backed by extensive testing and Racing Force
        Group&rsquo;s decades of safety innovation.
      </>
    ),
  },
];

const Ultimate = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-black text-white"
      aria-label="Built for ultimate protection"
    >
      {/* Background photo — darkened + blurred so the panel reads clearly. */}
      <Image
        src={BG_IMAGE}
        alt=""
        fill
        aria-hidden="true"
        className="object-cover"
        sizes="100vw"
      />
      {/* <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" /> */}

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-4 px-6 py-20 md:py-28">
        {/* Main glass panel */}
        <div className=" border border-white/10 bg-[#00000080] p-8 flex flex-col items-center justify-center backdrop-blur-md md:p-8">
          {/* Eyebrow row */}
          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4 text-[10px] font-medium uppercase tracking-[0.18em] ">
            <span className="text-[#EF4123] font-medium">HPS Gear</span>
            <span className="hidden sm:inline text-[#C7CAD1] ">
              Our Development Process
            </span>
            <span className="text-[#C7CAD1] ">Kingdom of Bahrain</span>
          </div>

          {/* Bracket-framed headline */}
          <div className="relative mt-8 inline-block   px-4 py-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-5 border-t-5 border-white"
            />
            <h2 className="text-center text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Built for ultimate
              <br />
              protection
            </h2>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-5 border-r-5 border-white"
            />
          </div>

          {/* Body copy */}
          <p className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-white">
            Our development process combines motorsport-proven engineering
            excellence with rigorous ballistic and tactical testing. Every HPS
            helmet is meticulously designed, tested, and refined to deliver
            uncompromising protection, comfort, and performance for the
            operators who need it most.
          </p>

          {/* FAQ button — white card with an up-right arrow */}
          <button
            type="button"
            className="mt-8 flex h-[60px] w-[161px] flex-col justify-between rounded-sm bg-white px-2 py-2 text-left text-black transition hover:bg-neutral-200"
          >
            <span className="self-end">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
            <span className="text-sm font-medium">FAQ</span>
          </button>

          {/* Swatch strip */}
          <div className="mx-auto mt-8 flex max-w-sm gap-1.5">
            {swatches.map((color, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Feature blocks */}
        {features.map(({ id, title, Icon, body }) => (
          <div
            key={id}
            className="border border-white/10 bg-[#00000080] p-6 backdrop-blur-md md:p-8"
          >
            {/* Icon on the left; heading + text stacked on the right */}
            <div className="flex gap-5">
              <span className="flex shrink-0 items-start pt-1">
                <Icon className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="border-b border-white/15 pb-5 text-3xl font-medium tracking-tight md:text-5xl">
                  {title}
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
                  {body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ultimate;
