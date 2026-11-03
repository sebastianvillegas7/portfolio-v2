"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface GibberishTextProps {
  text: string;
  className?: string;
  intervalMs?: number;
  pauseMs?: number;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function GibberishText({
  text,
  className,
  intervalMs = 65,
}: GibberishTextProps) {
  const [revealedCount, setRevealedCount] = useState(text.length);
  const [randomCharacters, setRandomCharacters] = useState<string[]>(
    text.split("")
  );

  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const runAnimation = () => {
      let iteration = 0;

      setRevealedCount(0);

      intervalRef.current = window.setInterval(() => {
        setRandomCharacters(
          text.split("").map((character, index) => {
            if (character === " ") {
              return " ";
            }

            if (index < iteration) {
              return character;
            }

            return GLYPHS[
              Math.floor(Math.random() * GLYPHS.length)
            ];
          })
        );

        iteration += 0.35;

        setRevealedCount(
          Math.min(
            text.length,
            Math.floor(iteration),
          )
        );

        if (iteration >= text.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          setRandomCharacters(text.split(""));
          setRevealedCount(text.length);
        }
      }, intervalMs);
    };

    timeoutRef.current = window.setTimeout(
      runAnimation,
      500
    );

    return clearTimers;
  }, [text, intervalMs]);

  return (
    <span
      className={cn(
        "inline-flex whitespace-pre",
        className
      )}
      aria-label={text}
    >
      {text.split("").map((originalCharacter, index) => {
        if (originalCharacter === " ") {
          return (
            <span
              key={index}
              aria-hidden="true"
              className="inline-block w-[0.32em]"
            >
              {" "}
            </span>
          );
        }

        const visibleCharacter =
          index < revealedCount
            ? originalCharacter
            : randomCharacters[index];

        return (
          <span
            key={index}
            aria-hidden="true"
            className="relative inline-grid"
          >
            <span className="invisible col-start-1 row-start-1">
              {originalCharacter}
            </span>

            <span className="col-start-1 row-start-1 text-center">
              {visibleCharacter}
            </span>
          </span>
        );
      })}
    </span>
  );
}
