import Link from "next/link";
import { docsGroups, docsNavigation } from "@/lib/docs-navigation";

export default function DocsSidebar({ currentSlug }: { currentSlug?: string }) {
  return (
    <nav className="docs-sidebar" aria-label="Documentação">
      <Link className={!currentSlug ? "active" : ""} href="/docs">
        Visão geral
      </Link>
      {docsGroups.map((group) => (
        <div className="docs-sidebar-group" key={group}>
          <h2>{group}</h2>
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
        </div>
      ))}
      <div className="docs-sidebar-group">
        <h2>Legal</h2>
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        <Link href="/termos-de-uso">Termos de Uso</Link>
      </div>
    </nav>
  );
}
