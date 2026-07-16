"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { LangToggle } from "./LangToggle";

const copy = {
  es: {
    links: [
      { href: "/#nosotros", label: "Nosotros" },
      { href: "/#proyectos", label: "Proyectos" },
      { href: "/#impacto", label: "Impacto" },
    ],
    cta: "Dona ahora",
  },
  en: {
    links: [
      { href: "/#nosotros", label: "About us" },
      { href: "/#proyectos", label: "Projects" },
      { href: "/#impacto", label: "Impact" },
    ],
    cta: "Donate now",
  },
};

export function Header() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const c = copy[lang];

  useEffect(() => {
    const onScroll = () => setLight(window.scrollY > window.innerHeight * 1.05);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`w-full max-w-4xl rounded-full pl-5 pr-2.5 py-2.5 flex items-center justify-between gap-3 border transition-colors duration-300 ${
          light
            ? "bg-cream-soft/90 backdrop-blur-md border-forest/10 shadow-[0_8px_28px_-14px_rgba(9,29,26,0.35)]"
            : "bg-forest-dark/35 backdrop-blur-md border-white/15"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={asset(light ? "/images/logo.png" : "/images/logo-light.png")}
            alt="Saving The Amazon"
            width={120}
            height={49}
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {c.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-semibold transition-colors group ${
                light ? "text-forest/80 hover:text-forest" : "text-cream/85 hover:text-white"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gold-light transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <LangToggle dark={!light} />
          <Link href="/donar">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block bg-gold hover:bg-gold-light text-cream-soft font-bold text-sm px-5 py-2 rounded-full transition-colors"
            >
              {c.cta}
            </motion.span>
          </Link>
        </div>

        <button
          className={light ? "text-forest md:hidden" : "text-white md:hidden"}
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-[calc(100%+8px)] left-4 right-4 rounded-3xl bg-cream-soft border border-forest/10 shadow-xl p-5 flex flex-col gap-4"
          >
            {c.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-forest"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <LangToggle />
              <Link
                href="/donar"
                className="bg-gold text-cream-soft font-bold text-sm px-5 py-2.5 rounded-full text-center flex-1"
              >
                {c.cta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
