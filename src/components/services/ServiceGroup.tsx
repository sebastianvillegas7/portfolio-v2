"use client";

import type { ReactNode, RefObject } from "react";

import {
  motion,
  stagger,
  type Variants,
} from "motion/react";

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const groupVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: stagger(0.42, {
        startDelay: 0.1,
      }),
    },
  },
};

type ServiceGroupProps = {
  children: ReactNode;
  groupRef: RefObject<HTMLDivElement | null>;
  startLater?: boolean;
};

export function ServiceGroup({
  children,
  groupRef,
  startLater = false,
}: ServiceGroupProps) {
  return (
    <motion.div
      ref={groupRef}
      className="grid min-w-0 grid-cols-2 grid-rows-[auto_14rem] gap-3"
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={
        startLater
          ? {
              once: true,
              amount: 0.22,
              margin: "0px 0px -14% 0px",
            }
          : {
              once: true,
              amount: 0.14,
            }
      }
    >
      {children}
    </motion.div>
  );
}
