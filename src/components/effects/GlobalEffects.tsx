"use client";

import { useEffect, useRef, useState } from "react";

import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";
import { globalPerformanceState } from "@/components/effects/global-performance-state";

const RESUME_GAP_PX = 48;
const FLUID_SUSPEND_Y_PX = 96;
const FLUID_RESUME_Y_PX = 144;
const FLUID_MASK_FADE_PX = 72;

export function GlobalEffects() {
  const [fluidHidden, setFluidHidden] = useState(false);
  const [heroLightMounted, setHeroLightMounted] = useState(true);

  const suspendedRef = useRef(false);
  const fluidSuspendedRef = useRef(false);
  const heroLightMountedRef = useRef(true);

  const frameRef = useRef<number | null>(null);
  const fluidClipRef = useRef<HTMLDivElement>(null);
  const lastMaskRef = useRef<string | null>(null);

  useEffect(() => {
    const setHeroLightState = (mounted: boolean) => {
      if (heroLightMountedRef.current === mounted) {
        return;
      }

      heroLightMountedRef.current = mounted;
      setHeroLightMounted(mounted);
    };

    const applyFluidMask = (mask: string) => {
      const element = fluidClipRef.current;

      if (
        !element ||
        lastMaskRef.current === mask
      ) {
        return;
      }

      lastMaskRef.current = mask;
      element.style.maskImage = mask;
      element.style.webkitMaskImage = mask;
    };

    const updateFluidMask = (
      titleTop: number | null,
    ) => {
      if (titleTop === null) {
        applyFluidMask("none");
        return;
      }

      if (
        titleTop >=
        window.innerHeight +
          FLUID_MASK_FADE_PX
      ) {
        applyFluidMask("none");
        return;
      }

      const cutoffY = Math.max(
        0,
        Math.min(
          window.innerHeight,
          titleTop,
        ),
      );

      const fadeStart = Math.max(
        0,
        cutoffY -
          FLUID_MASK_FADE_PX,
      );

      const mask = `linear-gradient(
        to bottom,
        black 0px,
        black ${fadeStart}px,
        transparent ${cutoffY}px,
        transparent 100%
      )`;

      applyFluidMask(mask);
    };

    const pauseFluid = () => {
      if (fluidSuspendedRef.current) {
        return;
      }

      fluidSuspendedRef.current = true;
      setFluidHidden(true);

      window.dispatchEvent(
        new Event("fluid-cursor:pause"),
      );
    };

    const resumeFluid = () => {
      if (!fluidSuspendedRef.current) {
        return;
      }

      fluidSuspendedRef.current = false;
      setFluidHidden(false);

      window.dispatchEvent(
        new Event("fluid-cursor:resume"),
      );
    };

    const suspendEffects = () => {
      if (suspendedRef.current) {
        return;
      }

      suspendedRef.current = true;
      globalPerformanceState.isScrolling = true;
    };

    const resumeEffects = () => {
      if (!suspendedRef.current) {
        return;
      }

      suspendedRef.current = false;
      globalPerformanceState.isScrolling = false;
    };

    const updateEffectsState = () => {
      frameRef.current = null;

      const selectedWorkTitle =
        document.getElementById(
          "selected-work-title",
        );

      const scene =
        document.querySelector<HTMLElement>(
          "#work .project-sticky-scene",
        );

      if (
        !selectedWorkTitle ||
        !scene
      ) {
        updateFluidMask(null);
        setHeroLightState(true);
        resumeFluid();
        resumeEffects();
        return;
      }

      const titleRect =
        selectedWorkTitle.getBoundingClientRect();

      /*
       * LightRays existe exclusivamente en Hero.
       *
       * En cuanto el heading de Selected Work
       * empieza a entrar en pantalla, desmontamos
       * completamente el segundo WebGL.
       */
      setHeroLightState(
        titleRect.top >
          window.innerHeight,
      );

      updateFluidMask(
        titleRect.top,
      );

      if (
        !fluidSuspendedRef.current &&
        titleRect.top <=
          FLUID_SUSPEND_Y_PX
      ) {
        pauseFluid();
      } else if (
        fluidSuspendedRef.current &&
        titleRect.top >
          FLUID_RESUME_Y_PX
      ) {
        resumeFluid();
      }

      const sceneRect =
        scene.getBoundingClientRect();

      const stickyTop =
        Number.parseFloat(
          window.getComputedStyle(
            scene,
          ).top,
        ) || 0;

      const reachedStickyPoint =
        sceneRect.top <=
        stickyTop + 1;

      const leftStickyPoint =
        sceneRect.top >
        stickyTop +
          RESUME_GAP_PX;

      if (
        !suspendedRef.current &&
        reachedStickyPoint
      ) {
        suspendEffects();
        return;
      }

      if (
        suspendedRef.current &&
        leftStickyPoint
      ) {
        resumeEffects();
      }
    };

    const scheduleUpdate = () => {
      if (
        frameRef.current !== null
      ) {
        return;
      }

      frameRef.current =
        window.requestAnimationFrame(
          updateEffectsState,
        );
    };

    const handleVisibilityChange =
      () => {
        globalPerformanceState.isDocumentVisible =
          !document.hidden;
      };

    handleVisibilityChange();
    updateEffectsState();

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      scheduleUpdate,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleUpdate,
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      if (
        frameRef.current !== null
      ) {
        window.cancelAnimationFrame(
          frameRef.current,
        );

        frameRef.current = null;
      }

      window.dispatchEvent(
        new Event(
          "fluid-cursor:resume",
        ),
      );

      globalPerformanceState.isScrolling =
        false;
    };
  }, []);

  return (
    <div className="absolute inset-0">
      {heroLightMounted && (
        <div className="absolute inset-0">
          <GlobalLight />
        </div>
      )}

      <div
        ref={fluidClipRef}
        className="absolute inset-0"
        style={{
          maskImage: "none",
          WebkitMaskImage: "none",
          visibility:
            fluidHidden
              ? "hidden"
              : "visible",
        }}
      >
        <FluidCursor
          opacity={1}
          hidden={false}
          fadeDurationMs={850}
        />
      </div>
    </div>
  );
}
