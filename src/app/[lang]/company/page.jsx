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
  const title = t("metadata.company.title");
  return {
    title,
    description: t("metadata.company.description"),
    alternates: alternatesFor(lang, "/company"),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      url: localeHref(lang, "/company"),
    },
  };
}

// The company chapters render through the same <Origins> layout as the
// Motorsport Heritage page: `variant="company"` selects their copy from the
// dictionary (origins.company) and their photography from Origins' CHAPTER_MEDIA.
const Page = async ({ params }) => {
  const { lang } = await params;

  return (
    <div>
      <Hero variant="company" />
      <Origins variant="company" />
      <Helmets lang={lang} />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
