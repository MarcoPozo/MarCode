import { useEffect, useState, type ReactNode } from "react";
import { translations, type Language } from "../i18n/translations";
import { LanguageContext } from "./language-context";

const STORAGE_KEY = "marcode-lang";

function getInitialLang(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}
