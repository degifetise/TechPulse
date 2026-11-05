import { useLanguage } from "../context/LanguageContext";
import { scrollToId } from "../lib/scroll";

const ROWS = [
  ["Gi0/0", "192.168.10.1", "up"],
  ["Gi0/1", "10.0.0.2", "up"],
  ["Vlan10", "172.16.10.1", "up"],
  ["Gi0/2", "unassigned", "down"],
];

export default function Hero() {
  const { t } = useLanguage();
  return (
    <div id="top" className="relative isolate">
      <div className="hero-bg absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white py-1 pl-2.5 pr-3.5 font-mono text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            <i className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
            {t("hero_badge")}
          </span>
          <h1 className="mb-4 mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400">{t("hero_sub")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => scrollToId("diagnose")}>
              {t("cta_diagnose")}
            </button>
            <button type="button" className="btn-ghost" onClick={() => scrollToId("pricing")}>
              {t("cta_quote")}
            </button>
          </div>
        </div>

        {/* Router console: a real `show ip interface brief` view, the kind of thing we fix daily */}
        <div
          className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-950"
          aria-label="Router console example"
        >
          <div className="flex justify-between border-b border-slate-200 px-4 py-2 font-mono text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span>BRANCH-R1</span>
            <span>console</span>
          </div>
          <pre className="overflow-x-auto px-4 pb-1.5 pt-3.5 font-mono text-[13px]">BRANCH-R1# show ip interface brief</pre>
          <div className="overflow-x-auto px-4 pb-3">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="py-1.5 pr-3 font-medium">Interface</th>
                  <th className="py-1.5 pr-3 font-medium">IP-Address</th>
                  <th className="py-1.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([name, ip, status]) => (
                  <tr key={name}>
                    <td className="whitespace-nowrap py-1.5 pr-3">{name}</td>
                    <td className="whitespace-nowrap py-1.5 pr-3">{ip}</td>
                    <td
                      className={`py-1.5 ${
                        status === "up"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-rose-700 dark:text-rose-400"
                      }`}
                    >
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 pb-3.5 text-sm text-slate-500 dark:text-slate-400">{t("term_cap")}</p>
        </div>
      </div>
    </div>
  );
}
