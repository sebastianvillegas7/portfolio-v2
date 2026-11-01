"use client";

import Image from "next/image";
import {
  Building2,
  CalendarDays,
  Quote,
  Star,
} from "lucide-react";

import type {
  PublicTestimonial,
  TechnologyId,
} from "@/features/testimonials/types";
import { cn } from "@/lib/utils";

const technologyLabels: Record<TechnologyId, string> = {
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

  return new Intl.DateTimeFormat(
    language === "es" ? "es-AR" : "en-US",
    {
      month: "short",
      year: "numeric",
    },
  ).format(new Date(date));
}

export function TestimonialCard({
  testimonial,
  active,
  language,
}: Props) {
  const date = formatDate(testimonial.date, language);

  return (
    <article
      className={cn(
        "relative flex min-h-[19rem] flex-col overflow-hidden rounded-[1.6rem] border bg-surface-2 p-5 transition-[opacity,transform,border-color] duration-500",
        active
          ? "scale-100 border-white/15 opacity-100"
          : "scale-[0.965] border-white/8 opacity-40",
      )}
    >
      <Quote
        aria-hidden="true"
        className="absolute right-5 top-5 size-8 text-white/[0.055]"
      />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-0.5"
          aria-label={`${testimonial.rating} / 5`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className={cn(
                "size-3.5",
                index < testimonial.rating
                  ? "fill-brand-soft text-brand-soft"
                  : "text-white/15",
              )}
            />
          ))}
        </div>

        {date ? (
          <div className="flex items-center gap-1.5 text-[0.66rem] text-foreground-subtle">
            <CalendarDays
              aria-hidden="true"
              className="size-3"
            />
            {date}
          </div>
        ) : null}
      </div>

      <blockquote className="relative z-10 mt-5 text-[0.94rem] leading-[1.65] text-foreground/88">
        “{testimonial.comment}”
      </blockquote>

      <div className="relative z-10 mt-auto pt-6">
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
            {testimonial.photoUrl ? (
              <Image
                src={testimonial.photoUrl}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white/70">
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {testimonial.name}
            </p>

            {testimonial.institution ? (
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-[0.68rem] text-foreground-muted">
                <Building2
                  aria-hidden="true"
                  className="size-3 shrink-0"
                />
                {testimonial.institution}
              </p>
            ) : null}
          </div>
        </div>

        {testimonial.technologies.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {testimonial.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-brand-500/20 bg-brand-500/[0.07] px-2.5 py-1 text-[0.62rem] font-medium text-brand-300"
              >
                {technologyLabels[technology]}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
