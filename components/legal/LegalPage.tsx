import Link from "next/link";
import { Aperture } from "lucide-react";
import ThemeToggle from "@/components/docs/ThemeToggle";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="legal-site">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="legal-header">
        <Link href="/">
          <Aperture size={24} /> komorebi.
        </Link>
        <div className="legal-header-actions">
          <ThemeToggle />
          <Link href="/docs">Documentação</Link>
        </div>
      </header>
      <main className="legal-document" id="conteudo">
        <nav className="docs-breadcrumbs" aria-label="Navegação estrutural">
          <Link href="/">Início</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
        <header>
          <p className="docs-kicker">Documento público</p>
          <h1>{title}</h1>
          <p>Última atualização: {updated} · Versão do app: 1.0.0</p>
        </header>
        {sections.map((section, index) => (
          <section key={section.title}>
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
