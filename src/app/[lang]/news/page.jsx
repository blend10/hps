import Mission from "@/components/home/Mission";
import Helmets from "@/components/motorsport/Helmets";
import LatestNews from "@/components/motorsport/LatestNews";
import Ultimate from "@/components/motorsport/Ultimate";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getT(lang);
  const title = t("metadata.news.title");
  return {
    title,
    description: t("metadata.news.description"),
    alternates: alternatesFor(lang, "/news"),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      url: localeHref(lang, "/news"),
    },
  };
}

const Page = async ({ params }) => {
  const { lang } = await params;

  return (
    <div>
      <LatestNews />
      {/* The "contact" variant of the banner: Contact With Us / GET IN TOUCH. */}
      <Mission
        lang={lang}
        variant="contact"
        buttonHref={localeHref(lang, "/contact")}
      />
      <Helmets lang={lang} />
      <Ultimate />
    </div>
  );
};

export default Page;
