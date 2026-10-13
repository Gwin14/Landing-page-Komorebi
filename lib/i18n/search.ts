import { docsPages } from "@/content/docs-pages";
import { docsNavigation } from "@/lib/docs-navigation";
import { getTranslator, translateContent } from "./translate";
import type { Locale } from "./routing";

export type SearchEntry = { id: string; title: string; summary: string; href: string; searchText: string };
export function getSearchEntries(locale: Locale): SearchEntry[] {
  const t = getTranslator(locale);
  return docsNavigation.flatMap((original) => {
    const item = translateContent(original, t);
    const page = translateContent(docsPages.find((page) => page.slug === item.slug), t);
    return [
      { id: item.slug, title: item.title, summary: item.summary, href: `/docs/${item.slug}`, searchText: [item.title, item.summary, item.group, ...item.keywords].join(" ") },
      ...(page?.sections.map((section) => ({ id: `${item.slug}-${section.id}`, title: section.title, summary: item.title, href: `/docs/${item.slug}#${section.id}`, searchText: [section.title, section.badge ?? "", ...(section.paragraphs ?? []), ...(section.items ?? [])].join(" ") })) ?? []),
    ];
  });
}
