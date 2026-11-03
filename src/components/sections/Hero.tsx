"use client";

import { useEffect, useRef, useState } from "react";

import AnimatedGradientText from "@/components/animata/text/animated-gradient-text";
import BlurOutUp from "@/components/animata/text/blur-out-up";
import PerCharacterRise from "@/components/animata/text/per-character-rise";
import { AnimatedName } from "@/components/ui/AnimatedName";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { HERO_HEADLINE_GRADIENT_DELAY_MS } from "@/config/ui";
import { useLanguage } from "@/i18n/LanguageProvider";

import "@/styles/hero.css";

type HeroHeadlineProps = {
  prefix: string;
  highlight: string;
};

function HeroHeadline({ prefix, highlight }: HeroHeadlineProps) {
  const [gradientMounted, setGradientMounted] = useState(false);
  const [showHeadlineGradient, setShowHeadlineGradient] = useState(false);

  const revealFrameRef =
    useRef<number | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setGradientMounted(true);

      revealFrameRef.current =
        window.requestAnimationFrame(() => {
          revealFrameRef.current = null;
          setShowHeadlineGradient(true);
        });
    }, HERO_HEADLINE_GRADIENT_DELAY_MS);

    return () => {
      window.clearTimeout(timeout);

      if (revealFrameRef.current !== null) {
        window.cancelAnimationFrame(
          revealFrameRef.current,
        );

        revealFrameRef.current = null;
      }
    };
  }, []);

  return (
    <h1 id="hero-title" className="hero-title">
      <PerCharacterRise
        text={prefix}
        characterDelayMs={62}
        durationMs={820}
        yPx={24}
      />{" "}
      <span className="hero-title-gradient-wrapper">
        <span className={`hero-title-base ${showHeadlineGradient ? "is-hidden" : ""}`}>
          <PerCharacterRise
            text={highlight}
            characterDelayMs={62}
            durationMs={820}
            initialDelayMs={2100}
            yPx={24}
          />
        </span>

        {gradientMounted ? (
          <span
            aria-hidden="true"
            className={`hero-title-gradient ${
              showHeadlineGradient ? "is-visible" : "is-hidden"
            }`}
          >
            <AnimatedGradientText className="hero-gradient-text">
              {highlight}
            </AnimatedGradientText>
          </span>
        ) : null}
      </span>
    </h1>
  );
}

export function Hero() {
  const { language, t } = useLanguage();

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-container">
        <div className="hero-topbar hero-reveal">
          <AnimatedName />
          <LanguageSwitcher />
        </div>

        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-badge-wrapper">
              <div className="hero-badge min-w-[15rem] justify-center">
                <div className="h-[1.4rem] w-full">
                  <BlurOutUp
                    key={language}
                    text={[t.hero.badge, ...t.hero.roles]}
                    holdMs={3900}
                    gapMs={180}
                    speed={1}
                    yTravel={0.2}
                    className="h-full w-full tracking-[0.1em]"
                    stageClassName="overflow-visible place-items-center"
                  />
                </div>
              </div>
            </div>

            <HeroHeadline
              key={language}
              prefix={t.hero.headlinePrefix}
              highlight={t.hero.headlineHighlight}
            />

            <div className="hero-bottom">
              <p className="hero-description hero-reveal">
                {t.hero.descriptionPrefix}
                <strong>{t.hero.descriptionStrong}</strong>
                {t.hero.descriptionSuffix}
              </p>

              <div className="hero-actions hero-reveal">
                <a href="#work" className="hero-action hero-action--primary">
                  <span className="hero-action-label">
                    {t.hero.primaryAction}
                    <span aria-hidden="true" className="hero-action-line" />
                  </span>
                </a>

                <a href="#Contact" className="hero-action hero-action--secondary">
                  <span className="hero-action-label">
                    {t.hero.secondaryAction}
                    <span aria-hidden="true" className="hero-action-line" />
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
