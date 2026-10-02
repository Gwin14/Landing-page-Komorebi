import Link from "next/link";
import { docsGroups, docsNavigation } from "@/lib/docs-navigation";

export default function DocsSidebar({ currentSlug }: { currentSlug?: string }) {
  return (
    <nav className="docs-sidebar" aria-label="Documentação">
      <Link className={!currentSlug ? "active" : ""} href="/docs">
        Visão geral
      </Link>
      {docsGroups.map((group) => (
        <details
          className="docs-sidebar-group"
          key={`${group}-${currentSlug ?? "overview"}`}
          open={!currentSlug || docsNavigation.some((item) => item.group === group && item.slug === currentSlug)}
        >
          <summary>{group}</summary>
          {docsNavigation
            .filter((item) => item.group === group)
            .map((item) => (
              <Link
                className={currentSlug === item.slug ? "active" : ""}
                aria-current={currentSlug === item.slug ? "page" : undefined}
                key={item.slug}
                href={`/docs/${item.slug}`}
              >
                {item.title}
              </Link>
            ))}
        </details>
      ))}
      <details className="docs-sidebar-group">
        <summary>Legal</summary>
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        <Link href="/termos-de-uso">Termos de Uso</Link>
      </details>
    </nav>
  );
}
