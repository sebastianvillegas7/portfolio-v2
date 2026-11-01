"use client";

import Image from "next/image";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  Code2,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  MonitorSmartphone,
  PanelsTopLeft,
  PlugZap,
  Presentation,
  Rocket,
  ShoppingBag,
  UserRound,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  stagger,
  useInView,
  type Variants,
} from "motion/react";

import { useLanguage } from "@/i18n/LanguageProvider";

type MicroSlide = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type VisualServiceCardProps = {
  slides: readonly MicroSlide[];
  active: boolean;
  images: readonly [string, ...string[]];
  intervalMs?: number;
};

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.42, {
        startDelay: 0.10,
      }),
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ServiceGroup({
  children,
  groupRef,
  startLater = false,
}: {
  children: ReactNode;
  groupRef: React.RefObject<HTMLDivElement | null>;
  startLater?: boolean;
}) {
  return (
    <motion.div
      ref={groupRef}
      className="grid min-w-0 grid-cols-2 grid-rows-[auto_14rem] gap-3"
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={
        startLater
          ? {
              once: true,
              amount: 0.22,
              margin: "0px 0px -14% 0px",
            }
          : {
              once: true,
              amount: 0.14,
            }
      }
    >
      {children}
    </motion.div>
  );
}

function MainCard({
  image,
  index,
  label,
  title,
  description,
  icon,
  active,
  children,
}: {
  image: string;
  index: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  active: boolean;
  children?: ReactNode;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="relative col-span-2 min-h-[18rem] overflow-hidden rounded-[1.55rem] border border-white/8 bg-black p-5 text-white"
    >
      <Image
        src={image}
        alt=""
        fill
        loading="eager"
        sizes="(max-width: 767px) calc(100vw - 2.5rem), 680px"
        decoding="async"
        className="object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.24)_34%,rgba(0,0,0,0.94)_100%)]"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.025) 47%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.025) 53%, transparent 58%)",
          backgroundSize: "300% 100%",
          backgroundRepeat: "no-repeat",
        }}
        animate={
          active
            ? {
                backgroundPosition: ["200% 0%", "-100% 0%"],
              }
            : {
                backgroundPosition: "200% 0%",
              }
        }
        transition={
          active
            ? {
                duration: 7,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
              }
            : {
                duration: 0.2,
              }
        }
      />

      <div className="relative z-10 flex min-h-[16rem] flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-2 shadow-[0_0_24px_rgba(255,255,255,0.05)] backdrop-blur-md">
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white">
              {index}
            </span>

            <span className="h-3.5 w-px bg-white/25" />

            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/90">
              {label}
            </span>
          </div>

          <span className="flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-black/25">
            {icon}
          </span>
        </div>

        <div>
          <h3 className="max-w-[12ch] text-[2rem] font-semibold leading-[0.96] tracking-[-0.05em]">
            {title}
          </h3>

          <p className="mt-3 max-w-[31rem] text-[0.8rem] leading-[1.55] text-white/72">
            {description}
          </p>

          {children}
        </div>
      </div>
    </motion.article>
  );
}

