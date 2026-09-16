import type { Metadata } from "next";
import Landing from "@/components/Landing";
import { questions } from "@/content/faq";
import {
  PROJECT_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  alternates: { canonical: "/", languages: { "pt-BR": "/", "x-default": "/" } },
  openGraph: { title: SITE_TITLE, description: SITE_DESCRIPTION, url: "/" },
};

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
      codeRepository: PROJECT_URL,
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Landing />
    </>
  );
}
