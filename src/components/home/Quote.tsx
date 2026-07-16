"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { TextReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";

const copy = {
  es: {
    quote:
      "Cada árbol que se siembra en la Amazonía lleva el nombre de quien lo dona y las manos de una familia indígena que lo cuida.",
    attribution: "Comunidad Wanano, Vaupés",
  },
  en: {
    quote:
      "Every tree planted in the Amazon carries the name of the donor and the hands of an indigenous family caring for it.",
    attribution: "Wanano community, Vaupés",
  },
};

export function Quote() {
  const { lang } = useLang();
  const c = copy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
        <Image src={asset("/images/comunidad-tayazu.png")} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-forest-dark/85" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <Reveal>
          <span className="text-6xl text-gold-light/40 font-serif leading-none">&ldquo;</span>
        </Reveal>
        <TextReveal
          as="p"
          text={c.quote}
          className="text-2xl sm:text-3xl font-medium text-white leading-snug -mt-4"
        />
        <Reveal delay={0.3}>
          <p className="text-gold-light font-bold text-sm uppercase tracking-widest mt-8">{c.attribution}</p>
        </Reveal>
      </div>
    </section>
  );
}
