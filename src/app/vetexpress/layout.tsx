import type { Metadata } from "next";
import { Nunito, Outfit } from "next/font/google";
import "./vetexpress.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "VETEXPRESS — Veterinaria a domicilio, Santa Tecla",
  description:
    "Propuesta de sitio para VETEXPRESS: consulta a domicilio, clínica en Santa Tecla, zonas de cobertura y agenda por WhatsApp.",
  robots: { index: false, follow: false },
};

export default function VetexpressLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`vx ${nunito.variable} ${outfit.variable}`} lang="es">
      {children}
    </div>
  );
}
