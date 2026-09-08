"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface PerCharacterRiseProps {
  text: string;
  className?: string;
  characterDelayMs?: number;
  durationMs?: number;
  initialDelayMs?: number;
  yPx?: number;
}

export default function PerCharacterRise({
  text,
  className = "",
  characterDelayMs = 62,
  durationMs = 820,
  initialDelayMs = 0,
  yPx = 24,
}: PerCharacterRiseProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const characters = Array.from(
      container.querySelectorAll<HTMLElement>("[data-rise-char]")
    );

    const animations = characters.map((character, index) =>
      character.animate(
        [
          {
            opacity: 0,
            transform: `translate3d(0, ${yPx}px, 0)`,
          },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        ],
        {
          duration: durationMs,
          delay: initialDelayMs + index * characterDelayMs,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "both",
        }
      )
    );

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [
    characterDelayMs,
    durationMs,
    initialDelayMs,
    text,
    yPx,
  ]);

  const words = text.split(" ");

  let characterIndex = 0;

  return (
    <span
      ref={containerRef}
      className={cn("inline", className)}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
        >
          {[...word].map((character) => {
            const index = characterIndex++;

            return (
              <span
                key={`${character}-${index}`}
                data-rise-char
                className="inline-block"
              >
                {character}
              </span>
            );
          })}

          {wordIndex < words.length - 1 && (
            <span
              data-rise-char
              className="inline-block whitespace-pre"
            >
              {" "}
            </span>
          )}
        </span>
      ))}
    </span>
  );
}