import { motion, useReducedMotion } from "framer-motion";

// Every section heading fades up when it scrolls into view, with a small gradient bar that draws itself.
export default function Section({ id, title, subtitle, children }) {
  const reduce = useReducedMotion();
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-14">
      <motion.div
        className="mb-8 max-w-2xl"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <motion.span
          aria-hidden="true"
          className="mt-3 block h-1 w-14 origin-left rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        />
        {subtitle && (
          <p className="mt-3 text-slate-600 dark:text-slate-400">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
