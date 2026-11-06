// EDIT THIS FILE: your real contact details live here and nowhere else.
// The services section shows them, with call, email and copy buttons.
export const CONTACT = {
  phone: "+251 924 275 434", // as you want it displayed
  email: "EagleTech@tech.com",

  // Optional. Leave as "" to hide the button.
  telegram: "ima112", // username without the @, for example "techpulse_support"
  whatsapp: "+251924275434", // full number with country code and no + or spaces, for example "251900000000"

  // Opening hours in Ethiopian local time (UTC+3), written on the standard 24 hour clock.
  // The "Open now" badge updates itself from these values.
  openDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  opens: "1:40",
  closes: "12:30",
};

// Turns "+251 900 000 000" into a link a phone can dial
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
