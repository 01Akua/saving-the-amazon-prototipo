"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lock, CreditCard, Landmark } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { CampaignHeader } from "@/components/CampaignHeader";
import { Footer } from "@/components/Footer";
import { staggerContainer, staggerItem } from "@/components/Reveal";

const amounts = [65000, 130000, 195000];

const motives: Record<Lang, string[]> = {
  es: [
    "Árbol para mí",
    "Árbol de obsequio",
    "Árbol de agradecimiento",
    "Árbol de condolencias",
    "Árbol de cumpleaños",
  ],
  en: [
    "A tree for me",
    "A gift tree",
    "A tree of gratitude",
    "A tree in memoriam",
    "A birthday tree",
  ],
};

const copy = {
  es: {
    title: "Dona y siembra tu árbol",
    subtitle: "Un proceso pensado para donar, no para comprar.",
    step1: "1. Elige el monto",
    once: "Única vez",
    monthly: "Mensual",
    custom: "Otro monto",
    step2: "2. Dedica tu árbol",
    motiveLabel: "Escoge el motivo",
    nameLabel: "Nombre para tu árbol (opcional)",
    namePlaceholder: "Ej. Para mi abuela",
    step3: "3. Tus datos",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    country: "País",
    payment: "Método de pago",
    pse: "PSE",
    card: "Tarjeta",
    secure: "Donación 100% segura y deducible de impuestos",
    summary: "Resumen de tu donación",
    frequency: "Frecuencia",
    amount: "Monto",
    motive: "Motivo",
    total: "Total",
    submit: "Confirmar donación",
    successTitle: "¡Gracias por sembrar con nosotros!",
    successText:
      "Esta es una simulación del flujo de donación para el prototipo. En la versión real recibirás tu código de árbol y certificado por correo.",
    campaignNote: "Estás donando para la campaña",
  },
  en: {
    title: "Donate and plant your tree",
    subtitle: "A process designed to donate, not to shop.",
    step1: "1. Choose the amount",
    once: "One-time",
    monthly: "Monthly",
    custom: "Custom amount",
    step2: "2. Dedicate your tree",
    motiveLabel: "Choose the reason",
    nameLabel: "Name for your tree (optional)",
    namePlaceholder: "E.g. For my grandmother",
    step3: "3. Your details",
    fullName: "Full name",
    email: "Email",
    country: "Country",
    payment: "Payment method",
    pse: "PSE",
    card: "Card",
    secure: "100% secure, tax-deductible donation",
    summary: "Your donation summary",
    frequency: "Frequency",
    amount: "Amount",
    motive: "Reason",
    total: "Total",
    submit: "Confirm donation",
    successTitle: "Thank you for planting with us!",
    successText:
      "This is a simulation of the donation flow for the prototype. In the real version you'll receive your tree code and certificate by email.",
    campaignNote: "You're donating to the campaign",
  },
};

const currency = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

