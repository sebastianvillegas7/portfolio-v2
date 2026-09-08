"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "./text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "blur-out-up",
  target: "per-word",

  enter: {
    durationMs: 520,
    staggerMs: 20,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",

    from: {
      opacity: 0,
      yPx: 5,
      blurPx: 2,
    },

    to: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
    },
  },

  exit: {
    durationMs: 500,
    staggerMs: 18,
    easing: "cubic-bezier(0.64, 0, 0.78, 0)",

    from: {
      opacity: 1,
      yPx: 0,
      blurPx: 0,
    },

    to: {
      opacity: 0,
      yPx: -6,
      blurPx: 2.5,
    },
  },

  swap: {
    mode: "sequential",
    microDelayMs: 40,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Desarrollo web",
  "Aplicaciones a medida",
];

export interface BlurOutUpProps {
  text?: string | string[];
  enter?: Partial<TextAnimationPhaseSpec>;
  exit?: Partial<TextAnimationPhaseSpec>;
  speed?: number;
  holdMs?: number;
  gapMs?: number;
  yTravel?: number;
  className?: string;
  stageClassName?: string;
}

export default function BlurOutUp({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
  stageClassName,
}: BlurOutUpProps = {}) {
  const spec = useMemo<TextAnimationSpec>(
    () => ({
      ...BASE_SPEC,

      enter: {
        ...BASE_SPEC.enter,
        ...enter,

        from: {
          ...BASE_SPEC.enter.from,
          ...enter?.from,
        },

        to: {
          ...BASE_SPEC.enter.to,
          ...enter?.to,
        },
      },

      exit: {
        ...BASE_SPEC.exit,
        ...exit,

        from: {
          ...BASE_SPEC.exit.from,
          ...exit?.from,
        },

        to: {
          ...BASE_SPEC.exit.to,
          ...exit?.to,
        },
      },
    }),
    [enter, exit],
  );

  const samples = useMemo(() => {
    if (text == null) {
      return [...DEFAULT_SAMPLES];
    }

    return Array.isArray(text) ? text : [text];
  }, [text]);

  return (
    <TextAnimator
      spec={spec}
      samples={samples}
      speed={speed}
      holdMs={holdMs}
      gapMs={gapMs}
      yTravel={yTravel}
      className={className}
      stageClassName={stageClassName}
    />
  );
}