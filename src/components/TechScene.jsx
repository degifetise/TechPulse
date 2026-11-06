import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Check,
  Cloud,
  Laptop,
  Monitor,
  Network,
  Router,
  Smartphone,
  Wrench,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// The scene is drawn on a 480 x 400 grid. Lines and packets are SVG, devices are HTML buttons
// placed at the same percentages, so everything stays aligned at any width.
const W = 480;
const H = 400;
const CENTER = { x: 240, y: 200 };

// Devices that "break" and get fixed. cmd and done are what the mini terminal prints.
const DEVICES = [
  {
    id: "laptop",
    Icon: Laptop,
    x: 78,
    y: 118,
    label: "scene_laptop",
    cmd: "sfc /scannow",
    done: "system files repaired",
    dur: 2.6,
  },
  {
    id: "phone",
    Icon: Smartphone,
    x: 402,
    y: 118,
    label: "scene_phone",
    cmd: "adb reboot recovery",
    done: "bootloop cleared",
    dur: 3.1,
  },
  {
    id: "pc",
    Icon: Monitor,
    x: 78,
    y: 292,
    label: "scene_pc",
    cmd: "ipconfig /flushdns",
    done: "DNS cache flushed, back online",
    dur: 2.9,
  },
  {
    id: "switch",
    Icon: Network,
    x: 402,
    y: 292,
    label: "scene_switch",
    cmd: "no shutdown",
    done: "Gi0/2 changed state to up",
    dur: 2.4,
  },
];
const CLOUD = {
  id: "cloud",
  Icon: Cloud,
  x: 240,
  y: 52,
  label: "scene_cloud",
  dur: 2.2,
};
const FIX_ORDER = DEVICES.map((d) => d.id);

const pos = (x, y) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });
const linkPath = (id) => `tp-link-${id}`;


