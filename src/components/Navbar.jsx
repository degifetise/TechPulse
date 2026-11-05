import { Activity, Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { scrollToId } from "../lib/scroll";
import LangSwitch from "./LangSwitch";

const LINKS = [
  ["services", "nav_services"],
  ["diagnose", "nav_diagnose"],
  ["commands", "nav_commands"],
  ["pricing", "nav_pricing"],
  ["contact", "nav_contact"],
];

export default function Navbar({ theme, onToggleTheme }) {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/75 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2.5">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold">
          <Activity className="h-6 w-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
          TechPulse
        </a>

        <nav
          aria-label={t("nav_label")}
          className="order-3 flex w-full gap-1 overflow-x-auto md:order-none md:w-auto"
        >
          {LINKS.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(id);
              }}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LangSwitch />
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t("theme")}
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
