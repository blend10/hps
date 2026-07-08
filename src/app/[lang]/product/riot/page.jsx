import ProductShowcase from "@/components/product/ProductShowcase";
import ProductDetails from "@/components/product/ProductDetails";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import { productMetadata, productJsonLd } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return productMetadata("riot", lang);
}

const Page = async ({ params }) => {
  const { lang } = await params;
  const jsonLd = await productJsonLd("riot", lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductShowcase product="riot" />
      <ProductDetails product="riot" lang={lang} />
      <Helmets lang={lang} />
      <News />
      <Ultimate />
    </>
  );
};

export default Page;
