"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { SMART_ACTION_INITIAL_DELAY_MS } from "@/config/ui";
import { useLanguage } from "@/i18n/LanguageProvider";

type NavigationMode = "up" | "down";
type ActionMode = NavigationMode | "whatsapp";

const IDLE_HIDE_DELAY_MS = 8000;
const HIDDEN_REAPPEAR_DELAY_MS = 8000;
const NAV_SUGGESTION_DELAY_MS = 3200;
const TOOLTIP_VISIBLE_MS = 1700;

const ICON_TRANSITION_DURATION = 0.95;
const BUTTON_COLOR_TRANSITION_DURATION = 1.05;

function getSectionElements() {
  return siteConfig.navigationSectionIds
    .map((id) => document.getElementById(id))
    .filter((element): element is HTMLElement => Boolean(element));
}

function getNavigationMode(): NavigationMode {
  const sections = getSectionElements();

  if (sections.length === 0) {
    return window.scrollY > 0 ? "up" : "down";
  }

  const viewportCenter =
    window.scrollY + window.innerHeight * 0.5;

  const lastSection = sections[sections.length - 1];

  const lastSectionThreshold =
    lastSection.offsetTop + lastSection.offsetHeight * 0.45;

  return viewportCenter >= lastSectionThreshold ? "up" : "down";
}

function getNextSection() {
  const sections = getSectionElements();

  const currentY =
    window.scrollY +
    Math.min(window.innerHeight * 0.28, 180);

  return sections.find((section) => section.offsetTop > currentY);
}

