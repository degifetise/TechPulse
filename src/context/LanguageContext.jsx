import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);

export const LANGS = ["en", "amh", "sid"];
export const LANG_LABEL = { en: "EN", amh: "አማ", sid: "SID" };

function readStoredLang() {
  try {
    const stored = localStorage.getItem("tp-lang");
    return LANGS.includes(stored) ? stored : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang === "amh" ? "am" : lang === "sid" ? "sid" : "en";
    try {
      localStorage.setItem("tp-lang", lang);
    } catch {
      /* storage can be blocked; the choice just will not persist */
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      // t("key") looks up UI text and falls back to English, then to the key itself
      t: (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
      // L({ en, amh }) picks the right variant of a bilingual data object
      L: (obj) => obj?.[lang] ?? obj?.en,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
