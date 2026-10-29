"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
} from "@/i18n/translations";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext =
  createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] =
    useState<Language>("es");

  useEffect(() => {
    const savedLanguage =
      window.localStorage.getItem(
        LANGUAGE_STORAGE_KEY,
      );

    if (
      savedLanguage !== "es" &&
      savedLanguage !== "en"
    ) {
      return;
    }

    const timeout =
      window.setTimeout(() => {
        setLanguageState(savedLanguage);
        document.documentElement.lang =
          savedLanguage;
      }, 0);

    return () =>
      window.clearTimeout(timeout);
  }, []);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      setLanguageState(nextLanguage);

      document.documentElement.lang =
        nextLanguage;

      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        nextLanguage,
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    );
  }

  return context;
}
