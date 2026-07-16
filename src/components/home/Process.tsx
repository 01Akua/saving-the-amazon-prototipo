"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sprout, MapPinned, Award } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { Reveal } from "@/components/Reveal";
import { TextReveal } from "@/components/TextReveal";

const copy = {
  es: {
    title: "Así funciona tu siembra",
    subtitle: "Tres pasos, sin letra pequeña.",
    stepLabel: "Paso",
    caption: "Cada árbol lo siembra y lo cuida una familia indígena de la Amazonía.",
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
    stepLabel: "Step",
    caption: "Every tree is planted and cared for by an indigenous family in the Amazon.",
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-24">
      <div className="text-center mb-16">
        <TextReveal as="h2" text={c.title} className="text-2xl sm:text-3xl font-extrabold text-forest" />
        <Reveal delay={0.2}>
          <p className="text-forest/60 mt-2">{c.subtitle}</p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-14 items-start">
        <div className="hidden lg:block sticky top-28">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image src={asset("/images/manos-siembra.jpg")} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-cream/90 text-sm font-medium leading-relaxed">
                {c.caption}
              </p>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative pl-16 sm:pl-20">
          <div className="absolute left-6 sm:left-8 top-2 bottom-2 w-px bg-forest/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 sm:left-8 top-2 w-px bg-gold origin-top"
          />

          <div className="space-y-14">
            {c.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="relative">
                <div className="absolute -left-16 sm:-left-20 top-0 w-12 h-12 rounded-full bg-forest text-gold-light flex items-center justify-center border-4 border-cream-soft shadow-sm">
                  <step.icon size={20} />
                </div>
                <span className="text-xs font-bold text-gold uppercase tracking-widest">
                  {c.stepLabel} 0{i + 1}
                </span>
                <h3 className="font-bold text-xl text-forest mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-forest/70 leading-relaxed max-w-md">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
