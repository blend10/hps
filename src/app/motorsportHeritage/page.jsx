import Cards from "@/components/general/Cards";
import Hero from "@/components/general/Hero";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Origins from "@/components/motorsport/Origins";
import Ultimate from "@/components/motorsport/Ultimate";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <Hero variant="motorsport" />
      <Origins />
      <Helmets />
      <News />
      <Ultimate />
    </div>
  );
};

export default page;
