import Contact from "@/components/contact/Contact";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import { getT } from "@/i18n/server";
import { alternatesFor, localeHref } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getT(lang);
  const title = t("metadata.contact.title");
  return {
    title,
    description: t("metadata.contact.description"),
    alternates: alternatesFor(lang, "/contact"),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      url: localeHref(lang, "/contact"),
    },
  };
}

const Page = async ({ params }) => {
  const { lang } = await params;

  return (
    <div>
      <Contact />
      <Helmets lang={lang} />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
