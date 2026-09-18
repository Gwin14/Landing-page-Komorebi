"use client";

import Link from "next/link";
import { Aperture, Menu, X } from "lucide-react";
import { useState } from "react";
import { docsNavigation } from "@/lib/docs-navigation";
import DocsSearch from "./DocsSearch";
import ThemeToggle from "./ThemeToggle";

export default function DocsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="docs-header">
      <Link
        className="docs-brand"
        href="/"
        aria-label="Komorebi, página inicial"
      >
        <Aperture size={25} strokeWidth={1.7} />
        <span>komorebi.</span>
        <small>documentação</small>
      </Link>
      <div className="docs-header-actions">
        <ThemeToggle />
        <DocsSearch />
        <button
          className="docs-menu-button"
          type="button"
          aria-label={open ? "Fechar navegação" : "Abrir navegação"}
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
  const links = [
    ["Visão geral", "/docs"],
    ...docsNavigation.map((item) => [item.title, `/docs/${item.slug}`]),
  ];

  return links.map(([label, href]) => (
    <Link key={href} href={href} onClick={onNavigate}>
      {label}
    </Link>
  ));
}
