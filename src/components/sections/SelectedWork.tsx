import { ProjectShowcase } from "@/components/project-showcase";
import { MagicCard } from "@/components/ui/magic-card";
import { featuredProjects } from "@/data/projects";

import "@/styles/selected-work.css";

export function SelectedWork() {
  const [mainProject, ...secondaryProjects] = featuredProjects;

  if (!mainProject) {
    return null;
  }

  return (
    <section
      id="work"
      className="selected-work section"
      aria-labelledby="selected-work-title"
    >
      <div className="page-container">
        <div className="selected-work-header">
          <div className="selected-work-heading">
            <p className="selected-work-eyebrow">
              Selected Work
            </p>

            <h2
              id="selected-work-title"
              className="selected-work-title"
            >
              Algunos proyectos recientes
            </h2>
          </div>

          <p className="selected-work-intro">
            Una selección de proyectos donde producto, comercio y experiencia
            digital se combinan para resolver necesidades reales.
          </p>
        </div>

        <div className="selected-work-main">
          <ProjectShowcase
            projects={[
              {
                title: mainProject.title,
                description: mainProject.description,
                year: String(mainProject.year),
                link: `/work/${mainProject.slug}`,
                image: mainProject.cover,
              },
            ]}
          />
        </div>

        <div className="selected-work-secondary">
          {secondaryProjects.map((project, index) => (
            <MagicCard
              key={project.slug}
              className="selected-work-magic-card"
              gradientColor="var(--surface-2)"
              gradientFrom="var(--brand-600)"
              gradientTo="var(--brand-500)"
              gradientOpacity={0.32}
              gradientSize={240}
            >
              <article className="selected-work-card">
                <a
                  href={`/work/${project.slug}`}
                  className="selected-work-card-link"
                >
                  <div className="selected-work-card-media">
                    <img
                      src={project.cover}
                      alt={`Vista previa de ${project.title}`}
                    />
                  </div>

                  <div className="selected-work-card-body">
                    <div className="selected-work-card-meta">
                      <span>
                        {String(index + 2).padStart(2, "0")}
                      </span>

                      <span>
                        {project.category}
                      </span>
                    </div>

                    <h3 className="selected-work-card-title">
                      {project.title}
                    </h3>

                    <p className="selected-work-card-location">
                      {project.location}
                    </p>

                    <p className="selected-work-card-description">
                      {project.description}
                    </p>

                    <div className="selected-work-card-technologies">
                      {project.technologies.map((technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="selected-work-card-cta">
                      <span>Ver caso</span>
                      <span aria-hidden="true">↗</span>
                    </div>
                  </div>
                </a>
              </article>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}