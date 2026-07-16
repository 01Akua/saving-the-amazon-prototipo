import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saving The Amazon — Siembra un árbol, protege la Amazonía",
  description:
    "Prototipo de nueva página web para Saving The Amazon: propia, rápida, bilingüe y con un proceso de donación diseñado para donar, no para comprar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream-soft text-ink font-sans">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
