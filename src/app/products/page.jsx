import Link from "next/link";
import Image from "next/image";

// Products index — a real landing page for /products so the home hero CTA,
// footer, and header "Products" control all resolve to a page that lists the
// three systems and links through to each product detail route. Server
// Component: static content, no client JS.

export const metadata = {
  title: "Products",
  description:
    "Explore the HPS range of ballistic and tactical helmets — the Riot RH1.0, the Gladiator SWAT helmet, and the Lift Airborne AV2.2 aviation helmet.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | High Protection Systems",
    description:
      "Ballistic and tactical head-protection systems engineered for military, law enforcement, and aviation.",
    url: "/products",
  },
};

const products = [
  {
    name: "Riot Helmet 1.0",
    href: "/product/riot",
    image: "/helmet1.png",
    category: "Public Order",
    description:
      "High-end head protection for crowd-control, with a helmet-mask combination interface and F1-proven EPS.",
  },
  {
    name: "Gladiator",
    href: "/product/gladiator",
    image: "/helmet2.png",
    category: "Tactical / SWAT",
    description:
      "The newest generation of SWAT helmets — lightweight aramid sandwich shell, VPAM and NATO STANAG tested.",
  },
  {
    name: "Lift Airborne AV2.2",
    href: "/product/airborne",
    image: "/helmet3.png",
    category: "Aviation",
    description:
      "A Next Generation Fixed Wing Helmet: the lightest, most breathable design with unmatched protection.",
  },
];

const Page = () => {
  return (
    <main className="flex-1 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-8 md:py-36">
        <header className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#EF4123]">
            Our Products
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight md:text-6xl">
            Engineered protection, field-proven.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-neutral-300">
            Every HPS system carries motorsport-grade impact science into the
            field. Explore the range below.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.href}>
              <Link
                href={product.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
              >
                <span className="relative flex aspect-square items-center justify-center bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#EF4123]">
                    {product.category}
                  </span>
                  <span className="mt-2 text-xl font-medium">
                    {product.name}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                    {product.description}
                  </span>
                  <span className="mt-5 text-[13px] font-semibold uppercase tracking-tight text-white">
                    View system →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Page;
