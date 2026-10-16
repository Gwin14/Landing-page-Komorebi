export const locales = ["pt", "en", "ja", "de", "es", "fr"] as const;
export type Locale = (typeof locales)[number];
export const localeCookie = "komorebi-locale";
export const languageTag = { pt: "pt-BR", en: "en", ja: "ja", de: "de", es: "es", fr: "fr" } as const;
export const languageNames: Record<Locale, string> = {
  pt: "Português", en: "English", ja: "日本語", de: "Deutsch", es: "Español", fr: "Français",
};
export const openGraphLocale = { pt: "pt_BR", en: "en_US", ja: "ja_JP", de: "de_DE", es: "es_ES", fr: "fr_FR" } as const;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Follow the browser's first preferred language, including regional variants. */
export function detectLocale(acceptLanguage: string | null): Locale {
  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((entry, index) => {
      const [language, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      return { language: language.toLowerCase(), quality: quality ? Number(quality.trim().slice(2)) : 1, index };
    })
    .filter((entry) => entry.language && Number.isFinite(entry.quality) && entry.quality > 0 && entry.quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)[0]?.language;
  const language = preferred?.split("-")[0];
  return isLocale(language) ? language : "en";
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || /^\/(api|_next|images|models|luts)(\/|$)/.test(path)) return path;
  const unprefixed = path.replace(new RegExp(`^/(${locales.join("|")})(?=/|[?#]|$)`), "");
  return `/${locale}${unprefixed === "/" ? "" : unprefixed}`;
}
