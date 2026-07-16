"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";

const copy = {
  es: {
    eyebrow: "Fundación Saving The Amazon",
    title: "Cada árbol es una promesa. Siembra la tuya hoy.",
    subtitle:
      "Sembramos, monitoreamos y protegemos árboles nativos en la Amazonía junto a comunidades indígenas de Colombia, Brasil y Perú.",
    cta: "Siembra un árbol",
    secondary: "Conoce nuestro impacto",
  },
  en: {
    eyebrow: "Saving The Amazon Foundation",
    title: "Every tree is a promise. Plant yours today.",
    subtitle:
      "We plant, monitor and protect native trees in the Amazon alongside indigenous communities in Colombia, Brazil and Peru.",
    cta: "Plant a tree",
    secondary: "See our impact",
  },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={asset("/images/rio-comunidad.jpg")}
          alt=""
          fill
          preload={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/75 to-forest-dark/30" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-6xl px-5 sm:px-8 py-28 sm:py-36"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.p
          variants={item}
          className="text-gold-light font-bold text-sm uppercase tracking-[0.2em] mb-5"
        >
          {c.eyebrow}
        </motion.p>
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-2xl leading-[1.08]"
        >
          {c.title}
        </motion.h1>
        <motion.p variants={item} className="text-cream/85 text-lg mt-6 max-w-lg leading-relaxed">
          {c.subtitle}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center gap-4 mt-10">
          <Link href="/campanas/siembra-un-arbol">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors shadow-lg shadow-black/10"
            >
              {c.cta}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.span>
          </Link>
          <a
            href="#impacto"
            className="text-white font-semibold px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
          >
            {c.secondary}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
