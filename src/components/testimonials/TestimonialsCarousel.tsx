"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  useInView,
  useReducedMotion,
} from "motion/react";

import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { PublicTestimonial } from "@/features/testimonials/types";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = {
  testimonials: PublicTestimonial[];
};

export function TestimonialsCarousel({
  testimonials,
}: Props) {
  const { language, t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, {
    amount: 0.25,
  });

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 5800,
      playOnInit: false,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  const hasMultiple =
    testimonials.length > 1;

  useEffect(() => {
    if (!api) {
      return;
    }

    const syncSelectedIndex = () => {
      setSelectedIndex(
        api.selectedScrollSnap(),
      );
    };

    syncSelectedIndex();
    api.on("select", syncSelectedIndex);
    api.on("reInit", syncSelectedIndex);

    return () => {
      api.off("select", syncSelectedIndex);
      api.off("reInit", syncSelectedIndex);
    };
  }, [api]);

  useEffect(() => {
    if (
      !hasMultiple ||
      reduceMotion ||
      !inView
    ) {
      autoplay.stop();
      return;
    }

    const syncAutoplay = () => {
      if (
        document.visibilityState === "visible"
      ) {
        autoplay.play();
      } else {
        autoplay.stop();
      }
    };

    syncAutoplay();

    document.addEventListener(
      "visibilitychange",
      syncAutoplay,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        syncAutoplay,
      );
      autoplay.stop();
    };
  }, [
    autoplay,
    hasMultiple,
    inView,
    reduceMotion,
  ]);

  if (testimonials.length === 0) {
    return (
      <div className="mx-4 rounded-[1.4rem] border border-white/10 bg-surface-2 p-5 text-sm text-foreground-muted sm:mx-5 sm:p-6">
        {t.testimonialsContact.emptyTestimonials}
      </div>
    );
  }

  return (
    <div ref={rootRef}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: hasMultiple,
          align: "center",
        }}
        plugins={
          hasMultiple && !reduceMotion
            ? [autoplay]
            : []
        }
      >
        <CarouselContent className="items-stretch">
          {testimonials.map(
            (testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-[86%] sm:basis-[72%]"
                aria-label={`${index + 1} / ${testimonials.length}`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  active={
                    !hasMultiple ||
                    index === selectedIndex
                  }
                  language={language}
                />
              </CarouselItem>
            ),
          )}
        </CarouselContent>

        {hasMultiple ? (
          <div
            className="mt-3.5 flex justify-center gap-1.5 sm:mt-4"
            aria-hidden="true"
          >
            {testimonials.map(
              (testimonial, index) => (
                <span
                  key={testimonial.id}
                  className={
                    index === selectedIndex
                      ? "h-1.5 w-5 rounded-full bg-foreground/70 transition-[width,background-color] duration-300 motion-reduce:transition-none"
                      : "size-1.5 rounded-full bg-white/18 transition-colors duration-300 motion-reduce:transition-none"
                  }
                />
              ),
            )}
          </div>
        ) : null}
      </Carousel>
    </div>
  );
}
