"use client";

import { LightRays } from "@/components/effects/LightRays";

export function GlobalLight() {
  return (
    <div className="absolute inset-0">
      <LightRays
        color="#a8b7ff"
        intensity={1}
      />
    </div>
  );
}
