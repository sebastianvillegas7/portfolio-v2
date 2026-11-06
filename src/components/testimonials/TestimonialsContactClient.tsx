"use client";

import { ContactForm } from "@/components/testimonials/ContactForm";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PublicTestimonial } from "@/features/testimonials/types";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = {
  testimonials: PublicTestimonial[];
};

export function TestimonialsContactClient({
  testimonials,
}: Props) {
  const { t } = useLanguage();
  const copy = t.testimonialsContact;

  return (
    <section
      id="Testimonials"
      className="section"
      aria-labelledby="testimonials-contact-title"
    >
      <div className="page-container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          titleId="testimonials-contact-title"
          className="mb-10 md:mb-14"
        />

        <div className="mx-auto max-w-[46rem] overflow-hidden rounded-[1.9rem] border border-white/10 bg-surface-1/80 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="pb-6 pt-5 sm:pb-7 sm:pt-6">
            <div className="mb-4 px-4 sm:mb-5 sm:px-5">
              <p className="text-sm font-semibold text-foreground">
                {copy.testimonialsLabel}
              </p>

              <p className="mt-1 max-w-md text-xs leading-relaxed text-foreground-muted">
                {copy.testimonialsDescription}
              </p>
            </div>

            <TestimonialsCarousel
              testimonials={testimonials}
            />
          </div>

          <div
            id="Contact"
            className="border-t border-white/10 bg-white/[0.018] p-4 sm:p-5"
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
