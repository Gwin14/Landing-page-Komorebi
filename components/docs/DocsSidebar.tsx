import { getTranslator } from "@/lib/i18n/translate";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import Link from "next/link";
import { docsGroups, docsNavigation } from "@/lib/docs-navigation";

export default function DocsSidebar({ currentSlug, locale }: { currentSlug?: string; locale: Locale }) {
  const t = getTranslator(locale);
  const path = (href: string) => localizedPath(href, locale);
  return (
    <nav className="docs-sidebar" aria-label={t("Documentação")}>
      <Link className={!currentSlug ? "active" : ""} href={path("/docs")}>{t("Visão geral")} </Link>
      {docsGroups.map((group) => (
        <details
          className="docs-sidebar-group"
          key={`${t(group)}-${currentSlug ?? "overview"}`}
          open={!currentSlug || docsNavigation.some((item) => item.group === group && item.slug === currentSlug)}
        >
          <summary>{t(group)}</summary>
          {docsNavigation
            .filter((item) => item.group === group)
            .map((item) => (
              <Link
                className={currentSlug === item.slug ? "active" : ""}
                aria-current={currentSlug === item.slug ? "page" : undefined}
                key={item.slug}
                href={path(`/docs/${item.slug}`)}
              >
                {t(item.title)}
              </Link>
            ))}
        </details>
      ))}
      <details className="docs-sidebar-group">
        <summary>Legal</summary>
        <Link href={path("/politica-de-privacidade")}>{t("Política de Privacidade")}</Link>
        <Link href={path("/termos-de-uso")}>{t("Termos de Uso")}</Link>
      </details>
    </nav>
  );
}
