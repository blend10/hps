import HeroPageAboutUs from "@/components/about/HeroPageAboutUs";
import Standard from "@/components/about/Standard";
import Mission from "@/components/home/Mission";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getT(lang);
  const title = t("metadata.aboutUs.title");
  return {
    title,
    description: t("metadata.aboutUs.description"),
    alternates: alternatesFor(lang, "/aboutUs"),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      url: localeHref(lang, "/aboutUs"),
    },
  };
}

const Page = async ({ params }) => {
  const { lang } = await params;

  return (
    <div>
      <HeroPageAboutUs lang={lang} />
      <Standard />
      <Helmets lang={lang} />
      <Mission lang={lang} />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
