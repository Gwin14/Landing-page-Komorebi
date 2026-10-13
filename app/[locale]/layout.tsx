import { notFound } from "next/navigation";
import LocaleProvider from "@/components/LocaleProvider";
import { getTranslator, getUiMessages } from "@/lib/i18n/translate";
import { isLocale, languageTag, locales } from "@/lib/i18n/routing";
import type { Metadata, Viewport } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTranslator(locale);
  return {
  metadataBase: SITE_URL,
  title: { default: t(SITE_TITLE), template: `%s | ${SITE_NAME}` },
  description: t(SITE_DESCRIPTION),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "photography",
  keywords: [
    "Komorebi",
    "aplicativo de câmera",
    "câmera manual",
    "fotografia mobile",
    "RAW",
    "ProRAW",
    "LUTs",
    "Live Photo",
    "iOS",
    "Android",
  ].map(t),
  referrer: "origin-when-cross-origin",
  manifest: `/${locale}/manifest.webmanifest`,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: t(SITE_TITLE),
    description: t(SITE_DESCRIPTION),
    siteName: SITE_NAME,
    locale: locale === "pt" ? "pt_BR" : "en",
    alternateLocale: locale === "pt" ? "en" : "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: t(SITE_TITLE),
    description: t(SITE_DESCRIPTION),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2e9" },
    { media: "(prefers-color-scheme: dark)", color: "#171815" },
  ],
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children, params,
}: Readonly<{ children: React.ReactNode }> & { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={languageTag[locale]} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem("komorebi-docs-theme")||"auto";var d=p==="dark"||(p==="auto"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.docsTheme=d?"dark":"light"}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocaleProvider locale={locale} messages={getUiMessages(locale)}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
