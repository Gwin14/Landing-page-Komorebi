import type { Metadata } from "next";
import Link from "next/link";
import { Aperture, ArrowLeft } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Lista de espera para iPhone",
  description: "Entre na lista de espera do Komorebi para iPhone. Seu e-mail será usado somente para enviar o convite futuramente.",
  alternates: { canonical: "/lista-de-espera" },
  openGraph: { title: "Lista de espera para iPhone | Komorebi", description: "Lista de espera para iPhone. Deixe seu e-mail para receber o convite futuramente.", url: "/lista-de-espera" },
};

export default function WaitlistPage() {
  return (
    <div className="waitlist-site">
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <header className="header waitlist-header">
        <Link className="brand" href="/" aria-label="Komorebi, início">
          <Aperture size={29} strokeWidth={1.7} />
          <span>komorebi<span className="brand-period">.</span></span>
        </Link>
        <Link href="/" className="waitlist-back"><ArrowLeft size={16} /> Conheça o Komorebi</Link>
      </header>
      <main id="conteudo" className="waitlist-main">
        <WaitlistForm />
      </main>

    </div>
  );
}