function DonarContent() {
  const { lang } = useLang();
  const c = copy[lang];
  const params = useSearchParams();
  const campaign = params.get("campana");

  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState(amounts[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [motive, setMotive] = useState(motives[lang][0]);
  const [treeName, setTreeName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pse" | "card">("pse");
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = useMemo(() => {
    if (isCustom) return Number(customAmount) || 0;
    return amount;
  }, [isCustom, customAmount, amount]);

  if (submitted) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg px-5 sm:px-8 py-28 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
        >
          <CheckCircle2 className="text-gold mx-auto mb-6" size={56} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-extrabold text-forest mb-4"
        >
          {c.successTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-forest/60 leading-relaxed"
        >
          {c.successText}
        </motion.p>
      </motion.section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest">{c.title}</h1>
        <p className="text-forest/60 mt-2">{c.subtitle}</p>
        {campaign && (
          <p className="text-sm text-gold font-semibold mt-3">
            {c.campaignNote}: {campaign}
          </p>
        )}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="hidden sm:flex items-center mb-12 max-w-xl"
      >
        {[c.step1, c.step2, c.step3].map((label, i) => (
          <motion.div key={label} variants={staggerItem} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-full bg-forest text-cream-soft text-xs font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <span className="text-xs font-semibold text-forest/70 whitespace-nowrap">
                {label.replace(/^\d\.\s*/, "")}
              </span>
            </div>
            {i < 2 && <div className="flex-1 h-px bg-forest/15 mx-4" />}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="lg:col-span-2 space-y-10">
          <motion.div variants={staggerItem}>
            <h2 className="font-bold text-forest mb-4">{c.step1}</h2>
            <div className="flex gap-2 mb-5">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setFrequency("once")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  frequency === "once" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                {c.once}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setFrequency("monthly")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  frequency === "monthly" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                {c.monthly}
              </motion.button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {amounts.map((a) => (
                <motion.button
                  key={a}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -2 }}
                  onClick={() => {
                    setAmount(a);
                    setIsCustom(false);
                  }}
                  className={`py-3 rounded-xl text-sm font-bold border transition-colors ${
                    !isCustom && amount === a
                      ? "bg-gold border-gold text-cream-soft"
                      : "border-forest/15 text-forest/70"
                  }`}
                >
                  {currency.format(a)}
                </motion.button>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
                onClick={() => setIsCustom(true)}
                className={`py-3 rounded-xl text-sm font-bold border transition-colors ${
                  isCustom ? "bg-gold border-gold text-cream-soft" : "border-forest/15 text-forest/70"
                }`}
              >
                {c.custom}
              </motion.button>
            </div>
            <AnimatePresence>
              {isCustom && (
                <motion.input
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.25 }}
                  type="number"
                  min={0}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="$ COP"
                  className="w-full border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="font-bold text-forest mb-4">{c.step2}</h2>
            <label className="block text-sm font-semibold text-forest/70 mb-1.5">{c.motiveLabel}</label>
            <select
              value={motive}
              onChange={(e) => setMotive(e.target.value)}
              className="w-full border border-forest/20 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {motives[lang].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <label className="block text-sm font-semibold text-forest/70 mb-1.5">{c.nameLabel}</label>
            <input
              value={treeName}
              onChange={(e) => setTreeName(e.target.value)}
              placeholder={c.namePlaceholder}
              maxLength={40}
              className="w-full border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <h2 className="font-bold text-forest mb-4">{c.step3}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input placeholder={c.fullName} className="border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              <input placeholder={c.email} type="email" className="border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
            <input placeholder={c.country} className="w-full border border-forest/20 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gold" />

            <label className="block text-sm font-semibold text-forest/70 mb-1.5">{c.payment}</label>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setPaymentMethod("pse")}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === "pse" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                <Landmark size={16} /> {c.pse}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === "card" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                <CreditCard size={16} /> {c.card}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.aside
          variants={staggerItem}
          className="lg:sticky lg:top-24 h-fit bg-cream rounded-2xl border border-forest/10 overflow-hidden"
        >
          <div className="relative aspect-[16/9]">
            <Image src={asset("/images/campana-siembra.jpg")} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-transparent" />
          </div>
          <div className="p-6 pt-0 -mt-4 relative">
          <h3 className="font-bold text-forest mb-5">{c.summary}</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-forest/60">{c.frequency}</dt>
              <dd className="font-semibold text-forest">{frequency === "once" ? c.once : c.monthly}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-forest/60">{c.motive}</dt>
              <dd className="font-semibold text-forest">{motive}</dd>
            </div>
            <div className="flex justify-between pt-3 border-t border-forest/10 overflow-hidden">
              <dt className="text-forest/60">{c.total}</dt>
              <dd className="font-extrabold text-forest text-lg">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={finalAmount}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    {currency.format(finalAmount)}
                  </motion.span>
                </AnimatePresence>
              </dd>
            </div>
          </dl>

          <motion.button
            whileHover={finalAmount > 0 ? { scale: 1.02 } : {}}
            whileTap={finalAmount > 0 ? { scale: 0.97 } : {}}
            onClick={() => setSubmitted(true)}
            disabled={finalAmount <= 0}
            className="w-full mt-6 bg-gold hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed text-cream-soft font-bold py-3.5 rounded-full transition-colors"
          >
            {c.submit}
          </motion.button>
          <p className="flex items-center gap-1.5 justify-center text-xs text-forest/50 mt-4">
            <Lock size={12} /> {c.secure}
          </p>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}

export default function DonarPage() {
  return (
    <>
      <CampaignHeader />
      <main className="flex-1">
        <Suspense fallback={null}>
          <DonarContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
