import ProductShowcase from "@/components/product/ProductShowcase";
import ProductDetails from "@/components/product/ProductDetails";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";

const Page = () => {
  return (
    <>
      <ProductShowcase product="airborne" />
      <ProductDetails product="airborne" />
      <Helmets />
      <News />
      <Ultimate />
    </>
  );
};

export default Page;
