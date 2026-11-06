"use client";

import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  getWhatsAppUrl,
  siteConfig,
} from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";

type NavigationMode = "up" | "down";
type ActionMode = NavigationMode | "whatsapp";

const NAV_DELAY = 3200;
const HIDE_DELAY = 8000;
const RETURN_DELAY = 8000;
const TOOLTIP_DELAY = 1700;
const SCROLL_IDLE_DELAY = 140;

const EASE =
  "cubic-bezier(0.22, 1, 0.36, 1)";

function getSections() {
  return siteConfig.navigationSectionIds
    .map((id) =>
      document.getElementById(id),
    )
    .filter(
      (
        element,
      ): element is HTMLElement =>
        Boolean(element),
    );
}

function getNavigationMode(): NavigationMode {
  const sections = getSections();

  if (!sections.length) {
    return window.scrollY > 0
      ? "up"
      : "down";
  }

  const viewportCenter =
    window.scrollY +
    window.innerHeight * 0.5;

  const last =
    sections[
      sections.length - 1
    ];

  const threshold =
    last.offsetTop +
    last.offsetHeight * 0.45;

  return viewportCenter >= threshold
    ? "up"
    : "down";
}

function getNextSection() {
  const currentY =
    window.scrollY +
    Math.min(
      window.innerHeight * 0.28,
      180,
    );

  return getSections().find(
    (section) =>
      section.offsetTop >
      currentY,
  );
}

