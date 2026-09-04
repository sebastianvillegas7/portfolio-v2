import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { OtherWork } from "@/components/sections/OtherWork";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <OtherWork />
      <Services />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}
