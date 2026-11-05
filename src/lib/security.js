// Input hygiene for the contact form. React already escapes anything it renders, and the app never
// uses dangerouslySetInnerHTML. These helpers keep what gets emailed tidy and bounded.

export const LIMITS = { name: 80, email: 120, phone: 24, message: 1500 };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+\d][\d\s()-]{5,22}$/;

// Removes control characters (keeps tab and newlines), trims, and enforces a maximum length.
export function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

// Ticket reference such as TP-4821, built from the browser's secure random source.
export function ticketId() {
  const n = (crypto.getRandomValues(new Uint32Array(1))[0] % 9000) + 1000;
  return `TP-${n}`;
}
