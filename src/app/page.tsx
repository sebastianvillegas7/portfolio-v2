import { GlobalEffects } from "@/components/effects/GlobalEffects";

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
      <div className="pointer-events-none fixed left-0 top-0 z-[1] h-[100lvh] w-screen">
        <GlobalEffects />
      </div>

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
