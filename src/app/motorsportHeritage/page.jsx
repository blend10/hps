import Hero from "@/components/general/Hero";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Origins from "@/components/motorsport/Origins";
import Ultimate from "@/components/motorsport/Ultimate";

export const metadata = {
  title: "Motorsport Heritage",
  description:
    "From Bell Helmets in 1954 to Grosjean walking out of a 190mph fireball — the motorsport safety legacy that HPS carries into ballistic and tactical protection.",
  alternates: { canonical: "/motorsportHeritage" },
  openGraph: { title: "Motorsport Heritage | High Protection Systems", url: "/motorsportHeritage" },
};

const Page = () => {
  return (
    <div>
      <Hero variant="motorsport" />
      <Origins />
      <Helmets />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
