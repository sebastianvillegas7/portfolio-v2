import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";

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
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <GlobalLight />

        <FluidCursor />

        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                90deg,
                color-mix(in srgb, var(--background) 96%, transparent) 0%,
                color-mix(in srgb, var(--background) 86%, transparent) 32%,
                color-mix(in srgb, var(--background) 42%, transparent) 58%,
                transparent 82%
              )
            `,
          }}
        />
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