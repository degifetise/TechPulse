import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Code,
  GraduationCap,
  Monitor,
  Network,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { scrollToId } from "../lib/scroll";
import ContactStrip from "./ContactStrip";
import Section from "./Section";

// The first two cards are wider on large screens to form the bento layout.
// form = which request type the contact form switches to when the visitor clicks "Request this service".
const SERVICES = [
  { id: "it", Icon: Monitor, wide: true, form: "ticket" },
  { id: "mobile", Icon: Smartphone, wide: true, form: "repair" },
  { id: "web", Icon: Code, form: "web" },
  { id: "cisco", Icon: Network, form: "network" },
  { id: "train", Icon: GraduationCap, form: "training" },
];

const EASE = [0.2, 0.8, 0.2, 1];
// Cards rise in one after another. On hover the card lifts, the icon tilts and the arrow slides.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  hover: { y: -4, transition: { duration: 0.2 } },
};
const iconTile = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
  hover: { rotate: -8, scale: 1.1, transition: { duration: 0.2 } },
};
const arrow = { hover: { x: 5, transition: { duration: 0.2 } } };

// A soft light follows the pointer across the card
function followPointer(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

// onRequest(type, message) opens the contact form already filled in. Without it, the page just scrolls to the form.
export default function ServicesGrid({ onRequest }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const v = (variants) => (reduce ? undefined : variants);

  const request = (svc) => {
    if (onRequest)
      onRequest(
        svc.form,
        `I'd like help with: ${translations.en[`svc_${svc.id}`]}`,
      );
    else scrollToId("contact");
  };

  return (
    <Section
      id="services"
      title={t("services_title")}
      subtitle={t("services_sub")}
    >
      <motion.div
        className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-6"
        variants={v(container)}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {SERVICES.map((svc) => (
          <motion.article
            key={svc.id}
            variants={v(card)}
            whileHover={reduce ? undefined : "hover"}
            onMouseMove={followPointer}
            className={`card group relative flex min-w-0 flex-col overflow-hidden p-5 transition-colors hover:border-indigo-500 sm:last:col-span-2 ${
              svc.wide ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.16), transparent 65%)",
              }}
            />

            <div className="relative flex min-w-0 flex-1 flex-col gap-3">
              <motion.span
                variants={v(iconTile)}
                className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20"
              >
                <svc.Icon
                  className="h-6 w-6 text-cyan-600 dark:text-cyan-400"
                  aria-hidden="true"
                />
              </motion.span>
              <h3 className="font-display text-xl font-bold">
                {t(`svc_${svc.id}`)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t(`svc_${svc.id}_d`)}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-2">
                <span className="font-mono text-xs text-indigo-600 dark:text-indigo-300">
                  {t(`svc_${svc.id}_m`)}
                </span>
                <button
                  type="button"
                  onClick={() => request(svc)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300"
                >
                  {t("svc_request")}
                  <motion.span variants={v(arrow)} className="inline-flex">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <ContactStrip />
    </Section>
  );
}
