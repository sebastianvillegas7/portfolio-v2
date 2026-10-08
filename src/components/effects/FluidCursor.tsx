"use client";

import { useEffect } from "react";

import fluidCursor from "@/hooks/use-FluidCursor";

type FluidCursorProps = {
  opacity?: number;
  hidden?: boolean;
  fadeDurationMs?: number;
};

export default function FluidCursor({
  opacity = 1,
  hidden = false,
  fadeDurationMs = 700,
}: FluidCursorProps) {
  useEffect(() => {
    return fluidCursor();
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        visibility:
          hidden
            ? "hidden"
            : "visible",
        transition: `opacity ${fadeDurationMs}ms ease-out`,
        willChange: "opacity",
      }}
      aria-hidden="true"
    >
      <canvas
        id="fluid"
        className="h-full w-full"
      />
    </div>
  );
}
