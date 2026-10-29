import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";

import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Sebastián Villegas | Portfolio",
  description: "Portfolio V2 — base técnica en Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${interTight.variable} ${ibmPlexMono.variable}`}>
        <LanguageProvider>
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
