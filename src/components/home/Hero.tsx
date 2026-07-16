"use client";

import Image from "next/image";
import Link from "next/link";
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

export function Hero() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={asset("/images/hero-banner.jpg")}
          alt=""
          fill
          preload={true}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/70 to-forest-dark/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-28 sm:py-36">
        <p className="text-gold-light font-bold text-sm uppercase tracking-[0.2em] mb-5">
          {c.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-2xl leading-[1.08]">
          {c.title}
        </h1>
        <p className="text-cream/85 text-lg mt-6 max-w-lg leading-relaxed">{c.subtitle}</p>

        <div className="flex flex-wrap items-center gap-4 mt-10">
          <Link
            href="/campanas/siembra-un-arbol"
            className="group bg-gold hover:bg-gold-light text-forest-dark font-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors shadow-lg shadow-black/10"
          >
            {c.cta}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#impacto"
            className="text-white font-semibold px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
          >
            {c.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
