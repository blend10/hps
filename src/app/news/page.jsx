import Mission from "@/components/home/Mission";
import Helmets from "@/components/motorsport/Helmets";
import LatestNews from "@/components/motorsport/LatestNews";
import Ultimate from "@/components/motorsport/Ultimate";

export const metadata = {
  title: "Latest News",
  description:
    "News, press releases, and events from High Protection Systems — including our presence at global defence exhibitions.",
  alternates: { canonical: "/news" },
  openGraph: { title: "Latest News | High Protection Systems", url: "/news" },
};

const Page = () => {
  return (
    <div>
      <LatestNews />
      <Mission
        heading="Contact With Us"
        buttonLabel="Get in touch"
        buttonHref="/contact"
        ariaLabel="Contact with us"
      />
      <Helmets />
      <Ultimate />
    </div>
  );
};

export default Page;
