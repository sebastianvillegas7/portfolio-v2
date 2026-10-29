"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { OtherWorkDesktop } from "@/components/other-work/OtherWorkDesktop";
import { OtherWorkMobile } from "@/components/other-work/OtherWorkMobile";
import type { Project } from "@/types/project";

const AUTO_PLAY_DURATION = 7000;

type VerticalTabsProps = {
  projects: Project[];
};

export default function VerticalTabs({
  projects,
}: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const len = projects.length;

  const goTo = useCallback(
    (index: number) => {
      if (len === 0) {
        return;
      }

      setActiveIndex(
        ((index % len) + len) % len,
      );

      setIsPaused(false);
    },
    [len],
  );

  const handleNext =
    useCallback(() => {
      if (len <= 1) {
        return;
      }

      setActiveIndex(
        (current) =>
          (current + 1) % len,
      );
    }, [len]);

  const handlePrev =
    useCallback(() => {
      if (len <= 1) {
        return;
      }

      setActiveIndex(
        (current) =>
          (current - 1 + len) %
          len,
      );
    }, [len]);

  useEffect(() => {
    if (
      isPaused ||
      len <= 1
    ) {
      return;
    }

    const interval =
      window.setInterval(
        handleNext,
        AUTO_PLAY_DURATION,
      );

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    activeIndex,
    handleNext,
    isPaused,
    len,
  ]);

  if (len === 0) {
    return null;
  }

  const activeProject =
    projects[activeIndex]!;

  return (
    <div className="w-full">
      <OtherWorkMobile
        projects={projects}
        activeIndex={activeIndex}
        goTo={goTo}
        autoPlayDuration={AUTO_PLAY_DURATION}
      />

      <OtherWorkDesktop
        projects={projects}
        activeIndex={activeIndex}
        activeProject={activeProject}
        goTo={goTo}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        handlePrev={handlePrev}
        handleNext={handleNext}
        autoPlayDuration={AUTO_PLAY_DURATION}
      />
    </div>
  );
}
