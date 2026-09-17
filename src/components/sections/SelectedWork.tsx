"use client";

import { ProjectStickyStack } from "@/components/project/ProjectStickyStack";
import { featuredProjects } from "@/data/projects";

import "@/styles/selected-work.css";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="page-container relative z-10">
        <div className="selected-work-stage">
          <div className="selected-work-title-pin">
            <p className="selected-work-eyebrow">
              Selected Work
            </p>

            <h2
              id="selected-work-title"
              className="selected-work-title"
            >
              Trabajo seleccionado
            </h2>
          </div>

          <ProjectStickyStack
            projects={featuredProjects}
            intro={
              <>
                Una selección de productos digitales,
                experiencias web y e-commerce desarrollados
                para necesidades reales.
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}