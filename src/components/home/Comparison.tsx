"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { TextReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";

const copy = {
  es: {
    eyebrow: "El cambio",
    title: "De sentirse tienda a sentirse fundación",
    subtitle: "Lo que resuelve esta página nueva, punto por punto.",
    beforeLabel: "Hoy (Shopify)",
    afterLabel: "Página propia",
    rows: [
      { before: "Se siente como comprar en una tienda", after: "Diseñada para donar, no para comprar" },
      { before: "Textos sin traducir en el checkout", after: "Español e inglés reales, sin errores" },
      { before: "Menú con 30+ enlaces y 9 sitios distintos", after: "Menú de 3 opciones, todo en una página" },
      { before: "Contenido duplicado, videos pesados", after: "Página liviana y rápida en cualquier equipo" },
      { before: "Depende de una plataforma de tienda externa", after: "100% propia, sin comisiones ni límites" },
    ],
  },
  en: {
    eyebrow: "The change",
    title: "From feeling like a store to feeling like a foundation",
    subtitle: "What this new site fixes, point by point.",
    beforeLabel: "Today (Shopify)",
    afterLabel: "Own site",
    rows: [
      { before: "Feels like shopping in a store", after: "Designed to donate, not to shop" },
      { before: "Untranslated text at checkout", after: "Real Spanish and English, no errors" },
      { before: "Menu with 30+ links across 9 sites", after: "3-option menu, everything on one page" },
      { before: "Duplicated content, heavy videos", after: "Light, fast on any device" },
      { before: "Depends on an external store platform", after: "100% own site, no fees or limits" },
    ],
  },
};

export function Comparison() {
  const { lang } = useLang();
  const c = copy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative bg-forest-dark py-24 overflow-hidden">
      <Image
        src={asset("/images/aldea-amazonia.jpg")}
        alt=""
        fill
        className="object-cover opacity-[0.08]"
      />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center mb-14">
          <Reveal>
            <p className="text-gold-light font-bold text-sm uppercase tracking-[0.2em] mb-4">{c.eyebrow}</p>
          </Reveal>
          <TextReveal
            as="h2"
            text={c.title}
            className="text-3xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight"
          />
          <Reveal delay={0.2}>
            <p className="text-cream/60 mt-4">{c.subtitle}</p>
          </Reveal>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          <div className="bg-forest-dark px-5 sm:px-8 py-5 text-cream/50 font-bold text-xs sm:text-sm uppercase tracking-wide">
            {c.beforeLabel}
          </div>
          <div className="bg-forest-dark px-5 sm:px-8 py-5 text-gold-light font-bold text-xs sm:text-sm uppercase tracking-wide">
            {c.afterLabel}
          </div>

          {c.rows.map((row, i) => (
            <motion.div
              key={row.before}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="contents"
            >
              <div className="bg-forest-dark/60 px-5 sm:px-8 py-5 flex items-start gap-3">
                <X size={16} className="text-cream/30 mt-0.5 shrink-0" />
                <span className="text-sm text-cream/50 line-through decoration-cream/20">{row.before}</span>
              </div>
              <div className="bg-forest-dark px-5 sm:px-8 py-5 flex items-start gap-3">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.35 + i * 0.1 }}
                  className="shrink-0 mt-0.5"
                >
                  <Check size={16} className="text-gold-light" />
                </motion.span>
                <span className="text-sm text-white font-medium">{row.after}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
