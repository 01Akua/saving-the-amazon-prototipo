"use client";

import { useLang } from "@/lib/i18n";

const stats = {
  es: [
    { value: "+713.159", label: "Árboles sembrados" },
    { value: "+10.000", label: "Mangles sembrados" },
    { value: "3 países", label: "Colombia, Brasil y Perú" },
    { value: "+770.211", label: "Ton. de CO2 capturado" },
    { value: "895", label: "Familias beneficiadas" },
    { value: "54", label: "Comunidades beneficiadas" },
  ],
  en: [
    { value: "+713,159", label: "Trees planted" },
    { value: "+10,000", label: "Mangroves planted" },
    { value: "3 countries", label: "Colombia, Brazil and Peru" },
    { value: "+770,211", label: "Tons of CO2 captured" },
    { value: "895", label: "Families benefited" },
    { value: "54", label: "Communities benefited" },
  ],
};

const title = { es: "Nuestras cifras", en: "Our numbers" };

export function ImpactStats() {
  const { lang } = useLang();

  return (
    <section id="impacto" className="bg-forest text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">{title[lang]}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 text-center">
          {stats[lang].map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-extrabold text-gold-light">{s.value}</p>
              <p className="text-sm text-cream/70 mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
