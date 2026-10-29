"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import { ProjectCountryBadge } from "@/components/other-work/ProjectCountryBadge";
import type { Project } from "@/types/project";

type OtherWorkDesktopProps = {
  projects: Project[];
  activeIndex: number;
  activeProject: Project;
  goTo: (index: number) => void;
  isPaused: boolean;
  setIsPaused: (value: boolean) => void;
  handlePrev: () => void;
  handleNext: () => void;
  autoPlayDuration: number;
};

export function OtherWorkDesktop({
  projects,
  activeIndex,
  activeProject,
  goTo,
  isPaused,
  setIsPaused,
  handlePrev,
  handleNext,
  autoPlayDuration,
}: OtherWorkDesktopProps) {
  return (
<div className="hidden md:grid md:grid-cols-12 md:items-stretch md:gap-8 lg:gap-12">
  <div className="col-span-5 flex flex-col justify-center">
    <div className="flex flex-col">
      {projects.map(
        (
          project,
          index,
        ) => {
          const isActive =
            activeIndex ===
            index;

          return (
            <button
              key={
                project.slug
              }
              type="button"
              onClick={() =>
                goTo(index)
              }
              className={[
                "group relative flex cursor-pointer items-start gap-3 border-t border-border/50 py-4 text-left first:border-0 lg:py-5",
                isActive
                  ? "text-foreground"
                  : "text-foreground-muted hover:text-foreground",
              ].join(
                " ",
              )}
            >
              <div className="absolute bottom-0 left-[-16px] top-0 w-[2px] bg-border/50">
                {isActive && (
                  <motion.div
                    key={`${project.slug}-${isPaused}`}
                    className="absolute left-0 top-0 w-full origin-top bg-foreground"
                    initial={{
                      height:
                        "0%",
                    }}
                    animate={{
                      height:
                        isPaused
                          ? "0%"
                          : "100%",
                    }}
                    transition={{
                      duration:
                        autoPlayDuration /
                        1000,
                      ease:
                        "linear",
                    }}
                  />
                )}
              </div>

              <span className="mt-1 text-[10px] font-medium tabular-nums opacity-45">
                /
                {String(
                  index + 1,
                ).padStart(
                  2,
                  "0",
                )}
              </span>

              <div className="flex flex-1 flex-col gap-2">
                <span className="text-2xl font-normal tracking-tight lg:text-3xl xl:text-4xl">
                  {
                    project.title
                  }
                </span>

                <AnimatePresence
                  mode="wait"
                >
                  {isActive && (
                    <motion.div
                      initial={{
                        opacity:
                          0,
                        height:
                          0,
                      }}
                      animate={{
                        opacity:
                          1,
                        height:
                          "auto",
                      }}
                      exit={{
                        opacity:
                          0,
                        height:
                          0,
                      }}
                      transition={{
                        duration:
                          0.3,
                        ease: [
                          0.23,
                          1,
                          0.32,
                          1,
                        ],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-sm pb-1 text-sm leading-relaxed text-foreground-muted">
                        {
                          project.description
                        }
                      </p>

                      {project.url ? (
                        <a
                          href={
                            project.url
                          }
                          target="_blank"
                          rel="noreferrer"
                          onClick={(
                            event,
                          ) =>
                            event.stopPropagation()
                          }
                          className="mt-2 inline-flex text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 transition hover:text-foreground"
                        >
                          Visit
                          project ↗
                        </a>
                      ) : (
                        <span className="mt-2 inline-flex text-xs font-medium uppercase tracking-[0.15em] text-foreground-subtle">
                          In
                          development
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        },
      )}
    </div>
  </div>

  <div className="col-span-7">
    <div
      className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-border/40 bg-surface-1"
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={
            activeProject.slug
          }
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          transition={{
            duration: 0.34,
            ease: [
              0.32,
              0.72,
              0,
              1,
            ],
          }}
          className="absolute inset-0"
        >
          <DesktopProjectPreview
            project={
              activeProject
            }
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-7 pb-7 pt-24 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">
              Project /
              {String(
                activeIndex +
                  1,
              ).padStart(
                2,
                "0",
              )}
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <h3 className="min-w-0 text-3xl font-medium tracking-tight">
                {activeProject.title}
              </h3>

              <ProjectCountryBadge project={activeProject} variant="desktop" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 z-20 flex gap-3">
        <button
          type="button"
          onClick={
            handlePrev
          }
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
          aria-label="Anterior"
        >
          ←
        </button>

        <button
          type="button"
          onClick={
            handleNext
          }
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </div>
  </div>
</div>
  );
}

function DesktopProjectPreview({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(123,140,255,0.12),transparent_38%),#0d0d0f]">
      <div
        className={[
          "absolute top-[9%] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl [aspect-ratio:1.986/1]",
          project.preview.mobile
            ? "left-[7%] right-[7%]"
            : "left-1/2 w-[86%] -translate-x-1/2",
        ].join(" ")}
      >
        <Image
          src={
            project.preview
              .desktop
          }
          alt={`${project.title} desktop`}
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      {project.preview.mobile && (
        <div className="absolute bottom-[10%] right-[8%] w-[24%] overflow-hidden rounded-[1.7rem] border-[4px] border-white/15 bg-black shadow-2xl [aspect-ratio:0.45/1]">
          <Image
            src={
              project.preview
                .mobile
            }
            alt={`${project.title} mobile`}
            fill
            sizes="120px"
            className="object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}
