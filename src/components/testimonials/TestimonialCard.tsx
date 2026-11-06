"use client";

import Image from "next/image";
import {
  Building2,
  CalendarDays,
  Code2,
  Quote,
  Star,
} from "lucide-react";

import type {
  PublicTestimonial,
  TechnologyId,
} from "@/features/testimonials/types";
import { cn } from "@/lib/utils";

const TECHNOLOGY_LABELS: Record<TechnologyId, string> = {
  java: "Java",
  javascript: "JavaScript",
  python: "Python",
  angular: "Angular",
  react: "React",
  "c-family": "C / C++ / C#",
  sql: "SQL",
  mongodb: "MongoDB",
  "html-css": "HTML & CSS",
};

const TECHNOLOGY_BADGE_CLASS: Record<
  TechnologyId,
  string
> = {
  java: "tech-badge--java",
  javascript: "tech-badge--javascript",
  python: "tech-badge--python",
  angular: "tech-badge--angular",
  react: "tech-badge--react",
  "c-family": "tech-badge--c-family",
  sql: "tech-badge--sql",
  mongodb: "tech-badge--mongodb",
  "html-css": "tech-badge--html-css",
};

const DATE_FORMATTERS = {
  es: new Intl.DateTimeFormat("es-AR", {
    month: "short",
    year: "numeric",
  }),
  en: new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }),
} as const;

type Props = {
  testimonial: PublicTestimonial;
  active: boolean;
  language: "es" | "en";
};

function formatDate(
  date: string | null,
  language: "es" | "en",
): string | null {
  if (!date) {
    return null;
  }

  return DATE_FORMATTERS[language].format(
    new Date(date),
  );
}

export function TestimonialCard({
  testimonial,
  active,
  language,
}: Props) {
  const date = formatDate(
    testimonial.date,
    language,
  );
  const technologiesLabel =
    language === "es"
      ? "Tecnologías"
      : "Technologies";
  const ratingLabel =
    language === "es"
      ? "Valoración"
      : "Rating";

  return (
    <article
      className={cn(
        "testimonial-card relative overflow-hidden rounded-[1.45rem] border p-3.5 transition-[opacity,transform,border-color] duration-300 motion-reduce:transform-none motion-reduce:transition-none sm:rounded-[1.55rem] sm:p-5",
        active
          ? "testimonial-card--active scale-100 opacity-100"
          : "scale-[0.98] opacity-40",
      )}
    >
      <header className="flex items-start gap-3">
        <div className="relative size-13 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
          {testimonial.photoUrl ? (
            <Image
              src={testimonial.photoUrl}
              alt=""
              fill
              sizes="52px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-foreground-muted">
              {testimonial.name
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="truncate text-[0.92rem] font-semibold tracking-[-0.01em] text-foreground sm:text-[0.94rem]">
            {testimonial.name}
          </p>

          {testimonial.institution ? (
            <div className="testimonial-meta-chip mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.66rem] font-medium text-foreground-muted sm:text-[0.68rem]">
              <Building2
                aria-hidden="true"
                className="size-3 shrink-0"
              />
              <span className="truncate">
                {testimonial.institution}
              </span>
            </div>
          ) : null}
        </div>

        <Quote
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 fill-brand-500/20 text-brand-soft/65 sm:size-6"
        />
      </header>

      {testimonial.technologies.length > 0 ? (
        <div className="mt-3.5 sm:mt-4">
          <div className="mb-2 flex items-center gap-1.5 text-[0.61rem] font-semibold uppercase tracking-[0.13em] text-foreground-subtle sm:text-[0.63rem]">
            <Code2
              aria-hidden="true"
              className="size-3"
            />
            {technologiesLabel}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {testimonial.technologies.map(
              (technology) => (
                <span
                  key={technology}
                  className={cn(
                    "tech-badge rounded-lg px-2 py-1.5 text-[0.65rem] font-semibold leading-none sm:px-2.5 sm:text-[0.68rem]",
                    TECHNOLOGY_BADGE_CLASS[
                      technology
                    ],
                  )}
                >
                  {
                    TECHNOLOGY_LABELS[
                      technology
                    ]
                  }
                </span>
              ),
            )}
          </div>
        </div>
      ) : null}

      <blockquote className="mt-3.5 text-[0.9rem] leading-[1.58] text-foreground/90 sm:mt-4 sm:text-[0.92rem] sm:leading-[1.65]">
        “{testimonial.comment}”
      </blockquote>

      <footer className="mt-3.5 flex items-center justify-between gap-2.5 border-t border-white/[0.07] pt-3 sm:mt-4 sm:gap-3 sm:pt-3.5">
        <div
          className="flex min-w-0 items-center gap-1.5 sm:gap-2"
          aria-label={`${ratingLabel}: ${testimonial.rating} / 5`}
        >
          <div className="flex items-center gap-0.5">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className={cn(
                  "size-3.5",
                  index < testimonial.rating
                    ? "fill-foreground text-foreground"
                    : "text-foreground-subtle/35",
                )}
              />
            ))}
          </div>

          <span className="text-[0.66rem] font-semibold text-foreground-muted sm:text-[0.68rem]">
            {testimonial.rating}/5
          </span>
        </div>

        {date ? (
          <div className="flex shrink-0 items-center gap-1.5 text-[0.62rem] text-foreground-subtle sm:text-[0.64rem]">
            <CalendarDays
              aria-hidden="true"
              className="size-3"
            />
            {date}
          </div>
        ) : null}
      </footer>
    </article>
  );
}
