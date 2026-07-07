import ProductShowcase from "@/components/product/ProductShowcase";
import ProductDetails from "@/components/product/ProductDetails";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import { productMetadata, productJsonLd } from "@/lib/products";

export const metadata = productMetadata("riot");

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd("riot")) }}
      />
      <ProductShowcase product="riot" />
      <ProductDetails product="riot" />
      <Helmets />
      <News />
      <Ultimate />
    </>
  );
};

export default Page;
