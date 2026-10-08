"use client";

import { useEffect, useRef } from "react";

import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";
import { globalPerformanceState } from "@/components/effects/global-performance-state";

export function GlobalEffects() {
  const scrollTimeoutRef =
    useRef<number | null>(null);

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        "(max-width: 767px)",
      );

    const updateMobile = () => {
      globalPerformanceState.isMobile =
        mobileQuery.matches;
    };

    const handleScroll = () => {
      globalPerformanceState.isScrolling =
        true;

      if (
        scrollTimeoutRef.current !== null
      ) {
        window.clearTimeout(
          scrollTimeoutRef.current,
        );
      }

      scrollTimeoutRef.current =
        window.setTimeout(() => {
          globalPerformanceState.isScrolling =
            false;
        }, 120);
    };

    const handleVisibilityChange =
      () => {
        globalPerformanceState.isDocumentVisible =
          !document.hidden;
      };

    updateMobile();
    handleVisibilityChange();

    mobileQuery.addEventListener(
      "change",
      updateMobile,
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        updateMobile,
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      if (
        scrollTimeoutRef.current !== null
      ) {
        window.clearTimeout(
          scrollTimeoutRef.current,
        );
      }
    };
  }, []);

  return (
    <>
      <GlobalLight />
      {/* <FluidCursor /> */}
    </>
  );
}