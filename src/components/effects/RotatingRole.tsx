"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const roles = [
  "Diseño y Desarrollo web",
  "Aplicaciones a medida",
  "Full-stack development",
  "Clases de programación",
  "Tutorías de proyectos",
];

interface RotatingRoleProps {
  onChange?: () => void;
}

export function RotatingRole({ onChange }: RotatingRoleProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
      onChange?.();
    }, 3200);

    return () => window.clearInterval(interval);
  }, [onChange, prefersReducedMotion]);

  return (
    <div className="relative h-5 min-w-[16rem] overflow-hidden text-right">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.38,
            ease: "easeInOut",
          }}
          className="absolute right-0 text-[0.68rem] font-medium uppercase leading-5 tracking-[0.12em] text-white/80"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}