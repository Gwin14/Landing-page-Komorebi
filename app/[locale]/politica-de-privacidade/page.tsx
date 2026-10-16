import { getTranslator } from "@/lib/i18n/translate";
import { pageMetadata, resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacySections } from "@/content/legal";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return pageMetadata(locale, "/politica-de-privacidade", t("Política de Privacidade do Komorebi"), t("Como o Komorebi processa fotos, localização, preferências e serviços externos."));
}
export default async function PrivacyPage({ params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return (
    <LegalPage
      locale={locale}
      title={t("Política de Privacidade")}
      updated={t("16 de outubro de 2026")}
      sections={privacySections}
    />
  );
}
