"use client";

import FeatureCarousel from "@/components/feature-carousel";
import VerticalTabs from "@/components/vertical-tabs";

export function OtherWork() {
  return (
    <section id="OtherWork" className="border-b border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            More projects
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Other Work
          </h2>
        </div>

        <div className="md:hidden">
          <FeatureCarousel />
        </div>

        <div className="hidden md:block">
          <VerticalTabs />
        </div>
      </div>
    </section>
  );
}
