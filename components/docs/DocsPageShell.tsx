import { getTranslator, translateContent } from "@/lib/i18n/translate";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { DocsPage } from "@/content/docs-pages";
import {
  APP_VERIFIED_DATE,
  statusLabels,
} from "@/lib/feature-matrix";
import { getDocsNeighbors } from "@/lib/docs-navigation";
import CompatibilityTable from "./CompatibilityTable";
import DocsSidebar from "./DocsSidebar";

export default function DocsPageShell({ page: sourcePage, locale }: { page: DocsPage; locale: Locale }) {
  const t = getTranslator(locale);
  const path = (href: string) => localizedPath(href, locale);
  const page = translateContent(sourcePage, t);
  const { previous, next } = getDocsNeighbors(page.slug);

  return (
    <div className="docs-grid">
      <DocsSidebar currentSlug={page.slug} locale={locale} />
      <article className="docs-article" id="conteudo">
        <nav className="docs-breadcrumbs" aria-label={t("Navegação estrutural")}>
          <Link href={path("/")}>{t("Início")}</Link>
          <span aria-hidden="true">/</span>
          <Link href={path("/docs")}>{t("Documentação")}</Link>
          <span aria-hidden="true">/</span>
          <span>{page.title}</span>
        </nav>
        <header className="docs-page-header">
          <p className="docs-kicker">{page.platform}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="docs-meta">
            <span className={`status status-${page.status}`}>
              {t(statusLabels[page.status])}
            </span>
            <span>{t("Revisado em")} {t(APP_VERIFIED_DATE)}</span>
          </div>
        </header>
        <section
          className="docs-prerequisites"
          aria-labelledby="pre-requisitos"
        >
          <h2 id="pre-requisitos">{t("Pré requisitos")}</h2>
          <ul>
            {page.prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {page.slug === "compatibilidade" && <CompatibilityTable locale={locale} />}
        {page.sections.map((section) => (
          <section
            className="docs-section"
            key={section.id}
            aria-labelledby={section.id}
          >
            <h2 id={section.id}>
              {section.title}
              {section.badge ? (
                <span className="docs-topic-badge">{section.badge}</span>
              ) : null}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.images && (
              <div className="docs-screenshots">
                {section.images.map((screenshot) => (
                  <figure className="docs-screenshot" key={screenshot.src}>
                    <a
                      className="docs-screenshot-image"
                      href={path(screenshot.src)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t("Ampliar imagem: {alt} (abre em nova aba)").replace("{alt}", screenshot.alt)}
                    >
                      <Image
                        src={screenshot.src}
                        width={screenshot.width}
                        height={screenshot.height}
                        alt={screenshot.alt}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      <span>{screenshot.caption}</span>
                      <a href={path(screenshot.src)} target="_blank" rel="noreferrer">{t("Ampliar")}<span className="sr-only"> {t("imagem:")} {screenshot.alt} {t("(abre em nova aba)")}</span>
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
            {section.links && (
              <div className="docs-section-links">
                {section.links.map((link) => (
                  <Link key={link.href} href={path(link.href)}>{link.label}</Link>
                ))}
              </div>
            )}
          </section>
        ))}
        <nav className="docs-pagination" aria-label={t("Páginas relacionadas")}>
          {previous ? (
            <Link href={path(`/docs/${previous.slug}`)}>
              <ArrowLeft size={17} />
              <span>
                <small>{t("Anterior")}</small>
                {t(previous.title)}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={path(`/docs/${next.slug}`)}>
              <span>
                <small>{t("Próximo")}</small>
                {t(next.title)}
              </span>
              <ArrowRight size={17} />
            </Link>
          )}
        </nav>
      </article>
      <aside className="docs-toc" aria-label={t("Nesta página")}>
        <h2>{t("Nesta página")}</h2>
        <a href="#pre-requisitos">{t("Pré requisitos")}</a>
        {page.slug === "compatibilidade" && <a href="#matriz">{t("Matriz")}</a>}
        {page.sections.map((section) => (
          <a key={section.id} href={path(`#${section.id}`)}>
            <span>{section.title}</span>
            {section.badge ? <small>{section.badge}</small> : null}
          </a>
        ))}
      </aside>
    </div>
  );
}
