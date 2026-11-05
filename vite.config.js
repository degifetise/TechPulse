import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Content Security Policy for the production build.
// It is injected only on `vite build`, because the dev server needs inline scripts for hot reload.
// style-src keeps 'unsafe-inline' because framer-motion writes inline style attributes.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://api.emailjs.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const injectCsp = () => ({
  name: "inject-csp",
  transformIndexHtml(html, ctx) {
    if (ctx && ctx.server) return html;
    return html.replace(
      "</head>",
      `    <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n  </head>`
    );
  },
});

export default defineConfig({
  plugins: [react(), injectCsp()],
  build: { sourcemap: false },
});
