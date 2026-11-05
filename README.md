# TechPulse

IT support, mobile repair, web development, Cisco networking and tech training in one site.
English, Amharic (አማርኛ) and Sidaamu Afoo. Built with Vite, React, Tailwind CSS, framer-motion and EmailJS.

## Run it

```bash
npm install
cp .env.example .env     # then fill in your EmailJS values
npm run dev              # http://localhost:5173
npm run build            # production build in dist/
npm run preview          # test the production build locally
```

Node 18 or newer is required.

## What is inside

```
techpulse-platform/
├── public/
│   ├── _headers              # security headers for Netlify
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # sticky header, language switch, dark/light toggle
│   │   ├── Hero.jsx              # headline, CTAs, router console
│   │   ├── ServicesGrid.jsx      # bento grid of the five services
│   │   ├── DiagnosticWizard.jsx  # device > symptom > numbered fix > escalate
│   │   ├── CommandCenter.jsx     # searchable commands with one-click copy
│   │   ├── CostCalculator.jsx    # price range in ETB, sends the estimate to the form
│   │   ├── ContactForm.jsx       # tickets and training enrollment through EmailJS
│   │   ├── Footer.jsx
│   │   ├── LangSwitch.jsx, RichText.jsx, Section.jsx
│   ├── context/LanguageContext.jsx   # language state, t() and L() helpers
│   ├── data/
│   │   ├── translations.js       # EN / AMH / SID dictionary
│   │   ├── diagnostics.js        # troubleshooting content
│   │   ├── commands.js           # command library
│   │   └── pricing.js            # prices, scope multipliers, add-ons
│   ├── lib/security.js, lib/scroll.js
│   ├── App.jsx, main.jsx, index.css
├── .env.example
├── vercel.json                   # security headers for Vercel
├── vite.config.js                # also injects the production CSP
└── tailwind.config.js
```

## Set up EmailJS

1. Create an account at emailjs.com and add an email service (for example Gmail).
2. Create a template. Use these variables in the template:

   | Variable | Content |
   | --- | --- |
   | `{{ticket_id}}` | Reference such as TP-4821 |
   | `{{from_name}}` | Visitor's name |
   | `{{reply_to}}` | Visitor's email (set it as the template's Reply-To) |
   | `{{phone}}` | Phone number or `-` |
   | `{{request_type}}` | Support ticket, Repair, Web project, Network or Training enrollment |
   | `{{course}}`, `{{schedule}}` | Only filled for training enrollments |
   | `{{message}}` | The visitor's message |

   Suggested subject: `[{{ticket_id}}] {{request_type}} from {{from_name}}`

3. Put the Service ID, Template ID and Public Key in `.env`.

Until `.env` is filled in, the form shows a clear "email service is not set up" message instead of pretending to send.

## Security

What this project already does:

- No secrets in the code. EmailJS values come from `.env`, which is git-ignored. Only `.env.example` is committed.
- No developer hints in the page. The prototype showed EmailJS variable names at the bottom of the page. That is removed.
- Output is escaped by React. There is no `dangerouslySetInnerHTML`. Backticked commands in the diagnostics render through `RichText.jsx`, which builds React elements instead of HTML strings.
- Inputs are cleaned and capped: control characters removed, length limits, email and phone checks (`src/lib/security.js`).
- Spam guards: a hidden honeypot field and a 15 second throttle.
- Provider errors are never shown to visitors.
- Content Security Policy is added to the production build (`vite.config.js`). Only your own scripts run, and the page can talk to `api.emailjs.com` and nothing else.
- Security headers (no framing, no MIME sniffing, strict referrer, HSTS, locked-down browser features) ship in `public/_headers` for Netlify and `vercel.json` for Vercel.
- Source maps are off in production builds.

What you must do yourself:

1. **Understand what `VITE_` means.** Anything starting with `VITE_` is bundled into the public JavaScript. The EmailJS public key is designed for that. Never put an EmailJS private key or access token in this project.
2. **Lock down EmailJS.** In the EmailJS dashboard, restrict the allowed domains to your own site, turn on reCAPTCHA if offered, and set a sending limit. The in-page throttle can be bypassed by anyone, so these dashboard limits are the real protection.
3. **Rotate the key** if it is ever abused, and never commit `.env`.
4. **Keep dependencies current.** Run `npm audit` before each release and commit `package-lock.json`.
5. **Fonts load from Google Fonts.** For stricter privacy, self-host them (for example with `@fontsource`) and remove the two Google hosts from the CSP.
6. `style-src` keeps `'unsafe-inline'` because framer-motion writes inline styles. Scripts do not allow inline code.

## Before launch

- Replace the placeholder email and phone in `Footer.jsx`.
- Check the prices in `src/data/pricing.js`.
- Have a native speaker review the Amharic text, and write the Sidaamu Afoo strings. Only "thank you" is translated so far, and everything else falls back to English.
- Replace the placeholder address when you have a real domain, then update the allowed domains in EmailJS.

## Deploy

**Vercel or Netlify:** import the repository, set the build command to `npm run build` and the output folder to `dist`, and add the three `VITE_EMAILJS_*` variables in the project settings. Headers are picked up from `vercel.json` or `public/_headers`.

Any other static host works too, but you then need to set the headers from `public/_headers` yourself.

## Adding content

- New troubleshooting issue: add an object to `ISSUES` in `src/data/diagnostics.js` with `en` and `amh` text.
- New command: add an object to `CMDS` in `src/data/commands.js`.
- New price or add-on: edit `src/data/pricing.js`, and add matching `svc_*`, `scope_*` or `add_*` keys to `translations.js`.
