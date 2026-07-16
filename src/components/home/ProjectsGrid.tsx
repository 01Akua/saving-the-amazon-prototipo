"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";
import { TiltCard } from "@/components/TiltCard";

const copy = {
  es: {
    title: "Sé parte de nuestros proyectos",
    subtitle: "Cada campaña lleva directo a una sola acción: donar.",
    cards: [
      {
        image: "/images/campana-siembra.jpg",
        title: "Siembra un árbol",
        text: "Adopta un árbol nativo en la Amazonía y dale tu nombre.",
        href: "/campanas/siembra-un-arbol",
      },
      {
        image: "/images/campana-amazonia-proposito.jpg",
        title: "Amazonía con Propósito 2026",
        text: "Súmate a nuestra meta anual de reforestación.",
        href: "/donar?campana=amazonia-con-proposito",
      },
      {
        image: "/images/campana-apadrina.jpg",
        title: "Apadrina el Amazonas",
        text: "Haz una donación mensual y sigue el crecimiento de tu bosque.",
        href: "/donar?campana=apadrina-el-amazonas",
      },
    ],
    cta: "Donar",
  },
  en: {
    title: "Be part of our projects",
    subtitle: "Every campaign leads to a single action: donate.",
    cards: [
      {
        image: "/images/campana-siembra.jpg",
        title: "Plant a tree",
        text: "Adopt a native tree in the Amazon and give it your name.",
        href: "/campanas/siembra-un-arbol",
      },
      {
        image: "/images/campana-amazonia-proposito.jpg",
        title: "Amazon with Purpose 2026",
        text: "Join our annual reforestation goal.",
        href: "/donar?campana=amazonia-con-proposito",
      },
      {
        image: "/images/campana-apadrina.jpg",
        title: "Sponsor the Amazon",
        text: "Make a monthly donation and follow your forest as it grows.",
        href: "/donar?campana=apadrina-el-amazonas",
      },
    ],
    cta: "Donate",
  },
};

export function ProjectsGrid() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section id="proyectos" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center mb-14">
          <TextReveal
            as="h2"
            text={c.title}
            className="text-2xl sm:text-3xl font-extrabold text-forest"
          />
          <Reveal delay={0.2}>
            <p className="text-forest/60 mt-2">{c.subtitle}</p>
          </Reveal>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {c.cards.map((card) => (
            <motion.div key={card.title} variants={staggerItem}>
              <TiltCard className="relative rounded-2xl">
                <Link
                  href={card.href}
                  className="group block rounded-2xl overflow-hidden bg-white border border-forest/10 hover:shadow-2xl hover:shadow-forest/15 transition-shadow"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={asset(card.image)}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-forest text-lg mb-1.5">{card.title}</h3>
                    <p className="text-sm text-forest/60 leading-relaxed mb-4">{card.text}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gold group-hover:gap-2.5 transition-all">
                      {c.cta} <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
