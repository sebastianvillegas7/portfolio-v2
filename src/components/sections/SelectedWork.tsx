"use client";

import { useRef } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { ProjectStickyStack } from "@/components/project/ProjectStickyStack";
import { featuredProjects } from "@/data/projects";

import "@/styles/selected-work.css";

export function SelectedWork() {
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
            projects={featuredProjects}
            title={
              <motion.div
                ref={titleRef}
                className="selected-work-title-pin"
                style={{
                  y: titleY,
                }}
              >
                <p className="selected-work-eyebrow">
                  Selected Work
                </p>

                <h2
                  id="selected-work-title"
                  className="selected-work-title"
                >
                  Trabajo seleccionado
                </h2>
              </motion.div>
            }
            intro={
              <>
                Una selección de productos digitales,
                experiencias web y e-commerce desarrollados
                para necesidades reales.
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}