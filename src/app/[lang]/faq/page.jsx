import Faq from "@/components/faq/Faq";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getT(lang);
  return {
    title: t("metadata.faq.title"),
    description: t("metadata.faq.description"),
    alternates: alternatesFor(lang, "/faq"),
    openGraph: {
      title: `${t("common.faq")} | ${siteConfig.name}`,
      url: localeHref(lang, "/faq"),
    },
  };
}

const Page = async ({ params }) => {
  const { lang } = await params;

  return (
    <div>
      <Faq />
      <Helmets lang={lang} />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
