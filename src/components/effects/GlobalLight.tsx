"use client";

import { useEffect, useRef, useState } from "react";

import { LightRays } from "@/components/effects/LightRays";

type LightState = {
  originX: number;
  originY: number;

  directionX: number;
  directionY: number;

  intensity: number;

  speed: number;
  spread: number;
  length: number;

  pointerInfluence: number;
};

const HERO_LIGHT: LightState = {
  originX: 1.08,
  originY: -0.12,

  directionX: -0.55,
  directionY: 0.84,

  intensity: 1,

  speed: 0.16,
  spread: 1.15,
  length: 1.6,

  pointerInfluence: 0.018,
};

const SELECTED_START: LightState = {
  originX: 1.08,
  originY: 0.14,

  directionX: -0.68,
  directionY: 0.72,

  intensity: 0.74,

  speed: 0.08,
  spread: 1.28,
  length: 1.85,

  pointerInfluence: 0,
};

const SELECTED_END: LightState = {
  originX: 1.0,
  originY: 0.7,

  directionX: -0.84,
  directionY: 0.42,

  intensity: 0.56,

  speed: 0.07,
  spread: 1.4,
  length: 1.95,

  pointerInfluence: 0,
};

function lerp(
  from: number,
  to: number,
  progress: number,
) {
  return from + (to - from) * progress;
}

