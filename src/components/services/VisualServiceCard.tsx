"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import { cardVariants } from "@/components/services/ServiceGroup";
import type { MicroSlide } from "@/components/services/types";

type VisualServiceCardProps = {
  slides: readonly MicroSlide[];
  active: boolean;
  images: readonly [string, ...string[]];
  intervalMs?: number;
};

export function VisualServiceCard({
  slides,
  active,
  images,
  intervalMs = 3000,
}: VisualServiceCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!active || slides.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % slides.length,
      );
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [active, intervalMs, slides.length]);

  const current = slides[activeIndex]!;
  const visualItem =
    images[activeIndex % images.length]!;

  return (
    <motion.article
      variants={cardVariants}
      className="service-mini-card relative overflow-hidden rounded-[1.55rem] border p-4 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--service-card-bg)]"
      />

      <div className="absolute inset-x-0 top-0 h-[9.4rem] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={visualItem}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={visualItem}
              alt=""
              fill
              sizes="(max-width: 767px) 44vw, 340px"
              loading={active ? "eager" : "lazy"}
              decoding="async"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="service-mini-card-fade absolute inset-0"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-end">
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <span
                key={index}
                className={[
                  "h-1 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-4 bg-white/70"
                    : "w-1 bg-white/20",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex min-h-[5.6rem] items-end">
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0,
                y: 7,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              <h4 className="text-[1.12rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                {current.title}
              </h4>

              <p className="mt-1.5 text-[0.73rem] leading-[1.45] text-white/70">
                {current.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
