import type { MetadataRoute } from "next";
import { docsPages } from "@/content/docs-pages";
import { absoluteUrl } from "@/lib/seo";
import { locales, localizedPath } from "@/lib/i18n/routing";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/lista-de-espera", "/docs", "/politica-de-privacidade", "/termos-de-uso", ...docsPages.map((page) => `/docs/${page.slug}`)];
  return paths.flatMap((path) => locales.map((locale) => ({
    url: absoluteUrl(localizedPath(path, locale)),
    changeFrequency: path.includes("privacidade") || path.includes("termos") ? "yearly" as const : "monthly" as const,
    priority: path === "/" ? 1 : path === "/lista-de-espera" ? 0.9 : path === "/docs" ? 0.8 : path.startsWith("/docs/") ? 0.7 : 0.3,
    alternates: { languages: { "pt-BR": absoluteUrl(localizedPath(path, "pt")), en: absoluteUrl(localizedPath(path, "en")), "x-default": absoluteUrl(path) } },
    ...(path === "/" ? { images: [absoluteUrl("/images/app-preview.png"), absoluteUrl("/images/forest.jpg")] } : {}),
  })));
}
