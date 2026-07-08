import Hero from "@/components/general/Hero";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Origins from "@/components/motorsport/Origins";
import Ultimate from "@/components/motorsport/Ultimate";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getT(lang);
  const title = t("metadata.motorsportHeritage.title");
  return {
    title,
    description: t("metadata.motorsportHeritage.description"),
    alternates: alternatesFor(lang, "/motorsportHeritage"),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      url: localeHref(lang, "/motorsportHeritage"),
    },
  };
}

const Page = async ({ params }) => {
  const { lang } = await params;

  return (
    <div>
      <Hero variant="motorsport" />
      <Origins variant="motorsport" />
      <Helmets lang={lang} />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
