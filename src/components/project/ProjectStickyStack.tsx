"use client";

import { useRef, type ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import type { Project } from "@/types/project";

type ProjectStickyStackProps = {
  projects: Project[];
  intro: ReactNode;
};

type ProjectStickyCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function getEntryWindow(index: number, total: number) {
  /*
   * Primera card:
   * entra antes que las demás porque forma
   * parte de la transición inicial de la sección.
   */
  if (index === 0) {
    return {
      start: 0.08,
      end: 0.28,
    };
  }

  if (total <= 1) {
    return {
      start: 0.08,
      end: 0.28,
    };
  }

  /*
   * Segunda y tercera mantienen por ahora
   * prácticamente el timing actual.
   */
  const firstStart = 0.5;
  const lastStart = 0.72;

  const transitionCount = Math.max(total - 2, 1);

  const step =
    transitionCount <= 1 ? 0 : (lastStart - firstStart) / (transitionCount - 1);

  const start = firstStart + (index - 1) * step;

  return {
    start,
    end: start + 0.11,
  };
}

function getScalePoints(index: number, total: number) {
  const input: number[] = [0];
  const output: number[] = [1];

  let currentScale = 1;

  for (let nextIndex = index + 1; nextIndex < total; nextIndex++) {
    const nextWindow = getEntryWindow(nextIndex, total);

    input.push(nextWindow.start);
    output.push(currentScale);

    currentScale -= 0.035;

    input.push(nextWindow.end);
    output.push(currentScale);
  }

  input.push(1);
  output.push(currentScale);

  return {
    input,
    output,
  };
}

function ProjectStickyCard({
  project,
  index,
  total,
  progress,
}: ProjectStickyCardProps) {
  const { start, end } = getEntryWindow(index, total);

  const yInput =
    index === 0
      ? [0, 0.12, 0.16, end]
      : [Math.max(0, start - 0.04), start, end];

  const yOutput =
    index === 0 ? ["38vh", "38vh", "38vh", "0vh"] : ["34vh", "34vh", "0vh"];

  const y = useTransform(progress, yInput, yOutput);

  const opacityInput =
    index === 0 ? [0, 0.04, 0.11, 0.17] : [start, start + 0.05, end];

  const opacityOutput = index === 0 ? [0, 0.12, 0.65, 1] : [0, 0.25, 1];

  const opacity = useTransform(progress, opacityInput, opacityOutput);

  const { input: scaleInput, output: scaleOutput } = getScalePoints(
    index,
    total,
  );

  const scale = useTransform(progress, scaleInput, scaleOutput);

  return (
    <motion.article
      className="project-sticky-card"
      style={{
        zIndex: 20 + index,

        top: `calc(${index} * var(--project-layer-gap))`,

        y,
        opacity,
        scale,
      }}
    >
      <Link href={`/work/${project.slug}`} className="project-sticky-link">
        <div className="project-sticky-media">
          <Image
            src={project.cover}
            alt={`Vista previa de ${project.title}`}
            fill
            priority={index === 0}
            sizes="(max-width: 767px) 100vw, 90vw"
            className="project-sticky-image"
          />

          <div className="project-sticky-media-shade" aria-hidden="true" />

          <div className="project-sticky-number">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="project-sticky-content">
          <div className="project-sticky-meta">
            <span>{project.category}</span>

            <span>
              {index + 1} / {total}
            </span>
          </div>

          <div className="project-sticky-heading">
            <h3>{project.title}</h3>

            <ArrowUpRight aria-hidden="true" className="project-sticky-arrow" />
          </div>

          <p className="project-sticky-location">{project.location}</p>

          <p className="project-sticky-description">{project.description}</p>

          <div className="project-sticky-footer">
            <div className="project-sticky-technologies">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <span className="project-sticky-cta">Ver caso</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectStickyStack({
  projects,
  intro,
}: ProjectStickyStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 82%", "end 18%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 30,
    mass: 0.3,
  });

  const introOpacity = useTransform(
    progress,
    [0, 0.16, 0.21, 0.3],
    [1, 1, 0.85, 0],
  );

  const introY = useTransform(progress, [0, 0.16, 0.3], [0, 0, -12]);

  const scrollHeight = 125 + Math.max(projects.length - 1, 0) * 72;

  return (
    <div
      ref={stackRef}
      className="project-sticky-stack"
      style={{
        minHeight: `${scrollHeight}svh`,
      }}
    >
      <div className="project-sticky-viewport">
        <motion.p
          className="selected-work-intro"
          style={{
            opacity: introOpacity,
            y: introY,
          }}
        >
          {intro}
        </motion.p>

        {projects.map((project, index) => (
          <ProjectStickyCard
            key={project.slug}
            project={project}
            index={index}
            total={projects.length}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}
