"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  AiCloudIcon,
  CheckmarkCircle01Icon,
  CommandFreeIcons,
  DashboardSquare01Icon,
  GlobalSearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    id: "sol-hair",
    label: "Sol Hair Stylist",
    icon: CheckmarkCircle01Icon,
    description: "Hair stylist website.",
    url: "https://solhairstylist.com/",
  },
  {
    id: "new-era",
    label: "New Era",
    icon: CommandFreeIcons,
    description: "Beauty salon & barbershop website.",
    url: "https://salonnewera.com/",
  },
  {
    id: "henry",
    label: "Henry Junk Removal",
    icon: GlobalSearchIcon,
    description: "Junk removal business website.",
    url: "https://hcjunkremovalny.com/",
  },
  {
    id: "agenda",
    label: "Agenda Clases",
    icon: DashboardSquare01Icon,
    description: "SaaS / appointment management.",
    url: "",
  },
  {
    id: "artcut",
    label: "ArtCut",
    icon: AiCloudIcon,
    description: "Salon website.",
    url: "https://www.artcutsalon.com/",
  },
];

const AUTO_PLAY_INTERVAL = 3600;
const ITEM_HEIGHT = 58;

function shortestOffset(index: number, current: number, len: number) {
  let d = ((index - current) % len + len) % len;
  if (d > len / 2) d -= len;
  return d;
}

const chipSpring = {
  type: "tween" as const,
  duration: 0.42,
  ease: [0.4, 0, 0.2, 1] as const,
};

const cardSpring = {
  type: "tween" as const,
  duration: 0.38,
  ease: [0.4, 0, 0.2, 1] as const,
};

export default function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const len = PROJECTS.length;

  const currentIndex = ((step % len) + len) % len;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const delta = shortestOffset(index, currentIndex, len);
    if (delta !== 0) setStep((s) => s + delta);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const d = shortestOffset(index, currentIndex, len);
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    <div className="@container mx-auto w-full">
      <div className="relative flex min-h-[610px] flex-col overflow-hidden rounded-[2rem] border border-border/40">
        <div className="relative z-30 h-[205px] w-full shrink-0 overflow-hidden bg-foreground px-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-9 bg-gradient-to-b from-foreground via-foreground/85 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-9 bg-gradient-to-t from-foreground via-foreground/85 to-transparent" />

          <div className="relative z-20 flex h-full w-full items-center justify-center">
            {PROJECTS.map((project, index) => (
              <FeatureChip
                key={project.id}
                project={project}
                index={index}
                currentIndex={currentIndex}
                total={len}
                reduceMotion={!!reduceMotion}
                onSelect={() => handleChipClick(index)}
                onPause={() => setIsPaused(true)}
                onResume={() => setIsPaused(false)}
              />
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[405px] flex-1 items-center justify-center overflow-hidden border-t border-border/20 bg-secondary/20 px-5 py-8">
          <div className="relative flex aspect-[4/5] w-full max-w-[360px] items-center justify-center">
            {PROJECTS.map((project, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -62 : isNext ? 62 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.72,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.34 : 0,
                    rotate: isPrev ? -2.5 : isNext ? 2.5 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={reduceMotion ? { duration: 0 } : cardSpring}
                  className="absolute inset-0 origin-center overflow-hidden rounded-[1.8rem] border border-border/60 bg-background shadow-2xl"
                >
                  <ProjectPreview />

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.2, ease: [0.32, 0.72, 0, 1] }
                        }
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-6 pt-24 text-white"
                      >
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                          0{index + 1}
                        </p>
                        <h3 className="mt-1 text-2xl font-medium tracking-tight">
                          {project.label}
                        </h3>
                        <p className="mt-2 text-sm text-white/70">
                          {project.description}
                        </p>

                        {project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.15em] transition hover:bg-white hover:text-black"
                          >
                            Visit ↗
                          </a>
                        ) : (
                          <span className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/45">
                            In development
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectPreview() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#b91c1c]">
      <div className="absolute left-[8%] right-[8%] top-[9%] h-[44%] rounded-xl border border-white/25 bg-[#ef4444] shadow-2xl" />
      <div className="absolute bottom-[18%] right-[9%] h-[49%] w-[28%] rounded-[1.2rem] border-[3px] border-white/45 bg-[#dc2626] shadow-2xl" />
      <div className="absolute left-[10%] top-[12%] h-2 w-20 rounded-full bg-white/20" />
      <div className="absolute left-[10%] top-[17%] h-2 w-12 rounded-full bg-white/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
    </div>
  );
}

function FeatureChip({
  project,
  index,
  currentIndex,
  total,
  reduceMotion,
  onSelect,
  onPause,
  onResume,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  currentIndex: number;
  total: number;
  reduceMotion: boolean;
  onSelect: () => void;
  onPause: () => void;
  onResume: () => void;
}) {
  const offset = shortestOffset(index, currentIndex, total);
  const prevOffset = useRef(offset);
  const jumped = Math.abs(offset - prevOffset.current) > 1;

  useLayoutEffect(() => {
    prevOffset.current = offset;
  }, [offset]);

  const isActive = offset === 0;

  return (
    <motion.div
      initial={false}
      style={{ height: ITEM_HEIGHT, width: "fit-content" }}
      animate={{
        y: offset * ITEM_HEIGHT,
        opacity: Math.max(0, 1 - Math.abs(offset) * 0.28),
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : jumped
            ? { duration: 0 }
            : chipSpring
      }
      className="absolute flex items-center justify-start"
    >
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onPause}
        onMouseLeave={onResume}
        className={cn(
          "relative flex cursor-pointer items-center gap-3 rounded-full border px-5 py-3 text-left transition-[color,background-color,border-color] duration-150 ease-out active:scale-[0.97]",
          isActive
            ? "z-10 border-background bg-background text-foreground"
            : "border-background/15 bg-transparent text-background/50"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            isActive ? "text-foreground" : "text-background/35"
          )}
        >
          <HugeiconsIcon icon={project.icon} size={17} strokeWidth={2} />
        </div>

        <span className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.12em]">
          {project.label}
        </span>
      </button>
    </motion.div>
  );
}
