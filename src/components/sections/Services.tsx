"use client";

import ServicesBento from "@/components/services/ServicesBento";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="Services"
      className="section"
      aria-labelledby="services-title"
    >
      <div className="page-container">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          titleId="services-title"
          className="mb-10 md:mb-14"
        />

        <ServicesBento />
      </div>
    </section>
  );
}
