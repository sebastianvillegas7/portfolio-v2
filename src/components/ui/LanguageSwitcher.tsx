"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/translations";

const LANGUAGES: Language[] = ["es", "en"];

export function LanguageSwitcher() {
  const {
    language,
    setLanguage,
    t,
  } = useLanguage();

  return (
    <div
      className="absolute right-[var(--page-padding-x)] top-[3.35rem] z-20 flex items-center gap-1 rounded-full border border-border/60 bg-background/55 p-1 shadow-sm backdrop-blur-md"
      aria-label={t.language.selectorLabel}
    >
      {LANGUAGES.map(
        (option, index) => (
          <div
            key={option}
            className="flex items-center gap-1"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className="text-[0.55rem] text-foreground-subtle"
              >
                /
              </span>
            )}

            <button
              type="button"
              onClick={() =>
                setLanguage(option)
              }
              aria-pressed={
                language === option
              }
              className={[
                "rounded-full px-2 py-1 text-[0.58rem] font-medium uppercase tracking-[0.12em] transition-colors",
                language === option
                  ? "bg-foreground text-background"
                  : "text-foreground-muted hover:text-foreground",
              ].join(" ")}
            >
              {option}
            </button>
          </div>
        ),
      )}
    </div>
  );
}
