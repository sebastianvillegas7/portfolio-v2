"use client";

import type { ReactNode } from "react";

import { motion } from "motion/react";

type SectionHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  titleId?: string;
  className?: string;
};

const viewport = {
  once: true,
  amount: 0.45,
  margin: "0px 0px -12% 0px",
} as const;

const itemTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <motion.p
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={viewport}
        transition={itemTransition}
        className="
          mb-3
          text-[0.64rem]
          font-medium
          uppercase
          tracking-[0.16em]
          text-brand-soft
        "
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        id={titleId}
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={viewport}
        transition={{
          ...itemTransition,
          delay: 0.1,
        }}
        className="
          m-0
          max-w-[9ch]
          text-[clamp(2.5rem,11vw,3.2rem)]
          font-semibold
          leading-[0.96]
          tracking-[-0.04em]
          text-foreground

          md:max-w-none
          md:text-[clamp(3.5rem,7vw,4.6rem)]

          lg:text-[clamp(3.8rem,5vw,5rem)]
        "
      >
        {title}
      </motion.h2>
    </div>
  );
}
