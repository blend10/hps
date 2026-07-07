import Hero from "@/components/general/Hero";
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
      {/* Visually-hidden document-level heading: the hero's large type is an
          <h2> for design reasons, so this gives the page a proper <h1> for SEO
          and the accessibility outline without altering the visual design. */}
      <h1 className="sr-only">
        High Protection Systems — Ballistic and Tactical Helmets for Military,
        Law Enforcement, and Aviation
      </h1>
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
