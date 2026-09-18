"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { getDocsPage } from "@/content/docs-pages";
import { docsNavigation } from "@/lib/docs-navigation";

const searchEntries = docsNavigation.flatMap((item) => {
  const page = getDocsPage(item.slug);
  const pageEntry = {
    id: item.slug,
    title: item.title,
    summary: item.summary,
    href: `/docs/${item.slug}`,
    searchText: [item.title, item.summary, item.group, ...item.keywords].join(
      " ",
    ),
  };
  const sectionEntries =
    page?.sections.map((section) => ({
      id: `${item.slug}-${section.id}`,
      title: section.title,
      summary: item.title,
      href: `/docs/${item.slug}#${section.id}`,
      searchText: [
        section.title,
        section.badge ?? "",
        ...(section.paragraphs ?? []),
        ...(section.items ?? []),
      ].join(" "),
    })) ?? [];

  return [pageEntry, ...sectionEntries];
});

export default function DocsSearch() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const results = normalized
    ? searchEntries
        .filter((item) =>
          item.searchText
          .toLocaleLowerCase("pt-BR")
          .includes(normalized),
        )
        .slice(0, 8)
    : [];

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node))
        setActive(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="docs-search" ref={containerRef}>
      <label htmlFor={inputId} className="sr-only">
        Buscar na documentação
      </label>
      <Search size={17} aria-hidden="true" />
      <input
        id={inputId}
        type="search"
        value={query}
        placeholder="Buscar na documentação"
        autoComplete="off"
        onFocus={() => setActive(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(true);
        }}
      />
      {query && (
        <button
          type="button"
          aria-label="Limpar busca"
          onClick={() => setQuery("")}
        >
          <X size={16} />
        </button>
      )}
      {active && normalized && (
        <div
          className="docs-search-results"
          role="listbox"
          aria-label="Resultados da busca"
        >
          {results.length ? (
            results.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActive(false);
                  setQuery("");
                }}
              >
                <span>{item.title}</span>
                <small>{item.summary}</small>
              </Link>
            ))
          ) : (
            <p>Nenhuma página encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}
