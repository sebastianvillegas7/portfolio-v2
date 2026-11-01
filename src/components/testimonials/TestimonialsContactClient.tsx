"use client";

import { useState } from "react";
import {
  ChevronDown,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";

import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PublicTestimonial } from "@/features/testimonials/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type ContactMethod = "email" | "whatsapp";

type Props = {
  testimonials: PublicTestimonial[];
};

export function TestimonialsContactClient({
  testimonials,
}: Props) {
  const { language } = useLanguage();
  const [contactMethod, setContactMethod] =
    useState<ContactMethod>("email");
  const [messageOpen, setMessageOpen] =
    useState(false);

  const copy =
    language === "es"
      ? {
          eyebrow: "Testimonios & contacto",
          title: "Experiencias reales.",
          testimonialsLabel: "Experiencias de alumnos y clientes",
          testimonialsDescription:
            "Testimonios de personas con las que trabajé en clases y proyectos.",
          contactTitle: "¿Hablamos?",
          contactDescription:
            "Dejame tus datos y yo me pongo en contacto.",
          name: "Tu nombre",
          email: "Email",
          whatsapp: "WhatsApp",
          emailPlaceholder: "tu@email.com",
          whatsappPlaceholder: "+54 9 ...",
          optionalMessage: "¿Querés contarme algo más?",
          messagePlaceholder:
            "Contame brevemente qué necesitás...",
          submit: "Quiero que me contactes",
        }
      : {
          eyebrow: "Testimonials & contact",
          title: "Real experiences.",
          testimonialsLabel: "Students & clients",
          testimonialsDescription:
            "Feedback from people I have worked with through programming lessons and development projects.",
          contactTitle: "Let's talk",
          contactDescription:
            "Leave your details and I'll get in touch.",
          name: "Your name",
          email: "Email",
          whatsapp: "WhatsApp",
          emailPlaceholder: "you@email.com",
          whatsappPlaceholder: "+1 ...",
          optionalMessage: "Want to tell me anything else?",
          messagePlaceholder:
            "Tell me briefly what you need...",
          submit: "Contact me",
        };

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
          <div className="px-0 pb-7 pt-6">
        <div className="mb-5 px-5">
          <p className="text-sm font-semibold text-foreground">
            {copy.testimonialsLabel}
          </p>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-foreground-muted">
            {copy.testimonialsDescription}
          </p>
        </div>

        <TestimonialsCarousel
          testimonials={testimonials}
          language={language}
        />
      </div>

      <div
        id="Contact"
        className="border-t border-white/10 bg-white/[0.018] p-5 sm:p-6"
      >
        <div className="mb-5">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {copy.contactTitle}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
            {copy.contactDescription}
          </p>
        </div>

        <form
          className="space-y-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input
            name="name"
            autoComplete="name"
            placeholder={copy.name}
            aria-label={copy.name}
            required
          />

          <div>
            <div className="mb-2 grid grid-cols-2 gap-2 rounded-xl border border-white/8 bg-black/15 p-1">
              <button
                type="button"
                onClick={() => setContactMethod("email")}
                className={cn(
                  "flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors",
                  contactMethod === "email"
                    ? "bg-white/10 text-white"
                    : "text-foreground-muted hover:text-white",
                )}
              >
                <Mail
                  aria-hidden="true"
                  className="size-3.5"
                />
                {copy.email}
              </button>

              <button
                type="button"
                onClick={() =>
                  setContactMethod("whatsapp")
                }
                className={cn(
                  "flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors",
                  contactMethod === "whatsapp"
                    ? "bg-white/10 text-white"
                    : "text-foreground-muted hover:text-white",
                )}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-3.5"
                />
                {copy.whatsapp}
              </button>
            </div>

            <Input
              key={contactMethod}
              name="contact"
              type={
                contactMethod === "email"
                  ? "email"
                  : "tel"
              }
              autoComplete={
                contactMethod === "email"
                  ? "email"
                  : "tel"
              }
              placeholder={
                contactMethod === "email"
                  ? copy.emailPlaceholder
                  : copy.whatsappPlaceholder
              }
              aria-label={
                contactMethod === "email"
                  ? copy.email
                  : copy.whatsapp
              }
              required
            />
          </div>

          <Collapsible
            open={messageOpen}
            onOpenChange={setMessageOpen}
          >
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-auto w-full justify-between rounded-xl border border-white/8 bg-white/[0.025] px-3.5 py-3 text-xs text-foreground-muted hover:bg-white/[0.045] hover:text-white"
              >
                {copy.optionalMessage}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-300",
                    messageOpen && "rotate-180",
                  )}
                />
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden">
              <div className="pt-2">
                <Textarea
                  name="message"
                  placeholder={copy.messagePlaceholder}
                  aria-label={copy.optionalMessage}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button
            type="submit"
            size="lg"
            className="mt-1 w-full rounded-xl"
          >
            {copy.submit}
            <Send
              aria-hidden="true"
              className="ml-2 size-4"
            />
          </Button>
        </form>
          </div>
        </div>
      </div>
    </section>
  );
}
