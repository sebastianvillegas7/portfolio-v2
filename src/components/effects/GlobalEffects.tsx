"use client";

import { useEffect, useRef, useState } from "react";

import FluidCursor from "@/components/effects/FluidCursor";
import { GlobalLight } from "@/components/effects/GlobalLight";
import { globalPerformanceState } from "@/components/effects/global-performance-state";

const EFFECTS_FADE_DURATION_MS = 850;
const RESUME_GAP_PX = 48;

export function GlobalEffects() {
  const [effectsMounted, setEffectsMounted] =
    useState(true);

  const [effectsFadedOut, setEffectsFadedOut] =
    useState(false);

  const suspendedRef =
    useRef(false);

  const fadeTimerRef =
    useRef<number | null>(null);

  const frameRef =
    useRef<number | null>(null);

  useEffect(() => {
    const clearFadeTimer = () => {
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(
          fadeTimerRef.current,
        );

        fadeTimerRef.current = null;
      }
    };

    const suspendEffects = () => {
      if (suspendedRef.current) {
        return;
      }

      suspendedRef.current = true;

      /*
       * Primero desaparece visualmente todo el bloque.
       * Los efectos todavía siguen vivos durante el fade,
       * así que no hay flash ni corte brusco.
       */
      setEffectsFadedOut(true);

      clearFadeTimer();

      fadeTimerRef.current =
        window.setTimeout(() => {
          /*
           * Recién cuando el fade terminó:
           * - detenemos FluidCursor;
           * - desmontamos los efectos pesados.
           */
          globalPerformanceState.isScrolling =
            true;

          setEffectsMounted(false);

          fadeTimerRef.current = null;
        }, EFFECTS_FADE_DURATION_MS);
    };

    const resumeEffects = () => {
      if (!suspendedRef.current) {
        return;
      }

      suspendedRef.current = false;

      clearFadeTimer();

      /*
       * Reactivamos primero mientras todavía está
       * invisible y después hacemos el fade-in.
       */
      globalPerformanceState.isScrolling =
        false;

      setEffectsMounted(true);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setEffectsFadedOut(false);
        });
      });
    };

    const updateEffectsState = () => {
      frameRef.current = null;

      const scene =
        document.querySelector<HTMLElement>(
          "#work .project-sticky-scene",
        );

      if (!scene) {
        resumeEffects();
        return;
      }

      const sceneRect =
        scene.getBoundingClientRect();

      /*
       * Leemos el top REAL del sticky desde CSS
       * (`--project-scene-top` termina resolviendo en 2rem).
       * No usamos porcentajes arbitrarios del viewport.
       */
      const stickyTop =
        Number.parseFloat(
          window.getComputedStyle(scene).top,
        ) || 0;

      /*
       * Cuando la escena llega a su posición sticky,
       * el título ya quedó arriba y comienza el tramo
       * donde entra la primera card.
       */
      const reachedStickyPoint =
        sceneRect.top <= stickyTop + 1;

      /*
       * Hysteresis simple para que al subir no esté
       * prendiendo/apagando alrededor del mismo píxel.
       */
      const leftStickyPoint =
        sceneRect.top >
        stickyTop + RESUME_GAP_PX;

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
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current =
        window.requestAnimationFrame(
          updateEffectsState,
        );
    };

    const handleVisibilityChange = () => {
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

      clearFadeTimer();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(
          frameRef.current,
        );
      }

      globalPerformanceState.isScrolling =
        false;
    };
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity:
          effectsFadedOut
            ? 0
            : 1,

        transition:
          `opacity ${EFFECTS_FADE_DURATION_MS}ms ease`,
      }}
    >
      {effectsMounted && (
        <>
          <GlobalLight />

          <FluidCursor
            opacity={1}
            hidden={false}
            fadeDurationMs={
              EFFECTS_FADE_DURATION_MS
            }
          />
        </>
      )}
    </div>
  );
}
