"use client";

import { useEffect, useState } from "react";

import AnimatedGradientText from "@/components/animata/text/animated-gradient-text";
import BlurOutUp from "@/components/animata/text/blur-out-up";
import GibberishText from "@/components/animata/text/gibberish-text";
import PerCharacterRise from "@/components/animata/text/per-character-rise";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageProvider";

import "@/styles/hero.css";

const HEADLINE_GRADIENT_DELAY = 4300;

type HeroHeadlineProps = {
  prefix: string;
  highlight: string;
};

function HeroHeadline({
  prefix,
  highlight,
}: HeroHeadlineProps) {
  const [showHeadlineGradient, setShowHeadlineGradient] =
    useState(false);

  useEffect(() => {
    const timeout =
      window.setTimeout(() => {
        setShowHeadlineGradient(true);
      }, HEADLINE_GRADIENT_DELAY);

    return () =>
      window.clearTimeout(timeout);
  }, []);

  return (
    <h1
      id="hero-title"
      className="hero-title"
    >
      <PerCharacterRise
        text={prefix}
        characterDelayMs={62}
        durationMs={820}
        yPx={24}
      />{" "}

      <span className="hero-title-gradient-wrapper">
        <span
          className={`hero-title-base ${
            showHeadlineGradient
              ? "is-hidden"
              : ""
          }`}
        >
          <PerCharacterRise
            text={highlight}
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
            {highlight}
          </AnimatedGradientText>
        </span>
      </span>
    </h1>
  );
}

export function Hero() {
  const {
    language,
    t,
  } = useLanguage();

  return (
    <section
      id="hero"
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-container">
        <LanguageSwitcher />

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
              key={language}
              text={[...t.hero.roles]}
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
                {t.hero.badge}
              </span>
            </div>

            <HeroHeadline
              key={language}
              prefix={t.hero.headlinePrefix}
              highlight={t.hero.headlineHighlight}
            />

            <div className="hero-bottom">
              <p className="hero-description hero-reveal">
                {t.hero.descriptionPrefix}
                <strong>
                  {t.hero.descriptionStrong}
                </strong>
                {t.hero.descriptionSuffix}
              </p>

              <div className="hero-actions hero-reveal">
                <a
                  href="#work"
                  className="hero-action hero-action--primary"
                >
                  <span className="hero-action-label">
                    {t.hero.primaryAction}

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
                    {t.hero.secondaryAction}

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
