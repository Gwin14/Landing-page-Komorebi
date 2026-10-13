import { getTranslator } from "@/lib/i18n/translate";
import { localizedPath } from "@/lib/i18n/routing";
import { resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import Link from "next/link";
import { ArrowRight, BookOpen, Camera, Palette } from "lucide-react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { docsNavigation } from "@/lib/docs-navigation";
import { APP_VERIFIED_DATE } from "@/lib/feature-matrix";

const paths = [
  {
    title: "Comece a fotografar",
    text: "Permissões, primeira captura, lentes e controles essenciais.",
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
    title: "Use o Scanner de composição",
    text: "Guia local de reenquadramento em beta no iOS.",
    href: "/docs/scanner-de-composicao",
    icon: BookOpen,
  },
  {
    title: "Confira a compatibilidade",
    text: "Disponibilidade dos recursos e requisitos por aparelho.",
    href: "/docs/compatibilidade",
    icon: BookOpen,
  },
];

export default async function DocsOverviewPage({ params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  const path = (href: string) => localizedPath(href, locale);
  return (
    <div className="docs-grid docs-grid-overview">
      <DocsSidebar locale={locale} />
      <main className="docs-overview" id="conteudo">
        <div className="docs-overview-hero">
          <p className="docs-kicker">{t("Documentação oficial")}</p>
          <h1>{t("Fotografe com intenção e saiba o que cada recurso exige.")}</h1>
          <p>{t("O Komorebi reúne controles de câmera, cores autorais e organização local. Navegue por tópicos para encontrar instruções de uso, recursos novos e limites por aparelho.")} </p>
          <div className="docs-meta">
            <span>{t("Revisado em")} {t(APP_VERIFIED_DATE)}</span>
          </div>
        </div>
        <section className="docs-paths" aria-labelledby="caminhos-rapidos">
          <h2 id="caminhos-rapidos">{t("Caminhos rápidos")}</h2>
          <div>
            {paths.map(({ title, text, href, icon: Icon }) => (
              <Link href={path(href)} key={href}>
                <Icon size={21} />
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
                <span>{t("Ver guia")} <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section className="docs-index" aria-labelledby="todas-as-paginas">
          <h2 id="todas-as-paginas">{t("Todas as páginas")}</h2>
          {docsNavigation.map((item) => (
            <Link href={path(`/docs/${item.slug}`)} key={item.slug}>
              <span>
                <strong>{t(item.title)}</strong>
                <small>{t(item.group)}</small>
              </span>
              <p>{t(item.summary)}</p>
              <ArrowRight size={17} />
            </Link>
          ))}
        </section>
        <p className="docs-note">
          <strong>{t("Disponibilidade:")}</strong> {t("recursos podem variar por aparelho, lente, plataforma e permissões. Consulte a matriz de compatibilidade antes de depender de um modo avançado.")} </p>
      </main>
    </div>
  );
}
