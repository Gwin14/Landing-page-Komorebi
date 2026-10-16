"use client";
import { useI18n } from "@/components/LocaleProvider";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { SearchEntry } from "@/lib/i18n/search";
import { normalizeSearchText } from "@/lib/i18n/search-text";

export default function DocsSearch({ entries }: { entries: SearchEntry[] }) {
  const { t, path, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const normalized = normalizeSearchText(query, locale);
  const results = normalized
    ? entries
        .filter((item) =>
          normalizeSearchText(item.searchText, locale)
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
      <label htmlFor={inputId} className="sr-only">{t("Buscar na documentação")} </label>
      <Search size={17} aria-hidden="true" />
      <input
        id={inputId}
        type="search"
        value={query}
        placeholder={t("Buscar na documentação")}
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
          aria-label={t("Limpar busca")}
          onClick={() => setQuery("")}
        >
          <X size={16} />
        </button>
      )}
      {active && normalized && (
        <div
          className="docs-search-results"
          role="listbox"
          aria-label={t("Resultados da busca")}
        >
          {results.length ? (
            results.map((item) => (
              <Link
                key={item.id}
                href={path(item.href)}
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
            <p>{t("Nenhuma página encontrada.")}</p>
          )}
        </div>
      )}
    </div>
  );
}
