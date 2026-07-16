"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, toggle } = useLang();
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full border transition-colors cursor-pointer overflow-hidden ${
        dark
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-forest/20 text-forest hover:bg-forest/5"
      }`}
      aria-label="Cambiar idioma / Switch language"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={lang}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-block"
        >
          {lang === "es" ? "EN" : "ES"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
