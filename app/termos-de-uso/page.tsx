import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = { title: "Termos de Uso do Komorebi", description: "Condições, responsabilidades e limitações para usar o aplicativo Komorebi." };
export default function TermsPage() { return <LegalPage title="Termos de Uso" updated="julho de 2026" sections={termsSections} />; }
