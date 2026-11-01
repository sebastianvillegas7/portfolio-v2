"use client";

import {
  useEffect,  
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

  if (testimonials.length === 0) {
    return (
      <div className="mx-5 rounded-[1.6rem] border border-white/10 bg-surface-2 p-6 text-sm text-foreground-muted">
        {language === "es"
          ? "Todavía no hay testimonios publicados."
          : "There are no published testimonials yet."}
      </div>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: testimonials.length > 1,
        align: "center",
      }}
      plugins={
        testimonials.length > 1
          ? [autoplay]
          : []
      }
    >
      <CarouselContent className="items-stretch">
        {testimonials.map((testimonial, index) => (
          <CarouselItem
            key={testimonial.id}
            className="basis-[84%] sm:basis-[72%]"
          >
            <TestimonialCard
              testimonial={testimonial}
              active={
                testimonials.length === 1 ||
                index === selectedIndex
              }
              language={language}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {testimonials.length > 1 ? (
        <div
          className="mt-4 flex justify-center gap-1.5"
          aria-hidden="true"
        >
          {testimonials.map((testimonial, index) => (
            <span
              key={testimonial.id}
              className={
                index === selectedIndex
                  ? "h-1.5 w-5 rounded-full bg-brand-soft transition-all"
                  : "size-1.5 rounded-full bg-white/18 transition-all"
              }
            />
          ))}
        </div>
      ) : null}
    </Carousel>
  );
}
