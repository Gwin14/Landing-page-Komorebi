import { getTranslator } from "@/lib/i18n/translate";
import { localizedPath } from "@/lib/i18n/routing";
import { pageMetadata, resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import BrandIcon from "@/components/BrandIcon";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WaitlistForm from "@/components/WaitlistForm";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return pageMetadata(locale, "/lista-de-espera", t("Lista de espera para iPhone"), t("Entre na lista de espera do Komorebi para iPhone. Seu e-mail será usado somente para enviar o convite futuramente."));
}

export default async function WaitlistPage({ params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  const path = (href: string) => localizedPath(href, locale);
  return (
    <div className="waitlist-site">
      <a href="#conteudo" className="skip-link">{t("Pular para o conteúdo")}</a>
      <header className="header waitlist-header">
        <Link className="brand" href={path("/")} aria-label={t("Komorebi, início")}>
          <BrandIcon size={29} />
          <span>komorebi<span className="brand-period">.</span></span>
        </Link>
        <Link href={path("/")} className="waitlist-back"><ArrowLeft size={16} /> {t("Conheça o Komorebi")}</Link>
        <LanguageSwitcher />
      </header>
      <main id="conteudo" className="waitlist-main">
        <WaitlistForm />
      </main>

    </div>
  );
}
