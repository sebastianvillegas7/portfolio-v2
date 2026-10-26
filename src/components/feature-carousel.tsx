"use client";

import Image from "next/image";
import {
  useAnimation,
  useReducedMotion,
} from "motion/react";
import {
  motion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AiCloudIcon,
  CheckmarkCircle01Icon,
  CommandFreeIcons,
  DashboardSquare01Icon,
  GlobalSearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const PROJECTS = [
  {
    id: "sol-hair",
    label: "Sol Hair Stylist",
    icon: CheckmarkCircle01Icon,
    desktop:
      "/images/projects/other-work/solhair-cover.png",
    mobile:
      "/images/projects/other-work/solhair-mobile.jpeg",
  },
  {
    id: "new-era",
    label: "New Era",
    icon: CommandFreeIcons,
    desktop:
      "/images/projects/other-work/newera-cover.png",
    mobile:
      "/images/projects/other-work/newera-mobile.jpeg",
  },
  {
    id: "henry",
    label: "Henry Junk Removal",
    icon: GlobalSearchIcon,
    desktop:
      "/images/projects/other-work/henry-cover.png",
    mobile:
      "/images/projects/other-work/henry-mobile.jpeg",
  },
  {
    id: "agenda",
    label: "Agenda Clases",
    icon: DashboardSquare01Icon,
    desktop:
      "/images/projects/other-work/agendaclases-cover.png",
    mobile: null,
  },
  {
    id: "artcut",
    label: "ArtCut",
    icon: AiCloudIcon,
    desktop:
      "/images/projects/other-work/artcut-cover.png",
    mobile:
      "/images/projects/other-work/artcut-mobile.png",
  },
];

const AUTO_PLAY_INTERVAL = 4200;

const SLIDE_TRANSITION = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

type Direction = -1 | 1;

function wrapIndex(
  index: number,
  length: number,
) {
  return (
    (index % length + length) %
    length
  );
}

export default function FeatureCarousel() {
  const reduceMotion =
    useReducedMotion();

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [isAnimating, setIsAnimating] =
    useState(false);

  const cardViewportRef =
    useRef<HTMLDivElement>(null);

  const selectorViewportRef =
    useRef<HTMLDivElement>(null);

  const [cardMetrics, setCardMetrics] =
    useState({
      width: 0,
      itemWidth: 0,
      gap: 14,
      baseX: 0,
      step: 0,
    });

  const [
    selectorMetrics,
    setSelectorMetrics,
  ] =
    useState({
      width: 0,
      itemWidth: 0,
      gap: 12,
      baseX: 0,
      step: 0,
    });

  const cardControls =
    useAnimation();

  const selectorControls =
    useAnimation();

  const len = PROJECTS.length;

  const previousIndex =
    wrapIndex(
      currentIndex - 1,
      len,
    );

  const nextIndex =
    wrapIndex(
      currentIndex + 1,
      len,
    );

  const visibleProjects = [
    PROJECTS[previousIndex]!,
    PROJECTS[currentIndex]!,
    PROJECTS[nextIndex]!,
  ];

  useEffect(() => {
    const updateMetrics = () => {
      const cardWidth =
        cardViewportRef.current
          ?.clientWidth ?? 0;

      const selectorWidth =
        selectorViewportRef.current
          ?.clientWidth ?? 0;

      if (cardWidth > 0) {
        const gap = 14;
        const itemWidth =
          Math.min(
            cardWidth * 0.86,
            340,
          );

        const step =
          itemWidth + gap;

        const baseX =
          (cardWidth -
            itemWidth) /
            2 -
          step;

        setCardMetrics({
          width: cardWidth,
          itemWidth,
          gap,
          baseX,
          step,
        });

        cardControls.set({
          x: baseX,
        });
      }

      if (selectorWidth > 0) {
        const gap = 12;
        const itemWidth =
          Math.min(
            selectorWidth * 0.58,
            205,
          );

        const step =
          itemWidth + gap;

        const baseX =
          (selectorWidth -
            itemWidth) /
            2 -
          step;

        setSelectorMetrics({
          width:
            selectorWidth,
          itemWidth,
          gap,
          baseX,
          step,
        });

        selectorControls.set({
          x: baseX,
        });
      }
    };

    updateMetrics();

    const observer =
      new ResizeObserver(
        updateMetrics,
      );

    if (
      cardViewportRef.current
    ) {
      observer.observe(
        cardViewportRef.current,
      );
    }

    if (
      selectorViewportRef.current
    ) {
      observer.observe(
        selectorViewportRef.current,
      );
    }

    return () =>
      observer.disconnect();
  }, [
    cardControls,
    selectorControls,
  ]);

  const resetTracks =
    useCallback(async () => {
      await Promise.all([
        cardControls.start({
          x: cardMetrics.baseX,
          transition:
            reduceMotion
              ? {
                  duration: 0,
                }
              : SLIDE_TRANSITION,
        }),

        selectorControls.start({
          x:
            selectorMetrics.baseX,
          transition:
            reduceMotion
              ? {
                  duration: 0,
                }
              : SLIDE_TRANSITION,
        }),
      ]);
    }, [
      cardControls,
      cardMetrics.baseX,
      reduceMotion,
      selectorControls,
      selectorMetrics.baseX,
    ]);

  const move = useCallback(
    async (
      direction: Direction,
    ) => {
      if (
        isAnimating ||
        cardMetrics.step === 0 ||
        selectorMetrics.step ===
          0
      ) {
        return;
      }

      setIsAnimating(true);
      setIsPaused(true);

      const cardTarget =
        cardMetrics.baseX -
        direction *
          cardMetrics.step;

      const selectorTarget =
        selectorMetrics.baseX -
        direction *
          selectorMetrics.step;

      await Promise.all([
        cardControls.start({
          x: cardTarget,
          transition:
            reduceMotion
              ? {
                  duration: 0,
                }
              : SLIDE_TRANSITION,
        }),

        selectorControls.start({
          x: selectorTarget,
          transition:
            reduceMotion
              ? {
                  duration: 0,
                }
              : SLIDE_TRANSITION,
        }),
      ]);

      setCurrentIndex(
        (current) =>
          wrapIndex(
            current +
              direction,
            len,
          ),
      );

      cardControls.set({
        x: cardMetrics.baseX,
      });

      selectorControls.set({
        x:
          selectorMetrics.baseX,
      });

      setIsAnimating(false);
      setIsPaused(false);
    },
    [
      cardControls,
      cardMetrics.baseX,
      cardMetrics.step,
      isAnimating,
      len,
      reduceMotion,
      selectorControls,
      selectorMetrics.baseX,
      selectorMetrics.step,
    ],
  );

  useEffect(() => {
    if (
      isPaused ||
      isAnimating
    ) {
      return;
    }

    const interval =
      window.setInterval(
        () => {
          void move(1);
        },
        AUTO_PLAY_INTERVAL,
      );

    return () =>
      window.clearInterval(
        interval,
      );
  }, [
    isAnimating,
    isPaused,
    move,
  ]);

  const handleDragEnd =
    useCallback(
      async (
        offsetX: number,
        velocityX: number,
      ) => {
        const distance = 42;
        const velocity = 260;

        if (
          offsetX <
            -distance ||
          velocityX <
            -velocity
        ) {
          await move(1);
          return;
        }

        if (
          offsetX >
            distance ||
          velocityX >
            velocity
        ) {
          await move(-1);
          return;
        }

        await resetTracks();
        setIsPaused(false);
      },
      [
        move,
        resetTracks,
      ],
    );

  return (
    <div className="mx-auto w-full">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-surface-1">
        {/* SELECTOR */}
        <div
          ref={
            selectorViewportRef
          }
          className="relative overflow-hidden border-b border-border/50 bg-[radial-gradient(circle_at_50%_0%,rgba(123,140,255,0.10),transparent_46%),#121214] py-6"
        >
          <motion.div
            drag="x"
            dragMomentum={false}
            animate={
              selectorControls
            }
            onDragStart={() => {
              setIsPaused(true);
            }}
            onDragEnd={(
              _,
              info,
            ) => {
              void handleDragEnd(
                info.offset.x,
                info.velocity.x,
              );
            }}
            className="flex cursor-grab touch-pan-y items-center active:cursor-grabbing"
            style={{
              gap:
                selectorMetrics.gap,
              willChange:
                "transform",
            }}
          >
            {visibleProjects.map(
              (
                project,
                index,
              ) => {
                const active =
                  index === 1;

                return (
                  <button
                    key={`${project.id}-${currentIndex}-${index}`}
                    type="button"
                    onClick={() => {
                      if (
                        index ===
                        0
                      ) {
                        void move(
                          -1,
                        );
                      }

                      if (
                        index ===
                        2
                      ) {
                        void move(
                          1,
                        );
                      }
                    }}
                    className={[
                      "flex shrink-0 items-center justify-center gap-2.5 rounded-full border px-4 transition-[opacity,background-color,border-color] duration-200",
                      active
                        ? "min-h-11 border-brand-soft/25 bg-foreground text-background"
                        : "min-h-10 border-border bg-surface-2 text-foreground-muted opacity-75",
                    ].join(
                      " ",
                    )}
                    style={{
                      width:
                        selectorMetrics.itemWidth,
                    }}
                  >
                    <HugeiconsIcon
                      icon={
                        project.icon
                      }
                      size={
                        active
                          ? 16
                          : 14
                      }
                      strokeWidth={
                        active
                          ? 2
                          : 1.8
                      }
                    />

                    <span
                      className={[
                        "truncate whitespace-nowrap uppercase",
                        active
                          ? "text-[0.68rem] font-semibold tracking-[0.1em]"
                          : "text-[0.6rem] font-medium tracking-[0.08em]",
                      ].join(
                        " ",
                      )}
                    >
                      {
                        project.label
                      }
                    </span>
                  </button>
                );
              },
            )}
          </motion.div>
        </div>

        {/* PROJECTS */}
        <div className="relative bg-background py-8">
          <div
            ref={
              cardViewportRef
            }
            className="relative h-[430px] overflow-hidden"
          >
            <motion.div
              drag="x"
              dragMomentum={false}
              animate={
                cardControls
              }
              onDragStart={() => {
                setIsPaused(true);
              }}
              onDragEnd={(
                _,
                info,
              ) => {
                void handleDragEnd(
                  info.offset.x,
                  info.velocity.x,
                );
              }}
              className="flex h-full cursor-grab touch-pan-y items-stretch active:cursor-grabbing"
              style={{
                gap:
                  cardMetrics.gap,
                willChange:
                  "transform",
              }}
            >
              {visibleProjects.map(
                (
                  project,
                  index,
                ) => (
                  <ProjectCard
                    key={`${project.id}-${currentIndex}-${index}`}
                    project={
                      project
                    }
                    active={
                      index ===
                      1
                    }
                    width={
                      cardMetrics.itemWidth
                    }
                  />
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  active,
  width,
}: {
  project:
    (typeof PROJECTS)[number];
  active: boolean;
  width: number;
}) {
  return (
    <article
      className={[
        "relative h-full shrink-0 overflow-hidden rounded-[1.8rem] border bg-surface-1 transition-[opacity,transform] duration-300",
        active
          ? "border-border/70 opacity-100"
          : "border-border/40 opacity-45 scale-[0.96]",
      ].join(" ")}
      style={{
        width,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(123,140,255,0.08),transparent_35%),#0d0d0f]" />

      <div
        className="absolute left-[7%] right-[7%] top-[8%] overflow-hidden rounded-xl border border-white/10 bg-black"
        style={{
          aspectRatio:
            "1.986 / 1",
        }}
      >
        <Image
          src={
            project.desktop
          }
          alt={`${project.label} desktop`}
          fill
          sizes="(max-width: 767px) 76vw, 340px"
          className="object-cover object-top"
        />
      </div>

      {project.mobile && (
        <div
          className="absolute bottom-[18%] right-[8%] w-[27%] overflow-hidden rounded-[1.15rem] border-[3px] border-[#343840] bg-black shadow-[0_12px_26px_rgba(0,0,0,0.38)]"
          style={{
            aspectRatio:
              "0.45 / 1",
          }}
        >
          <Image
            src={
              project.mobile
            }
            alt={`${project.label} mobile`}
            fill
            sizes="90px"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/72 to-transparent p-6 pt-24">
        <h3 className="text-2xl font-medium tracking-tight text-white">
          {project.label}
        </h3>
      </div>
    </article>
  );
}
