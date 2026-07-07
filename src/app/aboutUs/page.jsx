import HeroPageAboutUs from "@/components/about/HeroPageAboutUs";
import Standard from "@/components/about/Standard";
import Mission from "@/components/home/Mission";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";

export const metadata = {
  title: "About Us",
  description:
    "High Protection Systems adapts motorsport-proven safety engineering into ballistic and tactical head protection for defence, law enforcement, and aviation.",
  alternates: { canonical: "/aboutUs" },
  openGraph: { title: "About Us | High Protection Systems", url: "/aboutUs" },
};

const Page = () => {
  return (
    <div>
      <HeroPageAboutUs />
      <Standard />
      <Helmets />
      <Mission />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
