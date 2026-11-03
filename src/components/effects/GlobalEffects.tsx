"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";
import { globalPerformanceState } from "@/components/effects/global-performance-state";

const RESUME_GAP_PX = 48;

const FLUID_SUSPEND_Y_PX = 96;
const FLUID_RESUME_Y_PX = 144;

/*
 * Mientras Selected Work todavía está lejos
 * del punto sticky, no necesitamos medir
 * continuamente la escena.
 */
const STICKY_CHECK_DISTANCE_PX = 240;

export function GlobalEffects() {
  const [fluidHidden, setFluidHidden] =
    useState(false);

  const suspendedRef =
    useRef(false);

  const fluidSuspendedRef =
    useRef(false);

  const frameRef =
    useRef<number | null>(null);

  const fluidRef =
    useRef<HTMLDivElement>(null);

  const heroLightRef =
    useRef<HTMLDivElement>(null);

  const lastLightOpacityRef =
    useRef<number | null>(null);

  const lastFluidOpacityRef =
    useRef<number | null>(null);

  useEffect(() => {
    /*
     * Estos elementos no cambian durante
     * la vida de la página.
     *
     * Antes los buscábamos en cada frame
     * de scroll.
     */
    const selectedWorkTitle =
      document.getElementById(
        "selected-work-title",
      );

    const scene =
      document.querySelector<HTMLElement>(
        "#work .project-sticky-scene",
      );

    let stickyTop = 0;

    const updateStickyTop = () => {
      if (!scene) {
        stickyTop = 0;
        return;
      }

      stickyTop =
        Number.parseFloat(
          window.getComputedStyle(
            scene,
          ).top,
        ) || 0;
    };

    updateStickyTop();

    const applyHeroLightOpacity = (
      titleTop: number | null,
    ) => {
      const element =
        heroLightRef.current;

      if (!element) {
        return;
      }

      let opacity = 1;

      if (titleTop !== null) {
        const fadeStart =
          window.innerHeight * 1.05;

        const fadeEnd =
          window.innerHeight * 0.42;

        opacity =
          (titleTop - fadeEnd) /
          (fadeStart - fadeEnd);

        opacity = Math.max(
          0,
          Math.min(1, opacity),
        );
      }

      if (
        lastLightOpacityRef.current !== null &&
        Math.abs(
          lastLightOpacityRef.current -
            opacity,
        ) < 0.01
      ) {
        return;
      }

      lastLightOpacityRef.current =
        opacity;

      element.style.opacity =
        opacity.toFixed(3);
    };

    const applyFluidOpacity = (
      titleTop: number | null,
    ) => {
      const element =
        fluidRef.current;

      if (!element) {
        return;
      }

      let opacity = 1;

      if (titleTop !== null) {
        /*
         * Mantiene el fluido visible durante
         * casi toda la transición Hero ->
         * Selected Work.
         */
        const fadeStart =
          window.innerHeight * 0.92;

        const fadeEnd =
          window.innerHeight * 0.28;

        opacity =
          (titleTop - fadeEnd) /
          (fadeStart - fadeEnd);

        opacity = Math.max(
          0,
          Math.min(1, opacity),
        );
      }

      if (
        lastFluidOpacityRef.current !== null &&
        Math.abs(
          lastFluidOpacityRef.current -
            opacity,
        ) < 0.01
      ) {
        return;
      }

      lastFluidOpacityRef.current =
        opacity;

      element.style.opacity =
        opacity.toFixed(3);
    };

    const pauseFluid = () => {
      if (
        fluidSuspendedRef.current
      ) {
        return;
      }

      fluidSuspendedRef.current =
        true;

      setFluidHidden(true);

      window.dispatchEvent(
        new Event(
          "fluid-cursor:pause",
        ),
      );
    };

    const resumeFluid = () => {
      if (
        !fluidSuspendedRef.current
      ) {
        return;
      }

      fluidSuspendedRef.current =
        false;

      setFluidHidden(false);

      window.dispatchEvent(
        new Event(
          "fluid-cursor:resume",
        ),
      );
    };

    const suspendEffects = () => {
      if (
        suspendedRef.current
      ) {
        return;
      }

      suspendedRef.current =
        true;

      globalPerformanceState.isScrolling =
        true;
    };

    const resumeEffects = () => {
      if (
        !suspendedRef.current
      ) {
        return;
      }

      suspendedRef.current =
        false;

      globalPerformanceState.isScrolling =
        false;
    };

    const updateEffectsState = () => {
      frameRef.current = null;

      if (
        !selectedWorkTitle ||
        !scene
      ) {
        applyHeroLightOpacity(null);
        applyFluidOpacity(null);

        resumeFluid();
        resumeEffects();

        return;
      }

      /*
       * Esta lectura sí necesitamos hacerla
       * durante el scroll porque controla
       * los fades del light y del fluid.
       */
      const titleRect =
        selectedWorkTitle.getBoundingClientRect();

      const titleTop =
        titleRect.top;

      applyHeroLightOpacity(
        titleTop,
      );

      applyFluidOpacity(
        titleTop,
      );

      if (
        !fluidSuspendedRef.current &&
        titleTop <=
          FLUID_SUSPEND_Y_PX
      ) {
        pauseFluid();
      } else if (
        fluidSuspendedRef.current &&
        titleTop >
          FLUID_RESUME_Y_PX
      ) {
        resumeFluid();
      }

      /*
       * Mientras Selected Work todavía está
       * lejos del sticky point, no hacemos
       * ninguna medición adicional.
       */
      if (
        !suspendedRef.current &&
        titleTop >
          STICKY_CHECK_DISTANCE_PX
      ) {
        return;
      }

      const sceneTop =
        scene.getBoundingClientRect().top;

      const reachedStickyPoint =
        sceneTop <=
        stickyTop + 1;

      const leftStickyPoint =
        sceneTop >
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

    const handleResize = () => {
      updateStickyTop();
      scheduleUpdate();
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
      handleResize,
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
        handleResize,
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
      <div
        ref={heroLightRef}
        className="absolute inset-0"
        style={{
          opacity: 1,
        }}
      >
        <GlobalLight />
      </div>

      <div
        ref={fluidRef}
        className="absolute inset-0"
        style={{
          opacity: 1,

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