export function SmartFloatingAction() {
  const { language } =
    useLanguage();

  const whatsappUrl =
    getWhatsAppUrl(language);

  const [enabled, setEnabled] =
    useState(false);

  const [visible, setVisible] =
    useState(false);

  const [mode, setMode] =
    useState<ActionMode>(
      "whatsapp",
    );

  const [
    tooltipVisible,
    setTooltipVisible,
  ] = useState(false);

  const locked =
    useRef(false);

  const pressedMode =
    useRef<ActionMode | null>(
      null,
    );

  const activated =
    useRef(false);

  const restartRef =
    useRef<() => void>(
      () => {},
    );

  const tooltipTimer =
    useRef<number | null>(
      null,
    );

  const showTooltip = useCallback(() => {
    if (tooltipTimer.current !== null) {
      window.clearTimeout(tooltipTimer.current);
    }

    setTooltipVisible(true);

    tooltipTimer.current = window.setTimeout(() => {
      tooltipTimer.current = null;
      setTooltipVisible(false);
    }, TOOLTIP_DELAY);
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipTimer.current !== null) {
      window.clearTimeout(tooltipTimer.current);
      tooltipTimer.current = null;
    }

    setTooltipVisible(false);
  }, []);

  useEffect(() => {
    const activate = () => {
      if (activated.current) {
        return;
      }

      activated.current = true;

      setMode(
        whatsappUrl
          ? "whatsapp"
          : getNavigationMode(),
      );

      setVisible(true);
      showTooltip();
      setEnabled(true);
    };

    if (
      document.documentElement
        .dataset
        .firstProjectReady ===
      "true"
    ) {
      activate();

      return;
    }

    window.addEventListener(
      "selected-work:first-card-ready",
      activate,
    );

    return () => {
      window.removeEventListener(
        "selected-work:first-card-ready",
        activate,
      );
    };
  }, [showTooltip, whatsappUrl]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let navTimer:
      | number
      | null = null;

    let hideTimer:
      | number
      | null = null;

    let returnTimer:
      | number
      | null = null;

    let scrollIdleTimer:
      | number
      | null = null;

    let scrollFrame:
      | number
      | null = null;

    const clearCycle =
      () => {
        if (
          navTimer !== null
        ) {
          window.clearTimeout(
            navTimer,
          );

          navTimer = null;
        }

        if (
          hideTimer !== null
        ) {
          window.clearTimeout(
            hideTimer,
          );

          hideTimer = null;
        }

        if (
          returnTimer !== null
        ) {
          window.clearTimeout(
            returnTimer,
          );

          returnTimer = null;
        }
      };

    function startCycle(
      showInitial = true,
    ) {
      clearCycle();

      if (showInitial) {
        setMode(
          whatsappUrl
            ? "whatsapp"
            : getNavigationMode(),
        );

        setVisible(true);
      }

      navTimer =
        window.setTimeout(
          () => {
            navTimer = null;

            if (
              locked.current
            ) {
              return;
            }

            setMode(
              getNavigationMode(),
            );

            showTooltip();
          },
          NAV_DELAY,
        );

      hideTimer =
        window.setTimeout(
          () => {
            hideTimer = null;

            if (
              locked.current
            ) {
              return;
            }

            hideTooltip();
            setVisible(false);

            returnTimer =
              window.setTimeout(
                () => {
                  returnTimer =
                    null;

                  if (
                    locked.current
                  ) {
                    return;
                  }

                  setMode(
                    whatsappUrl
                      ? "whatsapp"
                      : getNavigationMode(),
                  );

                  setVisible(
                    true,
                  );

                  showTooltip();

                  startCycle(
                    false,
                  );
                },
                RETURN_DELAY,
              );
          },
          HIDE_DELAY,
        );
    }

    restartRef.current = () => {
      startCycle(true);
    };

    startCycle(false);

    const handleScroll =
      () => {
        if (
          scrollFrame !== null
        ) {
          return;
        }

        scrollFrame =
          window.requestAnimationFrame(
            () => {
              scrollFrame = null;

              if (
                scrollIdleTimer !==
                null
              ) {
                window.clearTimeout(
                  scrollIdleTimer,
                );
              }

              scrollIdleTimer =
                window.setTimeout(
                  () => {
                    scrollIdleTimer =
                      null;

                    if (
                      !locked.current
                    ) {
                      startCycle(
                        true,
                      );
                    }
                  },
                  SCROLL_IDLE_DELAY,
                );
            },
          );
      };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      clearCycle();

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (
        scrollIdleTimer !==
        null
      ) {
        window.clearTimeout(
          scrollIdleTimer,
        );
      }

      if (
        scrollFrame !== null
      ) {
        window.cancelAnimationFrame(
          scrollFrame,
        );
      }
    };
  }, [
    enabled,
    whatsappUrl,
    showTooltip,
    hideTooltip,
  ]);

  useEffect(() => {
    return () => {
      if (
        tooltipTimer.current !==
        null
      ) {
        window.clearTimeout(
          tooltipTimer.current,
        );
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const labels =
    language === "es"
      ? {
          whatsapp:
            "Enviar WhatsApp",
          down:
            "Siguiente sección",
          up:
            "Inicio",
        }
      : {
          whatsapp:
            "Send WhatsApp",
          down:
            "Next section",
          up:
            "Home",
        };

  const label =
    labels[mode];

  const performAction = (
    action:
      ActionMode,
  ) => {
    if (
      action ===
        "whatsapp" &&
      whatsappUrl
    ) {
      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer",
      );

      return;
    }

    if (
      action === "up"
    ) {
      document
        .getElementById(
          "hero",
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        });

      return;
    }

    getNextSection()?.scrollIntoView(
      {
        behavior:
          "smooth",
      },
    );
  };

  return (
    <div
      style={{
        right:
          "max(1rem, env(safe-area-inset-right))",

        bottom:
          "max(1rem, env(safe-area-inset-bottom))",

        opacity:
          visible
            ? 1
            : 0,

        transform:
          visible
            ? "translate3d(0,0,0) scale(1)"
            : "translate3d(0,6px,0) scale(0.96)",

        pointerEvents:
          visible
            ? "auto"
            : "none",

        transition: [
          `opacity 500ms ${EASE}`,
          `transform 500ms ${EASE}`,
        ].join(
          ", ",
        ),

        willChange:
          "transform, opacity",
      }}
      className="fixed z-40 flex items-center gap-2.5"
    >
      <div
        style={{
          opacity:
            tooltipVisible
              ? 1
              : 0,

          transform:
            tooltipVisible
              ? "translate3d(0,0,0)"
              : "translate3d(6px,0,0)",

          transition: [
            `opacity 320ms ${EASE}`,
            `transform 320ms ${EASE}`,
          ].join(
            ", ",
          ),

          willChange:
            "transform, opacity",
        }}
        className={[
          "pointer-events-none rounded-full border px-3 py-1.5",
          "text-[0.66rem] font-medium leading-none",
          "shadow-[0_8px_24px_rgba(0,0,0,0.22)]",

          mode ===
          "whatsapp"
            ? "border-[#25D366]/30 bg-[#173523] text-[#79e99e]"
            : "border-white/10 bg-[#19191c] text-foreground-muted",
        ].join(
          " ",
        )}
      >
        {label}
      </div>

      <button
        type="button"
        aria-label={
          label
        }
        title={
          label
        }
        onClick={() =>
          performAction(
            pressedMode.current ??
              mode,
          )
        }
        onPointerDown={() => {
          locked.current =
            true;

          pressedMode.current =
            mode;
        }}
        onPointerUp={() => {
          window.setTimeout(
            () => {
              locked.current =
                false;

              pressedMode.current =
                null;

              restartRef.current();
            },
            250,
          );
        }}
        onPointerCancel={() => {
          locked.current =
            false;

          pressedMode.current =
            null;
        }}
        onMouseEnter={() => {
          locked.current =
            true;

          showTooltip();
        }}
        onMouseLeave={() => {
          locked.current =
            false;

          hideTooltip();

          restartRef.current();
        }}
        onFocus={() => {
          locked.current =
            true;

          showTooltip();
        }}
        onBlur={() => {
          locked.current =
            false;

          hideTooltip();

          restartRef.current();
        }}
        className="relative flex size-12 shrink-0 items-center justify-center"
      >
        <ButtonLayer
          active={
            mode ===
            "whatsapp"
          }
          className="border-[#25D366]/50 bg-[#25D366]"
        />

        <ButtonLayer
          active={
            mode !==
            "whatsapp"
          }
          className="border-white/10 bg-[#19191c]"
        />

        <ActionIcon
          active={
            mode ===
            "whatsapp"
          }
        >
          <WhatsAppIcon className="size-full" />
        </ActionIcon>

        <ActionIcon
          active={
            mode ===
            "down"
          }
        >
          <ChevronDown className="size-full" />
        </ActionIcon>

        <ActionIcon
          active={
            mode ===
            "up"
          }
        >
          <ChevronUp className="size-full" />
        </ActionIcon>
      </button>
    </div>
  );
}

function ButtonLayer({
  active,
  className,
}: {
  active: boolean;
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        opacity:
          active
            ? 1
            : 0,

        transition: `opacity 600ms ${EASE}`,

        willChange:
          "opacity",
      }}
      className={[
        "absolute inset-0 rounded-full border",
        "shadow-[0_10px_35px_rgba(0,0,0,0.32)]",
        className,
      ].join(
        " ",
      )}
    />
  );
}

function ActionIcon({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <span
      style={{
        opacity:
          active
            ? 1
            : 0,

        transform:
          active
            ? "scale(1)"
            : "scale(0.9)",

        transition: [
          `opacity 500ms ${EASE}`,
          `transform 500ms ${EASE}`,
        ].join(
          ", ",
        ),

        willChange:
          "transform, opacity",
      }}
      className="absolute z-10 flex size-5.5 items-center justify-center text-white"
    >
      {children}
    </span>
  );
}