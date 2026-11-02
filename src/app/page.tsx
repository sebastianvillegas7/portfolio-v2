import { GlobalEffects } from "@/components/effects/GlobalEffects";

import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { OtherWork } from "@/components/sections/OtherWork";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { TestimonialsContact } from "@/components/sections/TestimonialsContact";

export const revalidate = 86400;

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
      <TestimonialsContact />
      <Footer />
    </>
  );
}
