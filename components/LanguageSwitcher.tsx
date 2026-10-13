"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { isLocale, localeCookie, localizedPath } from "@/lib/i18n/routing";
import { useI18n } from "./LocaleProvider";

export default function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <label className="language-switcher">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{t("Idioma do site")}</span>
      <select aria-label={t("Idioma do site")} value={locale} onChange={(event) => {
        const next = event.target.value;
        if (!isLocale(next)) return;
        document.cookie = `${localeCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
        router.push(`${localizedPath(pathname, next)}${location.search}${location.hash}`, { scroll: false });
      }}>
        <option value="pt" lang="pt-BR">Português</option>
        <option value="en" lang="en">English</option>
      </select>
    </label>
  );
}
