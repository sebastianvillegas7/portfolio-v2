import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { LightRays } from "@/components/effects/LightRays";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="Hero"
      aria-labelledby="hero-title"
      className="relative isolate h-dvh overflow-hidden border-b border-border bg-background"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <LightRays
          color="#a8b7ff"
          speed={0.45}
          spread={0.72}
          length={1.45}
          pointerInfluence={0.055}
        />
      </div>
      <div aria-hidden="true" className="hero-shade absolute inset-0" />

      <div className="relative z-10 mx-auto flex h-full max-w-[100rem] flex-col px-6 py-[clamp(1.5rem,4.5dvh,3.5rem)] sm:px-10 lg:px-12 xl:px-16">
        <div className="hero-reveal flex items-center justify-between gap-6 [animation-delay:60ms]">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground">Sebastián Villegas</p>
          <p className="text-right text-[0.62rem] uppercase leading-5 tracking-[0.16em] text-muted-foreground">
            Diseño y desarrollo web
          </p>
        </div>

        <div className="flex flex-1 items-center py-8">
          <div className="w-full max-w-[64rem]">
            <p className="hero-reveal mb-[clamp(1rem,2.5dvh,2rem)] max-w-max border border-foreground/15 bg-background/35 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-md [animation-delay:100ms]">
              Webs para negocios y marcas
            </p>

            <h1
              id="hero-title"
              className="hero-title hero-reveal max-w-[11.5ch] font-medium leading-[0.88] tracking-[-0.065em] [animation-delay:140ms]"
            >
              Una web a la altura de <span className="text-accent">tu negocio.</span>
            </h1>

            <div className="hero-reveal mt-[clamp(1.5rem,4dvh,3rem)] flex max-w-[52rem] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between [animation-delay:220ms]">
              <p className="max-w-[34rem] text-sm leading-6 text-foreground/65 sm:text-base sm:leading-7">
                Creo sitios claros, atractivos y fáciles de usar para que tus clientes entiendan lo que ofrecés y den
                el siguiente paso.
              </p>

              <div className="flex shrink-0 flex-wrap gap-2.5">
                <Button
                  asChild
                  size="lg"
                  className="group h-11 rounded-full bg-accent px-5 font-bold text-[#101218] transition-all duration-300 hover:bg-accent hover:pr-6 hover:opacity-100"
                >
                  <a href="#SelectedWork">
                    Ver trabajos
                    <ArrowDownRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group h-11 rounded-full border-foreground/25 bg-background/20 px-5 text-foreground backdrop-blur-md transition-colors duration-300 hover:border-foreground/50 hover:bg-foreground hover:text-background"
                >
                  <a href="#Contact">
                    Hablemos
                    <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-reveal flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-foreground/15 pt-4 text-[0.62rem] uppercase tracking-[0.17em] text-foreground/55 [animation-delay:280ms] sm:gap-x-8">
          <span>Sitios web</span>
          <span className="size-1 rounded-full bg-accent" />
          <span>Tiendas online</span>
          <span className="size-1 rounded-full bg-accent" />
          <span>Aplicaciones a medida</span>
        </div>
      </div>
    </section>
  );
}
