"use client";

import {
  useState,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  LoaderCircle,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type ContactMethod = "email" | "whatsapp";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  contact: string;
  message: string;
};

type FormErrors = {
  name?: string;
  contact?: string;
};

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

const INITIAL_VALUES: FormValues = {
  name: "",
  contact: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;

export function ContactForm() {
  const { t } = useLanguage();
  const copy = t.testimonialsContact.contact;
  const reduceMotion = useReducedMotion();

  const [contactMethod, setContactMethod] =
    useState<ContactMethod>("email");
  const [messageOpen, setMessageOpen] =
    useState(false);
  const [values, setValues] =
    useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] =
    useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const submitting =
    submitStatus === "submitting";

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

    if (
      submitStatus === "success" ||
      submitStatus === "error"
    ) {
      setSubmitStatus("idle");
    }
  }

  function changeContactMethod(
    method: ContactMethod,
  ) {
    if (
      method === contactMethod ||
      submitting
    ) {
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
    setSubmitStatus("idle");
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextErrors = validateForm();

    if (
      Object.keys(nextErrors).length > 0
    ) {
      setErrors(nextErrors);
      setSubmitStatus("idle");
      return;
    }

    const accessKey =
      process.env
        .NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitStatus("error");
      return;
    }

    setErrors({});
    setSubmitStatus("submitting");

    try {
      const formData = new FormData(
        event.currentTarget,
      );

      formData.set(
        "access_key",
        accessKey,
      );
      formData.set(
        "subject",
        copy.emailSubject,
      );
      formData.set(
        "contact_method",
        contactMethod,
      );

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(
            Object.fromEntries(
              formData,
            ),
          ),
        },
      );

      const result =
        (await response.json()) as Web3FormsResponse;

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ??
            "Web3Forms error",
        );
      }

      setValues(INITIAL_VALUES);
      setContactMethod("email");
      setMessageOpen(false);
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <>
      <div className="mb-3.5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {copy.title}
        </h3>

        <p className="mt-1 max-w-xl text-xs leading-relaxed text-foreground-muted">
          {copy.description}
        </p>
      </div>

      <form
        className="space-y-2.5"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="relative">
          <Input
            name="name"
            autoComplete="name"
            placeholder={copy.name}
            aria-label={copy.name}
            aria-invalid={Boolean(
              errors.name,
            )}
            aria-describedby={
              errors.name
                ? "contact-name-error"
                : undefined
            }
            value={values.name}
            disabled={submitting}
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

          <div
            id="contact-name-error"
            role={
              errors.name
                ? "alert"
                : undefined
            }
            aria-hidden={
              !errors.name
            }
            className={cn(
              "pointer-events-none absolute right-2 top-full z-20 mt-1.5 flex max-w-[90%] items-center gap-1.5 rounded-lg border border-red-500/20 bg-[#17171a]/95 px-2.5 py-1.5 text-[0.68rem] text-red-400 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-[opacity,transform]",
              reduceMotion
                ? "duration-0"
                : "duration-150",
              errors.name
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0",
            )}
          >
            <AlertCircle
              aria-hidden="true"
              className="size-3.5 shrink-0"
            />
            {errors.name}
          </div>
        </div>

        <div className="relative">
          <div className="mb-1.5 grid grid-cols-2 gap-1 rounded-xl border border-white/8 bg-black/15 p-1">
            <button
              type="button"
              disabled={submitting}
              onClick={() =>
                changeContactMethod(
                  "email",
                )
              }
              aria-pressed={
                contactMethod === "email"
              }
              className={cn(
                "flex h-8 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
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
              disabled={submitting}
              onClick={() =>
                changeContactMethod(
                  "whatsapp",
                )
              }
              aria-pressed={
                contactMethod ===
                "whatsapp"
              }
              className={cn(
                "flex h-8 items-center justify-center gap-2 rounded-lg text-xs font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
                contactMethod ===
                  "whatsapp"
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
            name={contactMethod}
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
            disabled={submitting}
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

          <div
            id="contact-method-error"
            role={
              errors.contact
                ? "alert"
                : undefined
            }
            aria-hidden={
              !errors.contact
            }
            className={cn(
              "pointer-events-none absolute right-2 top-full z-20 mt-1.5 flex max-w-[90%] items-center gap-1.5 rounded-lg border border-red-500/20 bg-[#17171a]/95 px-2.5 py-1.5 text-[0.68rem] text-red-400 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-[opacity,transform]",
              reduceMotion
                ? "duration-0"
                : "duration-150",
              errors.contact
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0",
            )}
          >
            <AlertCircle
              aria-hidden="true"
              className="size-3.5 shrink-0"
            />
            {errors.contact}
          </div>
        </div>

        <Collapsible
          open={messageOpen}
          onOpenChange={
            setMessageOpen
          }
          disabled={submitting}
        >
          <CollapsibleTrigger
            asChild
          >
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
                  "size-4 transition-transform ease-out",
                  reduceMotion
                    ? "duration-0"
                    : "duration-300",
                  messageOpen &&
                    "rotate-180",
                )}
              />
            </Button>
          </CollapsibleTrigger>

          <AnimatePresence
            initial={false}
          >
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
                    ? {
                        duration: 0,
                      }
                    : {
                        height: {
                          duration:
                            0.26,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        },
                        opacity: {
                          duration:
                            0.18,
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
                    value={
                      values.message
                    }
                    disabled={
                      submitting
                    }
                    onChange={(
                      event,
                    ) =>
                      updateField(
                        "message",
                        event.target
                          .value,
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
          disabled={submitting}
          className={cn(
            "group relative h-11 w-full cursor-pointer touch-manipulation overflow-hidden rounded-xl border border-brand-soft/50 bg-white/[0.045] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-[transform,background-color,border-color,box-shadow] duration-200",
            "hover:border-brand-soft/70 hover:bg-white/[0.07] hover:shadow-[0_10px_28px_rgba(0,0,0,0.22)]",
            "active:scale-[0.98] active:bg-white/[0.09]",
            "disabled:cursor-default disabled:opacity-65",
            reduceMotion &&
              "transition-none active:scale-100",
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--gradient-brand)] opacity-80"
          />

          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? (
              <>
                {copy.sending}
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin motion-reduce:animate-none"
                />
              </>
            ) : (
              <>
                {copy.submit}
                <Send
                  aria-hidden="true"
                  className="size-4 text-brand-soft/80 transition-transform duration-200 group-hover:translate-x-0.5 group-active:translate-x-1"
                />
              </>
            )}
          </span>
        </Button>

        <div
          className="min-h-[1.25rem]"
          aria-live="polite"
        >
          {submitStatus ===
          "success" ? (
            <p
              role="status"
              className="flex items-center justify-center gap-1.5 px-1 text-[0.7rem] text-emerald-400"
            >
              <CheckCircle2
                aria-hidden="true"
                className="size-3.5 shrink-0"
              />
              {copy.success}
            </p>
          ) : null}

          {submitStatus ===
          "error" ? (
            <p
              role="alert"
              className="flex items-center justify-center gap-1.5 px-1 text-[0.7rem] text-red-400"
            >
              <AlertCircle
                aria-hidden="true"
                className="size-3.5 shrink-0"
              />
              {copy.submitError}
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
