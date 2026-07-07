import Link from "next/link";

const cards = [
  {
    category: "Ballistic Helmet",
    title: "Gladiator",
    description:
      "Full-cut ballistic shell engineered for frontline military and special forces operations.",
    stat: "IIIA",
    statLabel: "NIJ Rating",
    href: "/products/gladiator",
  },
  {
    category: "Tactical",
    title: "Riot Helmet 1.0",
    description:
      "Lightweight crowd-control protection with an integrated visor and modular padding.",
    stat: "1.4 kg",
    statLabel: "Total Weight",
    href: "/products/riot-helmet",
  },
  {
    category: "Airborne",
    title: "Lift Airborne AV2.2",
    description:
      "High-altitude jump helmet with 360° comms integration and rapid-release retention.",
    stat: "360°",
    statLabel: "Comms Ready",
    href: "/products/lift-airborne",
  },
  {
    category: "Optics",
    title: "Night Vision Shroud",
    description:
      "Universal NVG mount machined for stability under sustained recoil and movement.",
    stat: "NVG",
    statLabel: "Compatible",
    href: "/products/nvg-shroud",
  },
  {
    category: "Accessory",
    title: "Modular Rail System",
    description:
      "ARC rails for lights, cameras, and counterweights — tool-free reconfiguration.",
    stat: "MOLLE",
    statLabel: "Mount Ready",
    href: "/products/rail-system",
  },
  {
    category: "Protection",
    title: "Impact Liner Pro",
    description:
      "Multi-density foam liner tuned to disperse blunt-force and blast overpressure.",
    stat: "8 G",
    statLabel: "Impact Absorb",
    href: "/products/impact-liner",
  },
];

const Cards = () => {
  return (
    <section className="bg-black py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="max-w-xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#EF4123]">
            Featured Systems
          </span>
          <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
            Engineered protection, field-proven.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#EF4123]">
                  {card.category}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 -translate-x-1 text-neutral-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-medium">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                {card.description}
              </p>

              <div className="mt-6 border-t border-neutral-800 pt-4">
                <div className="text-lg font-medium">{card.stat}</div>
                <div className="text-[11px] uppercase tracking-wide text-neutral-500">
                  {card.statLabel}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
