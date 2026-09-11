"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface ShowcaseProject {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  className?: string;
}

export function ProjectShowcase({
  projects,
  className = "",
}: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [smoothPosition, setSmoothPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (
      start: number,
      end: number,
      factor: number,
    ) => start + (end - start) * factor;

    const animate = () => {
      setSmoothPosition((previous) => ({
        x: lerp(previous.x, mousePosition.x, 0.15),
        y: lerp(previous.y, mousePosition.y, 0.15),
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-showcase relative w-full ${className}`}
    >
      {/* Floating preview */}
      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-50
          hidden
          overflow-hidden
          rounded-xl
          border
          border-border
          shadow-2xl
          lg:block
        "
        style={{
          transform: `translate3d(
            ${smoothPosition.x + 24}px,
            ${smoothPosition.y - 110}px,
            0
          )`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.88,
          transition:
            "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), scale 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative h-[220px] w-[340px] overflow-hidden rounded-xl bg-surface-1">
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt={`Vista previa de ${project.title}`}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-all
                duration-500
                ease-out
              "
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.06,
                filter:
                  hoveredIndex === index
                    ? "none"
                    : "blur(8px)",
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-background/35 to-transparent" />
        </div>
      </div>

      {/* Project list */}
      <div>
        {projects.map((project, index) => (
          <Link
            key={project.title}
            href={project.link}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <div
              className="
                relative
                border-t
                border-border
                py-6
                transition-all
                duration-300
                ease-out
                sm:py-7
                lg:py-8
              "
            >
              {/* Hover background */}
              <div
                className={`
                  absolute
                  inset-0
                  -mx-4
                  rounded-lg
                  bg-surface-1/60
                  transition-all
                  duration-300
                  ease-out
                  ${
                    hoveredIndex === index
                      ? "scale-100 opacity-100"
                      : "scale-[0.98] opacity-0"
                  }
                `}
              />

              <div className="relative flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-xs text-foreground-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-6 bg-border" />
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                      <span className="relative">
                        {project.title}

                        <span
                          className={`
                            absolute
                            -bottom-1
                            left-0
                            h-px
                            bg-gradient-to-r
                            from-brand-600
                            via-brand-300
                            to-brand-500
                            transition-all
                            duration-300
                            ease-out
                            ${
                              hoveredIndex === index
                                ? "w-full"
                                : "w-0"
                            }
                          `}
                        />
                      </span>
                    </h3>

                    <ArrowUpRight
                      aria-hidden="true"
                      className={`
                        h-4
                        w-4
                        text-brand-soft
                        transition-all
                        duration-300
                        ease-out
                        ${
                          hoveredIndex === index
                            ? "translate-x-0 translate-y-0 opacity-100"
                            : "-translate-x-1 translate-y-1 opacity-0"
                        }
                      `}
                    />
                  </div>

                  <p
                    className={`
                      mt-2
                      max-w-xl
                      text-sm
                      leading-relaxed
                      transition-colors
                      duration-300
                      sm:text-[0.95rem]
                      ${
                        hoveredIndex === index
                          ? "text-foreground-muted"
                          : "text-foreground-subtle"
                      }
                    `}
                  >
                    {project.description}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    font-mono
                    text-xs
                    tabular-nums
                    transition-colors
                    duration-300
                    ${
                      hoveredIndex === index
                        ? "text-brand-soft"
                        : "text-foreground-subtle"
                    }
                  `}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </Link>
        ))}

        <div className="border-t border-border" />
      </div>
    </div>
  );
}