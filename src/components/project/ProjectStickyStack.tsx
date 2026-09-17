"use client";

import {
  useRef,
  type ReactNode,
} from "react";

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
  firstCardProgress: MotionValue<number>;
};

function getEntryWindow(
  index: number,
  total: number,
) {
  if (index === 0) {
    return {
      start: 0.08,
      end: 0.28,
    };
  }

  const remainingCards =
    Math.max(total - 1, 1);

  /*
   * Con 3 cards:
   *
   * card 2 -> 0.44 / 0.62
   * card 3 -> 0.72 / 0.90
   */
  const firstStart = 0.44;
  const lastStart = 0.72;

  const step =
    remainingCards <= 1
      ? 0
      : (lastStart - firstStart) /
        (remainingCards - 1);

  const start =
    firstStart +
    (index - 1) * step;

  return {
    start,
    end: start + 0.18,
  };
}

function getScalePoints(
  index: number,
  total: number,
) {
  const input: number[] = [0];
  const output: number[] = [1];

  let currentScale = 1;

  for (
    let nextIndex = index + 1;
    nextIndex < total;
    nextIndex++
  ) {
    const nextWindow =
      getEntryWindow(
        nextIndex,
        total,
      );

    input.push(
      nextWindow.start,
    );

    output.push(
      currentScale,
    );

    /*
     * La primera retrocede un poco más
     * cuando entra la tercera.
     *
     * Card 1:
     * 1 -> .965 -> .91
     *
     * Card 2:
     * 1 -> .965
     */
    const reduction =
      index === 0 &&
      nextIndex >= 2
        ? 0.055
        : 0.035;

    currentScale =
      Math.max(
        0.9,
        currentScale - reduction,
      );

    input.push(
      nextWindow.end,
    );

    output.push(
      currentScale,
    );
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
  firstCardProgress,
}: ProjectStickyCardProps) {
  const {
    start,
    end,
  } = getEntryWindow(
    index,
    total,
  );

  /*
   * ---------------------------------------------------------
   * PRIMERA CARD
   * ---------------------------------------------------------
   */

  const firstCardY =
    useTransform(
      firstCardProgress,
      [0, 1],
      ["38vh", "0vh"],
    );

  /*
   * ---------------------------------------------------------
   * SEGUNDA / TERCERA
   * ---------------------------------------------------------
   *
   * Aparecen desde el borde inferior
   * y tienen recorrido largo.
   */

  const stackedCardY =
    useTransform(
      progress,
      [
        Math.max(
          0,
          start - 0.04,
        ),
        start,
        end,
      ],
      [
        "72vh",
        "72vh",
        "0vh",
      ],
    );

  const y =
    index === 0
      ? firstCardY
      : stackedCardY;

  /*
   * ---------------------------------------------------------
   * COMPRESIÓN CUANDO ENTRA LA TERCERA
   * ---------------------------------------------------------
   *
   * Antes:
   *
   * Card 1 -> 0rem
   * Card 2 -> 4rem
   * Card 3 -> 8rem
   *
   * Al terminar la entrada de la tercera:
   *
   * Card 1 -> 0rem
   * Card 2 -> 3.1rem
   * Card 3 -> 6.2rem
   *
   * Por lo tanto las franjas 01 y 02
   * quedan mucho más compactas.
   */

  const thirdWindow =
    total >= 3
      ? getEntryWindow(2, total)
      : {
          start: 1,
          end: 1.001,
        };

  const expandedTop =
    index * 4;

  const compressedTop =
    index * 3.1;

  const top =
    useTransform(
      progress,
      [
        0,
        thirdWindow.start,
        thirdWindow.end,
      ],
      [
        `${expandedTop}rem`,
        `${expandedTop}rem`,
        `${
          total >= 3
            ? compressedTop
            : expandedTop
        }rem`,
      ],
    );

  /*
   * ---------------------------------------------------------
   * OPACITY
   * ---------------------------------------------------------
   */

  const firstCardOpacity =
    useTransform(
      progress,
      [
        0,
        0.04,
        0.11,
        0.17,
      ],
      [
        0,
        0.12,
        0.65,
        1,
      ],
    );

  const stackedCardOpacity =
    useTransform(
      progress,
      [
        start,
        start + 0.045,
        end,
      ],
      [
        0,
        0.32,
        1,
      ],
    );

  const opacity =
    index === 0
      ? firstCardOpacity
      : stackedCardOpacity;

  /*
   * ---------------------------------------------------------
   * PROFUNDIDAD
   * ---------------------------------------------------------
   */

  const {
    input: scaleInput,
    output: scaleOutput,
  } = getScalePoints(
    index,
    total,
  );

  const scale =
    useTransform(
      progress,
      scaleInput,
      scaleOutput,
    );

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
        href={`/work/${project.slug}`}
        className="project-sticky-link"
      >
        <div className="project-sticky-media">
          <Image
            src={project.cover}
            alt={`Vista previa de ${project.title}`}
            fill
            priority={index === 0}
            sizes="(max-width: 767px) 100vw, 90vw"
            className="project-sticky-image"
          />

          <div
            className="project-sticky-media-shade"
            aria-hidden="true"
          />

          <div className="project-sticky-number">
            {String(
              index + 1,
            ).padStart(
              2,
              "0",
            )}
          </div>
        </div>

        <div className="project-sticky-content">
          <div className="project-sticky-meta">
            <span>
              {project.category}
            </span>

            <span>
              {index + 1} / {total}
            </span>
          </div>

          <div className="project-sticky-heading">
            <h3>
              {project.title}
            </h3>

            <ArrowUpRight
              aria-hidden="true"
              className="project-sticky-arrow"
            />
          </div>

          <p className="project-sticky-location">
            {project.location}
          </p>

          <p className="project-sticky-description">
            {project.description}
          </p>

          <div className="project-sticky-footer">
            <div className="project-sticky-technologies">
              {project.technologies.map(
                (technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ),
              )}
            </div>

            <span className="project-sticky-cta">
              Ver caso
            </span>
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
  const stackRef =
    useRef<HTMLDivElement>(null);

  const {
    scrollYProgress,
  } = useScroll({
    target: stackRef,
    offset: [
      "start 82%",
      "end 18%",
    ],
  });

  /*
   * Intro.
   */
  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 105,
        damping: 30,
        mass: 0.3,
      },
    );

  /*
   * Cards 2 y 3.
   */
  const cardProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 72,
        damping: 24,
        mass: 0.42,
      },
    );

  /*
   * Primera card.
   *
   * Movimiento independiente para no mezclar
   * sticky + transform durante su entrada.
   */
  const {
    scrollYProgress:
      firstCardScrollProgress,
  } = useScroll({
    target: stackRef,
    offset: [
      "start 24%",
      "start -14%",
    ],
  });

  const firstCardProgress =
    useSpring(
      firstCardScrollProgress,
      {
        stiffness: 90,
        damping: 28,
        mass: 0.28,
      },
    );

  /*
   * Intro.
   */

  const introOpacity =
    useTransform(
      progress,
      [
        0,
        0.16,
        0.21,
        0.3,
      ],
      [
        1,
        1,
        0.85,
        0,
      ],
    );

  const introY =
    useTransform(
      progress,
      [
        0,
        0.06,
        0.12,
        0.16,
        0.3,
      ],
      [
        0,
        8,
        10,
        10,
        -12,
      ],
    );

  const scrollHeight =
    125 +
    Math.max(
      projects.length - 1,
      0,
    ) *
      72;

  return (
    <div
      ref={stackRef}
      className="project-sticky-stack"
      style={{
        minHeight:
          `${scrollHeight}svh`,
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

        {projects.map(
          (
            project,
            index,
          ) => (
            <ProjectStickyCard
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
              progress={cardProgress}
              firstCardProgress={
                firstCardProgress
              }
            />
          ),
        )}
      </div>
    </div>
  );
}