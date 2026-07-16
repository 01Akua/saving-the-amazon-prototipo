"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { CountUp } from "@/components/CountUp";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";

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
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">{title[lang]}</h2>
        </Reveal>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {stats[lang].map((s) => (
            <motion.div key={s.label} variants={staggerItem}>
              <p className="text-3xl sm:text-4xl font-extrabold text-gold-light">
                <CountUp value={s.value} />
              </p>
              <p className="text-sm text-cream/70 mt-1.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
