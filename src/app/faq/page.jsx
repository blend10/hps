import Faq from "@/components/faq/Faq";
import Helmets from "@/components/motorsport/Helmets";
import News from "@/components/motorsport/News";
import Ultimate from "@/components/motorsport/Ultimate";
import React from "react";

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
