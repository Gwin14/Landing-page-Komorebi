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
    "Sim. Fotos, preferências, LUTs personalizados e a geração de profundidade ficam no dispositivo. Clima, mapa e EXIF Frame usam serviços externos. O compartilhamento de uso com PostHog e de diagnósticos com Sentry começa ativado e pode ser desligado no onboarding beta ou em Configurações → Sobre e suporte. Essas integrações não enviam fotos ou localização; gravar GPS nas fotos é opcional.",
  ],
  [
    "Onde posso baixar o app?",
    "O Komorebi está em desenvolvimento ativo. A lista de espera é para iPhone: cadastre seu e-mail para receber o convite futuramente. O e-mail será usado somente para esse convite.",
  ],
] as const;
