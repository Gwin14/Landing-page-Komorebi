import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Komorebi — Encontre a luz. Faça a sua foto.",
  description:
    "Uma câmera para fotografar com intenção. Explore controles manuais, RAW, Live Photo e cores únicas com os LUTs do Komorebi.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Komorebi — Fotografe com intenção.",
    description: "Controle a luz. Encontre suas cores. Guarde o que importa.",
    locale: "pt_BR",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>{children}</body>
    </html>
  );
}
