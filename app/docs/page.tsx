import Link from "next/link";
import { ArrowRight, BookOpen, Camera, Code2, Palette } from "lucide-react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { docsNavigation } from "@/lib/docs-navigation";
import { APP_VERIFIED_COMMIT, APP_VERIFIED_DATE } from "@/lib/feature-matrix";

const paths = [
  {
    title: "Comece a fotografar",
    text: "Permissões, primeira captura e organização inicial.",
    href: "/docs/primeiros-passos",
    icon: Camera,
  },
  {
    title: "Entenda cores e efeitos",
    text: "LUTs, grão, halation e cópia original.",
    href: "/docs/cores-e-efeitos",
    icon: Palette,
  },
  {
    title: "Consulte a referência",
    text: "Compatibilidade e condições por plataforma.",
    href: "/docs/compatibilidade",
    icon: BookOpen,
  },
  {
    title: "Contribua com o projeto",
    text: "Arquitetura, módulos nativos e validação.",
    href: "/docs/desenvolvimento",
    icon: Code2,
  },
];

export default function DocsOverviewPage() {
  return (
    <div className="docs-grid docs-grid-overview">
      <DocsSidebar />
      <main className="docs-overview" id="conteudo">
        <div className="docs-overview-hero">
          <p className="docs-kicker">Documentação oficial</p>
          <h1>Fotografe com intenção e saiba o que cada recurso exige.</h1>
          <p>
            O Komorebi reúne controles de câmera, cores autorais e organização
            local. Aqui você encontra instruções de uso, limites por aparelho e
            a arquitetura do projeto.
          </p>
          <div className="docs-meta">
            <span>Revisado em {APP_VERIFIED_DATE}</span>
            <span>App {APP_VERIFIED_COMMIT.slice(0, 7)}</span>
          </div>
        </div>
        <section className="docs-paths" aria-labelledby="caminhos-rapidos">
          <h2 id="caminhos-rapidos">Caminhos rápidos</h2>
          <div>
            {paths.map(({ title, text, href, icon: Icon }) => (
              <Link href={href} key={href}>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>
                  Ver guia <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="docs-index" aria-labelledby="todas-as-paginas">
          <h2 id="todas-as-paginas">Todas as páginas</h2>
          {docsNavigation.map((item) => (
            <Link href={`/docs/${item.slug}`} key={item.slug}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.group}</small>
              </span>
              <p>{item.summary}</p>
              <ArrowRight size={17} />
            </Link>
          ))}
        </section>
        <p className="docs-note">
          <strong>Disponibilidade:</strong> recursos podem variar por aparelho,
          lente, plataforma e permissões. Consulte a matriz de compatibilidade
          antes de depender de um modo avançado.
        </p>
      </main>
    </div>
  );
}
