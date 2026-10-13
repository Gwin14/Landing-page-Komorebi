import uiKeys from "@/content/i18n/ui-keys.json";
import english from "@/content/i18n/en.json";
import type { Locale } from "./routing";

export type Translate = (text: string) => string;
const messages: Record<string, string> = english;
export function getTranslator(locale: Locale): Translate {
  return locale === "en" ? (text) => messages[text] ?? text : (text) => text;
}

/** Translate display copy while retaining route slugs, anchors, assets and status IDs. */
export function translateContent<T>(value: T, t: Translate): T {
  if (typeof value === "string") return t(value) as T;
  if (Array.isArray(value)) return value.map((item) => translateContent(item, t)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      ["id", "slug", "href", "src", "status", "ios", "android", "color", "sources", "verifiedCommit"].includes(key)
        ? item : translateContent(item, t),
    ])) as T;
  }
  return value;
}

/** Only interface copy crosses the server/client boundary; guide bodies stay on the server. */
export function getUiMessages(locale: Locale): Record<string, string> {
  return locale === "en" ? Object.fromEntries(uiKeys.map((key) => [key, messages[key]])) : {};
}
