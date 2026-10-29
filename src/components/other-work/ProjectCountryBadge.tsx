"use client";

import { CountryFlag } from "@/components/project/CountryFlag";
import type { Project } from "@/types/project";

const COUNTRY_CODE_3: Record<string, string> = {
  ar: "ARG",
  es: "ESP",
  us: "USA",
};

type ProjectCountryBadgeProps = {
  project: Project;
  variant: "mobile" | "desktop";
};

function getCountryCode3(countryCode: string) {
  const normalized =
    countryCode.toLowerCase();

  return (
    COUNTRY_CODE_3[normalized] ??
    countryCode.toUpperCase()
  );
}

export function ProjectCountryBadge({
  project,
  variant,
}: ProjectCountryBadgeProps) {
  if (project.slug === "agenda-clases") {
    return null;
  }

  const className =
    variant === "mobile"
      ? "flex shrink-0 items-center gap-1.5 text-[0.66rem] font-medium uppercase tracking-[0.08em] text-foreground-muted"
      : "flex shrink-0 items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-white/70";

  return (
    <span className={className}>
      <CountryFlag
        code={project.countryCode}
        country={project.country}
      />

      <span>
        {getCountryCode3(
          project.countryCode,
        )}
      </span>
    </span>
  );
}
