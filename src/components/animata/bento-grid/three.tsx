"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { LucideIcon, LayoutDashboard, Database, Workflow } from "lucide-react";
import {
  AppWindow,
  BookOpen,
  Braces,
  Code2,
  GraduationCap,
  MonitorSmartphone,
  PanelsTopLeft,
  PlugZap,
  Presentation,
  ServerCog,
  ShoppingBag,
  UserRound,
  Video,
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

type MicroCardProps = {
  slides: readonly MicroSlide[];
  active: boolean;
  className: string;
  iconClassName: string;
  visual?: "default" | "web";
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
              once: false,
              amount: 0.22,
              margin: "0px 0px -14% 0px",
            }
          : {
              once: false,
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
  children,
}: {
  image: string;
  index: string;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
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
        sizes="(max-width: 767px) calc(100vw - 2rem), 680px"
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
        animate={{
          backgroundPosition: ["200% 0%", "-100% 0%"],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "linear",
        }}
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

function MicroCard({
  slides,
  active,
  className,
  iconClassName,
  visual = "default",
  intervalMs = 3000,
}: MicroCardProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    if (
      !active ||
      slides.length <= 1
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setActiveIndex(
          (current) =>
            (current + 1) %
            slides.length,
        );
      }, intervalMs);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [active, intervalMs, slides.length]);

  const current =
    slides[activeIndex]!;

  const Icon =
    current.icon;

  const visualItems = [
    "/images/services/programming-webs.jpg",
    "/images/services/programming-ecommerce.jpg",
    "/images/services/programming-landing.jpg",
  ] as const;

  const visualItem =
    visualItems[activeIndex % visualItems.length];

  return (
    <motion.article
      variants={cardVariants}
      className={[
        "service-mini-card relative overflow-hidden rounded-[1.55rem] border p-4",
        className,
      ].join(" ")}
    >
      {visual === "web" ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--service-card-bg)]"
          />

          <div className="absolute inset-x-0 top-0 h-[9.4rem] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={`image-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
                className="absolute inset-0"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${visualItem}')`,
                  }}
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

            <div className="mt-auto h-[5.6rem]">
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
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 size-28 rounded-full bg-white/7"
          />

          <div className="relative z-10 flex min-h-[10.5rem] flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={`icon-${activeIndex}`}
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Icon
                    aria-hidden="true"
                    className={[
                      "size-7",
                      iconClassName,
                    ].join(" ")}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-1">
                {slides.map(
                  (_, index) => (
                    <span
                      key={index}
                      className={[
                        "h-1 rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "w-4 bg-white/65"
                          : "w-1 bg-white/20",
                      ].join(" ")}
                    />
                  ),
                )}
              </div>
            </div>

            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={activeIndex}
                initial={{
                  opacity: 0,
                  y: 7,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h4 className="text-[1.05rem] font-semibold leading-tight tracking-[-0.035em]">
                  {current.title}
                </h4>

                <p className="mt-1.5 text-[0.67rem] leading-[1.45] text-white/62">
                  {current.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </motion.article>
  );
}

function TechnologyCard({
  active,
  label,
}: {
  active: boolean;
  label: string;
}) {
  const technologies = [
    "Python",
    "Java",
    "C",
    "C#",
    "JavaScript",
    "Go",
  ] as const;

  const shortName: Record<
    (typeof technologies)[number],
    string
  > = {
    Python: "Py",
    Java: "J",
    C: "C",
    "C#": "C#",
    JavaScript: "JS",
    Go: "Go",
  };

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
            (current + 1) %
            technologies.length,
        );
      }, 2200);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [active, technologies.length]);

  const technology =
    technologies[activeIndex];

  return (
    <motion.article
      variants={cardVariants}
      className="relative overflow-hidden rounded-[1.55rem] border border-white/8 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.055),transparent_32%),radial-gradient(circle_at_85%_82%,rgba(255,255,255,0.025),transparent_38%),linear-gradient(145deg,#101010_0%,#171717_55%,#1c1c1c_100%)] p-5 text-white"
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 size-32 rounded-full bg-[#a97ac0]/18"
      />

      <div className="relative z-10 flex min-h-[10.5rem] flex-col">
        <div className="flex items-start justify-between gap-3">
          <BookOpen
            aria-hidden="true"
            className="size-7 text-[#d5a8e8]"
          />

          <span className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-white/40">
            {label}
          </span>
        </div>

        <div className="mt-auto">
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={technology}
              initial={{
                opacity: 0,
                y: 7,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
              transition={{
                duration: 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-end justify-between gap-3"
            >
              <div>
                <span className="block text-[2rem] font-semibold leading-none tracking-[-0.06em]">
                  {shortName[technology]}
                </span>

                <span className="mt-2 block text-[0.69rem] font-medium text-white/68">
                  {technology}
                </span>
              </div>

              <Braces
                aria-hidden="true"
                className="mb-0.5 size-5 text-white/26"
              />
            </motion.div>
          </AnimatePresence>
        </div>
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
      {technologies.map(
        (technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/12 bg-black/20 px-2.5 py-1 text-[0.57rem] font-medium text-white/72"
          >
            {technology}
          </span>
        ),
      )}
    </div>
  );
}

export default function Three() {
  const { t } = useLanguage();

  const developmentRef =
    useRef<HTMLDivElement>(null);

  const teachingRef =
    useRef<HTMLDivElement>(null);

  const developmentActive =
    useInView(
      developmentRef,
      {
        amount: 0.08,
      },
    );

  const teachingActive =
    useInView(
      teachingRef,
      {
        amount: 0.08,
      },
    );

  const webSlides: readonly MicroSlide[] =
    [
      {
        title:
          t.services.development
            .webItems[0].title,
        text:
          t.services.development
            .webItems[0].text,
        icon: PanelsTopLeft,
      },
      {
        title:
          t.services.development
            .webItems[1].title,
        text:
          t.services.development
            .webItems[1].text,
        icon: ShoppingBag,
      },
      {
        title:
          t.services.development
            .webItems[2].title,
        text:
          t.services.development
            .webItems[2].text,
        icon: MonitorSmartphone,
      },
    ];

  const appSlides: readonly MicroSlide[] =
    [
      {
        title:
          t.services.development
            .appItems[0].title,
        text:
          t.services.development
            .appItems[0].text,
        icon: AppWindow,
      },
      {
        title:
          t.services.development
            .appItems[1].title,
        text:
          t.services.development
            .appItems[1].text,
        icon: ServerCog,
      },
      {
        title:
          t.services.development
            .appItems[2].title,
        text:
          t.services.development
            .appItems[2].text,
        icon: PlugZap,
      },
    ];

  const classSlides: readonly MicroSlide[] =
    [
      {
        title:
          t.services.teaching
            .modalityItems[0].title,
        text:
          t.services.teaching
            .modalityItems[0].text,
        icon: UserRound,
      },
      {
        title:
          t.services.teaching
            .modalityItems[1].title,
        text:
          t.services.teaching
            .modalityItems[1].text,
        icon: Video,
      },
      {
        title:
          t.services.teaching
            .modalityItems[2].title,
        text:
          t.services.teaching
            .modalityItems[2].text,
        icon: Presentation,
      },
    ];

  return (
    <div className="w-full min-w-0">
      <ServiceGroup
        groupRef={
          developmentRef
        }
      >
        <MainCard
          image="/images/services/programming-main.jpg"
          index="01"
          label={
            t.services.development
              .label
          }
          title={
            t.services.development
              .title
          }
          description={
            t.services.development
              .description
          }
          icon={
            <Code2
              aria-hidden="true"
              className="size-5"
            />
          }
        >
          <StackTags />
        </MainCard>

        <MicroCard
          slides={webSlides}
          active={developmentActive}
          visual="web"
          intervalMs={3600}
          className="text-white"
          iconClassName="text-[#aab5ff]"
        />

        <motion.article
          variants={cardVariants}
          className="service-mini-card service-mini-card--textured relative overflow-hidden rounded-[1.55rem] border p-5 text-white"
        >
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="service-mini-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border">
                <LayoutDashboard
                  aria-hidden="true"
                  className="size-4 text-white/70"
                />
              </div>

              <div>
                <h4 className="text-[0.95rem] font-semibold leading-tight">
                  {t.services.development.capabilities[0].title}
                </h4>

                <p className="mt-1 text-[0.66rem] leading-[1.35] text-white/55">
                  {t.services.development.capabilities[0].text}
                </p>
              </div>
            </div>

            <div className="relative ml-[1.1rem] h-5 w-px bg-white/12">
              <motion.span
                aria-hidden="true"
                className="absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-white/60"
                animate={{
                  y: [0, 18],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="service-mini-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border">
                <Workflow
                  aria-hidden="true"
                  className="size-4 text-white/70"
                />
              </div>

              <div>
                <h4 className="text-[0.95rem] font-semibold leading-tight">
                  {t.services.development.capabilities[1].title}
                </h4>

                <p className="mt-1 text-[0.66rem] leading-[1.35] text-white/55">
                  {t.services.development.capabilities[1].text}
                </p>
              </div>
            </div>

            <div className="relative ml-[1.1rem] h-5 w-px bg-white/12">
              <motion.span
                aria-hidden="true"
                className="absolute left-1/2 top-0 size-1 -translate-x-1/2 rounded-full bg-white/60"
                animate={{
                  y: [0, 18],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="service-mini-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border">
                <PlugZap
                  aria-hidden="true"
                  className="size-4 text-white/70"
                />
              </div>

              <div>
                <h4 className="text-[0.95rem] font-semibold leading-tight">
                  {t.services.development.capabilities[2].title}
                </h4>

                <p className="mt-1 text-[0.66rem] leading-[1.35] text-white/55">
                  {t.services.development.capabilities[2].text}
                </p>
              </div>
            </div>
          </div>
        </motion.article>
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
          label={
            t.services.teaching.label
          }
          title={
            t.services.teaching.title
          }
          description={
            t.services.teaching
              .description
          }
          icon={
            <GraduationCap
              aria-hidden="true"
              className="size-5"
            />
          }
        />

        <MicroCard
          slides={classSlides}
          active={teachingActive}
          className="bg-[#4a3933] text-[#fff5f0]"
          iconClassName="text-[#efb99f]"
        />

        <TechnologyCard
          active={teachingActive}
          label={
            t.services.teaching
              .technologiesTitle
          }
        />
      </ServiceGroup>
    </div>
  );
}
