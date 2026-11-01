"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { OtherWorkDesktop } from "@/components/other-work/OtherWorkDesktop";
import { OtherWorkMobile } from "@/components/other-work/OtherWorkMobile";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Project } from "@/types/project";

const AUTO_PLAY_DURATION = 7000;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

type OtherWorkTabsProps = {
  projects: Project[];
};

export function OtherWorkTabs({
  projects,
}: OtherWorkTabsProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [isVisible, setIsVisible] =
    useState(false);

  const [visibilityCycle, setVisibilityCycle] =
    useState(0);

  const isDesktop = useMediaQuery(
    DESKTOP_MEDIA_QUERY,
  );

  const len = projects.length;

  useEffect(() => {
    const element =
      containerRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          const nextVisible =
            entry?.isIntersecting ??
            false;

          setIsVisible(
            (currentVisible) => {
              if (
                nextVisible &&
                !currentVisible
              ) {
                setVisibilityCycle(
                  (current) =>
                    current + 1,
                );
              }

              return nextVisible;
            },
          );
        },
        {
          threshold: 0.08,
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (len === 0) {
        return;
      }

      setActiveIndex(
        ((index % len) + len) %
          len,
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
      !isVisible ||
      len <= 1
    ) {
      return;
    }

    const timeout =
      window.setTimeout(
        handleNext,
        AUTO_PLAY_DURATION,
      );

    return () =>
      window.clearTimeout(
        timeout,
      );
  }, [
    activeIndex,
    handleNext,
    isPaused,
    isVisible,
    len,
    visibilityCycle,
  ]);

  if (len === 0) {
    return null;
  }

  const activeProject =
    projects[activeIndex]!;

  return (
    <div
      ref={containerRef}
      className="w-full"
    >
      {isDesktop ? (
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
      ) : (
        <OtherWorkMobile
          projects={projects}
          activeIndex={activeIndex}
          goTo={goTo}
          autoPlayDuration={AUTO_PLAY_DURATION}
          isVisible={isVisible}
          visibilityCycle={visibilityCycle}
        />
      )}
    </div>
  );
}