function scrollToSection(
  element: HTMLElement,
  reduceMotion: boolean,
) {
  element.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function SmartFloatingAction() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();

  const whatsappUrl = getWhatsAppUrl(language);

  const [mode, setMode] = useState<ActionMode>("whatsapp");
  const [visible, setVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const frameRef = useRef<number | null>(null);
  const tooltipRef = useRef<number | null>(null);
  const hiddenReturnRef = useRef<number | null>(null);

  const interactionLockedRef = useRef(false);
  const pressedModeRef = useRef<ActionMode | null>(null);

  const clearTimer = (
    ref: React.MutableRefObject<number | null>,
  ) => {
    if (ref.current !== null) {
      window.clearTimeout(ref.current);
      ref.current = null;
    }
  };

  const showTooltip = useCallback(() => {
    clearTimer(tooltipRef);

    setTooltipVisible(true);

    tooltipRef.current = window.setTimeout(() => {
      setTooltipVisible(false);
    }, TOOLTIP_VISIBLE_MS);
  }, []);

  const revealWhatsApp = useCallback(
    (withTooltip = false) => {
      if (interactionLockedRef.current) {
        return;
      }

      setMode(
        whatsappUrl
          ? "whatsapp"
          : getNavigationMode(),
      );
      setVisible(true);

      if (withTooltip) {
        showTooltip();
      }
    },
    [showTooltip, whatsappUrl],
  );

  const restartCycle = useCallback(() => {
    clearTimer(hiddenReturnRef);

    if (!interactionLockedRef.current) {
      revealWhatsApp(false);
    }

    setCycleKey((current) => current + 1);
  }, [revealWhatsApp]);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setEnabled(true);
      revealWhatsApp(true);
      setCycleKey((current) => current + 1);
    }, SMART_ACTION_INITIAL_DELAY_MS);

    return () => {
      window.clearTimeout(initialTimer);
    };
  }, [revealWhatsApp]);

  useEffect(() => {
    if (!enabled || !visible) {
      return;
    }

    const navSuggestionTimer = window.setTimeout(() => {
      if (interactionLockedRef.current) {
        return;
      }

      setMode(getNavigationMode());
      showTooltip();
    }, NAV_SUGGESTION_DELAY_MS);

    const hideTimer = window.setTimeout(() => {
      if (interactionLockedRef.current) {
        return;
      }

      setTooltipVisible(false);
      setVisible(false);

      hiddenReturnRef.current = window.setTimeout(() => {
        revealWhatsApp(true);
        setCycleKey((current) => current + 1);
      }, HIDDEN_REAPPEAR_DELAY_MS);
    }, IDLE_HIDE_DELAY_MS);

    return () => {
      window.clearTimeout(navSuggestionTimer);
      window.clearTimeout(hideTimer);
    };
  }, [
    cycleKey,
    enabled,
    revealWhatsApp,
    showTooltip,
    visible,
  ]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        if (!interactionLockedRef.current) {
          restartCycle();
        }

        frameRef.current = null;
      });
    };

    const handleActivity = () => {
      if (!interactionLockedRef.current) {
        restartCycle();
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    window.addEventListener(
      "keydown",
      handleActivity,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "keydown",
        handleActivity,
      );

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled, restartCycle]);

  useEffect(() => {
    return () => {
      clearTimer(tooltipRef);
      clearTimer(hiddenReturnRef);
    };
  }, []);

  const copy = useMemo(
    () =>
      language === "es"
        ? {
            up: "Inicio",
            down: "Siguiente sección",
            whatsapp: "Enviar WhatsApp",
          }
        : {
            up: "Home",
            down: "Next section",
            whatsapp: "Send WhatsApp",
          },
    [language],
  );

  const label = copy[mode];

  const performAction = useCallback(
    (actionMode: ActionMode) => {
      if (
        actionMode === "whatsapp" &&
        whatsappUrl
      ) {
        window.open(
          whatsappUrl,
          "_blank",
          "noopener,noreferrer",
        );

        return;
      }

      if (actionMode === "up") {
        const hero =
          document.getElementById("hero");

        if (hero) {
          scrollToSection(
            hero,
            Boolean(reduceMotion),
          );
        }

        return;
      }

      const nextSection =
        getNextSection();

      if (nextSection) {
        scrollToSection(
          nextSection,
          Boolean(reduceMotion),
        );
      }
    },
    [reduceMotion, whatsappUrl],
  );

  function handlePointerDown() {
    interactionLockedRef.current = true;
    pressedModeRef.current = mode;
  }

  function handlePointerUp() {
    window.setTimeout(() => {
      interactionLockedRef.current = false;
      pressedModeRef.current = null;
      restartCycle();
    }, 250);
  }

  function handleClick() {
    performAction(
      pressedModeRef.current ?? mode,
    );
  }

  function handleMouseEnter() {
    interactionLockedRef.current = true;
    showTooltip();
  }

  function handleMouseLeave() {
    interactionLockedRef.current = false;
    setTooltipVisible(false);
    restartCycle();
  }

  function handleFocus() {
    interactionLockedRef.current = true;
    showTooltip();
  }

  function handleBlur() {
    interactionLockedRef.current = false;
    setTooltipVisible(false);
    restartCycle();
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                  scale: 0.94,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 6,
                  scale: 0.96,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            right:
              "max(1rem, env(safe-area-inset-right))",
            bottom:
              "max(1rem, env(safe-area-inset-bottom))",
          }}
          className="fixed z-40 flex items-center gap-2.5"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {tooltipVisible ? (
              <motion.div
                key={`${mode}-tooltip`}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 6,
                        scale: 0.98,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: 4,
                        scale: 0.99,
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  "pointer-events-none rounded-full border px-3 py-1.5 text-[0.66rem] font-medium leading-none shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md sm:text-[0.7rem]",
                  mode === "whatsapp"
                    ? "border-[#25D366]/30 bg-[#173523]/95 text-[#79e99e]"
                    : "border-white/10 bg-surface-2/92 text-foreground-muted",
                ].join(" ")}
              >
                {label}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-label={label}
            title={label}
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.95 }
            }
            animate={{
              backgroundColor:
                mode === "whatsapp"
                  ? "#25D366"
                  : "rgba(25,25,28,0.94)",
              borderColor:
                mode === "whatsapp"
                  ? "rgba(37,211,102,0.52)"
                  : "rgba(255,255,255,0.10)",
            }}
            transition={{
              backgroundColor: {
                duration: reduceMotion
                  ? 0
                  : BUTTON_COLOR_TRANSITION_DURATION,
                ease: [0.22, 1, 0.36, 1],
              },
              borderColor: {
                duration: reduceMotion
                  ? 0
                  : BUTTON_COLOR_TRANSITION_DURATION,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border text-white shadow-[0_10px_35px_rgba(0,0,0,0.32)] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          >
            <AnimatePresence
              initial={false}
              mode="sync"
            >
              <motion.span
                key={mode}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.88,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.88,
                      }
                }
                transition={{
                  duration: reduceMotion
                    ? 0
                    : ICON_TRANSITION_DURATION,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute flex size-5.5 items-center justify-center"
              >
                {mode === "up" ? (
                  <ChevronUp
                    aria-hidden="true"
                    className="size-full"
                  />
                ) : mode === "down" ? (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-full"
                  />
                ) : (
                  <WhatsAppIcon className="size-full" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
