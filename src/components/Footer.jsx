import { useLanguage } from "../context/LanguageContext";
import LangSwitch from "./LangSwitch";

// Placeholder contact details. Replace with your real ones before launch.
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-4 py-7 text-sm text-slate-600 dark:text-slate-400">
        <div className="font-mono">
          degifetise09@gmail.com · +251 924 275 434
        </div>
        <LangSwitch />
        <div>{t("footer_rights")}</div>
      </div>
    </footer>
  );
}
