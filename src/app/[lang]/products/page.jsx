import Link from "next/link";
import Image from "next/image";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

// Products index — a real landing page for /products so the home hero CTA,
// footer, and header "Products" control all resolve to a page that lists the
// three systems and links through to each product detail route. Server
// Component: static content, no client JS.
//
// Copy lives in the dictionary at `products.items`; the route + image per card
// are keyed off each item's `id`.

const PRODUCT_MEDIA = {
  riot: { href: "/product/riot", image: "/helmet1.png" },
  gladiator: { href: "/product/gladiator", image: "/helmet2.png" },
  airborne: { href: "/product/airborne", image: "/helmet3.png" },
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getT(lang);
  const title = t("metadata.products.title");
  return {
    title,
    description: t("metadata.products.description"),
    alternates: alternatesFor(lang, "/products"),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: t("metadata.products.ogDescription"),
      url: localeHref(lang, "/products"),
    },
  };
}

const Page = async ({ params }) => {
  const { lang } = await params;
  const t = await getT(lang);
  const products = t("products.items");

  return (
    <main className="flex-1 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-50 md:px-8 md:pb-36 md:pt-50">
        <header className="w-full text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#EF4123]">
            {t("products.eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight md:text-6xl">
            {t("products.heading")}
          </h1>
          <p className="mt-5  leading-relaxed text-neutral-300">
            {t("products.intro")}
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const media = PRODUCT_MEDIA[product.id];
            return (
              <li key={product.id}>
                <Link
                  href={localeHref(lang, media.href)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
                >
                  <span className="relative flex aspect-square items-center justify-center bg-white">
                    <Image
                      src={media.image}
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
                      {t("products.viewSystem")}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Page;
