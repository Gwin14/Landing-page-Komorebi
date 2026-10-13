"use client";
import { useI18n } from "@/components/LocaleProvider";

import { SunMoon } from "lucide-react";
import { useEffect, useRef } from "react";

type ThemePreference = "auto" | "dark" | "light";

const storageKey = "komorebi-docs-theme";

function applyTheme(preference: ThemePreference) {
  const isDark =
    preference === "dark" ||
    (preference === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.docsTheme = isDark ? "dark" : "light";
}

export default function ThemeToggle() {
  const { t } = useI18n();
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const initial: ThemePreference =
      saved === "dark" || saved === "light" ? saved : "auto";
    if (selectRef.current) selectRef.current.value = initial;
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncAutomaticTheme = () => {
      if ((localStorage.getItem(storageKey) || "auto") === "auto")
        applyTheme("auto");
    };
    media.addEventListener("change", syncAutomaticTheme);
    return () => media.removeEventListener("change", syncAutomaticTheme);
  }, []);

  return (
    <label className="theme-toggle">
      <SunMoon size={16} aria-hidden="true" />
      <span className="sr-only">{t("Tema da documentação")}</span>
      <select
        aria-label={t("Tema da documentação")}
        ref={selectRef}
        defaultValue="auto"
        onChange={(event) => {
          const next = event.target.value as ThemePreference;
          if (next === "auto") localStorage.removeItem(storageKey);
          else localStorage.setItem(storageKey, next);
          applyTheme(next);
        }}
      >
        <option value="auto">{t("Automático")}</option>
        <option value="dark">{t("Escuro")}</option>
        <option value="light">{t("Claro")}</option>
      </select>
    </label>
  );
}
