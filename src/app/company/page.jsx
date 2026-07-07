import Hero from "@/components/general/Hero";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Origins from "@/components/motorsport/Origins";
import Ultimate from "@/components/motorsport/Ultimate";
import React from "react";

// Content for the company / About Us section — passed into the reusable
// <Origins> layout as props. Omit `image` on a chapter to render the on-brand
// placeholder frame; add `image: "/company/<file>"` once you have a photo.
const companyHeading = { line1: "Company  ", line2: "Overview" };

const companyChapters = [
  {
    id: "who-we-are",
    nav: "What is High Protection Systems?",
    title: "What is High Protection Systems?",
    caption: "What is High Protection Systems?",
    aspect: "10 / 6",
    image: "/pic1.png",
    body: "High Protection Systems (HPS) is a UK-based manufacturer specialising in high-performance protective equipment for defence, law enforcement, and security professionals. We design and produce ballistic and blast-protective solutions engineered to the most demanding operational standards.",
  },
  {
    id: "our-mission",
    nav: "Where is HPS based?",
    title: "Where is HPS based?",
    caption: "Protecting the best",
    aspect: "10 / 6",
    image: "/pic2.png",
    body: "HPS is headquartered in Ronco Scrivia, Italy, with manufacturing and R&D facilities supporting our global customer base.",
  },
  {
    id: "our-heritage",
    nav: "What industries do you serve?",
    title: "What industries do you serve?",
    caption: "Since 1954",
    aspect: "10 / 6",
    image: "/pic3.png",
    body: "We serve military and defence organisations, law enforcement agencies, private security contractors, and government bodies worldwide.",
  },
  {
    id: "our-facility",
    nav: "Different from others!",
    title: "Different from others!",
    caption: "Ronco Scrivia, Italy",
    aspect: "16 / 10",
    image: "/pic4.png",
    body: "We serve military and defence organisations, law enforcement agencies, private security contractors, and government bodies worldwide.",
  },
];

const Page = () => {
  return (
    <div>
      <Hero variant="company" />
      <Origins
        heading={companyHeading}
        chapters={companyChapters}
        sectionId="about-hps"
        ariaLabel="About HPS"
      />
      <Helmets />
      <News />
      <Ultimate />
    </div>
  );
};

export default Page;