function Packet({ id, dur, begin, reverse }) {
  const motion = reverse ? { keyPoints: "1;0", keyTimes: "0;1" } : {};
  return (
    <circle r="3.5" className="fill-cyan-600 dark:fill-cyan-400">
      <animateMotion
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        calcMode="linear"
        {...motion}
      >
        <mpath href={`#${linkPath(id)}`} />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.12;0.88;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function Node({ x, y, Icon, label, big, state, onClick }) {
  const border =
    state === "issue"
      ? "border-rose-500"
      : state === "fixed"
        ? "border-emerald-500"
        : "border-slate-300 dark:border-slate-700";
  const tone =
    state === "issue"
      ? "text-rose-600 dark:text-rose-400"
      : state === "fixed"
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-cyan-700 dark:text-cyan-400";
  const size = big
    ? "h-16 w-16 sm:h-[72px] sm:w-[72px]"
    : "h-12 w-12 sm:h-14 sm:w-14";

  const tile = (
    <span
      className={`relative grid place-items-center rounded-2xl border bg-white shadow-sm transition-colors dark:bg-slate-900 ${size} ${border}`}
    >
      {state === "issue" && (
        <span
          className="absolute inset-0 animate-ping rounded-2xl border border-rose-500/60"
          aria-hidden="true"
        />
      )}
      <Icon
        className={`${big ? "h-8 w-8" : "h-6 w-6"} ${tone}`}
        aria-hidden="true"
      />
      {state && (
        <span
          className={`absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full text-white ${
            state === "issue" ? "bg-rose-600" : "bg-emerald-600"
          }`}
          aria-hidden="true"
        >
          {state === "issue" ? (
            <Wrench className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </span>
      )}
      <span
        className={`absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium sm:text-xs ${
          state === "issue"
            ? "text-rose-700 dark:text-rose-400"
            : state === "fixed"
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-slate-600 dark:text-slate-400"
        }`}
      >
        {label}
      </span>
    </span>
  );

  const place = "absolute -translate-x-1/2 -translate-y-1/2";
  if (!onClick) {
    return (
      <div className={place} style={pos(x, y)}>
        {tile}
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${place} rounded-2xl transition-transform hover:scale-105 focus-visible:scale-105`}
      style={pos(x, y)}
    >
      {tile}
    </button>
  );
}

export default function TechScene() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [status, setStatus] = useState(null); // { id, state: "issue" | "fixed" } | null
  const timers = useRef([]);
  const next = useRef(0);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  // Plays one fix: problem appears, gets fixed, clears, then the next device takes its turn.
  // A click interrupts the chain and continues from the clicked device.
  const play = useCallback((id) => {
    clear();
    setStatus({ id, state: "issue" });
    later(() => setStatus({ id, state: "fixed" }), 2000);
    later(() => setStatus(null), 3600);
    later(() => {
      const nextId = FIX_ORDER[next.current % FIX_ORDER.length];
      next.current += 1;
      play(nextId);
    }, 5200);
  }, []);

  useEffect(() => {
    if (reduce) return undefined;
    later(() => {
      next.current = 1;
      play(FIX_ORDER[0]);
    }, 1200);
    return clear;
  }, [reduce, play]);

  const stateOf = (id) => (status && status.id === id ? status.state : null);
  const active = DEVICES.find((d) => status && d.id === status.id);

  let line = "all systems up";
  if (active && status.state === "issue") line = `${active.cmd} …`;
  if (active && status.state === "fixed") line = `${active.done} ✓`;

  const linkClass = (id) => {
    const s = stateOf(id);
    if (s === "issue") return "stroke-rose-500";
    if (s === "fixed") return "stroke-emerald-500";
    return "stroke-slate-300 dark:stroke-slate-700";
  };

  const links = [...DEVICES, CLOUD];

  return (
    <div className="mx-auto w-full max-w-[520px] min-w-0">
      <div className="rounded-3xl border border-slate-200 bg-white/60 p-3 shadow-xl shadow-indigo-500/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50 sm:p-4">
        <div className="relative aspect-[6/5]">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* links, drawn from the router out to each device */}
            {links.map((d) => (
              <path
                key={d.id}
                id={linkPath(d.id)}
                d={`M${CENTER.x},${CENTER.y} L${d.x},${d.y}`}
                fill="none"
                strokeWidth="1.5"
                strokeDasharray={stateOf(d.id) === "issue" ? "5 5" : undefined}
                className={`transition-colors ${linkClass(d.id)}`}
              />
            ))}

            {!reduce && (
              <>
                {/* signal waves and a slow orbit ring around the router */}
                {["0s", "-1.8s"].map((begin) => (
                  <circle
                    key={begin}
                    cx={CENTER.x}
                    cy={CENTER.y}
                    r="36"
                    fill="none"
                    strokeWidth="1.5"
                    className="stroke-indigo-500"
                  >
                    <animate
                      attributeName="r"
                      values="36;110"
                      dur="3.6s"
                      begin={begin}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0"
                      dur="3.6s"
                      begin={begin}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
                <circle
                  cx={CENTER.x}
                  cy={CENTER.y}
                  r="56"
                  fill="none"
                  strokeWidth="1.5"
                  strokeDasharray="2 7"
                  className="stroke-indigo-500/60"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${CENTER.x} ${CENTER.y}`}
                    to={`360 ${CENTER.x} ${CENTER.y}`}
                    dur="30s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* data packets, one in each direction on every healthy link */}
                {links
                  .filter((d) => stateOf(d.id) !== "issue")
                  .map((d) => (
                    <g key={d.id}>
                      <Packet id={d.id} dur={d.dur} begin={0} />
                      <Packet
                        id={d.id}
                        dur={d.dur}
                        begin={-d.dur / 2}
                        reverse
                      />
                    </g>
                  ))}
              </>
            )}
          </svg>

          <Node x={CLOUD.x} y={CLOUD.y} Icon={Cloud} label={t(CLOUD.label)} />
          <Node
            x={CENTER.x}
            y={CENTER.y}
            Icon={Router}
            label={t("scene_router")}
            big
          />
          {DEVICES.map((d) => (
            <Node
              key={d.id}
              x={d.x}
              y={d.y}
              Icon={d.Icon}
              label={stateOf(d.id) ? t(`scene_${stateOf(d.id)}`) : t(d.label)}
              state={stateOf(d.id)}
              onClick={() => play(d.id)}
            />
          ))}
        </div>

        {/* mini terminal: prints the command that fixes whichever device is active */}
        <div
          className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 font-mono text-xs dark:border-slate-800 dark:bg-slate-950"
          aria-hidden="true"
        >
          <span className="text-emerald-600 dark:text-emerald-400">$</span>
          <span className="truncate text-slate-700 dark:text-slate-300">
            {line}
          </span>
        </div>
        <p className="mt-2 px-1 text-xs text-slate-500 dark:text-slate-400">
          {t("scene_hint")}
        </p>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {active ? `${t(active.label)}: ${t(`scene_${status.state}`)}` : ""}
      </div>
    </div>
  );
}
