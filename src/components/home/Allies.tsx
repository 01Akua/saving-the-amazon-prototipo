"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

const copy = {
  es: {
    title: "Empresas que ya están sembrando",
    names: ["Banco de Bogotá", "Puntos Verdes", "NTN24", "Bosques Con Propósito", "Convenios y Alianzas"],
  },
  en: {
    title: "Companies already planting with us",
    names: ["Banco de Bogotá", "Puntos Verdes", "NTN24", "Bosques Con Propósito", "Convenios y Alianzas"],
  },
};

export function Allies() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="border-y border-forest/10 bg-cream/40">
      <div className="py-14">
        <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-forest/50 mb-8">
            {c.title}
          </p>
        </Reveal>
        <Marquee
          items={c.names.map((name) => (
            <span key={name} className="text-xl font-extrabold text-forest/30 whitespace-nowrap">
              {name}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