function easeInOut(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 -
        Math.pow(
          -2 * progress + 2,
          3,
        ) /
          2;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function interpolateLight(
  from: LightState,
  to: LightState,
  progress: number,
): LightState {
  const eased = easeInOut(
    clamp01(progress),
  );

  return {
    originX: lerp(
      from.originX,
      to.originX,
      eased,
    ),

    originY: lerp(
      from.originY,
      to.originY,
      eased,
    ),

    directionX: lerp(
      from.directionX,
      to.directionX,
      eased,
    ),

    directionY: lerp(
      from.directionY,
      to.directionY,
      eased,
    ),

    intensity: lerp(
      from.intensity,
      to.intensity,
      eased,
    ),

    speed: lerp(
      from.speed,
      to.speed,
      eased,
    ),

    spread: lerp(
      from.spread,
      to.spread,
      eased,
    ),

    length: lerp(
      from.length,
      to.length,
      eased,
    ),

    pointerInfluence: lerp(
      from.pointerInfluence,
      to.pointerInfluence,
      eased,
    ),
  };
}

type Mode = "hero" | "selected";

export function GlobalLight() {
  const [light, setLight] =
    useState<LightState>(HERO_LIGHT);

  const currentLightRef =
    useRef<LightState>(HERO_LIGHT);

  const modeRef =
    useRef<Mode>("hero");

  const animationRef =
    useRef<number | null>(null);

  /*
   * Actualiza React y mantiene una copia exacta
   * del estado visual actual.
   */
  const updateLight = (
    value: LightState,
  ) => {
    currentLightRef.current = value;
    setLight(value);
  };

  const stopAnimation = () => {
    if (
      animationRef.current !== null
    ) {
      window.cancelAnimationFrame(
        animationRef.current,
      );

      animationRef.current = null;
    }
  };

  /*
   * HERO -> SELECTED
   *
   * 0 - 1.1 s
   * Fade out manteniéndose arriba.
   *
   * 1.1 - 2.1 s
   * Se recoloca abajo estando invisible.
   *
   * 2.1 - 3.3 s
   * Fade in en Selected.
   *
   * 3.3 - 8.3 s
   * Paneo amplio y lento hacia abajo.
   *
   * 8.3 - 10 s
   * Fade out final.
   */
  const playSelectedAnimation = () => {
    stopAnimation();

    const startTime =
      performance.now();

    const initial =
      currentLightRef.current;

    const heroHidden: LightState = {
      ...initial,
      intensity: 0,
      pointerInfluence: 0,
    };

    const selectedHidden: LightState = {
      ...SELECTED_START,
      intensity: 0,
    };

    const selectedEndVisible: LightState = {
      ...SELECTED_END,
    };

    const selectedEndHidden: LightState = {
      ...SELECTED_END,
      intensity: 0,
    };

    const animate = (
      now: number,
    ) => {
      const elapsed =
        (now - startTime) / 1000;

      let next: LightState;

      /*
       * Fade out del Hero.
       */
      if (elapsed < 1.1) {
        next = interpolateLight(
          initial,
          heroHidden,
          elapsed / 1.1,
        );
      }

      /*
       * Movimiento invisible hacia
       * la posición de Selected.
       */
      else if (elapsed < 2.1) {
        next = interpolateLight(
          heroHidden,
          selectedHidden,
          (elapsed - 1.1) / 1,
        );
      }

      /*
       * Fade in Selected.
       */
      else if (elapsed < 3.3) {
        next = interpolateLight(
          selectedHidden,
          SELECTED_START,
          (elapsed - 2.1) / 1.2,
        );
      }

      /*
       * Paneo grande, lento y continuo.
       */
      else if (elapsed < 8.3) {
        next = interpolateLight(
          SELECTED_START,
          selectedEndVisible,
          (elapsed - 3.3) / 5,
        );
      }

      /*
       * Fade out final.
       */
      else if (elapsed < 10) {
        next = interpolateLight(
          selectedEndVisible,
          selectedEndHidden,
          (elapsed - 8.3) / 1.7,
        );
      }

      /*
       * Fin.
       */
      else {
        updateLight(
          selectedEndHidden,
        );

        animationRef.current = null;

        return;
      }

      updateLight(next);

      animationRef.current =
        window.requestAnimationFrame(
          animate,
        );
    };

    animationRef.current =
      window.requestAnimationFrame(
        animate,
      );
  };

  /*
   * SELECTED -> HERO
   *
   * También continuo:
   *
   * fade out
   * -> recolocación invisible
   * -> fade in Hero.
   */
  const playHeroAnimation = () => {
    stopAnimation();

    const startTime =
      performance.now();

    const initial =
      currentLightRef.current;

    const currentHidden: LightState = {
      ...initial,
      intensity: 0,
      pointerInfluence: 0,
    };

    const heroHidden: LightState = {
      ...HERO_LIGHT,
      intensity: 0,
      pointerInfluence: 0,
    };

    const animate = (
      now: number,
    ) => {
      const elapsed =
        (now - startTime) / 1000;

      let next: LightState;

      /*
       * Fade out desde donde esté.
       */
      if (elapsed < 1) {
        next = interpolateLight(
          initial,
          currentHidden,
          elapsed / 1,
        );
      }

      /*
       * Recolocación invisible arriba.
       */
      else if (elapsed < 2) {
        next = interpolateLight(
          currentHidden,
          heroHidden,
          (elapsed - 1) / 1,
        );
      }

      /*
       * Fade in suave del Hero.
       */
      else if (elapsed < 3.3) {
        next = interpolateLight(
          heroHidden,
          HERO_LIGHT,
          (elapsed - 2) / 1.3,
        );
      } else {
        updateLight(HERO_LIGHT);

        animationRef.current = null;

        return;
      }

      updateLight(next);

      animationRef.current =
        window.requestAnimationFrame(
          animate,
        );
    };

    animationRef.current =
      window.requestAnimationFrame(
        animate,
      );
  };

  useEffect(() => {
    const updateSection = () => {
      const selected =
        document.getElementById("work");

      if (!selected) return;

      const rect =
        selected.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      /*
       * Entramos en Selected.
       *
       * No usamos el mismo límite para volver
       * al Hero. Eso evita cambios rápidos
       * entre ambos estados.
       */
      if (
        modeRef.current === "hero" &&
        rect.top <=
          viewportHeight * 0.58
      ) {
        modeRef.current =
          "selected";

        playSelectedAnimation();

        return;
      }

      /*
       * Volvemos al Hero únicamente cuando
       * realmente hemos subido bastante.
       */
      if (
        modeRef.current ===
          "selected" &&
        rect.top >=
          viewportHeight * 0.78
      ) {
        modeRef.current = "hero";

        playHeroAnimation();
      }
    };

    updateSection();

    window.addEventListener(
      "scroll",
      updateSection,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateSection,
    );

    return () => {
      stopAnimation();

      window.removeEventListener(
        "scroll",
        updateSection,
      );

      window.removeEventListener(
        "resize",
        updateSection,
      );
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <LightRays
        color="#a8b7ff"
        originX={light.originX}
        originY={light.originY}
        directionX={
          light.directionX
        }
        directionY={
          light.directionY
        }
        intensity={light.intensity}
        speed={light.speed}
        spread={light.spread}
        length={light.length}
        pointerInfluence={
          light.pointerInfluence
        }
        followPointer={
          light.pointerInfluence > 0
        }
      />
    </div>
  );
}