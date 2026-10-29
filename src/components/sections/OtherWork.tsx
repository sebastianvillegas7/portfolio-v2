"use client";

import { useMemo } from "react";

import { motion } from "motion/react";

import { OtherWorkTabs } from "@/components/other-work/OtherWorkTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { otherProjects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeProjects } from "@/i18n/translations";

export function OtherWork() {
  const {
    language,
    t,
  } = useLanguage();

  const localizedProjects =
    useMemo(
      () =>
        localizeProjects(
          otherProjects,
          language,
        ),
      [language],
    );

  return (
    <section
      id="OtherWork"
      className="section"
      aria-labelledby="other-work-title"
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
          eyebrow={
            t.otherWork.eyebrow
          }
          title={
            t.otherWork.title
          }
          titleId="other-work-title"
          className="mb-10 md:mb-14"
        />

        <OtherWorkTabs
          projects={
            localizedProjects
          }
        />
      </motion.div>
    </section>
  );
}
