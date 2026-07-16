"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";

const copy = {
  es: {
    title: "Tu donación siembra futuro",
    text: "100% segura, deducible de impuestos y con un código único para seguir tu árbol.",
    cta: "Siembra un árbol ahora",
  },
  en: {
    title: "Your donation plants the future",
    text: "100% secure, tax-deductible, with a unique code to track your tree.",
    cta: "Plant a tree now",
  },
};

export function FinalCta() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="relative overflow-hidden mx-5 sm:mx-8 max-w-6xl lg:mx-auto rounded-3xl my-24">
      <div className="absolute inset-0">
        <Image src={asset("/images/aldea-amazonia.jpg")} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-forest-dark/80" />
      </div>
      <div className="relative px-8 py-20 text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-xl">{c.title}</h2>
        <p className="text-cream/80 mt-4 max-w-md">{c.text}</p>
        <Link
          href="/campanas/siembra-un-arbol"
          className="group mt-8 bg-gold hover:bg-gold-light text-forest-dark font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
        >
          {c.cta}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="flex items-center gap-2 text-cream/60 text-xs mt-6">
          <ShieldCheck size={14} />
          <span>SSL · PSE · Tarjetas</span>
        </div>
      </div>
    </section>
  );
}
