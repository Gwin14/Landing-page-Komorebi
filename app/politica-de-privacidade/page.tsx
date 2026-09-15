import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacySections } from "@/content/legal";

export const metadata: Metadata = { title: "Política de Privacidade do Komorebi", description: "Como o Komorebi processa fotos, localização, preferências e serviços externos." };
export default function PrivacyPage() { return <LegalPage title="Política de Privacidade" updated="julho de 2026" sections={privacySections} />; }
