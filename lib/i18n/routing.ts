export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const localeCookie = "komorebi-locale";
export const languageTag = { pt: "pt-BR", en: "en" } as const;

export function isLocale(value: unknown): value is Locale {
  return value === "pt" || value === "en";
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
  return preferred === "pt" || preferred?.startsWith("pt-") ? "pt" : "en";
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/") || path.startsWith("//") || /^\/(api|_next|images|models|luts)(\/|$)/.test(path)) return path;
  const unprefixed = path.replace(/^\/(pt|en)(?=\/|[?#]|$)/, "");
  return `/${locale}${unprefixed === "/" ? "" : unprefixed}`;
}
