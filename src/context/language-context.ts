import { createContext, useContext } from "react";
import type { Language, Translations } from "../i18n/translations";

export interface LanguageContextValue {
  lang: Language;
  toggleLang: () => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}
