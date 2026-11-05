import { motion, useReducedMotion } from "framer-motion";
import { Code, GraduationCap, Monitor, Network, Smartphone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Section from "./Section";

// The first two cards are wider on large screens to form the bento layout.
const SERVICES = [
  { id: "it", Icon: Monitor, wide: true },
  { id: "mobile", Icon: Smartphone, wide: true },
  { id: "web", Icon: Code },
  { id: "cisco", Icon: Network },
  { id: "train", Icon: GraduationCap },
];

export default function ServicesGrid() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <Section id="services" title={t("services_title")} subtitle={t("services_sub")}>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
        {SERVICES.map(({ id, Icon, wide }) => (
          <motion.article
            key={id}
            whileHover={reduce ? undefined : { y: -3 }}
            className={`card flex min-w-0 flex-col gap-2.5 p-5 transition-colors hover:border-indigo-500 sm:last:col-span-2 ${
              wide ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <Icon className="h-7 w-7 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold">{t(`svc_${id}`)}</h3>
            <p className="text-slate-600 dark:text-slate-400">{t(`svc_${id}_d`)}</p>
            <span className="mt-auto pt-1.5 font-mono text-xs text-indigo-600 dark:text-indigo-300">
              {t(`svc_${id}_m`)}
            </span>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
