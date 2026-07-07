import Faq from "@/components/faq/Faq";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about HPS products, technology, certifications, and procurement — from materials and standards to demonstrations and lead times.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | High Protection Systems", url: "/faq" },
};

const Page = () => {
  return (
    <div>
      <Faq />
      <Helmets />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
