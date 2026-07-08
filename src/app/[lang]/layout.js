import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Header from "@/components/general/Header";
import "../globals.css";
import Footer from "@/components/general/Footer";
import { siteConfig } from "@/lib/site";
import { I18nProvider } from "@/i18n/client";
import { getClientDictionary, getT } from "@/i18n/server";
import {
  defaultLocale,
  getDirection,
  isLocale,
  localeConfig,
  locales,
} from "@/i18n/config";

// Neue Montreal loaded via next/font/local for zero external requests and no layout shift.
const neueMontreal = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../../../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NeueMontreal-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NeueMontreal-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/NeueMontreal-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});

// Pre-render one static tree per locale (`/en`, `/de`, `/ar`).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const t = await getT(lang);
  const title = t("metadata.defaultTitle");
  const description = t("metadata.description");

  // Tell crawlers about the sibling translations of every page. `languages`
  // keys are BCP-47 tags; `x-default` points at the locale served to visitors
  // whose language we don't speak.
  const languages = Object.fromEntries(
    locales.map((locale) => [localeConfig[locale].htmlLang, `/${locale}`]),
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: t("metadata.titleTemplate"),
    },
    description,
    applicationName: siteConfig.name,
    keywords: t("metadata.keywords"),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...languages, "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      type: "website",
      locale: localeConfig[lang].ogLocale,
      url: `${siteConfig.url}/${lang}`,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: "/videos/hero-poster.jpg",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/videos/hero-poster.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// This is the site's ROOT layout — it lives under the [lang] dynamic segment
// rather than at app/layout.js, which Next.js explicitly supports for i18n
// ("The root layout can be under a dynamic segment", see the bundled docs at
// next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md).
// Requests without a locale prefix are redirected into one by src/proxy.js.
export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  // A bogus segment (/xx/contact) 404s instead of rendering an empty shell.
  if (!isLocale(lang)) notFound();

  // Only the client-facing slice of the dictionary crosses to the browser.
  const clientDict = await getClientDictionary(lang);
  const t = await getT(lang);

  return (
    <html
      lang={localeConfig[lang].htmlLang}
      dir={getDirection(lang)}
      className={`h-full antialiased ${neueMontreal.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          {t("common.skipToContent")}
        </a>
        {/* The provider serialises exactly one dictionary to the client; the
            other locales never enter the browser bundle. */}
        <I18nProvider lang={lang} dict={clientDict}>
          <Header />
          {children}
          <Footer lang={lang} />
        </I18nProvider>
        <OrganizationJsonLd lang={lang} />
      </body>
    </html>
  );
}

// Site-wide Organization structured data — helps search engines build a
// knowledge-panel entity for the brand. Rendered once in the root layout.
async function OrganizationJsonLd({ lang }) {
  const t = await getT(lang);
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: "High Protection Systems SA",
    url: `${siteConfig.url}/${lang}`,
    logo: `${siteConfig.url}/hpsFooterLogo.svg`,
    description: t("metadata.description"),
    parentOrganization: { "@type": "Organization", name: "Racing Force Group" },
    sameAs: ["https://www.linkedin.com"],
  };
  return (
    <script
      type="application/ld+json"
      // Static, developer-authored JSON — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
