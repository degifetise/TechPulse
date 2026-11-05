// Edit prices here. All figures are in Ethiopian birr (ETB) and are starting estimates only.
export const SERVICES = {
  it: { min: 200, max: 500, form: "ticket" },
  mobile: { min: 100, max: 999, form: "repair" },
  web: { min: 4000, max: 40000, form: "web" },
  cisco: { min: 3000, max: 15000, form: "network" },
  train: { min: 1800, max: 3500, form: "training" },
};

// Multipliers for the size of the job
export const SCOPE = { s: 1, m: 1.8, l: 3 };

// Flat add-on prices
export const ADDONS = { onsite: 400, backup: 300, support: 1500, warranty: 500 };

export const EXPRESS = 1.3;
export const ROUND_TO = 50;

export function estimate({ svc, scope, express, addons }) {
  const base = SERVICES[svc];
  const extra = Object.keys(addons).reduce((sum, k) => sum + (addons[k] ? ADDONS[k] : 0), 0);
  const urgency = express ? EXPRESS : 1;
  const round = (x) => Math.round(x / ROUND_TO) * ROUND_TO;
  return {
    min: round((base.min * SCOPE[scope] + extra) * urgency),
    max: round((base.max * SCOPE[scope] + extra) * urgency),
    extra,
    urgency,
  };
}
