"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import { cardVariants } from "@/components/services/ServiceGroup";
import { useLanguage } from "@/i18n/LanguageProvider";

const MERCADO_LIBRE_URL =
  "https://servicio.mercadolibre.com.ar/MLA-2047102089-clases-programacion-python-java-javascript-online-_JM";

export function MPagoServiceCard({ active }: { active: boolean }) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const copy =
    language === "es"
      ? {
          titleTop: "Clases de programación:",
          titleBottom: "Python / Java / Javascript / C# / C++",
          action: "Ver publicación",
          imageAlt:
            "Vista previa de la publicación de clases de programación en Mercado Libre",
        }
      : {
          titleTop: "Programming lessons:",
          titleBottom: "Python / Java / Javascript / C# / C++",
          action: "View listing",
          imageAlt:
            "Preview of the programming lessons listing on Mercado Libre",
        };

  const sheenActive = active && !shouldReduceMotion;

  return (
    <motion.article
      variants={cardVariants}
      className="service-mini-card relative overflow-hidden rounded-[1.55rem] border text-white"
    >
      <a
        href={MERCADO_LIBRE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.action}
        className="group flex h-full flex-col"
      >
        <div className="flex h-11 shrink-0 items-center justify-between gap-2 bg-[#FFE600] px-3">
          <Image
            src="/images/services/mercado-libre-logo.svg"
            alt="Mercado Libre"
            width={110}
            height={32}
            sizes="110px"
            className="h-[1.45rem] w-auto object-contain object-left"
          />

          <span className="relative inline-flex shrink-0 items-center gap-1 overflow-hidden rounded-full bg-[#3483FA] px-2.5 py-1.5 text-[0.54rem] font-semibold text-white">
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={
                sheenActive
                  ? { x: ["0%", "420%"] }
                  : { x: "0%" }
              }
              transition={
                sheenActive
                  ? {
                      duration: 1.15,
                      repeat: Infinity,
                      repeatDelay: 2.6,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0,
                    }
              }
            />

            <span className="relative z-10">
              {copy.action}
            </span>

            <ArrowUpRight
              aria-hidden="true"
              className="relative z-10 size-3"
            />
          </span>
        </div>

        <div className="relative mx-3 mt-3 min-h-0 flex-1 overflow-hidden rounded-[0.9rem] border border-black/10 bg-white">
          <Image
            src="/images/services/mercadolibre-publicacion.webp"
            alt={copy.imageAlt}
            fill
            sizes="(max-width: 767px) 44vw, 340px"
            loading="lazy"
            decoding="async"
            className="object-contain object-center"
          />
        </div>

        <div className="shrink-0 px-3.5 pb-3 pt-2.5">
          <h4 className="text-center text-[0.7rem] font-semibold leading-[1.25] tracking-[-0.015em] text-white">
            <span className="block">
              {copy.titleTop}
            </span>

            <span className="block">
              {copy.titleBottom}
            </span>
          </h4>
        </div>
      </a>
    </motion.article>
  );
}
