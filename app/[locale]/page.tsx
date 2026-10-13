import { getTranslator, translateContent } from "@/lib/i18n/translate";
import { localizedPath, languageTag } from "@/lib/i18n/routing";
import { pageMetadata, resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { questions } from "@/content/faq";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleRouteProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  return { ...pageMetadata(locale, "/", t(SITE_TITLE), t(SITE_DESCRIPTION)), title: { absolute: t(SITE_TITLE) } };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl()}#website`,
      url: absoluteUrl(),
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${absoluteUrl()}#app`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: absoluteUrl(),
      image: absoluteUrl("/images/app-icon.png"),
      applicationCategory: "PhotographyApplication",
      operatingSystem: "iOS 18 ou posterior; Android 8 ou posterior",
      softwareVersion: "Em desenvolvimento",
      featureList: [
        "Controles manuais de câmera",
        "Captura RAW e ProRAW em aparelhos compatíveis",
        "Oito LUTs incluídos e importação de arquivos .cube",
        "Live Photo e modo retrato em iPhones compatíveis",
        "Galeria integrada com dados EXIF",
        "Armazenamento local de fotos e preferências",
      ],
      inLanguage: "pt-BR",
    },
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl()}#faq`,
      mainEntity: questions.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
      inLanguage: "pt-BR",
    },
  ],
};

export default async function Page({ params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  const localizedJsonLd = translateContent(jsonLd, t);
  for (const entity of localizedJsonLd["@graph"]) {
    entity.inLanguage = languageTag[locale];
    if ("url" in entity) entity.url = absoluteUrl(localizedPath("/", locale));
    entity["@id"] = entity["@id"].replace(absoluteUrl(), absoluteUrl(localizedPath("/", locale)));
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localizedJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Landing />
    </>
  );
}
