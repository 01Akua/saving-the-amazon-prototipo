"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";

const copy = {
  es: {
    kicker: "Amazonía · Colombia, Brasil y Perú",
    intro: "Cada árbol es una promesa.",
    hint: "Desliza para entrar en la selva",
    eyebrow: "Fundación Saving The Amazon",
    title: "Siembra la tuya hoy.",
    subtitle:
      "Sembramos, monitoreamos y protegemos árboles nativos en la Amazonía junto a comunidades indígenas de Colombia, Brasil y Perú.",
    cta: "Siembra un árbol",
    secondary: "Conoce nuestro impacto",
  },
  en: {
    kicker: "Amazon · Colombia, Brazil and Peru",
    intro: "Every tree is a promise.",
    hint: "Scroll to enter the rainforest",
    eyebrow: "Saving The Amazon Foundation",
    title: "Plant yours today.",
    subtitle:
      "We plant, monitor and protect native trees in the Amazon alongside indigenous communities in Colombia, Brazil and Peru.",
    cta: "Plant a tree",
    secondary: "See our impact",
  },
};

// Maps x from [inMin, inMax] to [outMin, outMax], clamped.
function mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax === inMin) return outMax;
  const t = Math.min(1, Math.max(0, (x - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

export function ScrollExpandHero() {
  const { lang } = useLang();
  const c = copy[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const pinDistance = rect.height - viewportH;
      if (pinDistance <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / pinDistance)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const width = mapRange(progress, 0, 0.55, 82, 100);
  const height = mapRange(progress, 0, 0.55, 56, 100);
  const radius = mapRange(progress, 0, 0.55, 28, 0);
  const darken = mapRange(progress, 0, 0.55, 0.3, 0.72);

  const introOpacity = mapRange(progress, 0.18, 0.32, 1, 0);
  const introY = mapRange(progress, 0, 0.32, 0, -24);
  const hintOpacity = mapRange(progress, 0, 0.08, 1, 0);

  const finalOpacity = mapRange(progress, 0.5, 0.78, 0, 1);
  const finalY = mapRange(progress, 0.5, 0.78, 28, 0);

  return (
    <section ref={containerRef} className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-forest-dark">
        <div
          style={{
            width: `${width}%`,
            height: `${height}vh`,
            borderRadius: `${radius}px`,
          }}
          className="relative overflow-hidden shadow-2xl shadow-black/40"
        >
          <Image
            src={asset("/images/rio-comunidad.jpg")}
            alt=""
            fill
            preload={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest-dark" style={{ opacity: darken }} />

          <div
            style={{ opacity: introOpacity, transform: `translateY(${introY}px)` }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <p className="text-gold-light font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
              {c.kicker}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-2xl leading-[1.1] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
              {c.intro}
            </h1>
            <div
              style={{ opacity: hintOpacity }}
              className="absolute bottom-8 flex flex-col items-center gap-1 text-cream/70 text-xs font-semibold uppercase tracking-widest"
            >
              <span>{c.hint}</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </div>
          </div>

          <div
            style={{ opacity: finalOpacity, transform: `translateY(${finalY}px)` }}
            className="absolute inset-0 flex flex-col justify-end"
          >
            <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 pb-16 sm:pb-24">
              <p className="text-gold-light font-bold text-sm uppercase tracking-[0.2em] mb-5">
                {c.eyebrow}
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white max-w-2xl leading-[1.08]">
                {c.title}
              </h2>
              <p className="text-cream/85 text-lg mt-6 max-w-lg leading-relaxed">{c.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
