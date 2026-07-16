"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TreePine, Globe2, Leaf, Users, MapPinned } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { CountUp } from "@/components/CountUp";
import { TextReveal } from "@/components/TextReveal";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";

const copy = {
  es: {
    eyebrow: "En números",
    title: "El impacto que ya sembramos",
    stats: [
      { icon: TreePine, value: "+713.159", label: "Árboles y mangles sembrados", big: true },
      { icon: Globe2, value: "3 países", label: "Colombia, Brasil y Perú" },
      { icon: Leaf, value: "+770.211", label: "Ton. de CO2 capturado" },
      { icon: Users, value: "895", label: "Familias beneficiadas" },
      { icon: MapPinned, value: "54", label: "Comunidades beneficiadas" },
    ],
  },
  en: {
    eyebrow: "By the numbers",
    title: "The impact we've already planted",
    stats: [
      { icon: TreePine, value: "+713,159", label: "Trees and mangroves planted", big: true },
      { icon: Globe2, value: "3 countries", label: "Colombia, Brazil and Peru" },
      { icon: Leaf, value: "+770,211", label: "Tons of CO2 captured" },
      { icon: Users, value: "895", label: "Families benefited" },
      { icon: MapPinned, value: "54", label: "Communities benefited" },
    ],
  },
};

export function ImpactStats() {
  const { lang } = useLang();
  const c = copy[lang];
  const [big, ...rest] = c.stats;

  return (
    <section id="impacto" className="bg-forest text-white py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-12">
          <Reveal>
            <p className="text-gold-light font-bold text-sm uppercase tracking-[0.2em] mb-4">{c.eyebrow}</p>
          </Reveal>
          <TextReveal as="h2" text={c.title} className="text-2xl sm:text-3xl font-extrabold" />
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div
            variants={staggerItem}
            className="relative col-span-2 row-span-2 rounded-3xl overflow-hidden p-8 flex flex-col justify-between border border-white/10"
          >
            <Image
              src={asset("/images/comunidad-tejedora.jpg")}
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/70 to-forest-dark/20" />
            <big.icon size={28} className="relative text-gold-light" />
            <div className="relative">
              <p className="text-4xl sm:text-5xl font-extrabold text-gold-light">
                <CountUp value={big.value} />
              </p>
              <p className="text-sm text-cream/80 mt-2">{big.label}</p>
            </div>
          </motion.div>

          {rest.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors p-5 flex flex-col justify-between border border-white/10"
            >
              <s.icon size={20} className="text-gold-light/80" />
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gold-light">
                  <CountUp value={s.value} />
                </p>
                <p className="text-xs text-cream/60 mt-1 leading-snug">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
