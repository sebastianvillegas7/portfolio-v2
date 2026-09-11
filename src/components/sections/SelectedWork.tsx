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
      <div className="page-container">
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