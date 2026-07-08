import { siteConfig } from "@/lib/site";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";

// Per-product SEO plumbing — drives both each page's `generateMetadata` and its
// Product JSON-LD. The copy itself lives in the dictionary under
// `metadata.product.<id>`; only the route + image (which never localise) are
// held here.

export const PRODUCT_SEO = {
  riot: { path: "/product/riot", image: "/helmet1.png" },
  gladiator: { path: "/product/gladiator", image: "/helmet2.png" },
  airborne: { path: "/product/airborne", image: "/helmet3.png" },
};

export async function productMetadata(id, lang) {
  const p = PRODUCT_SEO[id];
  if (!p) return {};

  const t = await getT(lang);
  const name = t(`metadata.product.${id}.name`);
  const description = t(`metadata.product.${id}.description`);

  return {
    title: name,
    description,
    alternates: alternatesFor(lang, p.path),
    openGraph: {
      type: "website",
      title: `${name} | ${siteConfig.name}`,
      description,
      url: localeHref(lang, p.path),
      images: [{ url: p.image, width: 1200, height: 630, alt: name }],
    },
  };
}

export async function productJsonLd(id, lang) {
  const p = PRODUCT_SEO[id];
  if (!p) return null;

  const t = await getT(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t(`metadata.product.${id}.name`),
    category: t(`metadata.product.${id}.category`),
    image: `${siteConfig.url}${p.image}`,
    description: t(`metadata.product.${id}.description`),
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: {
      "@type": "Organization",
      name: "High Protection Systems SA",
    },
    url: `${siteConfig.url}${localeHref(lang, p.path)}`,
  };
}
