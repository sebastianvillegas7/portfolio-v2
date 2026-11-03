"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";

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
    easing:
      "cubic-bezier(0.22, 1, 0.36, 1)",

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
    easing:
      "cubic-bezier(0.64, 0, 0.78, 0)",

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

const TITLE_CLASS =
  "text-[0.64rem] tracking-[0.085em]";

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
  const [finished, setFinished] =
    useState(false);

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

    return Array.isArray(text)
      ? text
      : [text];
  }, [text]);

  const samplesKey =
    samples.join("\u0001");

  useEffect(() => {
    if (samples.length <= 1) {
      return;
    }

    const runtimeSpeed =
      speed ?? 0.72;

    const runtimeHold =
      holdMs ?? 550;

    const runtimeGap =
      gapMs ?? 320;

    const microDelay =
      spec.swap?.microDelayMs ?? 0;

    const countWords = (
      value: string,
    ) =>
      Math.max(
        1,
        value
          .trim()
          .split(/\s+/)
          .filter(Boolean).length,
      );

    const phaseDuration = (
      value: string,
      phase: "enter" | "exit",
    ) => {
      const phaseSpec =
        spec[phase];

      const duration =
        Math.max(
          140,
          Math.round(
            phaseSpec.durationMs *
              runtimeSpeed,
          ),
        );

      const stagger =
        Math.max(
          0,
          Math.round(
            phaseSpec.staggerMs *
              runtimeSpeed,
          ),
        );

      return (
        duration +
        Math.max(
          0,
          countWords(value) - 1,
        ) *
          stagger
      );
    };

    let totalDuration = 450;

    totalDuration +=
      phaseDuration(
        samples[0],
        "enter",
      ) + runtimeHold;

    for (
      let index = 0;
      index < samples.length - 1;
      index += 1
    ) {
      totalDuration +=
        phaseDuration(
          samples[index],
          "exit",
        );

      totalDuration +=
        microDelay;

      totalDuration +=
        runtimeGap;

      totalDuration +=
        phaseDuration(
          samples[index + 1],
          "enter",
        );

      totalDuration +=
        runtimeHold;
    }

    totalDuration +=
      phaseDuration(
        samples[
          samples.length - 1
        ],
        "exit",
      );

    totalDuration +=
      microDelay;

    totalDuration +=
      runtimeGap;

    totalDuration +=
      phaseDuration(
        samples[0],
        "enter",
      );

    totalDuration += 100;

    const timeout =
      window.setTimeout(() => {
        setFinished(true);
      }, totalDuration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    samplesKey,
    samples,
    speed,
    holdMs,
    gapMs,
    spec,
  ]);

  if (finished) {
    const parts =
      samples[0].match(
        /(\S+|\s+)/g,
      ) ?? [];

    return (
      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden",
          className,
        )}
      >
        <div
          className={cn(
            "text-animation-stage absolute inset-0",
            stageClassName,
          )}
        >
          <h3
            className={cn(
              "text-animation-title",
              TITLE_CLASS,
            )}
          >
            {parts.map(
              (part, index) => (
                <span
                  key={index}
                  className="text-animation-unit"
                >
                  {part}
                </span>
              ),
            )}
          </h3>
        </div>
      </div>
    );
  }

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
      titleClassName={TITLE_CLASS}
    />
  );
}