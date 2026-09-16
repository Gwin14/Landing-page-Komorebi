import { compatibilitySummary } from "@/lib/feature-matrix";

export const questions = [
  [
    "O que é o Komorebi?",
    "Um app de câmera para quem gosta de fotografar com intenção. Ele combina captura, controles manuais, LUTs e uma galeria integrada, com fotos e preferências armazenadas no dispositivo.",
  ],
  ["Quais aparelhos são compatíveis?", compatibilitySummary],
  [
    "Posso usar meus próprios LUTs?",
    "Sim. Além dos oito LUTs incluídos, você pode importar arquivos .cube nas configurações. Os LUTs personalizados ficam salvos no dispositivo, prontos para as próximas fotos.",
  ],
  [
    "Minhas fotos ficam no dispositivo?",
    "Sim. Fotos, preferências e LUTs personalizados ficam no dispositivo. Recursos específicos, como clima, mapa e EXIF Frame, usam serviços externos. A localização nas fotos é opcional.",
  ],
  [
    "Onde posso baixar o app?",
    "O Komorebi está em desenvolvimento ativo. Acompanhe as novidades e a disponibilidade pelo repositório oficial do projeto.",
  ],
] as const;
