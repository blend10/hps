import HeroPageAboutUs from "@/components/about/HeroPageAboutUs";
import Standard from "@/components/about/Standard";
import Mission from "@/components/home/Mission";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import React from "react";

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
