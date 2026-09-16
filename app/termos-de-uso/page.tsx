import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsSections } from "@/content/legal";

const title = "Termos de Uso do Komorebi";
const description =
  "Condições, responsabilidades e limitações para usar o aplicativo Komorebi.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/termos-de-uso" },
  openGraph: { title, description, url: "/termos-de-uso" },
};
export default function TermsPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      updated="julho de 2026"
      sections={termsSections}
    />
  );
}
