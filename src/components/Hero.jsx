import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { scrollToId } from "../lib/scroll";
import TechScene from "./TechScene";

// Animation presets
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const lineIn = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const initial = reduce ? false : "hidden";

  // Split the headline into sentences so each one slides in on its own line.
  // Works for "." in English and the Ethiopic full stop "።" in Amharic.
  const lines = t("hero_title").split(/(?<=[.።])\s+/);

  return (
    <div id="top" className="relative isolate">
      <div className="hero-bg absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="min-w-0"
          variants={container}
          initial={initial}
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 py-1 pl-2.5 pr-3.5 font-mono text-sm text-slate-600 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400"
          >
            <i className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
            {t("hero_badge")}
          </motion.span>

          {/* key changes with the language, so the headline plays again when the visitor switches */}
          <motion.h1
            key={lang}
            variants={container}
            initial={initial}
            animate="show"
            className="mb-4 mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-1">
                <motion.span
                  variants={lineIn}
                  className={`block ${i === lines.length - 1 ? "text-indigo-600 dark:text-indigo-400" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg text-slate-600 dark:text-slate-400"
          >
            {t("hero_sub")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToId("diagnose")}
            >
              {t("cta_diagnose")}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => scrollToId("pricing")}
            >
              {t("cta_quote")}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="min-w-0"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <TechScene />
        </motion.div>
      </div>
    </div>
  );
}
