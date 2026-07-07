import Hero from "@/components/general/Hero";
// import Cards from "@/components/general/Cards";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import ScrollEffect from "@/components/home/ScrollEffect";
import High from "@/components/home/High";
import Frontline from "@/components/home/Frontline";
import Mission from "@/components/home/Mission";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ScrollEffect />
      <High />
      <Helmets />
      <Frontline />
      <Mission />
      <News />
      <Ultimate />
    </main>
  );
}
