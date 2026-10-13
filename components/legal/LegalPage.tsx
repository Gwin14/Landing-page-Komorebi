import { getTranslator, translateContent } from "@/lib/i18n/translate";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import BrandIcon from "@/components/BrandIcon";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/docs/ThemeToggle";

export type LegalSection = {
  id?: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export default function LegalPage({
  title,
  updated,
  sections: sourceSections,
  locale,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
  locale: Locale;
}) {
  const t = getTranslator(locale);
  const path = (href: string) => localizedPath(href, locale);
  const sections = translateContent(sourceSections, t);
  return (
    <div className="legal-site">
      <a href="#conteudo" className="skip-link">{t("Pular para o conteúdo")} </a>
      <header className="legal-header">
        <Link href={path("/")}>
          <BrandIcon size={24} /> komorebi.
        </Link>
        <div className="legal-header-actions">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href={path("/docs")}>{t("Documentação")}</Link>
        </div>
      </header>
      <main className="legal-document" id="conteudo">
        <nav className="docs-breadcrumbs" aria-label={t("Navegação estrutural")}>
          <Link href={path("/")}>{t("Início")}</Link>
          <span>/</span>
          <span>{t(title)}</span>
        </nav>
        <header>
          <p className="docs-kicker">{t("Documento público")}</p>
          <h1>{t(title)}</h1>
          <p>{t("Última atualização:")} {t(updated)} {t("· Versão do app: 1.0.0")}</p>
        </header>
        {sections.map((section, index) => (
          <section key={section.title} id={section.id}>
            <h2>
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
