"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { LangToggle } from "./LangToggle";

const copy = {
  es: { back: "Volver al sitio" },
  en: { back: "Back to site" },
};

export function CampaignHeader() {
  const { lang } = useLang();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-cream-soft/95 backdrop-blur border-b border-forest/10"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={asset("/images/logo.png")} alt="Saving The Amazon" width={120} height={49} className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-forest/70 hover:text-forest"
          >
            <ArrowLeft size={15} />
            {copy[lang].back}
          </Link>
          <LangToggle />
        </div>
      </div>
    </motion.header>
  );
}
