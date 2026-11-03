"use client";

import {
  useMemo,
} from "react";

import { ProjectStickyStack } from "@/components/project/ProjectStickyStack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizeProjects } from "@/i18n/translations";

import "@/styles/selected-work.css";

export function SelectedWork() {
  const {
    language,
    t,
  } = useLanguage();

  const localizedProjects =
    useMemo(
      () =>
        localizeProjects(
          featuredProjects,
          language,
        ),
      [language],
    );

  return (
    <section
      id="work"
      className="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="page-container relative z-10">
        <div className="selected-work-stage">
          <ProjectStickyStack
            projects={localizedProjects}
            title={
              <div className="selected-work-title-pin">
                <SectionHeading
                  eyebrow={
                    t.selectedWork.eyebrow
                  }
                  title={
                    t.selectedWork.title
                  }
                  titleId="selected-work-title"
                />
              </div>
            }
            intro={
              <>
                {
                  t.selectedWork
                    .intro
                }
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
