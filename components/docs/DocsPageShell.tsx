import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { DocsPage } from "@/content/docs-pages";
import {
  APP_VERIFIED_COMMIT,
  APP_VERIFIED_DATE,
  statusLabels,
} from "@/lib/feature-matrix";
import { getDocsNeighbors } from "@/lib/docs-navigation";
import CompatibilityTable from "./CompatibilityTable";
import DocsSidebar from "./DocsSidebar";

export default function DocsPageShell({ page }: { page: DocsPage }) {
  const { previous, next } = getDocsNeighbors(page.slug);
  const githubUrl = `https://github.com/Gwin14/Landing-page-Komorebi/blob/main/content/docs-pages.ts`;

  return (
    <div className="docs-grid">
      <DocsSidebar currentSlug={page.slug} />
      <article className="docs-article" id="conteudo">
        <nav className="docs-breadcrumbs" aria-label="Navegação estrutural">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/docs">Documentação</Link>
          <span aria-hidden="true">/</span>
          <span>{page.title}</span>
        </nav>
        <header className="docs-page-header">
          <p className="docs-kicker">{page.platform}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="docs-meta">
            <span className={`status status-${page.status}`}>
              {statusLabels[page.status]}
            </span>
            <span>Revisado em {APP_VERIFIED_DATE}</span>
            <span>App {APP_VERIFIED_COMMIT.slice(0, 7)}</span>
          </div>
        </header>
        <section
          className="docs-prerequisites"
          aria-labelledby="pre-requisitos"
        >
          <h2 id="pre-requisitos">Pré requisitos</h2>
          <ul>
            {page.prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {page.slug === "compatibilidade" && <CompatibilityTable />}
        {page.sections.map((section) => (
          <section
            className="docs-section"
            key={section.id}
            aria-labelledby={section.id}
          >
            <h2 id={section.id}>{section.title}</h2>
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
          </section>
        ))}
        <a
          className="docs-edit-link"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          Editar esta página no GitHub <ExternalLink size={15} />
        </a>
        <nav className="docs-pagination" aria-label="Páginas relacionadas">
          {previous ? (
            <Link href={`/docs/${previous.slug}`}>
              <ArrowLeft size={17} />
              <span>
                <small>Anterior</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.slug}`}>
              <span>
                <small>Próximo</small>
                {next.title}
              </span>
              <ArrowRight size={17} />
            </Link>
          )}
        </nav>
      </article>
      <aside className="docs-toc" aria-label="Nesta página">
        <h2>Nesta página</h2>
        <a href="#pre-requisitos">Pré requisitos</a>
        {page.slug === "compatibilidade" && <a href="#matriz">Matriz</a>}
        {page.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
          </a>
        ))}
      </aside>
    </div>
  );
}
