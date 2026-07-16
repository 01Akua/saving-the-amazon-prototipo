"use client";

import { motion } from "framer-motion";
import { Sprout, MapPinned, Award } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";

const copy = {
  es: {
    title: "Así funciona tu siembra",
    subtitle: "Tres pasos, sin letra pequeña.",
    steps: [
      {
        icon: Sprout,
        title: "Eliges y donas",
        text: "Escoges un árbol nativo y confirmas tu donación en menos de dos minutos.",
      },
      {
        icon: MapPinned,
        title: "Una comunidad lo siembra",
        text: "Una comunidad indígena local siembra y cuida tu árbol durante 2 años.",
      },
      {
        icon: Award,
        title: "Recibes tu certificado",
        text: "Te enviamos el código único de tu árbol y su certificado de siembra.",
      },
    ],
  },
  en: {
    title: "How your tree gets planted",
    subtitle: "Three steps, no fine print.",
    steps: [
      {
        icon: Sprout,
        title: "You choose and donate",
        text: "Pick a native tree and confirm your donation in under two minutes.",
      },
      {
        icon: MapPinned,
        title: "A community plants it",
        text: "A local indigenous community plants and cares for your tree for 2 years.",
      },
      {
        icon: Award,
        title: "You get your certificate",
        text: "We send you your tree's unique code and its planting certificate.",
      },
    ],
  },
};

export function Process() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <Reveal className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest">{c.title}</h2>
        <p className="text-forest/60 mt-2">{c.subtitle}</p>
      </Reveal>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {c.steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative bg-cream rounded-2xl p-8 border border-forest/10"
          >
            <span className="absolute -top-4 -left-2 text-6xl font-extrabold text-forest/[0.06]">
              0{i + 1}
            </span>
            <div className="relative w-12 h-12 rounded-full bg-forest text-gold-light flex items-center justify-center mb-5">
              <step.icon size={22} />
            </div>
            <h3 className="relative font-bold text-lg text-forest mb-2">{step.title}</h3>
            <p className="relative text-sm text-forest/70 leading-relaxed">{step.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
