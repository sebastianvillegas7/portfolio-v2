"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const PROJECTS = [
  {
    id: "01",
    title: "Sol Hair Stylist",
    description: "Hair stylist website.",
    url: "https://solhairstylist.com/",
  },
  {
    id: "02",
    title: "New Era",
    description: "Beauty salon & barbershop website.",
    url: "https://salonnewera.com/",
  },
  {
    id: "03",
    title: "Henry Junk Removal",
    description: "Junk removal business website.",
    url: "https://hcjunkremovalny.com/",
  },
  {
    id: "04",
    title: "Agenda Clases",
    description: "SaaS / appointment management.",
    url: "",
  },
  {
    id: "05",
    title: "ArtCut",
    description: "Salon website.",
    url: "https://www.artcutsalon.com/",
  },
];

const AUTO_PLAY_DURATION = 5000;

const slideTransition = {
  duration: 0.34,
  ease: [0.32, 0.72, 0, 1] as const,
};

const slideVariants = {
  enter: { y: "-100%" },
  center: { y: 0 },
  exit: { y: "100%" },
};

export default function VerticalTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length
    );
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const active = PROJECTS[activeIndex]!;

  return (
    <div className="@container w-full">
      <div className="grid grid-cols-12 items-stretch gap-10 lg:gap-14">
        <div className="col-span-5 flex flex-col justify-center">
          <div className="flex flex-col">
            {PROJECTS.map((project, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={project.id}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "group relative flex cursor-pointer items-start gap-4 border-t border-border/50 py-5 text-left transition-[color] duration-150 ease-out first:border-0 lg:py-6",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/50 hover:text-foreground"
                  )}
                >
                  <div className="absolute bottom-0 left-[-18px] top-0 w-[2px] bg-muted">
                    {isActive && (
                      <motion.div
                        key={`progress-${index}-${isPaused}`}
                        className="absolute left-0 top-0 w-full origin-top bg-foreground"
                        initial={{ height: "0%" }}
                        animate={
                          isPaused ? { height: "0%" } : { height: "100%" }
                        }
                        transition={{
                          duration: AUTO_PLAY_DURATION / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </div>

                  <span className="mt-1 text-[10px] font-medium tabular-nums opacity-45">
                    /{project.id}
                  </span>

                  <div className="flex flex-1 flex-col gap-2">
                    <span
                      className={cn(
                        "text-2xl font-normal tracking-tight transition-colors duration-150 lg:text-3xl xl:text-4xl",
                        isActive ? "text-foreground" : ""
                      )}
                    >
                      {project.title}
                    </span>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-sm pb-1 text-sm font-normal leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>

                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="mt-2 inline-flex text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 transition hover:text-foreground"
                            >
                              Visit project ↗
                            </a>
                          ) : (
                            <span className="mt-2 inline-flex text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                              In development
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-7 flex h-full flex-col justify-end">
          <div
            className="group/gallery relative h-full min-h-[560px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-full min-h-[560px] overflow-hidden rounded-[2.5rem] border border-border/40 bg-muted/30">
              <AnimatePresence initial={false}>
                <GallerySlide
                  key={active.id}
                  project={active}
                  onClick={handleNext}
                />
              </AnimatePresence>

              <div className="absolute bottom-7 right-7 z-20 flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 active:scale-90"
                  aria-label="Previous"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 active:scale-90"
                  aria-label="Next"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GallerySlide({
  project,
  onClick,
}: {
  project: (typeof PROJECTS)[number];
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={slideTransition}
      className="absolute inset-0 h-full w-full cursor-pointer"
      onClick={onClick}
    >
      <ProjectPreview />

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-8 pb-8 pt-28 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">
          Project /{project.id}
        </p>
        <h3 className="mt-2 text-3xl font-medium tracking-tight">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

function ProjectPreview() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#991b1b]">
      <div className="absolute left-[7%] right-[7%] top-[9%] h-[62%] rounded-2xl border border-white/25 bg-[#ef4444] shadow-2xl">
        <div className="absolute left-[4%] top-[6%] h-2 w-24 rounded-full bg-white/20" />
        <div className="absolute left-[4%] top-[11%] h-2 w-14 rounded-full bg-white/15" />
      </div>

      <div className="absolute bottom-[10%] right-[8%] h-[58%] w-[24%] rounded-[1.7rem] border-[4px] border-white/45 bg-[#dc2626] shadow-2xl">
        <div className="mx-auto mt-3 h-1.5 w-8 rounded-full bg-white/25" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  );
}
