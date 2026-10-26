"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { CountryFlag } from "@/components/project/CountryFlag";
import type { Project } from "@/types/project";

const AUTO_PLAY_DURATION = 7000;

type VerticalTabsProps = {
  projects: Project[];
};

export default function VerticalTabs({
  projects,
}: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const len = projects.length;

  const goTo = useCallback(
    (index: number) => {
      if (len === 0) {
        return;
      }

      setActiveIndex(
        ((index % len) + len) % len,
      );

      setIsPaused(false);
    },
    [len],
  );

  const handleNext =
    useCallback(() => {
      if (len <= 1) {
        return;
      }

      setActiveIndex(
        (current) =>
          (current + 1) % len,
      );
    }, [len]);

  const handlePrev =
    useCallback(() => {
      if (len <= 1) {
        return;
      }

      setActiveIndex(
        (current) =>
          (current - 1 + len) %
          len,
      );
    }, [len]);

  useEffect(() => {
    if (
      isPaused ||
      len <= 1
    ) {
      return;
    }

    const interval =
      window.setInterval(
        handleNext,
        AUTO_PLAY_DURATION,
      );

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    activeIndex,
    handleNext,
    isPaused,
    len,
  ]);

  if (len === 0) {
    return null;
  }

  const activeProject =
    projects[activeIndex]!;

  return (
    <div className="w-full">
      {/* =====================================================
          MOBILE ACCORDION
      ====================================================== */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-[1.6rem] border border-border/50 bg-surface-1">
          {projects.map(
            (
              project,
              index,
            ) => {
              const isActive =
                index ===
                activeIndex;

              return (
                <article
                  key={
                    project.slug
                  }
                  className="border-b border-border/50 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      goTo(index)
                    }
                    className="relative flex w-full items-center gap-3 px-4 py-3 text-left"
                  >
                    <span className="text-[0.58rem] font-medium tabular-nums text-foreground-subtle">
                      /
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span
                      className={[
                        "text-sm tracking-[-0.02em] transition-colors duration-200",
                        isActive
                          ? "font-medium text-foreground"
                          : "text-foreground-muted",
                      ].join(
                        " ",
                      )}
                    >
                      {
                        project.title
                      }
                    </span>

                    {isActive && (
                      <div className="absolute inset-x-0 bottom-0 h-px bg-border/60">
                        <motion.div
                          key={project.slug}
                          className="h-full origin-left bg-brand-soft"
                          initial={{
                            scaleX: 0,
                          }}
                          animate={{
                            scaleX: 1,
                          }}
                          transition={{
                            duration:
                              AUTO_PLAY_DURATION /
                              1000,
                            ease: "linear",
                          }}
                          style={{
                            willChange: "transform",
                            transformOrigin: "left center",
                          }}
                        />
                      </div>
                    )}
                  </button>

                  <AnimatePresence
                    initial={false}
                  >
                    {isActive && (
                      <motion.div
                        key={
                          project.slug
                        }
                        initial={{
                          height:
                            0,
                          opacity:
                            0,
                        }}
                        animate={{
                          height:
                            "auto",
                          opacity:
                            1,
                        }}
                        exit={{
                          height:
                            0,
                          opacity:
                            0,
                        }}
                        transition={{
                          duration:
                            0.42,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 pt-4">
                          <MobileProjectPreview
                            project={
                              project
                            }
                          />

                          <div className="mt-4">
                            <p className="text-[0.58rem] font-medium uppercase tracking-[0.14em] text-brand-soft">
                              {
                                project.category
                              }
                            </p>

                            <div className="mt-2 flex items-center justify-between gap-3">
                              <h3 className="min-w-0 text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-foreground">
                                {project.title}
                              </h3>

                              {project.slug !== "agenda-clases" && (
                                <span className="flex shrink-0 items-center gap-1.5 text-[0.66rem] font-medium uppercase tracking-[0.08em] text-foreground-muted">
                                  <CountryFlag
                                    code={project.countryCode}
                                    country={project.country}
                                  />
                                  <span>
                                    {project.countryCode.toLowerCase() === "es"
                                      ? "ESP"
                                      : "USA"}
                                  </span>
                                </span>
                              )}
                            </div>

                            <p className="mt-3 text-[0.82rem] leading-[1.55] text-foreground-muted">
                              {
                                project.description
                              }
                            </p>

                            <div className="mt-5 flex items-center justify-between gap-3">
                              {project.technologies.length > 0 && (
                                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                                  {project.technologies
                                    .slice(0, 4)
                                    .map((technology) => (
                                      <span
                                        key={technology}
                                        className="rounded-full border border-border/70 bg-background/35 px-2 py-1 text-[0.52rem] text-foreground-muted"
                                      >
                                        {technology}
                                      </span>
                                    ))}
                                </div>
                              )}

                              <div className="shrink-0">
                                {project.url ? (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="project-sticky-link inline-flex"
                                  >
                                    <span className="project-sticky-cta">
                                      <span>Explorar proyecto</span>
                                      <ArrowUpRight aria-hidden="true" />
                                    </span>
                                  </a>
                                ) : (
                                  <span className="inline-flex min-h-10 items-center rounded-full border border-border/70 px-4 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-foreground-subtle">
                                    Proyecto en desarrollo
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            },
          )}
        </div>
      </div>

      {/* =====================================================
          TABLET / DESKTOP
      ====================================================== */}
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
                              AUTO_PLAY_DURATION /
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

                    {activeProject.slug !== "agenda-clases" && (
                      <span className="flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-white/70">
                        <CountryFlag
                          code={activeProject.countryCode}
                          country={activeProject.country}
                        />
                        <span>
                          {activeProject.countryCode.toLowerCase() === "es"
                            ? "ESP"
                            : "USA"}
                        </span>
                      </span>
                    )}
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
    </div>
  );
}

function MobileProjectPreview({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="relative h-[235px] overflow-visible">
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-[1.35rem] bg-[radial-gradient(circle_at_70%_20%,rgba(123,140,255,0.12),transparent_38%),#0d0d0f]"
      />

      <div
        className={[
          "absolute top-[10%] z-10",
          project.preview.mobile
            ? "left-0 w-[86%]"
            : "left-1/2 w-[92%] -translate-x-1/2",
        ].join(" ")}
      >
        <div
          className="relative overflow-hidden rounded-[0.55rem_0.55rem_0.15rem_0.15rem] border-[3px] border-[#1b2027] bg-black shadow-[0_14px_28px_rgba(0,0,0,0.30)]"
          style={{
            aspectRatio:
              "1.986 / 1",
          }}
        >
          <Image
            src={
              project.preview
                .desktop
            }
            alt={`${project.title} desktop`}
            fill
            sizes="(max-width: 767px) 78vw, 320px"
            className="object-cover object-top"
          />
        </div>

        <div className="relative -left-[3%] h-[0.42rem] w-[106%] rounded-b-[0.65rem] bg-gradient-to-b from-[#363d46] to-[#171b20]" />
      </div>

      {project.preview.mobile && (
        <div className="absolute right-0 top-[0%] z-20 w-[27%] rounded-[1rem] border border-white/15 bg-gradient-to-br from-[#424a55] via-[#101318] to-[#343b44] p-[0.18rem] shadow-[-8px_12px_24px_rgba(0,0,0,0.42)]">
          <div
            className="relative overflow-hidden rounded-[0.78rem] bg-black"
            style={{
              aspectRatio:
                "0.45 / 1",
            }}
          >
            <Image
              src={
                project.preview
                  .mobile
              }
              alt={`${project.title} mobile`}
              fill
              sizes="82px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}
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
