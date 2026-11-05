import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ISSUES, PLATFORMS } from "../data/diagnostics";
import { translations } from "../data/translations";
import RichText from "./RichText";
import Section from "./Section";

// onEscalate(type, message) opens the contact form with the problem pre-filled.
export default function DiagnosticWizard({ onEscalate }) {
  const { t, L } = useLanguage();
  const [plat, setPlat] = useState(null);
  const [issueId, setIssueId] = useState(null);
  const [result, setResult] = useState(null); // null | "yes" | "no"

  const issue = ISSUES.find((i) => i.id === issueId);
  const reset = () => {
    setPlat(null);
    setIssueId(null);
    setResult(null);
  };

  const escalate = () => {
    const en = translations.en;
    onEscalate(
      "ticket",
      `Troubleshooting did not fix it.\nDevice: ${en["plat_" + plat]}\nSymptom: ${issue.title.en}`
    );
  };

  return (
    <Section id="diagnose" title={t("diag_title")} subtitle={t("diag_sub")}>
      <div className="card grid gap-6 p-5 sm:p-6">
        <div>
          <span className="lbl mb-2 block">1 · {t("step_device")}</span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                className="chip"
                aria-pressed={plat === p}
                onClick={() => {
                  setPlat(p);
                  setIssueId(null);
                  setResult(null);
                }}
              >
                {t(`plat_${p}`)}
              </button>
            ))}
          </div>
        </div>

        {plat && (
          <div>
            <span className="lbl mb-2 block">2 · {t("step_symptom")}</span>
            <div className="flex flex-wrap gap-2">
              {ISSUES.filter((i) => i.p === plat).map((i) => (
                <button
                  key={i.id}
                  type="button"
                  className="chip"
                  aria-pressed={issueId === i.id}
                  onClick={() => {
                    setIssueId(i.id);
                    setResult(null);
                  }}
                >
                  {L(i.title)}
                </button>
              ))}
            </div>
          </div>
        )}

        {issue && (
          <div>
            <span className="lbl block">3 · {t("step_fix")}</span>
            <h3 className="mt-1 font-display text-lg font-bold">{L(issue.title)}</h3>

            <ol className="mt-3 grid gap-2.5">
              {L(issue.steps).map((step, n) => (
                <li key={`${issue.id}-${n}`}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-indigo-500/15 font-mono text-sm text-indigo-700 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500 dark:text-indigo-300">
                      {n + 1}
                    </span>
                    <span className="min-w-0 peer-checked:text-slate-500 peer-checked:line-through dark:peer-checked:text-slate-500">
                      <RichText text={step} />
                    </span>
                  </label>
                </li>
              ))}
            </ol>

            {result === null && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <strong className="font-display text-base">{t("fixed_q")}</strong>
                <button type="button" className="btn-primary" onClick={() => setResult("yes")}>
                  {t("fixed_yes")}
                </button>
                <button type="button" className="btn-ghost" onClick={() => setResult("no")}>
                  {t("fixed_no")}
                </button>
              </div>
            )}

            {result === "yes" && (
              <div
                role="status"
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500 p-4"
              >
                <span>{t("fixed_ok")}</span>
                <button type="button" className="btn-ghost" onClick={reset}>
                  {t("restart")}
                </button>
              </div>
            )}

            {result === "no" && (
              <div
                role="status"
                className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-500 p-4"
              >
                <span>{t("escalate_t")}</span>
                <span className="flex flex-wrap gap-2">
                  <button type="button" className="btn-primary" onClick={escalate}>
                    {t("escalate")}
                  </button>
                  <button type="button" className="btn-ghost" onClick={reset}>
                    {t("restart")}
                  </button>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
