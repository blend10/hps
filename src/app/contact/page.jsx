import Contact from "@/components/contact/Contact";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";

export const metadata = {
  title: "Get in Touch",
  description:
    "Contact HPS for product specifications, procurement, certifications, and partnership enquiries. Supplied exclusively to government entities, official agencies, and licensed defence distributors.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Get in Touch | High Protection Systems", url: "/contact" },
};

const Page = () => {
  return (
    <div>
      <Contact />
      <Helmets />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
