import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { ADDONS, EXPRESS, SCOPE, SERVICES, estimate } from "../data/pricing";
import { translations } from "../data/translations";
import Section from "./Section";

const fmt = (n) => new Intl.NumberFormat("en-US").format(n);

function AnimatedNumber({ value }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (reduce) {
      from.current = value;
      setShown(value);
      return undefined;
    }
    const controls = animate(from.current, value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (v) => {
        from.current = v;
        setShown(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, reduce]);

  return <span>{fmt(shown)}</span>;
}

// Radio or checkbox drawn as a chip. The real input stays focusable for keyboards.
function Option({ type, name, value, checked, onChange, children }) {
  return (
    <label className="relative inline-block cursor-pointer">
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-block rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2 text-sm transition hover:border-indigo-500 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/15 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan-500 dark:border-slate-700 dark:bg-slate-800">
        {children}
      </span>
    </label>
  );
}

export default function CostCalculator({ onRequestQuote }) {
  const { t } = useLanguage();
  const [svc, setSvc] = useState("mobile");
  const [scope, setScope] = useState("s");
  const [express, setExpress] = useState(false);
  const [addons, setAddons] = useState({});

  const price = estimate({ svc, scope, express, addons });
  const base = SERVICES[svc];

  const requestQuote = () => {
    const en = translations.en;
    const chosen = Object.keys(addons)
      .filter((k) => addons[k])
      .map((k) => en[`add_${k}`]);
    onRequestQuote(
      base.form,
      [
        "Quote request",
        `Service: ${en[`svc_${svc}`]}`,
        `Scope: ${en[`scope_${scope}`]}`,
        `Urgency: ${express ? "Express" : "Standard"}`,
        `Add-ons: ${chosen.length ? chosen.join(", ") : "none"}`,
        `Estimate: ETB ${fmt(price.min)} to ${fmt(price.max)}`,
      ].join("\n")
    );
  };

  return (
    <Section id="pricing" title={t("calc_title")} subtitle={t("calc_sub")}>
      <div className="grid items-start gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card grid min-w-0 gap-5 p-5 sm:p-6">
          <fieldset>
            <legend className="lbl mb-2">{t("c_service")}</legend>
            <div className="flex flex-wrap gap-2">
              {Object.keys(SERVICES).map((k) => (
                <Option key={k} type="radio" name="svc" value={k} checked={svc === k} onChange={() => setSvc(k)}>
                  {t(`svc_${k}`)}
                </Option>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="lbl mb-2">{t("c_scope")}</legend>
            <div className="flex flex-wrap gap-2">
              {Object.keys(SCOPE).map((k) => (
                <Option key={k} type="radio" name="scope" value={k} checked={scope === k} onChange={() => setScope(k)}>
                  {t(`scope_${k}`)}
                </Option>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="lbl mb-2">{t("c_urgency")}</legend>
            <div className="flex flex-wrap gap-2">
              <Option type="radio" name="urgency" value="std" checked={!express} onChange={() => setExpress(false)}>
                {t("urg_std")}
              </Option>
              <Option type="radio" name="urgency" value="exp" checked={express} onChange={() => setExpress(true)}>
                {t("urg_exp")}
              </Option>
            </div>
          </fieldset>

          <fieldset>
            <legend className="lbl mb-2">{t("c_addons")}</legend>
            <div className="flex flex-wrap gap-2">
              {Object.keys(ADDONS).map((k) => (
                <Option
                  key={k}
                  type="checkbox"
                  name="addons"
                  value={k}
                  checked={!!addons[k]}
                  onChange={(e) => setAddons((a) => ({ ...a, [k]: e.target.checked }))}
                >
                  {t(`add_${k}`)} (+{fmt(ADDONS[k])})
                </Option>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="card grid min-w-0 gap-3.5 p-5 sm:p-6 lg:sticky lg:top-28">
          <span className="lbl">{t("c_estimate")}</span>
          <div className="break-words font-display text-3xl font-extrabold leading-tight tracking-tight tabular-nums sm:text-4xl">
            <small className="mr-1.5 text-base font-semibold text-slate-500 dark:text-slate-400">ETB</small>
            <AnimatedNumber value={price.min} /> – <AnimatedNumber value={price.max} />
          </div>

          <ul className="grid gap-1.5 font-mono text-xs text-slate-600 tabular-nums dark:text-slate-400">
            <li className="flex justify-between gap-3 border-b border-dashed border-slate-300 pb-1.5 dark:border-slate-700">
              <span>{t("c_base")}</span>
              <span>
                {fmt(base.min)} – {fmt(base.max)}
              </span>
            </li>
            {SCOPE[scope] !== 1 && (
              <li className="flex justify-between gap-3 border-b border-dashed border-slate-300 pb-1.5 dark:border-slate-700">
                <span>{t("c_scope")}</span>
                <span>×{SCOPE[scope]}</span>
              </li>
            )}
            {price.extra > 0 && (
              <li className="flex justify-between gap-3 border-b border-dashed border-slate-300 pb-1.5 dark:border-slate-700">
                <span>{t("c_addons")}</span>
                <span>+{fmt(price.extra)}</span>
              </li>
            )}
            {express && (
              <li className="flex justify-between gap-3 border-b border-dashed border-slate-300 pb-1.5 dark:border-slate-700">
                <span>{t("c_urgency")}</span>
                <span>×{EXPRESS}</span>
              </li>
            )}
          </ul>

          <p className="text-sm text-slate-600 dark:text-slate-400">{t("c_disclaimer")}</p>
          <button type="button" className="btn-primary justify-center" onClick={requestQuote}>
            {t("c_quote")}
          </button>
        </div>
      </div>
    </Section>
  );
}
