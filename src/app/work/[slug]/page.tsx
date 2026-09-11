import { notFound } from "next/navigation";

import { projects } from "@/data/projects";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <p className="text-sm text-muted-foreground">
        {project.category} · {project.location}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{project.title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{project.description}</p>
      <div className="mt-12">
        
      </div>
    </article>
  );
}
