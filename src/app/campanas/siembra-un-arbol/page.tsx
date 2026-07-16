"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Users, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/site-config";
import { CampaignHeader } from "@/components/CampaignHeader";
import { Footer } from "@/components/Footer";

const copy = {
  es: {
    title: "Siembra un árbol en la Amazonía",
    intro:
      "Adoptar un árbol nativo en la Amazonía es sembrar un homenaje vivo: un obsequio sostenible que puedes dedicar a tu nombre o al de un ser querido, como un gesto de amor, agradecimiento y conexión con nuestra madre tierra.",
    intro2:
      "Con tu aporte contribuyes a la acción climática y apoyas a comunidades indígenas que enfrentan desafíos como el hambre y la pobreza extrema en sus territorios.",
    price: "$65.000 COP",
    priceNote: "Donación única · también disponible mensual",
    cta: "Donar y sembrar mi árbol",
    benefitsTitle: "¿Qué recibes al plantar un árbol?",
    benefits: [
      {
        icon: BadgeCheck,
        title: "Certificado de siembra",
        text: "Con un código único para localizar y seguir tu árbol.",
      },
      {
        icon: MapPin,
        title: "Coordenadas reales",
        text: "Conoce la especie, la comunidad y el lugar exacto de siembra.",
      },
      {
        icon: Users,
        title: "2 años de cuidado",
        text: "Una familia indígena siembra y cuida tu árbol hasta que crece por sí solo.",
      },
      {
        icon: ShieldCheck,
        title: "Donación 100% segura",
        text: "Pago protegido y deducible de impuestos, desde Colombia o el exterior.",
      },
    ],
    trust: "+713.159 árboles sembrados junto a 54 comunidades en 3 países",
  },
  en: {
    title: "Plant a tree in the Amazon",
    intro:
      "Adopting a native tree in the Amazon means planting a living tribute — a sustainable gift you can dedicate to yourself or a loved one, as a gesture of love, gratitude and connection with our mother earth.",
    intro2:
      "Your contribution supports climate action and indigenous communities facing hunger and extreme poverty in their territories.",
    price: "$65,000 COP",
    priceNote: "One-time donation · monthly also available",
    cta: "Donate and plant my tree",
    benefitsTitle: "What do you get when you plant a tree?",
    benefits: [
      {
        icon: BadgeCheck,
        title: "Planting certificate",
        text: "With a unique code to locate and follow your tree.",
      },
      {
        icon: MapPin,
        title: "Real coordinates",
        text: "Learn the species, the community and the exact planting site.",
      },
      {
        icon: Users,
        title: "2 years of care",
        text: "An indigenous family plants and tends your tree until it thrives on its own.",
      },
      {
        icon: ShieldCheck,
        title: "100% secure donation",
        text: "Protected, tax-deductible payment, from Colombia or abroad.",
      },
    ],
    trust: "+713,159 trees planted with 54 communities across 3 countries",
  },
};

export default function SiembraUnArbolPage() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <>
      <CampaignHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-5 sm:px-8 pt-14 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest leading-tight mb-5">
              {c.title}
            </h1>
            <p className="text-forest/70 leading-relaxed mb-4">{c.intro}</p>
            <p className="text-forest/70 leading-relaxed mb-8">{c.intro2}</p>

            <div className="bg-cream rounded-2xl border border-forest/10 p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-2xl font-extrabold text-forest">{c.price}</p>
                <p className="text-xs text-forest/50">{c.priceNote}</p>
              </div>
              <Link
                href="/donar?campana=siembra-un-arbol"
                className="group bg-gold hover:bg-gold-light text-forest-dark font-bold px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                {c.cta}
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src={asset("/images/campana-siembra.jpg")}
              alt={c.title}
              fill
              preload={true}
              className="object-cover"
            />
          </div>
        </section>

        <section className="bg-cream py-20 mt-6">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest text-center mb-12">
              {c.benefitsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {c.benefits.map((b) => (
                <div key={b.title} className="bg-white rounded-2xl p-6 border border-forest/10 flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-forest text-gold-light flex items-center justify-center">
                    <b.icon size={19} />
                  </div>
                  <div>
                    <h3 className="font-bold text-forest mb-1">{b.title}</h3>
                    <p className="text-sm text-forest/60 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 sm:px-8 py-16 text-center">
          <p className="text-forest/50 text-sm font-semibold mb-8">{c.trust}</p>
          <Link
            href="/donar?campana=siembra-un-arbol"
            className="group bg-forest hover:bg-forest-light text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
          >
            {c.cta}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
