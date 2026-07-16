"use client";

import { useLang } from "@/lib/i18n";

export function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className={`text-sm font-semibold tracking-wide px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
        dark
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-forest/20 text-forest hover:bg-forest/5"
      }`}
      aria-label="Cambiar idioma / Switch language"
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}
