"use client";

import { motion } from "motion/react";

import { LightRays } from "@/components/effects/LightRays";
import { ProjectStickyStack } from "@/components/project/ProjectStickyStack";
import { featuredProjects } from "@/data/projects";

import "@/styles/selected-work.css";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="selected-work overflow-hidden"
      aria-labelledby="selected-work-title"
    >
      {/* Luz ambiental desde la izquierda */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0.18, x: "-5%" }}
        animate={{
          opacity: [0.18, 0.38, 0.22],
          x: ["-5%", "2%", "-2%"],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: "scaleX(-1)",
          }}
        >
          <LightRays
            color="#a8b7ff"
            speed={0.09}
            spread={1.25}
            length={1.65}
            followPointer={false}
            pointerInfluence={0}
          />
        </div>
      </motion.div>

      {/* Máscara para proteger texto y parte izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: `
            linear-gradient(
              90deg,
              color-mix(in srgb, var(--background) 96%, transparent) 0%,
              color-mix(in srgb, var(--background) 88%, transparent) 30%,
              color-mix(in srgb, var(--background) 45%, transparent) 56%,
              transparent 82%
            )
          `,
        }}
      />

      <div className="page-container relative z-10">
        <header className="selected-work-header">
          <p className="selected-work-eyebrow">
            Selected Work
          </p>

          <div className="selected-work-header-content">
            <h2
              id="selected-work-title"
              className="selected-work-title"
            >
              Trabajo seleccionado
            </h2>

            <p className="selected-work-intro">
              Una selección de productos digitales, experiencias web y
              e-commerce desarrollados para necesidades reales.
            </p>
          </div>
        </header>

        <ProjectStickyStack projects={featuredProjects} />
      </div>
    </section>
  );
}