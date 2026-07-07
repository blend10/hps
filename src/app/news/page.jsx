import Mission from "@/components/home/Mission";
import Helmets from "@/components/motorsport/Helmets";
import LatestNews from "@/components/motorsport/LatestNews";
import Ultimate from "@/components/motorsport/Ultimate";
import React from "react";

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
