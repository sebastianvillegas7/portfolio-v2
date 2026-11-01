"use client";

import { useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Textarea } from "@/components/ui/textarea";
import type { PublicTestimonial } from "@/features/testimonials/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type ContactMethod = "email" | "whatsapp";

type FormValues = {
  name: string;
  contact: string;
  message: string;
};

type FormErrors = {
  name?: string;
  contact?: string;
};

type Props = {
  testimonials: PublicTestimonial[];
};

const INITIAL_VALUES: FormValues = {
  name: "",
  contact: "",
  message: "",
};

const COPY = {
  es: {
    eyebrow: "Testimonios & contacto",
    title: "Experiencias reales.",
    testimonialsLabel: "Experiencias de alumnos y clientes",
    testimonialsDescription:
      "Testimonios de personas con las que trabajé en clases y proyectos.",
    contactTitle: "Contacto",
    contactDescription:
      "Ingresá tus datos y un medio de contacto. Me comunicaré personalmente para conocer tu consulta.",
    name: "Nombre",
    email: "Email",
    whatsapp: "WhatsApp",
    emailPlaceholder: "nombre@correo.com",
    whatsappPlaceholder: "Ej. +34 612 345 678",
    optionalMessage: "Agregar comentario (opcional)",
    messagePlaceholder: "Breve detalle de tu consulta...",
    submit: "Solicitar contacto",
    nameRequired: "Ingresá tu nombre.",
    emailRequired: "Ingresá un email.",
    emailInvalid: "Ingresá un email válido.",
    whatsappRequired: "Ingresá un número de WhatsApp.",
    whatsappInvalid:
      "Usá formato internacional, por ejemplo +34 612 345 678.",
  },
  en: {
    eyebrow: "Testimonials & contact",
    title: "Real experiences.",
    testimonialsLabel: "Students & clients",
    testimonialsDescription:
      "Feedback from people I have worked with through programming lessons and development projects.",
    contactTitle: "Contact",
    contactDescription:
      "Enter your details and a contact method. I’ll get in touch personally to learn more about your inquiry.",
    name: "Name",
    email: "Email",
    whatsapp: "WhatsApp",
    emailPlaceholder: "name@email.com",
    whatsappPlaceholder: "E.g. +44 7700 900123",
    optionalMessage: "Add a note (optional)",
    messagePlaceholder: "Briefly describe your inquiry...",
    submit: "Request contact",
    nameRequired: "Enter your name.",
    emailRequired: "Enter an email address.",
    emailInvalid: "Enter a valid email address.",
    whatsappRequired: "Enter a WhatsApp number.",
    whatsappInvalid:
      "Use international format, for example +44 7700 900123.",
  },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;

export function TestimonialsContactClient({
  testimonials,
}: Props) {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [contactMethod, setContactMethod] =
    useState<ContactMethod>("email");
  const [messageOpen, setMessageOpen] =
    useState(false);
  const [values, setValues] =
    useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] =
    useState<FormErrors>({});

  const copy = COPY[language];

  function updateField(
    field: keyof FormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (
      (field === "name" && errors.name) ||
      (field === "contact" && errors.contact)
    ) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  function changeContactMethod(
    method: ContactMethod,
  ) {
    if (method === contactMethod) {
      return;
    }

    setContactMethod(method);
    setValues((current) => ({
      ...current,
      contact: "",
    }));
    setErrors((current) => ({
      ...current,
      contact: undefined,
    }));
  }

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};
    const name = values.name.trim();
    const contact = values.contact.trim();

    if (!name) {
      nextErrors.name = copy.nameRequired;
    }

    if (!contact) {
      nextErrors.contact =
        contactMethod === "email"
          ? copy.emailRequired
          : copy.whatsappRequired;

      return nextErrors;
    }

    if (
      contactMethod === "email" &&
      !EMAIL_PATTERN.test(contact)
    ) {
      nextErrors.contact = copy.emailInvalid;
    }

    if (contactMethod === "whatsapp") {
      const normalizedPhone =
        contact.replace(/[\s()-]/g, "");

      if (!PHONE_PATTERN.test(normalizedPhone)) {
        nextErrors.contact =
          copy.whatsappInvalid;
      }
    }

    return nextErrors;
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Envío real pendiente de integrar.
  }

  const errorTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.18,
        ease: "easeOut" as const,
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
              language={language}
            />
          </div>

          <div
            id="Contact"
            className="border-t border-white/10 bg-white/[0.018] p-4 sm:p-5"
          >
            <div className="mb-3.5">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {copy.contactTitle}
              </h3>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-foreground-muted">
                {copy.contactDescription}
              </p>
            </div>

            <form
              className="space-y-2.5"
              noValidate
              onSubmit={handleSubmit}
            >
              <div>
                <Input
                  name="name"
                  autoComplete="name"
                  placeholder={copy.name}
                  aria-label={copy.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name
                      ? "contact-name-error"
                      : undefined
                  }
                  value={values.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value,
                    )
                  }
                  className={cn(
                    errors.name &&
                      "border-red-500/70 bg-red-500/[0.035] focus:border-red-400 focus:ring-red-500/15",
                  )}
                />

                <AnimatePresence initial={false}>
                  {errors.name ? (
                    <motion.p
                      id="contact-name-error"
                      role="alert"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              height: 0,
                              y: -4,
                            }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              height: 0,
                              y: -4,
                            }
                      }
                      transition={errorTransition}
                      className="mt-1.5 flex items-center gap-1.5 overflow-hidden px-1 text-[0.68rem] text-red-400"
                    >
                      <AlertCircle
                        aria-hidden="true"
                        className="size-3.5 shrink-0"
                      />
                      {errors.name}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>

              <div>
                <div className="mb-1.5 grid grid-cols-2 gap-1 rounded-xl border border-white/8 bg-black/15 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      changeContactMethod("email")
                    }
                    aria-pressed={
                      contactMethod === "email"
                    }
                    className={cn(
                      "flex h-8 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors duration-200",
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
                      changeContactMethod("whatsapp")
                    }
                    aria-pressed={
                      contactMethod === "whatsapp"
                    }
                    className={cn(
                      "flex h-8 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors duration-200",
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
                  inputMode={
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
                  aria-invalid={Boolean(
                    errors.contact,
                  )}
                  aria-describedby={
                    errors.contact
                      ? "contact-method-error"
                      : undefined
                  }
                  value={values.contact}
                  onChange={(event) =>
                    updateField(
                      "contact",
                      event.target.value,
                    )
                  }
                  className={cn(
                    errors.contact &&
                      "border-red-500/70 bg-red-500/[0.035] focus:border-red-400 focus:ring-red-500/15",
                  )}
                />

                <AnimatePresence initial={false}>
                  {errors.contact ? (
                    <motion.p
                      id="contact-method-error"
                      role="alert"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              height: 0,
                              y: -4,
                            }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              height: 0,
                              y: -4,
                            }
                      }
                      transition={errorTransition}
                      className="mt-1.5 flex items-center gap-1.5 overflow-hidden px-1 text-[0.68rem] text-red-400"
                    >
                      <AlertCircle
                        aria-hidden="true"
                        className="size-3.5 shrink-0"
                      />
                      {errors.contact}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>

              <Collapsible
                open={messageOpen}
                onOpenChange={setMessageOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    aria-controls="contact-message"
                    className="h-10 w-full justify-between rounded-xl border border-white/8 bg-white/[0.025] px-3.5 text-xs text-foreground-muted transition-colors duration-200 hover:bg-white/[0.045] hover:text-white"
                  >
                    {copy.optionalMessage}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-transform duration-300 ease-out",
                        messageOpen && "rotate-180",
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>

                <AnimatePresence initial={false}>
                  {messageOpen ? (
                    <motion.div
                      id="contact-message"
                      key="contact-message"
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              height: 0,
                            }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              height: 0,
                            }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              height: {
                                duration: 0.26,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              },
                              opacity: {
                                duration: 0.18,
                                ease: "easeOut",
                              },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <div className="pt-2">
                        <Textarea
                          name="message"
                          placeholder={
                            copy.messagePlaceholder
                          }
                          aria-label={
                            copy.optionalMessage
                          }
                          value={values.message}
                          onChange={(event) =>
                            updateField(
                              "message",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Collapsible>

              <Button
                type="submit"
                size="lg"
                className="h-10 w-full rounded-xl active:scale-[0.985]"
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
