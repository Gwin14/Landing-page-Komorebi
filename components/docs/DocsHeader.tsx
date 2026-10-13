"use client";
import { useI18n } from "@/components/LocaleProvider";
import BrandIcon from "@/components/BrandIcon";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { docsGroups, docsNavigation } from "@/lib/docs-navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DocsSearch from "./DocsSearch";
import ThemeToggle from "./ThemeToggle";

import type { SearchEntry } from "@/lib/i18n/search";

export default function DocsHeader({ searchEntries }: { searchEntries: SearchEntry[] }) {
  const { t, path } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="docs-header">
      <Link
        className="docs-brand"
        href={path("/")}
        aria-label={t("Komorebi, página inicial")}
      >
        <BrandIcon size={25} />
        <span>komorebi.</span>
        <small>{t("documentação")}</small>
      </Link>
      <div className="docs-header-actions">
        <LanguageSwitcher />
        <ThemeToggle />
        <DocsSearch entries={searchEntries} />
        <button
          className="docs-menu-button"
          type="button"
          aria-label={open ? t("Fechar navegação") : t("Abrir navegação")}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className={open ? "docs-mobile-nav is-open" : "docs-mobile-nav"}>
        <DocsMobileLinks onNavigate={() => setOpen(false)} />
      </div>
    </header>
  );
}

function DocsMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  const { t, path } = useI18n();
  return (
    <>
      <Link href={path("/docs")} onClick={onNavigate}>{t("Visão geral")}</Link>
      {docsGroups.map((group) => (
        <details className="docs-sidebar-group" key={t(group)}>
          <summary>{t(group)}</summary>
          {docsNavigation.filter((item) => item.group === group).map((item) => (
            <Link key={item.slug} href={path(`/docs/${item.slug}`)} onClick={onNavigate}>
              {t(item.title)}
            </Link>
          ))}
        </details>
      ))}
    </>
  );
}
