import type { Metadata, Viewport } from "next";
import {
  PROJECT_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: PROJECT_URL }],
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
  ],
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/icon.svg",
    apple: [{ url: "/images/app-icon.png", sizes: "1024x1024" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2e9" },
    { media: "(prefers-color-scheme: dark)", color: "#171815" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
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
        {children}
      </body>
    </html>
  );
}
