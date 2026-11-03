import type { Language } from "@/i18n/translations";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

const whatsappMessages: Record<Language, string> = {
  es: "Hola Sebastián, vi tu portfolio y quisiera hacerte una consulta.",
  en: "Hi Sebastián, I saw your portfolio and I'd like to ask you something.",
};

export const siteConfig = {
  whatsappNumber,
  navigationSectionIds: [
    "hero",
    "work",
    "OtherWork",
    "Services",
    "Testimonials",
  ],
} as const;

export function getWhatsAppUrl(
  language: Language,
): string | null {
  if (!siteConfig.whatsappNumber) {
    return null;
  }

  const message = encodeURIComponent(
    whatsappMessages[language],
  );

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
