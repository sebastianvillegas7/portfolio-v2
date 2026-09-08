"use client";

import { useEffect, useState } from "react";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import PerCharacterRise from "@/components/animata/text/per-character-rise";
import FluidCursor from "@/components/effects/FluidCursor";
import { LightRays } from "@/components/effects/LightRays";
import BlurOutUp from "@/components/animata/text/blur-out-up";
import { Button } from "@/components/ui/button";
import AnimatedGradientText from "@/components/animata/text/animated-gradient-text";
import GibberishText from "@/components/animata/text/gibberish-text";

import "@/styles/hero.css";

export function Hero() {
  const [showHeadlineGradient, setShowHeadlineGradient] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowHeadlineGradient(true);
    }, 4300);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-[#0d0d0f]"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <LightRays
          color="#a8b7ff"
          speed={0.16}
          spread={1.15}
          length={1.6}
          pointerInfluence={0.018}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <FluidCursor />
      </div>

      <div className="hero-shade pointer-events-none absolute inset-0 z-[2]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[100rem] flex-col px-5 py-7 sm:px-8 md:px-12 lg:px-16">
        <div className="hero-reveal flex items-center justify-between gap-6 [animation-delay:60ms]">
          <div className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/80">
            <GibberishText
              text="Sebastián Villegas"
              intervalMs={65}
              pauseMs={5000}
            />
          </div>

          <div className="h-6 min-w-[22rem] overflow-visible text-right">
            <BlurOutUp
              text={[
                "Desarrollo web",
                "Aplicaciones a medida",
                "Full-stack development",
                "Clases de programación",
                "Tutorías de proyectos",
              ]}
              holdMs={2400}
              gapMs={180}
              speed={1}
              yTravel={0.2}
              className="h-full overflow-visible text-[0.80rem] font-medium uppercase leading-7 tracking-[0.16em] text-white/80"
              stageClassName="overflow-visible place-items-end"
            />
          </div>
        </div>

        <div className="flex flex-1 items-center">
          <div className="w-full">
            <div className="max-w-[58rem]">
              <div className="hero-reveal mb-5 [animation-delay:100ms]">
                <div className="hero-reveal mb-5 [animation-delay:100ms] opacity-40">
                  <span
                    className="
      inline-flex
      rounded-[0.18rem]
      bg-linear-to-r
      from-[#5E4BFF]
      via-[#D3D7FF]
      to-[#7B8CFF]
      bg-size-[200%_auto]
      animate-bg-position
      p-px
    "
                  >
                    <span
                      className="
        inline-flex
        bg-[#0d0d0f]
        px-3 py-2
        text-[0.68rem]
        font-medium
        uppercase
        tracking-[0.12em]
        text-white/65
      "
      
                    >
                      Productos digitales a medida
                    </span>
                  </span>
                </div>
              </div>

              <h1 id="hero-title" className="hero-title max-w-[11ch]">
                <PerCharacterRise
                  text="De una idea a un producto digital que"
                  characterDelayMs={62}
                  durationMs={820}
                  yPx={24}
                />{" "}
                <span className="relative inline-block align-baseline">
                  <span
                    className={`inline-block transition-opacity duration-1000 ease-out ${
                      showHeadlineGradient ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <PerCharacterRise
                      text="realmente funciona."
                      characterDelayMs={62}
                      durationMs={820}
                      initialDelayMs={2100}
                      yPx={24}
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 inline-block transition-opacity duration-1000 ease-in ${
                      showHeadlineGradient ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <AnimatedGradientText className="font-inherit leading-[inherit] tracking-[inherit] bg-linear-to-r from-[#5E4BFF] via-[#D3D7FF] to-[#7B8CFF]">
                      realmente funciona.
                    </AnimatedGradientText>
                  </span>
                </span>
              </h1>

              <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                <p className="hero-reveal max-w-[34rem] text-[1.05rem] leading-[1.65] text-white/65 [animation-delay:220ms]">
                  Desarrollo{" "}
                  <span className="font-medium text-white">
                    soluciones claras, funcionales y atractivas
                  </span>
                  , pensadas para resolver necesidades reales.
                </p>

                <div className="hero-reveal flex items-center gap-8 [animation-delay:280ms]">
                  <a
                    href="#work"
                    className="group inline-flex transition-transform duration-300 ease-out hover:scale-[1.04]"
                  >
                    <span
                      className="
        relative pb-1
        text-sm font-medium text-white/80
        transition-all duration-500
        group-hover:bg-linear-to-r
        group-hover:from-[#5E4BFF]
        group-hover:via-[#D3D7FF]
        group-hover:to-[#7B8CFF]
        group-hover:bg-clip-text
        group-hover:text-transparent
      "
                    >
                      Ver trabajos
                      <span
                        aria-hidden="true"
                        className="
    absolute bottom-0 left-0 h-px w-full
    bg-linear-to-r
    from-[#5E4BFF]
    via-[#D3D7FF]
    to-[#7B8CFF]
    bg-size-[200%_auto]
    animate-bg-position
    opacity-70
    transition-opacity duration-500
    group-hover:opacity-100
  "
                      />
                    </span>
                  </a>

                  <a
                    href="#contact"
                    className="group inline-flex transition-transform duration-300 ease-out hover:scale-[1.04]"
                  >
                    <span
                      className="
        relative pb-1
        text-sm font-medium text-white/60
        transition-all duration-500
        group-hover:bg-linear-to-r
        group-hover:from-[#5E4BFF]
        group-hover:via-[#D3D7FF]
        group-hover:to-[#7B8CFF]
        group-hover:bg-clip-text
        group-hover:text-transparent
      "
                    >
                      Hablemos
                      <span
                        aria-hidden="true"
                        className="
          absolute bottom-0 left-0 h-px w-0
          bg-linear-to-r
          from-[#5E4BFF]
          via-[#D3D7FF]
          to-[#7B8CFF]
          transition-all duration-500
          group-hover:w-full
        "
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
