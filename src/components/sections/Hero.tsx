"use client";

import { useState } from "react";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import DoubleUnderline from "@/components/animata/text/double-underline";
import FluidCursor from "@/components/effects/FluidCursor";
import { LightRays } from "@/components/effects/LightRays";
import { RotatingRole } from "@/components/effects/RotatingRole";
import { Button } from "@/components/ui/button";

import "@/styles/hero.css";

export function Hero() {
  const [lightPulseSignal, setLightPulseSignal] = useState(0);

  const [underlineTarget, setUnderlineTarget] = useState<
    "headline" | "name"
  >("headline");

  const [headlinePulseCount, setHeadlinePulseCount] = useState(0);

  function handleRoleChange() {
    setLightPulseSignal((current) => current + 1);

    if (underlineTarget === "headline") {
      setHeadlinePulseCount((current) => {
        const next = current + 1;

        if (next >= 3) {
          setUnderlineTarget("name");
          return 0;
        }

        return next;
      });

      return;
    }

    /*
      El nombre permanece subrayado durante un ciclo completo
      del texto dinámico y luego volvemos al headline.
    */
    setUnderlineTarget("headline");
  }

  const headlineActive = underlineTarget === "headline";
  const nameActive = underlineTarget === "name";

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
          pulseSignal={lightPulseSignal}
          pointerInfluence={0.018}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <FluidCursor />
      </div>

      <div className="hero-shade pointer-events-none absolute inset-0 z-[2]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[100rem] flex-col px-5 py-7 sm:px-8 md:px-12 lg:px-16">
        <div className="hero-reveal flex items-center justify-between gap-6 [animation-delay:60ms]">
          <DoubleUnderline
            active={nameActive}
            className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/80"
            underlineClassName="text-white/70"
          >
            Sebastián Villegas
          </DoubleUnderline>

          <RotatingRole onChange={handleRoleChange} />
        </div>

        <div className="flex flex-1 items-center">
          <div className="w-full">
            <div className="max-w-[58rem]">
              <div className="hero-reveal mb-5 [animation-delay:100ms]">
                <span className="inline-flex border border-white/15 px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/65">
                  Productos digitales a medida
                </span>
              </div>

              <h1
                id="hero-title"
                className="hero-title hero-reveal max-w-[9ch] font-semibold leading-[0.95] tracking-[-0.035em] [animation-delay:140ms]"
              >
                De una idea a un producto digital que{" "}

                <span className="block w-fit text-[#8798ff]">
                  <DoubleUnderline
                    active={headlineActive}
                    underlineClassName="text-[#8798ff]"
                  >
                    realmente
                  </DoubleUnderline>
                </span>

                <span className="mt-[0.035em] block w-fit text-[#8798ff]">
                  <DoubleUnderline
                    active={headlineActive}
                    delay={900}
                    underlineClassName="text-[#8798ff]"
                  >
                    funciona.
                  </DoubleUnderline>
                </span>
              </h1>

              <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                <p className="hero-reveal max-w-[34rem] text-[1.05rem] leading-[1.65] text-white/65 [animation-delay:220ms]">
                  Transformo ideas en{" "}
                  <span className="font-medium text-white">
                    productos digitales claros, funcionales y atractivos
                  </span>
                  , desde sitios web hasta aplicaciones y soluciones a medida.
                </p>

                <div className="hero-reveal flex flex-wrap gap-3 [animation-delay:280ms]">
                  <Button asChild>
                    <a href="#work">
                      Ver trabajos
                      <ArrowDownRight className="size-4" />
                    </a>
                  </Button>

                  <Button asChild variant="outline">
                    <a href="#contact">
                      Hablemos
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}