import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Aperture, ArrowLeft, ArrowUpRight, Smartphone } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Lista de espera para iPhone",
  description: "Entre na lista de espera do Komorebi para iPhone. Seu e-mail será usado somente para enviar o convite futuramente.",
  alternates: { canonical: "/lista-de-espera" },
  openGraph: { title: "Seu próximo olhar começa aqui. | Komorebi", description: "Lista de espera para iPhone. Deixe seu e-mail para receber o convite futuramente.", url: "/lista-de-espera" },
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
        <div className="waitlist-copy">
          <p className="eyebrow"><span className="tiny-cross">+</span> O PRÓXIMO INSTANTE É SEU</p>
          <h1>Seu próximo<br />olhar começa<br /><em>aqui.</em></h1>
          <p className="waitlist-intro">Uma câmera para sentir a luz, encontrar suas cores e fotografar com intenção. O Komorebi está em desenvolvimento — e você pode fazer parte do próximo capítulo.</p>
          <span className="waitlist-platform"><Smartphone size={16} /> LISTA DE ESPERA PARA IPHONE</span>
          <div className="waitlist-photo">
            <Image src="/images/forest.jpg" alt="" width={1200} height={800} sizes="(max-width: 900px) 88vw, 540px" />
            <span>木漏れ日 <small>A LUZ ENCONTRA UM CAMINHO.</small></span>
          </div>
        </div>
        <div className="waitlist-form-column">
          <WaitlistForm />
          <p className="waitlist-availability">O convite será enviado futuramente. Ainda não há uma data de disponibilidade anunciada.</p>
        </div>
      </main>
      <footer className="waitlist-footer">
        <span>LUZ. COR. INTENÇÃO.</span>
        <div>
          <Link href="/docs">Documentação <ArrowUpRight size={14} /></Link>
          <Link href="/politica-de-privacidade">Privacidade</Link>
          <Link href="/termos-de-uso">Termos</Link>
        </div>
      </footer>
    </div>
  );
}
