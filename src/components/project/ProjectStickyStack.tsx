"use client";

import { useRef, type ReactNode } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { CountryFlag } from "@/components/project/CountryFlag";

import { ProjectDevicePreview } from "@/components/project/ProjectDevicePreview";

import type { Project } from "@/types/project";

type ProjectStickyStackProps = {
  projects: Project[];
  title: ReactNode;
  intro: ReactNode;
};

type ProjectStickyCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function getEntryWindow(index: number, total: number) {
  if (index === 0) {
    return {
      start: 0.08,
      end: 0.28,
    };
  }

  const remainingCards = Math.max(total - 1, 1);

  const firstStart = 0.34;
  const lastStart = 0.72;

  const step =
    remainingCards <= 1 ? 0 : (lastStart - firstStart) / (remainingCards - 1);

  const start = firstStart + (index - 1) * step;

  return {
    start,

    end: start + (index === 1 ? 0.26 : 0.18),
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

    const reduction = index === 0 && nextIndex >= 2 ? 0.055 : 0.035;

    currentScale = Math.max(0.9, currentScale - reduction);

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

  /*
   * Primera card.
   */
  const firstWindow = getEntryWindow(0, total);

  const firstTravel = firstWindow.end - firstWindow.start;

  const firstCardY = useTransform(
    progress,
    [
      firstWindow.start,

      firstWindow.start + firstTravel * 0.68,

      firstWindow.start + firstTravel * 0.9,

      firstWindow.end,
    ],
    ["38vh", "10vh", "3vh", "0vh"],
  );

  /*
   * Tercera y posteriores.
   */
  const stackedCardY = useTransform(
    progress,
    [Math.max(0, start - 0.04), start, end],
    ["72vh", "72vh", "0vh"],
  );

  /*
   * Segunda card.
   */
  const secondCardTravel = end - start;

  const secondCardY = useTransform(
    progress,
    [
      Math.max(0, start - 0.04),

      start,

      start + secondCardTravel * 0.68,

      start + secondCardTravel * 0.9,

      end,
    ],
    ["72vh", "72vh", "18vh", "5vh", "0vh"],
  );

  const y = index === 0 ? firstCardY : index === 1 ? secondCardY : stackedCardY;

  /*
   * Compresión al entrar
   * la tercera card.
   */
  const thirdWindow =
    total >= 3
      ? getEntryWindow(2, total)
      : {
          start: 1,
          end: 1.001,
        };

  const expandedTop = index * 4;

  const compressedTop = index * 3.1;

  const top = useTransform(
    progress,
    [0, thirdWindow.start, thirdWindow.end],
    [
      `${expandedTop}rem`,

      `${expandedTop}rem`,

      `${total >= 3 ? compressedTop : expandedTop}rem`,
    ],
  );

  /*
   * Opacity.
   */
  const firstCardOpacity = useTransform(
    progress,
    [0, 0.04, 0.11, 0.17],
    [0, 0.12, 0.65, 1],
  );

  const stackedCardOpacity = useTransform(
    progress,
    [start, start + 0.045, end],
    [0, 0.32, 1],
  );

  const opacity = index === 0 ? firstCardOpacity : stackedCardOpacity;

  /*
   * Scale.
   */
  const {
    input: scaleInput,

    output: scaleOutput,
  } = getScalePoints(index, total);

  const scale = useTransform(progress, scaleInput, scaleOutput);

  const firstRowLength =
    project.technologies.length > 6
      ? Math.ceil(project.technologies.length / 2)
      : project.technologies.length;

  const technologyRows =
    project.technologies.length > 6
      ? [
          project.technologies.slice(0, firstRowLength),
          project.technologies.slice(firstRowLength),
        ]
      : [project.technologies];

  return (
    <motion.article
      className="project-sticky-card"
      style={{
        zIndex: 20 + index,

        top,
        y,
        opacity,
        scale,
      }}
    >
      <Link
        href={project.url!}
        target="_blank"
        rel="noopener noreferrer"
        className="project-sticky-link"
      >
        <div className="project-sticky-media">
          <div className="project-sticky-media-header">
            <span className="project-sticky-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="project-sticky-featured-label">
              Proyecto destacado
            </span>
          </div>

          <ProjectDevicePreview
            desktopSrc={project.preview.desktop}
            mobileSrc={project.preview.mobile}
            title={project.title}
            priority={index === 0}
          />
        </div>

        <div className="project-sticky-content">
          <div className="project-sticky-meta">
            <span>{project.category}</span>
          </div>

          <div className="project-sticky-title-row">
            <h3>{project.title}</h3>

            <span className="project-sticky-country">
              <CountryFlag
                code={project.countryCode}
                country={project.country}
              />

              <span>{project.country}</span>
            </span>
          </div>

          <p className="project-sticky-description">{project.description}</p>

          <div className="project-sticky-technologies">
            {technologyRows.map((row, rowIndex) => (
              <div key={rowIndex} className="project-sticky-tech-row">
                {row.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            ))}
          </div>

          <div className="project-sticky-footer">
            <span className="project-sticky-footer-label">
              Diseño &amp; desarrollo
            </span>

            <span className="project-sticky-cta">
              <span>Explorar proyecto</span>

              <ArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectStickyStack({
  projects,
  title,
  intro,
}: ProjectStickyStackProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineHeight = 125 + Math.max(projects.length - 1, 0) * 72;

  const stickyHeight = timelineHeight + 70;

  const { scrollYProgress } = useScroll({
    target: timelineRef,

    offset: ["start 82%", "end 18%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 30,
    mass: 0.3,
  });

  const cardProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 24,
    mass: 0.42,
  });

  const introOpacity = useTransform(
    progress,
    [0, 0.16, 0.21, 0.3],
    [1, 1, 0.85, 0],
  );

  const introY = useTransform(
    progress,
    [0, 0.06, 0.12, 0.16, 0.3],
    [0, 8, 10, 10, -12],
  );

  return (
    <div
      className="project-sticky-stack"
      style={{
        minHeight: `calc(${stickyHeight}svh + var(--project-timeline-top))`,
      }}
    >
      <div
        ref={timelineRef}
        aria-hidden="true"
        className="project-sticky-timeline"
        style={{
          height: `${timelineHeight}svh`,
        }}
      />

      <div className="project-sticky-scene">
        {title}

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
              progress={cardProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
