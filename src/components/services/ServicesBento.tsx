"use client";

import { useRef } from "react";

import {
  Code2,
  GraduationCap,
  LayoutDashboard,
  MonitorSmartphone,
  PanelsTopLeft,
  PlugZap,
  Presentation,
  ShoppingBag,
  UserRound,
  Video,
  Workflow,
} from "lucide-react";

import { useInView } from "motion/react";

import { CapabilityServiceCard } from "@/components/services/CapabilityServiceCard";
import {
  MainServiceCard,
  StackTags,
} from "@/components/services/MainServiceCard";
import { MPagoServiceCard } from "@/components/services/MPagoServiceCard";
import { ServiceAnimationStyles } from "@/components/services/ServiceAnimationStyles";
import { ServiceGroup } from "@/components/services/ServiceGroup";
import type { MicroSlide } from "@/components/services/types";
import { VisualServiceCard } from "@/components/services/VisualServiceCard";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ServicesBento() {
  const { t } = useLanguage();

  const developmentRef =
    useRef<HTMLDivElement>(null);

  const teachingRef =
    useRef<HTMLDivElement>(null);

  const developmentActive = useInView(
    developmentRef,
    {
      amount: 0.08,
    },
  );

  const teachingActive = useInView(
    teachingRef,
    {
      amount: 0.38,
    },
  );

  const webSlides: readonly MicroSlide[] = [
    {
      title:
        t.services.development.webItems[0].title,
      text:
        t.services.development.webItems[0].text,
      icon: PanelsTopLeft,
    },
    {
      title:
        t.services.development.webItems[1].title,
      text:
        t.services.development.webItems[1].text,
      icon: ShoppingBag,
    },
    {
      title:
        t.services.development.webItems[2].title,
      text:
        t.services.development.webItems[2].text,
      icon: MonitorSmartphone,
    },
  ];

  const developmentCapabilities:
    readonly MicroSlide[] = [
      {
        title:
          t.services.development.capabilities[0].title,
        text:
          t.services.development.capabilities[0].text,
        icon: LayoutDashboard,
      },
      {
        title:
          t.services.development.capabilities[1].title,
        text:
          t.services.development.capabilities[1].text,
        icon: Workflow,
      },
      {
        title:
          t.services.development.capabilities[2].title,
        text:
          t.services.development.capabilities[2].text,
        icon: PlugZap,
      },
    ];

  const classSlides: readonly MicroSlide[] = [
    {
      title:
        t.services.teaching.modalityItems[0].title,
      text:
        t.services.teaching.modalityItems[0].text,
      icon: UserRound,
    },
    {
      title:
        t.services.teaching.modalityItems[1].title,
      text:
        t.services.teaching.modalityItems[1].text,
      icon: Video,
    },
    {
      title:
        t.services.teaching.modalityItems[2].title,
      text:
        t.services.teaching.modalityItems[2].text,
      icon: Presentation,
    },
  ];

  const programmingVisuals = [
    "/images/services/programming-webs.jpg",
    "/images/services/programming-ecommerce.jpg",
    "/images/services/programming-landing.jpg",
  ] as const;

  const teachingVisuals = [
    "/images/services/classes-online.png",
    "/images/services/classes-followup.png",
    "/images/services/classes-exercises.png",
  ] as const;

  return (
    <>
      <ServiceAnimationStyles />

      <div className="w-full min-w-0">
        <ServiceGroup
          groupRef={developmentRef}
        >
          <MainServiceCard
            image="/images/services/programming-main.jpg"
            index="01"
            label={t.services.development.label}
            title={t.services.development.title}
            description={
              t.services.development.description
            }
            icon={
              <Code2
                aria-hidden="true"
                className="size-5"
              />
            }
            active={developmentActive}
          >
            <StackTags />
          </MainServiceCard>

          <VisualServiceCard
            slides={webSlides}
            active={developmentActive}
            images={programmingVisuals}
            intervalMs={3600}
          />

          <CapabilityServiceCard
            items={developmentCapabilities}
            active={developmentActive}
          />
        </ServiceGroup>

        <div
          aria-hidden="true"
          className="my-10 flex items-center gap-3"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border/75" />
          <span className="size-1 rounded-full bg-brand-soft/55" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border/75" />
        </div>

        <ServiceGroup
          groupRef={teachingRef}
          startLater
        >
          <MainServiceCard
            image="/images/services/classes-main.jpg"
            index="02"
            label={t.services.teaching.label}
            title={t.services.teaching.title}
            description={
              t.services.teaching.description
            }
            icon={
              <GraduationCap
                aria-hidden="true"
                className="size-5"
              />
            }
            active={teachingActive}
          />

          <MPagoServiceCard active={teachingActive} />

          <VisualServiceCard
            slides={classSlides}
            active={teachingActive}
            images={teachingVisuals}
            intervalMs={4200}
          />
        </ServiceGroup>
      </div>
    </>
  );
}
