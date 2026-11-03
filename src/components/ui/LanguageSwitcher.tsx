"use client";

import { motion, useReducedMotion } from "motion/react";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/translations";
import { cn } from "@/lib/utils";

const LANGUAGES: Language[] = ["es", "en"];

export function LanguageSwitcher() {
  const {
    language,
    setLanguage,
    t,
  } = useLanguage();

  const reduceMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label={t.language.selectorLabel}
      className="relative inline-flex shrink-0 items-center rounded-full border border-white/10 bg-background/55 p-0.5 shadow-sm backdrop-blur-md"
    >
      {LANGUAGES.map((option) => {
        const selected =
          language === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() =>
              setLanguage(option)
            }
            aria-pressed={selected}
            className={cn(
              "relative isolate flex h-8 min-w-10 items-center justify-center rounded-full px-2 text-[0.6rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
              selected
                ? "text-background"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            {selected ? (
              <motion.span
                layoutId="language-switcher-active"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-foreground"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                        mass: 0.45,
                      }
                }
              />
            ) : null}

            {option}
          </button>
        );
      })}
    </div>
  );
}
