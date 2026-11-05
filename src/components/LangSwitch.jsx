import { useLanguage, LANG_LABEL } from "../context/LanguageContext";

export default function LangSwitch() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t("lang_label")}
      className="inline-flex rounded-xl border border-slate-300 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900"
    >
      {Object.entries(LANG_LABEL).map(([code, label]) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className="rounded-lg px-2.5 py-1 text-sm font-semibold text-slate-600 transition aria-pressed:bg-indigo-600 aria-pressed:text-white dark:text-slate-400"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
