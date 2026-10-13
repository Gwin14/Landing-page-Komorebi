import { notFound } from "next/navigation";
import { isLocale } from "./routing";
import type { Metadata } from "next";
import { languageTag, localizedPath, type Locale } from "./routing";

export type LocaleRouteProps = { params: Promise<{ locale: string }> };
export function pageMetadata(locale: Locale, route: string, title: string, description: string): Metadata {
  const url = localizedPath(route, locale);
  return {
    title, description,
    alternates: { canonical: url, languages: { "pt-BR": localizedPath(route, "pt"), en: localizedPath(route, "en"), "x-default": route } },
    openGraph: { title, description, url, locale: languageTag[locale].replace("-", "_"), alternateLocale: locale === "pt" ? "en" : "pt_BR" },
    twitter: { title, description },
  };
}

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
