"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "es",
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const toggle = () => setLang((l) => (l === "es" ? "en" : "es"));
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function t<T extends Record<Lang, unknown>>(dict: T, lang: Lang): T[Lang] {
  return dict[lang];
}
