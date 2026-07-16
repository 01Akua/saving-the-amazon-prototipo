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
  const [scrolled, setScrolled] = useState(false);
  const c = copy[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: scrolled ? "0 8px 24px -12px rgba(18,35,24,0.18)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-cream-soft/95 backdrop-blur border-b border-forest/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-18 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={asset("/images/logo.png")}
            alt="Saving The Amazon"
            width={140}
            height={57}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {c.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold text-forest/80 hover:text-forest transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <Link href="/donar">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block bg-gold hover:bg-gold-light text-forest-dark font-bold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              {c.cta}
            </motion.span>
          </Link>
        </div>

        <button
          className="md:hidden text-forest"
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
              {open ? <X size={26} /> : <Menu size={26} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-forest/10 bg-cream-soft"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
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
                  className="bg-gold text-forest-dark font-bold text-sm px-5 py-2.5 rounded-full text-center flex-1"
                >
                  {c.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
