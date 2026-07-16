"use client";

import Image from "next/image";
import { ShieldCheck, Languages, Zap } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";

const copy = {
  es: {
    eyebrow: "Nosotros",
    title: "Una fundación, no una tienda",
    text: "Saving The Amazon trabaja de la mano de comunidades indígenas en Colombia, Brasil y Perú para sembrar, monitorear y proteger bosque nativo. Esta nueva página deja atrás la plataforma de tienda online sobre la que operábamos, para ofrecer una experiencia de donación honesta, rápida y transparente.",
    points: [
      { icon: ShieldCheck, title: "Página propia y segura", text: "Sin depender de plataformas externas de comercio." },
      { icon: Zap, title: "Rápida en cualquier dispositivo", text: "Sin contenido duplicado ni videos que frenen la carga." },
      { icon: Languages, title: "Español e inglés reales", text: "Sin textos sin traducir en el momento de donar." },
    ],
  },
  en: {
    eyebrow: "About us",
    title: "A foundation, not a store",
    text: "Saving The Amazon works alongside indigenous communities in Colombia, Brazil and Peru to plant, monitor and protect native forest. This new site leaves behind the online store platform we used to run on, to offer an honest, fast and transparent donation experience.",
    points: [
      { icon: ShieldCheck, title: "Own, secure site", text: "No dependence on third-party commerce platforms." },
      { icon: Zap, title: "Fast on every device", text: "No duplicated content or heavy videos slowing it down." },
      { icon: Languages, title: "Real Spanish and English", text: "No untranslated text while you're donating." },
    ],
  },
};

export function About() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-5 sm:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
        <Image src={asset("/images/comunidad-tayazu.png")} alt="Comunidad Tayazú, Vaupés" fill className="object-cover" />
      </div>

      <div>
        <p className="text-gold font-bold text-sm uppercase tracking-[0.2em] mb-4">{c.eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-forest leading-tight mb-5">{c.title}</h2>
        <p className="text-forest/70 leading-relaxed mb-8">{c.text}</p>

        <div className="space-y-5">
          {c.points.map((p) => (
            <div key={p.title} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-forest/8 text-forest flex items-center justify-center">
                <p.icon size={18} />
              </div>
              <div>
                <h4 className="font-bold text-forest text-sm">{p.title}</h4>
                <p className="text-sm text-forest/60">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
