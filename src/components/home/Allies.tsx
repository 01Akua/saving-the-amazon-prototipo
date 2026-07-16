"use client";

import { useLang } from "@/lib/i18n";

const copy = {
  es: {
    title: "Empresas que ya están sembrando",
    names: ["Banco de Bogotá", "Puntos Verdes", "NTN24"],
  },
  en: {
    title: "Companies already planting with us",
    names: ["Banco de Bogotá", "Puntos Verdes", "NTN24"],
  },
};

export function Allies() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="border-y border-forest/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-forest/50 mb-8">
          {c.title}
        </p>
        <div className="flex flex-wrap justify-center gap-x-14 gap-y-4">
          {c.names.map((name) => (
            <span key={name} className="text-xl font-extrabold text-forest/30">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
