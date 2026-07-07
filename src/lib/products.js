import { siteConfig } from "@/lib/site";

// Per-product SEO data — drives both the page `metadata` export and the
// Product JSON-LD. Kept separate from the presentational PRODUCTS/PRODUCT_DETAILS
// maps in the showcase components so metadata can be generated on the server
// without pulling in client component code.
export const PRODUCT_SEO = {
  riot: {
    name: "Riot Helmet 1.0 (RH1.0)",
    category: "Riot / Public Order Helmet",
    path: "/product/riot",
    image: "/helmet1.png",
    description:
      "The RH1.0 is a high-end head protection for crowd-control applications, with a helmet-mask combination interface and F1-proven EPS for excellent shock and stab protection.",
  },
  gladiator: {
    name: "Gladiator SWAT Helmet",
    category: "Ballistic / Tactical Helmet",
    path: "/product/gladiator",
    image: "/helmet2.png",
    description:
      "The newest generation of SWAT helmets — a lightweight aramid sandwich shell tested to VPAM HVN 2009 and NATO STANAG AEP-2920, with optimised balance and comfort.",
  },
  airborne: {
    name: "Lift Airborne AV2.2",
    category: "Aviation Helmet",
    path: "/product/airborne",
    image: "/helmet3.png",
    description:
      "A Next Generation Fixed Wing Helmet (NGFWH): the lightest, most breathable design with a prepreg carbon-fibre shell, Koroyd/EPS impact liner, and modular NVG/JHMCS integration.",
  },
};

export function productMetadata(id) {
  const p = PRODUCT_SEO[id];
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: "website",
      title: `${p.name} | ${siteConfig.name}`,
      description: p.description,
      url: p.path,
      images: [{ url: p.image, width: 1200, height: 630, alt: p.name }],
    },
  };
}

export function productJsonLd(id) {
  const p = PRODUCT_SEO[id];
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    category: p.category,
    image: `${siteConfig.url}${p.image}`,
    description: p.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@type": "Organization", name: "High Protection Systems SA" },
    url: `${siteConfig.url}${p.path}`,
  };
}
