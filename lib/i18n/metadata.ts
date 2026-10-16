import { notFound } from "next/navigation";
import { isLocale } from "./routing";
import type { Metadata } from "next";
import { languageTag, locales, openGraphLocale, localizedPath, type Locale } from "./routing";

export type LocaleRouteProps = { params: Promise<{ locale: string }> };
export function pageMetadata(locale: Locale, route: string, title: string, description: string): Metadata {
  const url = localizedPath(route, locale);
  return {
    title, description,
    alternates: { canonical: url, languages: { ...Object.fromEntries(locales.map((language) => [languageTag[language], localizedPath(route, language)])), "x-default": route } },
    openGraph: { title, description, url, locale: openGraphLocale[locale], alternateLocale: locales.filter((language) => language !== locale).map((language) => openGraphLocale[language]) },
    twitter: { title, description },
  };
}

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
