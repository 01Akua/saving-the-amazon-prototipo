"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";

const copy = {
  es: {
    tagline: "Sembramos, monitoreamos y protegemos árboles en la Amazonía junto a comunidades locales.",
    cols: [
      {
        title: "Fundación",
        links: [
          { label: "Nosotros", href: "/#nosotros" },
          { label: "Nuestro impacto", href: "/#impacto" },
          { label: "Proyectos", href: "/#proyectos" },
        ],
      },
      {
        title: "Dona",
        links: [
          { label: "Siembra un árbol", href: "/campanas/siembra-un-arbol" },
          { label: "Dona ahora", href: "/donar" },
        ],
      },
    ],
    contact: "Contacto",
    email: "hola@savingtheamazon.org",
    rights: "Saving The Amazon. Todos los derechos reservados.",
    legal: "Fundación sin ánimo de lucro · Colombia, Brasil y Perú",
  },
  en: {
    tagline: "We plant, monitor and protect trees in the Amazon alongside local communities.",
    cols: [
      {
        title: "Foundation",
        links: [
          { label: "About us", href: "/#nosotros" },
          { label: "Our impact", href: "/#impacto" },
          { label: "Projects", href: "/#proyectos" },
        ],
      },
      {
        title: "Donate",
        links: [
          { label: "Plant a tree", href: "/campanas/siembra-un-arbol" },
          { label: "Donate now", href: "/donar" },
        ],
      },
    ],
    contact: "Contact",
    email: "hola@savingtheamazon.org",
    rights: "Saving The Amazon. All rights reserved.",
    legal: "Non-profit foundation · Colombia, Brazil and Peru",
  },
};

export function Footer() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <footer className="bg-forest-dark text-cream/80 mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Image
            src={asset("/images/logo-light.png")}
            alt="Saving The Amazon"
            width={140}
            height={57}
            className="h-10 w-auto mb-4"
          />
          <p className="text-sm max-w-sm leading-relaxed">{c.tagline}</p>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-xs font-bold"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-xs font-bold"
              aria-label="Facebook"
            >
              FB
            </a>
            <a
              href={`mailto:${c.email}`}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {c.cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-gold-light font-bold text-sm uppercase tracking-wide mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-gold-light font-bold text-sm uppercase tracking-wide mb-4">
            {c.contact}
          </h4>
          <p className="text-sm">{c.email}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-cream/50">
          <span>
            © {new Date().getFullYear()} {c.rights}
          </span>
          <span>{c.legal}</span>
        </div>
      </div>
    </footer>
  );
}