function VisualServiceCard({
  slides,
  active,
  images,
  intervalMs = 3000,
}: VisualServiceCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!active || slides.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % slides.length,
      );
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [active, intervalMs, slides.length]);

  const current = slides[activeIndex]!;
  const visualItem = images[activeIndex % images.length]!;

  return (
    <motion.article
      variants={cardVariants}
      className="service-mini-card relative overflow-hidden rounded-[1.55rem] border p-4 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--service-card-bg)]"
      />

      <div className="absolute inset-x-0 top-0 h-[9.4rem] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={visualItem}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={visualItem}
              alt=""
              fill
              sizes="(max-width: 767px) 44vw, 340px"
              loading={activeIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="service-mini-card-fade absolute inset-0"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-end">
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <span
                key={index}
                className={[
                  "h-1 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-4 bg-white/70"
                    : "w-1 bg-white/20",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex min-h-[5.6rem] items-end">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              <h4 className="text-[1.12rem] font-semibold leading-tight tracking-[-0.035em] text-white">
                {current.title}
              </h4>

              <p className="mt-1.5 text-[0.73rem] leading-[1.45] text-white/70">
                {current.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

function CapabilityServiceCard({
  items,
  active,
}: {
  items: readonly MicroSlide[];
  active: boolean;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="service-mini-card service-mini-card--textured relative overflow-hidden rounded-[1.55rem] border p-5 text-white"
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Fragment key={item.title}>
              <div className="flex items-center gap-3">
                <div className="service-mini-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border">
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-white/70"
                  />
                </div>

                <div>
                  <h4 className="text-[0.95rem] font-semibold leading-tight">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-[0.66rem] leading-[1.35] text-white/55">
                    {item.text}
                  </p>
                </div>
              </div>

              {index < items.length - 1 ? (
                <div className="relative ml-[1.1rem] h-5 w-px bg-white/12">
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-white/60"
                    animate={
                      active
                        ? {
                            y: [0, 18],
                            opacity: [0, 1, 0],
                          }
                        : {
                            y: 0,
                            opacity: 0,
                          }
                    }
                    transition={
                      active
                        ? {
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : {
                            duration: 0.2,
                          }
                    }
                  />
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </motion.article>
  );
}

function LearningProgressCard({
  items,
  active,
  intervalMs = 4200,
}: {
  items: readonly [MicroSlide, MicroSlide, MicroSlide];
  active: boolean;
  intervalMs?: number;
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setActiveIndex(
          (current) =>
            (current + 1) % items.length,
        );
      }, intervalMs);

    return () =>
      window.clearInterval(interval);
  }, [active, intervalMs, items.length]);

  const offsets = [
    "mr-[18%]",
    "ml-[12%] mr-[6%]",
    "ml-[24%]",
  ];

  return (
    <motion.article
      variants={cardVariants}
      className="service-mini-card service-mini-card--textured relative overflow-hidden rounded-[1.55rem] border p-5 text-white"
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            index === activeIndex;

          return (
            <motion.div
              key={item.title}
              initial={false}
              className={[
                "relative flex items-center gap-3",
                offsets[index],
              ].join(" ")}
              animate={{
                opacity: isActive
                  ? 1
                  : 0.58,
              }}
              transition={{
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                initial={false}
                className="service-mini-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border"
                animate={{
                  boxShadow: isActive
                    ? "0 0 12px rgba(168,183,255,0.32)"
                    : "0 0 0px rgba(168,183,255,0)",
                  borderColor: isActive
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(255,255,255,0.15)",
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.085)"
                    : "rgba(255,255,255,0.055)",
                }}
                transition={{
                  duration: 1.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive
                      ? 1
                      : 0.62,
                  }}
                  transition={{
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 text-white"
                  />
                </motion.div>
              </motion.div>

              <div className="min-w-0">
                <motion.h4
                  initial={false}
                  className="text-[0.96rem] font-semibold leading-tight"
                  animate={{
                    color: isActive
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.68)",
                  }}
                  transition={{
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item.title}
                </motion.h4>

                <motion.p
                  initial={false}
                  className="mt-1 text-[0.65rem] leading-[1.32]"
                  animate={{
                    color: isActive
                      ? "rgba(255,255,255,0.76)"
                      : "rgba(255,255,255,0.38)",
                  }}
                  transition={{
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item.text}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.article>
  );
}

function StackTags() {
  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {technologies.map((technology) => (
        <span
          key={technology}
          className="rounded-full border border-white/12 bg-black/20 px-2.5 py-1 text-[0.57rem] font-medium text-white/72"
        >
          {technology}
        </span>
      ))}
    </div>
  );
}

export default function Three() {
  const { t } = useLanguage();

  const developmentRef = useRef<HTMLDivElement>(null);
  const teachingRef = useRef<HTMLDivElement>(null);

  const developmentActive = useInView(
    developmentRef,
    { amount: 0.08 },
  );

  const teachingActive = useInView(
    teachingRef,
    { amount: 0.38 },
  );

  const webSlides: readonly MicroSlide[] = [
    {
      title: t.services.development.webItems[0].title,
      text: t.services.development.webItems[0].text,
      icon: PanelsTopLeft,
    },
    {
      title: t.services.development.webItems[1].title,
      text: t.services.development.webItems[1].text,
      icon: ShoppingBag,
    },
    {
      title: t.services.development.webItems[2].title,
      text: t.services.development.webItems[2].text,
      icon: MonitorSmartphone,
    },
  ];

  const developmentCapabilities: readonly MicroSlide[] = [
    {
      title: t.services.development.capabilities[0].title,
      text: t.services.development.capabilities[0].text,
      icon: LayoutDashboard,
    },
    {
      title: t.services.development.capabilities[1].title,
      text: t.services.development.capabilities[1].text,
      icon: Workflow,
    },
    {
      title: t.services.development.capabilities[2].title,
      text: t.services.development.capabilities[2].text,
      icon: PlugZap,
    },
  ];

  const classSlides: readonly MicroSlide[] = [
    {
      title: t.services.teaching.modalityItems[0].title,
      text: t.services.teaching.modalityItems[0].text,
      icon: UserRound,
    },
    {
      title: t.services.teaching.modalityItems[1].title,
      text: t.services.teaching.modalityItems[1].text,
      icon: Video,
    },
    {
      title: t.services.teaching.modalityItems[2].title,
      text: t.services.teaching.modalityItems[2].text,
      icon: Presentation,
    },
  ];

  const teachingProgress: readonly [
    MicroSlide,
    MicroSlide,
    MicroSlide,
  ] = [
    {
      title: t.services.teaching.progressItems[0].title,
      text: t.services.teaching.progressItems[0].text,
      icon: Lightbulb,
    },
    {
      title: t.services.teaching.progressItems[1].title,
      text: t.services.teaching.progressItems[1].text,
      icon: Code2,
    },
    {
      title: t.services.teaching.progressItems[2].title,
      text: t.services.teaching.progressItems[2].text,
      icon: Rocket,
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
    <div className="w-full min-w-0">
      <ServiceGroup groupRef={developmentRef}>
        <MainCard
          image="/images/services/programming-main.jpg"
          index="01"
          label={t.services.development.label}
          title={t.services.development.title}
          description={t.services.development.description}
          icon={
            <Code2
              aria-hidden="true"
              className="size-5"
            />
          }
          active={developmentActive}
        >
          <StackTags />
        </MainCard>

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
        <MainCard
          image="/images/services/classes-main.jpg"
          index="02"
          label={t.services.teaching.label}
          title={t.services.teaching.title}
          description={t.services.teaching.description}
          icon={
            <GraduationCap
              aria-hidden="true"
              className="size-5"
            />
          }
          active={teachingActive}
        />

        <LearningProgressCard
          items={teachingProgress}
          active={teachingActive}
          intervalMs={4200}
        />

        <VisualServiceCard
          slides={classSlides}
          active={teachingActive}
          images={teachingVisuals}
          intervalMs={4200}
        />
      </ServiceGroup>
    </div>
  );
}
