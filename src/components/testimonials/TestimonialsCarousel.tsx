"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import type { PublicTestimonial } from "@/features/testimonials/types";

type Props = {
  testimonials: PublicTestimonial[];
  language: "es" | "en";
};

export function TestimonialsCarousel({
  testimonials,
  language,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 5800,
      stopOnInteraction: false,
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
      setSelectedIndex(api.selectedScrollSnap());
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
      !rootRef.current
    ) {
      return;
    }

    const root = rootRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          document.visibilityState === "visible"
        ) {
          autoplay.play();
        } else {
          autoplay.stop();
        }
      },
      {
        threshold: 0.25,
      },
    );

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden"
      ) {
        autoplay.stop();
        return;
      }

      const rect =
        root.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight;

      const visible =
        rect.bottom > 0 &&
        rect.top < viewportHeight;

      if (visible) {
        autoplay.play();
      }
    };

    observer.observe(root);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      observer.disconnect();
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      autoplay.stop();
    };
  }, [autoplay, hasMultiple]);

  if (testimonials.length === 0) {
    return (
      <div className="mx-4 rounded-[1.4rem] border border-white/10 bg-surface-2 p-5 text-sm text-foreground-muted sm:mx-5 sm:p-6">
        {language === "es"
          ? "Todavía no hay testimonios publicados."
          : "There are no published testimonials yet."}
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
          hasMultiple ? [autoplay] : []
        }
      >
        <CarouselContent className="items-stretch">
          {testimonials.map(
            (testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-[86%] sm:basis-[72%]"
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
                      ? "h-1.5 w-5 rounded-full bg-foreground/70 transition-[width,background-color] duration-300"
                      : "size-1.5 rounded-full bg-white/18 transition-colors duration-300"
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
