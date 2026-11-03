"use client";

import { LightRays } from "@/components/effects/LightRays";

const HERO_LIGHT = {
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

export function GlobalLight() {
  return (
    <div className="absolute inset-0">
      <LightRays
        color="#a8b7ff"
        originX={HERO_LIGHT.originX}
        originY={HERO_LIGHT.originY}
        directionX={HERO_LIGHT.directionX}
        directionY={HERO_LIGHT.directionY}
        intensity={HERO_LIGHT.intensity}
        speed={HERO_LIGHT.speed}
        spread={HERO_LIGHT.spread}
        length={HERO_LIGHT.length}
        pointerInfluence={HERO_LIGHT.pointerInfluence}
        followPointer={true}
      />
    </div>
  );
}
