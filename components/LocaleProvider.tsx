"use client";

import { createContext, useContext, useMemo } from "react";
import { localizedPath, type Locale } from "@/lib/i18n/routing";
import type { Translate } from "@/lib/i18n/translate";

type I18n = { locale: Locale; t: Translate; path: (href: string) => string };
const LocaleContext = createContext<I18n | null>(null);
export default function LocaleProvider({ locale, messages, children }: {
  locale: Locale;
  messages: Record<string, string>;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: (text: string) => messages[text] ?? text, path: (href: string) => localizedPath(href, locale) }), [locale, messages]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("LocaleProvider is required");
  return value;
}
