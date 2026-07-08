import Hero from "@/components/general/Hero";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import ScrollEffect from "@/components/home/ScrollEffect";
import High from "@/components/home/High";
import Frontline from "@/components/home/Frontline";
import Mission from "@/components/home/Mission";
import { getT } from "@/i18n/server";
import { alternatesFor } from "@/i18n/config";

// Title/description come from the root layout's defaults; only the per-page
// canonical + hreflang set differs.
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { alternates: alternatesFor(lang, "/") };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const t = await getT(lang);

  return (
    <main className="flex-1">
      {/* Visually-hidden document-level heading: the hero's large type is an
          <h2> for design reasons, so this gives the page a proper <h1> for SEO
          and the accessibility outline without altering the visual design. */}
      <h1 className="sr-only">{t("metadata.home.srHeading")}</h1>
      <Hero />
      <ScrollEffect />
      <High lang={lang} />
      <Helmets lang={lang} />
      <Frontline lang={lang} />
      <Mission lang={lang} />
      <News />
      <Ultimate />
    </main>
  );
}
