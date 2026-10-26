"use client";

import { motion } from "motion/react";

import FeatureCarousel from "@/components/feature-carousel";
import VerticalTabs from "@/components/vertical-tabs";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function OtherWork() {
  return (
    <section
      id="OtherWork"
      className="section"
      aria-labelledby="other-work-title"
      style={{
        paddingTop:
          "calc(var(--section-space-y) + 3rem)",
      }}
    >
      <motion.div
        className="page-container"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <SectionHeading
          eyebrow="More Projects"
          title="Other Work"
          titleId="other-work-title"
          className="mb-10 md:mb-14"
        />

        <div className="md:hidden">
          <FeatureCarousel />
        </div>

        <div className="hidden md:block">
          <VerticalTabs />
        </div>
      </motion.div>
    </section>
  );
}
