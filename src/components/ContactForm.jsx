import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { EMAIL_RE, LIMITS, PHONE_RE, clean, ticketId } from "../lib/security";
import Section from "./Section";

const TYPES = ["ticket", "repair", "web", "network", "training"];
const COURSES = ["course_basics", "course_ccna", "course_web", "course_phone"];
const SCHEDULES = ["sched_eve", "sched_wknd", "sched_flex"];
const FIELD_ORDER = ["name", "email", "phone", "message"];
const THROTTLE_MS = 15000;

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  type: "ticket",
  course: COURSES[0],
  schedule: SCHEDULES[0],
  message: "",
};

function Field({ id, label, error, full, children }) {
  const { t } = useLanguage();
  return (
    <div className={`grid min-w-0 content-start gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-err`} className="text-sm text-rose-700 dark:text-rose-400">
          {t(error)}
        </span>
      )}
    </div>
  );
}

// prefill = { type, message, nonce } from the wizard or the calculator
export default function ContactForm({ prefill }) {
  const { t } = useLanguage();
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { kind: "ok", ticket } | { kind: "error", key }
  const [sending, setSending] = useState(false);
  const refs = useRef({});
  const honeypot = useRef(null);
  const lastSent = useRef(0);

  useEffect(() => {
    if (!prefill) return;
    setF((x) => ({ ...x, type: prefill.type, message: prefill.message }));
    setErrors({});
    setStatus(null);
  }, [prefill]);

  const set = (name) => (e) => setF((x) => ({ ...x, [name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const v = {
      name: clean(f.name, LIMITS.name),
      email: clean(f.email, LIMITS.email),
      phone: clean(f.phone, LIMITS.phone),
      message: clean(f.message, LIMITS.message),
    };

    const next = {};
    if (!v.name) next.name = "e_required";
    if (!EMAIL_RE.test(v.email)) next.email = "e_email";
    if (v.phone && !PHONE_RE.test(v.phone)) next.phone = "e_phone";
    if (!v.message) next.message = "e_required";
    else if (v.message.length < 10) next.message = "e_short";
    setErrors(next);

    const firstBad = FIELD_ORDER.find((k) => next[k]);
    if (firstBad) {
      refs.current[firstBad]?.focus();
      return;
    }

    // Honeypot: people never see this field, bots fill it in. Drop the request quietly.
    if (honeypot.current?.value) return;

    // Light client-side throttle. Real rate limiting must also be set in the EmailJS dashboard.
    if (Date.now() - lastSent.current < THROTTLE_MS) {
      setStatus({ kind: "error", key: "e_wait" });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setStatus({ kind: "error", key: "e_config" });
      return;
    }

    setSending(true);
    try {
      const en = translations.en;
      const ticket = ticketId();
      const isTraining = f.type === "training";
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: v.name,
          reply_to: v.email,
          phone: v.phone || "-",
          request_type: en[`type_${f.type}`],
          course: isTraining ? en[f.course] : "-",
          schedule: isTraining ? en[f.schedule] : "-",
          message: v.message,
          ticket_id: ticket,
        },
        { publicKey }
      );
      lastSent.current = Date.now();
      setStatus({ kind: "ok", ticket });
      setF((x) => ({ ...x, message: "" }));
    } catch {
      // Do not show provider error details to visitors
      setStatus({ kind: "error", key: "e_send" });
    } finally {
      setSending(false);
    }
  };

  const bind = (name) => ({
    id: `f-${name}`,
    ref: (el) => {
      refs.current[name] = el;
    },
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });

  return (
    <Section id="contact" title={t("contact_title")} subtitle={t("contact_sub")}>
      <form onSubmit={onSubmit} noValidate className="card grid gap-4 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="f-name" label={t("f_name")} error={errors.name}>
            <input {...bind("name")} className="field" value={f.name} onChange={set("name")} maxLength={LIMITS.name} autoComplete="name" />
          </Field>
          <Field id="f-email" label={t("f_email")} error={errors.email}>
            <input {...bind("email")} className="field" type="email" value={f.email} onChange={set("email")} maxLength={LIMITS.email} autoComplete="email" />
          </Field>
          <Field id="f-phone" label={t("f_phone")} error={errors.phone}>
            <input {...bind("phone")} className="field" type="tel" value={f.phone} onChange={set("phone")} maxLength={LIMITS.phone} autoComplete="tel" />
          </Field>
          <Field id="f-type" label={t("f_type")}>
            <select id="f-type" className="field" value={f.type} onChange={set("type")}>
              {TYPES.map((k) => (
                <option key={k} value={k}>
                  {t(`type_${k}`)}
                </option>
              ))}
            </select>
          </Field>

          {f.type === "training" && (
            <>
              <Field id="f-course" label={t("f_course")}>
                <select id="f-course" className="field" value={f.course} onChange={set("course")}>
                  {COURSES.map((k) => (
                    <option key={k} value={k}>
                      {t(k)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-schedule" label={t("f_schedule")}>
                <select id="f-schedule" className="field" value={f.schedule} onChange={set("schedule")}>
                  {SCHEDULES.map((k) => (
                    <option key={k} value={k}>
                      {t(k)}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          <Field id="f-message" label={t("f_message")} error={errors.message} full>
            <textarea {...bind("message")} className="field min-h-32 resize-y" value={f.message} onChange={set("message")} maxLength={LIMITS.message} />
          </Field>
        </div>

        {/* Honeypot field, hidden from people and screen readers */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" ref={honeypot} tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? t("sending") : t("f_submit")}
          </button>
        </div>

        <div role="status" aria-live="polite">
          {status?.kind === "ok" && (
            <div className="rounded-xl border border-emerald-500 bg-slate-50 p-4 dark:bg-slate-800/50">
              {t("thanks")} {t("sent")} <b className="font-mono text-emerald-700 dark:text-emerald-400">{status.ticket}</b>
            </div>
          )}
          {status?.kind === "error" && (
            <div className="rounded-xl border border-rose-500 bg-slate-50 p-4 dark:bg-slate-800/50">{t(status.key)}</div>
          )}
        </div>
      </form>
    </Section>
  );
}
