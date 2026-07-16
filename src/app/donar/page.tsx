"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Lock, CreditCard, Landmark } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { CampaignHeader } from "@/components/CampaignHeader";
import { Footer } from "@/components/Footer";

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
      <section className="mx-auto max-w-lg px-5 sm:px-8 py-28 text-center">
        <CheckCircle2 className="text-gold mx-auto mb-6" size={56} />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest mb-4">{c.successTitle}</h1>
        <p className="text-forest/60 leading-relaxed">{c.successText}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest">{c.title}</h1>
        <p className="text-forest/60 mt-2">{c.subtitle}</p>
        {campaign && (
          <p className="text-sm text-gold font-semibold mt-3">
            {c.campaignNote}: {campaign}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-bold text-forest mb-4">{c.step1}</h2>
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setFrequency("once")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  frequency === "once" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                {c.once}
              </button>
              <button
                onClick={() => setFrequency("monthly")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  frequency === "monthly" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                {c.monthly}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAmount(a);
                    setIsCustom(false);
                  }}
                  className={`py-3 rounded-xl text-sm font-bold border transition-colors ${
                    !isCustom && amount === a
                      ? "bg-gold border-gold text-forest-dark"
                      : "border-forest/15 text-forest/70"
                  }`}
                >
                  {currency.format(a)}
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className={`py-3 rounded-xl text-sm font-bold border transition-colors ${
                  isCustom ? "bg-gold border-gold text-forest-dark" : "border-forest/15 text-forest/70"
                }`}
              >
                {c.custom}
              </button>
            </div>
            {isCustom && (
              <input
                type="number"
                min={0}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="$ COP"
                className="mt-3 w-full border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            )}
          </div>

          <div>
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
          </div>

          <div>
            <h2 className="font-bold text-forest mb-4">{c.step3}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input placeholder={c.fullName} className="border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
              <input placeholder={c.email} type="email" className="border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
            <input placeholder={c.country} className="w-full border border-forest/20 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gold" />

            <label className="block text-sm font-semibold text-forest/70 mb-1.5">{c.payment}</label>
            <div className="flex gap-3">
              <button
                onClick={() => setPaymentMethod("pse")}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === "pse" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                <Landmark size={16} /> {c.pse}
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-colors ${
                  paymentMethod === "card" ? "bg-forest text-white border-forest" : "border-forest/20 text-forest/70"
                }`}
              >
                <CreditCard size={16} /> {c.card}
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit bg-cream rounded-2xl border border-forest/10 p-6">
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
            <div className="flex justify-between pt-3 border-t border-forest/10">
              <dt className="text-forest/60">{c.total}</dt>
              <dd className="font-extrabold text-forest text-lg">{currency.format(finalAmount)}</dd>
            </div>
          </dl>

          <button
            onClick={() => setSubmitted(true)}
            disabled={finalAmount <= 0}
            className="w-full mt-6 bg-gold hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed text-forest-dark font-bold py-3.5 rounded-full transition-colors"
          >
            {c.submit}
          </button>
          <p className="flex items-center gap-1.5 justify-center text-xs text-forest/50 mt-4">
            <Lock size={12} /> {c.secure}
          </p>
        </aside>
      </div>
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
