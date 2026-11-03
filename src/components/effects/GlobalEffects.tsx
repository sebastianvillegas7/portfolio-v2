"use client";

import { useEffect, useRef, useState } from "react";

import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";
import { globalPerformanceState } from "@/components/effects/global-performance-state";

const EFFECTS_FADE_DURATION_MS = 850;
const RESUME_GAP_PX = 48;
const FLUID_SUSPEND_Y_PX = 96;
const FLUID_RESUME_Y_PX = 144;

export function GlobalEffects() {
  const [effectsMounted, setEffectsMounted] = useState(true);
  const [lightFadedOut, setLightFadedOut] = useState(false);
  const [fluidHidden, setFluidHidden] = useState(false);

  const suspendedRef = useRef(false);
  const fluidSuspendedRef = useRef(false);
  const fadeTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const resumeFrameOneRef = useRef<number | null>(null);
  const resumeFrameTwoRef = useRef<number | null>(null);
  const fluidClipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clearFadeTimer = () => {
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };

    const clearResumeFrames = () => {
      if (resumeFrameOneRef.current !== null) {
        window.cancelAnimationFrame(resumeFrameOneRef.current);
        resumeFrameOneRef.current = null;
      }

      if (resumeFrameTwoRef.current !== null) {
        window.cancelAnimationFrame(resumeFrameTwoRef.current);
        resumeFrameTwoRef.current = null;
      }
    };

    const updateFluidMask = (titleTop: number | null) => {
      const element = fluidClipRef.current;
      if (!element) return;

      if (titleTop === null) {
        element.style.maskImage = "none";
        element.style.webkitMaskImage = "none";
        return;
      }

      const cutoffY = Math.max(
        0,
        Math.min(window.innerHeight, titleTop),
      );

      const fadeSize = 72;
      const fadeStart = Math.max(0, cutoffY - fadeSize);

      const mask = `linear-gradient(
        to bottom,
        black 0px,
        black ${fadeStart}px,
        transparent ${cutoffY}px,
        transparent 100%
      )`;

      element.style.maskImage = mask;
      element.style.webkitMaskImage = mask;
    };

    const pauseFluid = () => {
      if (fluidSuspendedRef.current) return;

      fluidSuspendedRef.current = true;
      setFluidHidden(true);

      window.dispatchEvent(
        new Event("fluid-cursor:pause"),
      );
    };

    const resumeFluid = () => {
      if (!fluidSuspendedRef.current) return;

      fluidSuspendedRef.current = false;
      setFluidHidden(false);

      window.dispatchEvent(
        new Event("fluid-cursor:resume"),
      );
    };

    const suspendEffects = () => {
      if (suspendedRef.current) return;

      suspendedRef.current = true;
      globalPerformanceState.isScrolling = true;
      setLightFadedOut(true);
      clearFadeTimer();

      fadeTimerRef.current = window.setTimeout(() => {
        setEffectsMounted(false);
        fadeTimerRef.current = null;
      }, EFFECTS_FADE_DURATION_MS);
    };

    const resumeEffects = () => {
      if (!suspendedRef.current) return;

      suspendedRef.current = false;
      clearFadeTimer();
      clearResumeFrames();

      globalPerformanceState.isScrolling = false;
      setEffectsMounted(true);

      resumeFrameOneRef.current = window.requestAnimationFrame(() => {
        resumeFrameOneRef.current = null;

        resumeFrameTwoRef.current = window.requestAnimationFrame(() => {
          resumeFrameTwoRef.current = null;
          setLightFadedOut(false);
        });
      });
    };

    const updateEffectsState = () => {
      frameRef.current = null;

      const selectedWorkTitle = document.getElementById(
        "selected-work-title",
      );

      const scene = document.querySelector<HTMLElement>(
        "#work .project-sticky-scene",
      );

      if (!selectedWorkTitle || !scene) {
        updateFluidMask(null);
        resumeFluid();
        resumeEffects();
        return;
      }

      const titleRect = selectedWorkTitle.getBoundingClientRect();
      updateFluidMask(titleRect.top);

      if (
        !fluidSuspendedRef.current &&
        titleRect.top <= FLUID_SUSPEND_Y_PX
      ) {
        pauseFluid();
      } else if (
        fluidSuspendedRef.current &&
        titleRect.top > FLUID_RESUME_Y_PX
      ) {
        resumeFluid();
      }

      const sceneRect = scene.getBoundingClientRect();
      const stickyTop =
        Number.parseFloat(
          window.getComputedStyle(scene).top,
        ) || 0;

      const reachedStickyPoint =
        sceneRect.top <= stickyTop + 1;

      const leftStickyPoint =
        sceneRect.top > stickyTop + RESUME_GAP_PX;

      if (!suspendedRef.current && reachedStickyPoint) {
        suspendEffects();
        return;
      }

      if (suspendedRef.current && leftStickyPoint) {
        resumeEffects();
      }
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(
        updateEffectsState,
      );
    };

    const handleVisibilityChange = () => {
      globalPerformanceState.isDocumentVisible = !document.hidden;
    };

    handleVisibilityChange();
    updateEffectsState();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      clearFadeTimer();
      clearResumeFrames();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      window.dispatchEvent(
        new Event("fluid-cursor:resume"),
      );

      globalPerformanceState.isScrolling = false;
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          opacity: lightFadedOut ? 0 : 1,
          transition: `opacity ${EFFECTS_FADE_DURATION_MS}ms ease`,
        }}
      >
        {effectsMounted && <GlobalLight />}
      </div>

      <div
        ref={fluidClipRef}
        className="absolute inset-0"
        style={{
          maskImage: "none",
          WebkitMaskImage: "none",
          visibility: fluidHidden ? "hidden" : "visible",
        }}
      >
        <FluidCursor
          opacity={1}
          hidden={false}
          fadeDurationMs={EFFECTS_FADE_DURATION_MS}
        />
      </div>
    </div>
  );
}
