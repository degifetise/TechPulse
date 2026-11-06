import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { CONTACT, telHref } from "../data/contact";
import { isOpenNow } from "../lib/hours";

// Re-checks the opening hours every minute so the badge stays correct while the page is open
function useOpenNow() {
  const [open, setOpen] = useState(() => isOpenNow());
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

function CopyChip({ text }) {
  const { t } = useLanguage();
  const [done, setDone] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // clipboard blocked: the number and address are still selectable on screen
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        done
          ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
          : "border-slate-300 hover:border-indigo-500 dark:border-slate-700"
      }`}
    >
      {done ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {done ? t("cmd_copied") : t("cmd_copy")}
    </button>
  );
}

function Row({ icon, label, value, href, action }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
      {icon}
      <div className="min-w-0 flex-1">
        <span className="lbl block">{label}</span>
        <span className="block break-all font-mono text-sm sm:text-base">
          {value}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <a href={href} className="btn-primary !py-2 text-sm">
          {action}
        </a>
        <CopyChip text={value} />
      </div>
    </div>
  );
}

export default function ContactStrip() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const open = useOpenNow();

  // The phone rings every few seconds, the mail icon floats. Both stop when motion is reduced.
  const ring = reduce
    ? undefined
    : {
        animate: { rotate: [0, -16, 16, -12, 12, 0] },
        transition: { duration: 0.8, repeat: Infinity, repeatDelay: 3.2 },
      };
  const float = reduce
    ? undefined
    : {
        animate: { y: [0, -3, 0] },
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
      };

  const iconTile =
    "relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20";

  return (
    <motion.div
      className="relative mt-8 overflow-hidden rounded-3xl bg-slate-200 p-px dark:bg-slate-800"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* a slowly turning glow along the card's edge */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_55%,#6366f1_78%,#22d3ee_100%)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, ease: "linear", repeat: Infinity }}
        />
      )}

      <div className="relative grid gap-6 rounded-[calc(1.5rem-1px)] bg-white p-5 dark:bg-slate-900 sm:p-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold leading-snug tracking-tight">
            {t("contact_strip_title")}
          </h3>

          {open !== null && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium ${
                  open
                    ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
                    : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                }`}
              >
                <i
                  className={`h-2 w-2 rounded-full ${open ? "animate-pulse bg-emerald-500" : "bg-slate-400 dark:bg-slate-500"}`}
                />
                {open ? t("contact_open") : t("contact_closed")}
              </span>
              <span className="font-mono text-slate-600 dark:text-slate-400">
                {t("contact_days")} · {CONTACT.opens}–{CONTACT.closes} (UTC+3)
              </span>
            </div>
          )}

          {(CONTACT.telegram || CONTACT.whatsapp) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {CONTACT.telegram && (
                <a
                  className="btn-ghost !py-2 text-sm"
                  href={`https://t.me/${CONTACT.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-4 w-4" aria-hidden="true" /> Telegram
                </a>
              )}
              {CONTACT.whatsapp && (
                <a
                  className="btn-ghost !py-2 text-sm"
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />{" "}
                  WhatsApp
                </a>
              )}
            </div>
          )}
        </div>

        <div className="grid min-w-0 gap-3">
          <Row
            icon={
              <span className={iconTile}>
                {!reduce && (
                  <span
                    className="absolute inset-0 animate-ping rounded-xl bg-indigo-500/20"
                    aria-hidden="true"
                  />
                )}
                <motion.span className="relative" {...ring}>
                  <Phone
                    className="h-5 w-5 text-indigo-600 dark:text-indigo-300"
                    aria-hidden="true"
                  />
                </motion.span>
              </span>
            }
            label={t("scene_phone")}
            value={CONTACT.phone}
            href={telHref(CONTACT.phone)}
            action={t("contact_call")}
          />
          <Row
            icon={
              <span className={iconTile}>
                <motion.span {...float}>
                  <Mail
                    className="h-5 w-5 text-cyan-700 dark:text-cyan-300"
                    aria-hidden="true"
                  />
                </motion.span>
              </span>
            }
            label={t("f_email")}
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            action={t("contact_send")}
          />
        </div>
      </div>
    </motion.div>
  );
}
