"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const c = copy[lang];

  return (
    <header className="sticky top-0 z-50 bg-cream-soft/95 backdrop-blur border-b border-forest/10">
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
              className="text-sm font-semibold text-forest/80 hover:text-forest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <Link
            href="/donar"
            className="bg-gold hover:bg-gold-light text-forest-dark font-bold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            {c.cta}
          </Link>
        </div>

        <button
          className="md:hidden text-forest"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-forest/10 bg-cream-soft px-5 py-4 flex flex-col gap-4">
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
      )}
    </header>
  );
}
