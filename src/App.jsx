import { useCallback, useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { scrollToId } from "./lib/scroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesGrid from "./components/ServicesGrid";
import DiagnosticWizard from "./components/DiagnosticWizard";
import CommandCenter from "./components/CommandCenter";
import CostCalculator from "./components/CostCalculator";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function initialTheme() {
  try {
    const stored = localStorage.getItem("tp-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore blocked storage */
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function Shell() {
  const { lang, t } = useLanguage();
  const [theme, setTheme] = useState(initialTheme);
  const [prefill, setPrefill] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("tp-theme", theme);
    } catch {
      /* ignore blocked storage */
    }
  }, [theme]);

  // Wizard and calculator both open the contact form with details already filled in
  const openContact = useCallback((type, message) => {
    setPrefill({ type, message, nonce: Date.now() });
    requestAnimationFrame(() => scrollToId("contact"));
  }, []);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={() => setTheme((x) => (x === "dark" ? "light" : "dark"))} />
      {lang === "sid" && (
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <p className="rounded-xl border border-dashed border-indigo-500 px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
            {t("sid_draft")}
          </p>
        </div>
      )}
      <main>
        <Hero />
        <ServicesGrid />
        <DiagnosticWizard onEscalate={openContact} />
        <CommandCenter />
        <CostCalculator onRequestQuote={openContact} />
        <ContactForm prefill={prefill} />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}
