import type { Metadata } from "next";
import DocsHeader from "@/components/docs/DocsHeader";

export const metadata: Metadata = {
  title: { default: "Documentação do Komorebi", template: "%s | Komorebi" },
  description: "Guias de uso, compatibilidade e desenvolvimento do aplicativo de câmera Komorebi.",
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="docs-site">
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <DocsHeader />
      {children}
    </div>
  );
}
