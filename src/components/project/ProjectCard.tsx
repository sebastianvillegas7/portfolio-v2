import Link from "next/link";

import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-border p-5">
      <p className="text-sm text-muted-foreground">
        {project.category} · {project.year}
      </p>
      <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
      <Link className="mt-4 inline-block text-sm underline underline-offset-4" href={`/work/${project.slug}`}>
        View project
      </Link>
    </article>
  );
}
