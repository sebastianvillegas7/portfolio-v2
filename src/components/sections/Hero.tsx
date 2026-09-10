"use client";

import { useEffect, useState } from "react";

import AnimatedGradientText from "@/components/animata/text/animated-gradient-text";
import BlurOutUp from "@/components/animata/text/blur-out-up";
import GibberishText from "@/components/animata/text/gibberish-text";
import PerCharacterRise from "@/components/animata/text/per-character-rise";

import FluidCursor from "@/components/effects/FluidCursor";
import { LightRays } from "@/components/effects/LightRays";

import { useMediaQuery } from "@/hooks/use-media-query";

import "@/styles/hero.css";

const ROLES = [
  "Desarrollo web",
  "Aplicaciones a medida",
  "Full-stack development",
  "Clases de programación",
  "Tutorías de proyectos",
];

const HEADLINE_PREFIX = "De una idea a un producto digital que";
const HEADLINE_HIGHLIGHT = "realmente funciona.";

const HEADLINE_GRADIENT_DELAY = 4300;

export function Hero() {
  const [showHeadlineGradient, setShowHeadlineGradient] = useState(false);

  const isMobile = useMediaQuery("(max-width: 47.999rem)");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowHeadlineGradient(true);
    }, HEADLINE_GRADIENT_DELAY);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-background hero-background--light">
        <LightRays
          color="#a8b7ff"
          speed={isMobile ? 0.13 : 0.16}
          spread={isMobile ? 1.4 : 1.15}
          length={isMobile ? 1.9 : 1.6}
          pointerInfluence={isMobile ? 0.012 : 0.018}
        />
      </div>

      <div className="hero-background hero-background--fluid">
        <FluidCursor />
      </div>

      <div className="hero-background hero-shade" />

      <div className="hero-container">
        <div className="hero-topbar hero-reveal">
          <div className="hero-name">
            <GibberishText
              text="Sebastián Villegas"
              intervalMs={65}
              pauseMs={5000}
            />
          </div>

          <div className="hero-roles">
            <BlurOutUp
              text={ROLES}
              holdMs={2400}
              gapMs={180}
              speed={1}
              yTravel={0.2}
              className="hero-roles-text"
              stageClassName="overflow-visible place-items-end"
            />
          </div>
        </div>

        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-badge-wrapper">
              <span className="hero-badge">
                Productos digitales a medida
              </span>
            </div>

            <h1
              id="hero-title"
              className="hero-title"
            >
              <PerCharacterRise
                text={HEADLINE_PREFIX}
                characterDelayMs={62}
                durationMs={820}
                yPx={24}
              />{" "}

              <span className="hero-title-gradient-wrapper">
                <span
                  className={`hero-title-base ${
                    showHeadlineGradient ? "is-hidden" : ""
                  }`}
                >
                  <PerCharacterRise
                    text={HEADLINE_HIGHLIGHT}
                    characterDelayMs={62}
                    durationMs={820}
                    initialDelayMs={2100}
                    yPx={24}
                  />
                </span>

                <span
                  aria-hidden="true"
                  className={`hero-title-gradient ${
                    showHeadlineGradient
                      ? "is-visible"
                      : "is-hidden"
                  }`}
                >
                  <AnimatedGradientText className="hero-gradient-text">
                    {HEADLINE_HIGHLIGHT}
                  </AnimatedGradientText>
                </span>
              </span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-description hero-reveal">
                Desarrollo{" "}
                <strong>
                  soluciones claras, funcionales y atractivas
                </strong>
                , pensadas para resolver necesidades reales.
              </p>

              <div className="hero-actions hero-reveal">
                <a
                  href="#work"
                  className="hero-action hero-action--primary"
                >
                  <span className="hero-action-label">
                    Ver trabajos

                    <span
                      aria-hidden="true"
                      className="hero-action-line"
                    />
                  </span>
                </a>

                <a
                  href="#contact"
                  className="hero-action hero-action--secondary"
                >
                  <span className="hero-action-label">
                    Hablemos

                    <span
                      aria-hidden="true"
                      className="hero-action-line"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}