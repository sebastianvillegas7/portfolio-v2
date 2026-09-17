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
  title: ReactNode;
  intro: ReactNode;
};

type ProjectStickyCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
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

  const firstStart = 0.34;
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
    end:
      start +
      (index === 1
        ? 0.26
        : 0.18),
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

    const reduction =
      index === 0 &&
      nextIndex >= 2
        ? 0.055
        : 0.035;

    currentScale =
      Math.max(
        0.9,
        currentScale -
          reduction,
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
}: ProjectStickyCardProps) {
  const {
    start,
    end,
  } = getEntryWindow(
    index,
    total,
  );

  /*
   * PRIMERA CARD
   *
   * Usa el mismo progress que las demás.
   */
  const firstWindow =
    getEntryWindow(
      0,
      total,
    );

  const firstTravel =
    firstWindow.end -
    firstWindow.start;

  const firstCardY =
    useTransform(
      progress,
      [
        firstWindow.start,
        firstWindow.start +
          firstTravel * 0.68,
        firstWindow.start +
          firstTravel * 0.9,
        firstWindow.end,
      ],
      [
        "38vh",
        "10vh",
        "3vh",
        "0vh",
      ],
    );

  /*
   * TERCERA CARD
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

  /*
   * SEGUNDA CARD
   *
   * Mantiene el recorrido y
   * frenado ya aprobado.
   */
  const secondCardTravel =
    end - start;

  const secondCardY =
    useTransform(
      progress,
      [
        Math.max(
          0,
          start - 0.04,
        ),
        start,
        start +
          secondCardTravel *
            0.68,
        start +
          secondCardTravel *
            0.9,
        end,
      ],
      [
        "72vh",
        "72vh",
        "18vh",
        "5vh",
        "0vh",
      ],
    );

  const y =
    index === 0
      ? firstCardY
      : index === 1
        ? secondCardY
        : stackedCardY;

  /*
   * Compresión durante la
   * entrada de la tercera.
   */
  const thirdWindow =
    total >= 3
      ? getEntryWindow(
          2,
          total,
        )
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
   * OPACITY
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
   * PROFUNDIDAD
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
        zIndex:
          20 + index,
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
            priority={
              index === 0
            }
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
              {index + 1} /{" "}
              {total}
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
                (
                  technology,
                ) => (
                  <span
                    key={
                      technology
                    }
                  >
                    {
                      technology
                    }
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
  title,
  intro,
}: ProjectStickyStackProps) {
  const timelineRef =
    useRef<HTMLDivElement>(
      null,
    );

  /*
   * Timeline de animaciones.
   * No cambia.
   */
  const timelineHeight =
    125 +
    Math.max(
      projects.length - 1,
      0,
    ) *
      72;

  /*
   * Tiempo extra después de
   * terminar la tercera.
   */
  const stickyHeight =
    timelineHeight + 40;

  const {
    scrollYProgress,
  } = useScroll({
    target: timelineRef,
    offset: [
      "start 82%",
      "end 18%",
    ],
  });

  /*
   * Intro
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
   * Las tres cards comparten
   * este mismo progress.
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

  return (
    /*
     * ESTE es ahora el padre común
     * del título y de las cards.
     *
     * Cuando este elemento termina,
     * ambos sticky se liberan.
     */
    <div className="project-sticky-stack">
      {title}

      <div
        className="project-sticky-cards-shell"
        style={{
          minHeight:
            `${stickyHeight}svh`,
        }}
      >
        {/*
          Mantiene exactamente el
          timeline anterior.
        */}
        <div
          ref={timelineRef}
          aria-hidden="true"
          style={{
            position:
              "absolute",
            top: 0,
            left: 0,
            width: "1px",
            height:
              `${timelineHeight}svh`,
            pointerEvents:
              "none",
          }}
        />

        <div className="project-sticky-viewport">
          <motion.p
            className="selected-work-intro"
            style={{
              opacity:
                introOpacity,
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
                key={
                  project.slug
                }
                project={
                  project
                }
                index={
                  index
                }
                total={
                  projects.length
                }
                progress={
                  cardProgress
                }
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}