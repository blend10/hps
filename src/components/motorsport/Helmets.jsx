import Image from "next/image";
import Link from "next/link";

// "Helmets" — a three-up product showcase on black.
//
// Server Component: the hover crossfade and corner-bracket reveal are pure
// Tailwind group-hover/group-focus-visible CSS, so no client JS is needed.
// This section renders on nearly every route, so keeping it server-only avoids
// shipping/hydrating a dead client chunk site-wide.
//
// A horizontal strip of three helmets, each in its own cell separated by
// dashed vertical rules. Under each helmet sits a dashed baseline and a
// bracketed, letter-spaced product name (— RIOT —).
//
// Each column is a single link: hovering crossfades to an alternate render
// (`hoverImage`) and highlights the label orange; clicking navigates to that
// product's page (`href`). The whole cell — image and label — is one target.
//
// Images live in /public. `image` ships today (helmet1–3.png); `hoverImage`
// is optional — drop the alternate renders in with the referenced names and
// the crossfade lights up, otherwise the base image simply stays put.

const helmets = [
  {
    id: "riot",
    name: "Riot",
    href: "/product/riot",
    image: "/helmet1.png",
    hoverImage: "/riotHover.png",
  },
  {
    id: "gladiator",
    name: "Gladiator",
    href: "/product/gladiator",
    image: "/helmet2.png",
    hoverImage: "/gladiatorHover.png",
  },
  {
    id: "airborne",
    name: "Lift Airborne AV2.2",
    href: "/product/airborne",
    image: "/helmet3.png",
    hoverImage: "/airbroneHover.png",
  },
];

const Helmets = () => {
  return (
    <section
      className="relative border-t  border-white/40 border-dashed bg-black text-white"
      aria-label="Helmets"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {helmets.map((helmet, i) => (
            <li
              key={helmet.id}
              className={i > 0 ? "border-none sm:border-t-0 sm:border-l  " : ""}
            >
              {/* The whole column (image + label) is one hover/click target. */}
              <Link
                href={helmet.href}
                aria-label={helmet.name}
                className="group flex h-full flex-col border-l border-r border-dashed border-white/40"
              >
                <div className="flex flex-1 items-center justify-center px-8 py-14 md:py-20">
                  <div className="relative aspect-square w-full max-w-65">
                    {/* Corner brackets — a camera-focus reticle framing the
                        helmet. Hidden until the cell is hovered or keyboard
                        focused, then fades in. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-4 -top-4 h-7 w-7 border-l-2 border-t-2 border-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:-left-6 md:-top-6 md:h-9 md:w-9"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-4 -right-4 h-7 w-7 border-b-2 border-r-2 border-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:-bottom-6 md:-right-6 md:h-9 md:w-9"
                    />

                    {/* Base render — fades out on hover. */}
                    <Image
                      src={helmet.image}
                      alt={helmet.name}
                      fill
                      className="object-contain transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-0"
                      sizes="(min-width: 640px) 30vw, 80vw"
                    />
                    {/* Alternate render — fades in on hover. Falls back to the
                        base image so nothing goes blank before you add it. */}
                    <Image
                      src={helmet.hoverImage ?? helmet.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      className="object-contain opacity-0 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
                      sizes="(min-width: 640px) 30vw, 80vw"
                    />
                  </div>
                </div>

                {/* Label — turns orange on hover. */}
                <div className="border-t border-dashed border-white/40 py-5 text-center">
                  <span className="text-[16px] font-medium uppercase tracking-tight text-neutral-300 transition-colors duration-300 group-hover:text-[#EF4123]">
                    &mdash; {helmet.name} &mdash;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-bleed baseline so the bottom dashed rule runs edge-to-edge. */}
      <div className="border-b border-dashed border-white/40" />
    </section>
  );
};

export default Helmets;
