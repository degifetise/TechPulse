import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { CATS, CMDS } from "../data/commands";
import Section from "./Section";

// One-click copy. If the browser refuses clipboard access, the command is selected so Ctrl+C works.
function CopyButton({ text, codeRef }) {
  const { t } = useLanguage();
  const [state, setState] = useState("idle"); // idle | done | manual
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = (next, ms) => {
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), ms);
  };

  const selectManually = () => {
    const el = codeRef.current;
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    flash("manual", 2500);
  };

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      flash("done", 2000);
    } catch {
      selectManually();
    }
  };

  const label = state === "done" ? t("cmd_copied") : state === "manual" ? t("cmd_manual") : t("cmd_copy");
  const Icon = state === "done" ? Check : Copy;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
        state === "done"
          ? "border-emerald-500 text-emerald-700 dark:text-emerald-400"
          : "border-slate-300 hover:border-indigo-500 dark:border-slate-700"
      }`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  );
}

function CommandCard({ cmd }) {
  const { L } = useLanguage();
  const codeRef = useRef(null);
  const catName = CATS.find((c) => c.id === cmd.c)?.name;
  return (
    <article className="card grid min-w-0 content-start gap-2.5 p-4">
      <small className="font-mono text-xs text-indigo-600 dark:text-indigo-300">{catName}</small>
      <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-100 p-2.5 pl-3 dark:border-slate-800 dark:bg-slate-950">
        <code
          ref={codeRef}
          className="min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-[13px] text-cyan-800 dark:text-cyan-300"
        >
          {cmd.x}
        </code>
        <CopyButton text={cmd.x} codeRef={codeRef} />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{L(cmd.d)}</p>
    </article>
  );
}

export default function CommandCenter() {
  const { t, L } = useLanguage();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CMDS.filter(
      (c) =>
        (cat === "all" || c.c === cat) &&
        (!q || c.x.toLowerCase().includes(q) || (L(c.d) || "").toLowerCase().includes(q))
    );
  }, [cat, query, L]);

  return (
    <Section id="commands" title={t("cmd_title")} subtitle={t("cmd_sub")}>
      <div className="mb-5 grid gap-3.5">
        <input
          type="search"
          value={query}
          maxLength={80}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("cmd_search_ph")}
          aria-label={t("cmd_search_ph")}
          autoComplete="off"
          className="field max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            {t("cmd_all")}
          </button>
          {CATS.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))]">
        {list.length === 0 ? (
          <p className="py-6 text-slate-500 dark:text-slate-400">{t("cmd_none")}</p>
        ) : (
          list.map((c) => <CommandCard key={c.x} cmd={c} />)
        )}
      </div>
    </Section>
  );
}
