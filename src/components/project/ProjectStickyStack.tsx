"use client";

import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import type { Project } from "@/types/project";

type ProjectStickyStackProps = {
  projects: Project[];
};

export function ProjectStickyStack({
  projects,
}: ProjectStickyStackProps) {
  return (
    <div className="project-sticky-stack">
      {projects.map((project, index) => (
        <motion.article
          key={project.slug}
          className="project-sticky-card"
          style={
            {
              "--stack-index": index,
              zIndex: index + 1,
            } as CSSProperties
          }
          initial={{
            opacity: 0,
            y: 36,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
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
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="project-sticky-content">
              <div className="project-sticky-meta">
                <span>{project.category}</span>

                <span>
                  {index + 1} / {projects.length}
                </span>
              </div>

              <div className="project-sticky-heading">
                <h3>{project.title}</h3>

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
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

                <span className="project-sticky-cta">
                  Ver caso
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}