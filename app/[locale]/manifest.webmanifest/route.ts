import { getTranslator } from "@/lib/i18n/translate";
import { languageTag, locales } from "@/lib/i18n/routing";
import { resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return Response.json({
    name: t("Komorebi — Câmera manual"),
    short_name: "Komorebi",
    description:
      t("Câmera para fotografar com intenção, com controles manuais, RAW e LUTs autorais."),
    start_url: `/${locale}`,
    display: "standalone",
    background_color: "#f5f2e9",
    theme_color: "#f5f2e9",
    lang: languageTag[locale],
    orientation: "portrait-primary",
    categories: ["photography", "utilities"],
    icons: [
      {
        src: "/images/app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  }, { headers: { "Content-Type": "application/manifest+json" } });
}
