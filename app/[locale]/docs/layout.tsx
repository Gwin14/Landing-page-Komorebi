import { getTranslator } from "@/lib/i18n/translate";
import { getSearchEntries } from "@/lib/i18n/search";
import { pageMetadata, resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import DocsHeader from "@/components/docs/DocsHeader";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return {
    ...pageMetadata(locale, "/docs", t("Documentação do Komorebi"), t("Guias de uso e compatibilidade do aplicativo de câmera Komorebi.")),
    title: { default: t("Documentação do Komorebi"), template: "%s | Komorebi" },
  };
}

export default async function DocsLayout({
  children, params,
}: Readonly<{ children: React.ReactNode }> & LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return (
    <div className="docs-site">
      <a href="#conteudo" className="skip-link">{t("Pular para o conteúdo")} </a>
      <DocsHeader searchEntries={getSearchEntries(locale)} />
      {children}
    </div>
  );
}
