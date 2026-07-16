"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { TextReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";

const VIDEO_SRC = "https://cdn.shopify.com/videos/c/o/v/35b9a73f0e4347ae95223c0435569e7c.mp4";

const copy = {
  es: {
    eyebrow: "Conócenos",
    title: "Así se ve sembrar en la Amazonía",
    subtitle: "El video institucional de la fundación, tal como lo cuentan las comunidades.",
    play: "Reproducir video",
  },
  en: {
    eyebrow: "Get to know us",
    title: "This is what planting in the Amazon looks like",
    subtitle: "The foundation's institutional video, told by the communities themselves.",
    play: "Play video",
  },
};

export function VideoSection() {
  const { lang } = useLang();
  const c = copy[lang];
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-forest-dark py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
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

        <Reveal delay={0.15} className="relative aspect-video rounded-2xl overflow-hidden bg-black">
          <AnimatePresence initial={false} mode="wait">
            {playing ? (
              <motion.video
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={VIDEO_SRC}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <motion.button
                key="poster"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPlaying(true)}
                aria-label={c.play}
                className="group absolute inset-0 w-full h-full"
              >
                <Image
                  src={asset("/images/aldea-amazonia.jpg")}
                  alt=""
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-forest-dark/40 group-hover:bg-forest-dark/25 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-gold text-cream-soft flex items-center justify-center shadow-xl"
                  >
                    <Play size={28} className="ml-1" fill="currentColor" />
                  </motion.span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
