import { CONTACT } from "../data/contact";

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// true or false for "open right now" in Ethiopian time, or null if the browser cannot work it out
export function isOpenNow(now = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Addis_Ababa",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
    return (
      CONTACT.openDays.includes(get("weekday")) &&
      minutes >= toMinutes(CONTACT.opens) &&
      minutes < toMinutes(CONTACT.closes)
    );
  } catch {
    return null;
  }
}
