"use client";

import { useEffect } from "react";

import fluidCursor from "@/hooks/use-FluidCursor";

export default function FluidCursor() {
  useEffect(() => {
    return fluidCursor();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <canvas
        id="fluid"
        className="h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}