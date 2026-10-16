/** Fold accents and width variants; keep kana voicing and other scripts intact. */
export function normalizeSearchText(text: string, locale: string): string {
  return text.normalize("NFKC").toLocaleLowerCase(locale)
    .normalize("NFD").replace(/([a-z])\p{M}+/gu, "$1").normalize("NFC").trim();
}
