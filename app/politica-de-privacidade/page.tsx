import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacySections } from "@/content/legal";

const title = "Política de Privacidade do Komorebi";
const description =
  "Como o Komorebi processa fotos, localização, preferências e serviços externos.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: { title, description, url: "/politica-de-privacidade" },
};
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updated="julho de 2026"
      sections={privacySections}
    />
  );
}
