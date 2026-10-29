"use client";

import {
  useMemo,
  useRef,
} from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { ProjectStickyStack } from "@/components/project/ProjectStickyStack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeProjects } from "@/i18n/translations";

import "@/styles/selected-work.css";

export function SelectedWork() {
  const {
    language,
    t,
  } = useLanguage();

  const localizedProjects =
    useMemo(
      () =>
        localizeProjects(
          featuredProjects,
          language,
        ),
      [language],
    );

  const titleRef =
    useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: [
      "start 32%",
      "start 12%",
    ],
  });

  const smoothTitleProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 26,
        mass: 0.35,
      },
    );

  const titleY =
    useTransform(
      smoothTitleProgress,
      [0, 1],
      [0, 10],
    );

  return (
    <section
      id="work"
      className="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="page-container relative z-10">
        <div className="selected-work-stage">
          <ProjectStickyStack
            projects={localizedProjects}
            title={
              <motion.div
                ref={titleRef}
                className="selected-work-title-pin"
                style={{
                  y: titleY,
                }}
              >
                <SectionHeading
                  eyebrow={
                    t.selectedWork.eyebrow
                  }
                  title={
                    t.selectedWork.title
                  }
                  titleId="selected-work-title"
                />
              </motion.div>
            }
            intro={
              <>
                {
                  t.selectedWork
                    .intro
                }
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
