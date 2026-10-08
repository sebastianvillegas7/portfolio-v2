"use client";

import { useEffect, useRef, useState } from "react";

import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";
import { globalPerformanceState } from "@/components/effects/global-performance-state";

const MOBILE_EFFECTS_FADE_RATIO = 0.66;
const MOBILE_EFFECTS_RESUME_RATIO = 0.78;
const FLUID_FADE_DURATION_MS = 700;

export function GlobalEffects() {
  const [isMobile, setIsMobile] =
    useState(false);

  const [mobileEffectsSuspended, setMobileEffectsSuspended] =
    useState(false);

  const [fluidFadedOut, setFluidFadedOut] =
    useState(false);

  const [fluidHidden, setFluidHidden] =
    useState(false);

  const suspendedRef =
    useRef(false);

  const fluidFadeTimerRef =
    useRef<number | null>(null);

  const frameRef =
    useRef<number | null>(null);

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        "(max-width: 767px)",
      );

    const clearFluidFadeTimer = () => {
      if (
        fluidFadeTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          fluidFadeTimerRef.current,
        );

        fluidFadeTimerRef.current =
          null;
      }
    };

    const suspendMobileEffects = () => {
      if (suspendedRef.current) {
        return;
      }

      suspendedRef.current = true;

      /*
       * GlobalLight deja de consumir GPU en cuanto
       * entramos en el tramo de transición hacia
       * Selected Work.
       */
      setMobileEffectsSuspended(true);

      /*
       * El fluido NO desaparece de golpe.
       * Primero dejamos que su último movimiento siga
       * vivo mientras el canvas se desvanece.
       */
      setFluidHidden(false);
      setFluidFadedOut(true);

      clearFluidFadeTimer();

      fluidFadeTimerRef.current =
        window.setTimeout(() => {
          /*
           * Recién cuando ya terminó el fade detenemos
           * la simulación WebGL. El canvas queda oculto,
           * pero conserva su último frame para poder
           * reanudarse al volver al Hero.
           */
          globalPerformanceState.isScrolling =
            true;

          setFluidHidden(true);

          fluidFadeTimerRef.current =
            null;
        }, FLUID_FADE_DURATION_MS);
    };

    const resumeMobileEffects = () => {
      if (!suspendedRef.current) {
        return;
      }

      suspendedRef.current = false;

      clearFluidFadeTimer();

      /*
       * Reactivamos primero la simulación y hacemos
       * visible el canvas todavía en opacity 0.
       */
      globalPerformanceState.isScrolling =
        false;

      setFluidHidden(false);
      setMobileEffectsSuspended(false);

      /*
       * En el siguiente frame iniciamos el fade-in.
       * Así evitamos que el canvas reaparezca de golpe.
       */
      window.requestAnimationFrame(() => {
        setFluidFadedOut(false);
      });
    };

    const resetDesktopEffects = () => {
      suspendedRef.current = false;

      clearFluidFadeTimer();

      globalPerformanceState.isScrolling =
        false;

      setMobileEffectsSuspended(false);
      setFluidHidden(false);
      setFluidFadedOut(false);
    };

    const updatePerformanceMode = () => {
      frameRef.current = null;

      const mobile =
        mobileQuery.matches;

      globalPerformanceState.isMobile =
        mobile;

      setIsMobile((current) =>
        current === mobile
          ? current
          : mobile,
      );

      if (!mobile) {
        resetDesktopEffects();
        return;
      }

      const selected =
        document.getElementById("work");

      if (!selected) {
        resumeMobileEffects();
        return;
      }

      const viewportHeight =
        window.innerHeight;

      if (viewportHeight <= 0) {
        return;
      }

      const selectedTop =
        selected.getBoundingClientRect().top;

      const topRatio =
        selectedTop / viewportHeight;

      /*
       * Hysteresis:
       *
       * - Al bajar, iniciamos el fade en la última parte
       *   de la transición Hero -> Selected Work.
       * - Al volver hacia arriba, reanudamos recién cuando
       *   el Hero vuelve a tener espacio suficiente.
       */
      if (
        !suspendedRef.current &&
        topRatio <=
          MOBILE_EFFECTS_FADE_RATIO
      ) {
        suspendMobileEffects();
        return;
      }

      if (
        suspendedRef.current &&
        topRatio >=
          MOBILE_EFFECTS_RESUME_RATIO
      ) {
        resumeMobileEffects();
      }
    };

    const schedulePerformanceUpdate =
      () => {
        if (
          frameRef.current !== null
        ) {
          return;
        }

        frameRef.current =
          window.requestAnimationFrame(
            updatePerformanceMode,
          );
      };

    const handleVisibilityChange =
      () => {
        globalPerformanceState.isDocumentVisible =
          !document.hidden;
      };

    handleVisibilityChange();
    updatePerformanceMode();

    mobileQuery.addEventListener(
      "change",
      schedulePerformanceUpdate,
    );

    window.addEventListener(
      "scroll",
      schedulePerformanceUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      schedulePerformanceUpdate,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        schedulePerformanceUpdate,
      );

      window.removeEventListener(
        "scroll",
        schedulePerformanceUpdate,
      );

      window.removeEventListener(
        "resize",
        schedulePerformanceUpdate,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      clearFluidFadeTimer();

      if (
        frameRef.current !== null
      ) {
        window.cancelAnimationFrame(
          frameRef.current,
        );
      }

      globalPerformanceState.isScrolling =
        false;
    };
  }, []);

  const suspendHeavyMobileEffects =
    isMobile &&
    mobileEffectsSuspended;

  return (
    <>
      {!
        suspendHeavyMobileEffects && (
        <GlobalLight />
      )}

      <FluidCursor
        opacity={
          isMobile && fluidFadedOut
            ? 0
            : 1
        }
        hidden={
          isMobile && fluidHidden
        }
        fadeDurationMs={
          FLUID_FADE_DURATION_MS
        }
      />
    </>
  );
}
