"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import { ProjectCountryBadge } from "@/components/other-work/ProjectCountryBadge";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/types/project";

type OtherWorkMobileProps = {
  projects: Project[];
  activeIndex: number;
  goTo: (index: number) => void;
  autoPlayDuration: number;
};

export function OtherWorkMobile({
  projects,
  activeIndex,
  goTo,
  autoPlayDuration,
}: OtherWorkMobileProps) {
  const { t } = useLanguage();

  return (
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
                        autoPlayDuration /
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

                        <ProjectCountryBadge project={project} variant="mobile" />
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
                                <span>{t.otherWork.exploreProject}</span>
                                <ArrowUpRight aria-hidden="true" />
                              </span>
                            </a>
                          ) : (
                            <span className="inline-flex min-h-10 items-center rounded-full border border-border/70 px-4 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-foreground-subtle">
                              {t.otherWork.projectInDevelopment}
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
