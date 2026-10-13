import { getTranslator } from "@/lib/i18n/translate";
import { pageMetadata, resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsSections } from "@/content/legal";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return pageMetadata(locale, "/termos-de-uso", t("Termos de Uso do Komorebi"), t("Condições, responsabilidades e limitações para usar o aplicativo Komorebi."));
}
export default async function TermsPage({ params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return (
    <LegalPage
      locale={locale}
      title={t("Termos de Uso")}
      updated={t("9 de outubro de 2026")}
      sections={termsSections}
    />
  );
}
