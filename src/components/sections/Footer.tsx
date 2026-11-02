"use client";

import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

import { AnimatedName } from "@/components/ui/AnimatedName";
import { useLanguage } from "@/i18n/LanguageProvider";

const FOOTER_LINKS = {
  es: [
    { label: "Inicio", href: "#hero" },
    { label: "Servicios", href: "#Services" },
    { label: "Contacto", href: "#Contact" },
    { label: "Proyectos", href: "#work" },
  ],
  en: [
    { label: "Top", href: "#hero" },
    { label: "Services", href: "#Services" },
    { label: "Contact", href: "#Contact" },
    { label: "Projects", href: "#work" },
  ],
} as const;

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  const isInView = useInView(
    footerRef,
    {
      once: true,
      amount: 0.3,
    },
  );

  const links = FOOTER_LINKS[language];
  const shouldAnimate =
    reduceMotion ? true : isInView;

  const enter = (
    delay: number,
  ) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 14,
        },
    animate: shouldAnimate
      ? {
          opacity: 1,
          y: 0,
        }
      : {
          opacity: 0,
          y: 14,
        },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.55,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  return (
    <footer
      ref={footerRef}
      className="pb-8 pt-20 sm:pb-10 sm:pt-24"
    >
      <div className="page-container">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center">
          <nav
            aria-label={
              language === "es"
                ? "Navegación del pie"
                : "Footer navigation"
            }
            className="flex flex-wrap items-center justify-center gap-y-2"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                {...enter(index * 0.08)}
                className="flex items-center"
              >
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="mx-3 text-[0.65rem] text-foreground-subtle/45"
                  >
                    ·
                  </span>
                ) : null}

                <a
                  href={link.href}
                  className="hero-action hero-action--secondary"
                >
                  <span className="hero-action-label text-[0.78rem] sm:text-[0.84rem]">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="hero-action-line"
                    />
                  </span>
                </a>
              </motion.div>
            ))}
          </nav>

          <motion.div
            {...enter(0.38)}
            className="mt-9 w-full text-center sm:mt-10"
          >
            <AnimatedName className="whitespace-normal text-center text-[clamp(1.55rem,7.5vw,2.7rem)] font-semibold tracking-[0.13em] text-foreground/[0.16] sm:text-[2.7rem]" />
          </motion.div>

          <motion.p
            {...enter(0.5)}
            className="mt-7 text-center text-[0.66rem] leading-relaxed text-foreground-subtle sm:text-[0.7rem]"
          >
            © {CURRENT_YEAR} Sebastián Villegas
            <span
              aria-hidden="true"
              className="mx-1.5 text-white/15"
            >
              ·
            </span>
            {language === "es"
              ? "Todos los derechos reservados."
              : "All rights reserved."}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
