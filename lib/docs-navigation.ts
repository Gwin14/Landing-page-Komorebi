export type DocsNavItem = {
  slug: string;
  title: string;
  summary: string;
  group:
    | "Começar"
    | "Fotografar"
    | "Cores e efeitos"
    | "Organizar"
    | "Referência"
    | "Desenvolvimento";
  keywords: string[];
};

export const docsNavigation: DocsNavItem[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    summary: "Permissões, primeira captura e configuração inicial.",
    group: "Começar",
    keywords: ["instalação", "onboarding", "permissões"],
  },
  {
    slug: "camera",
    title: "Câmera e captura",
    summary: "Interface, lentes, controles, modos e Scanner de composição.",
    group: "Fotografar",
    keywords: [
      "iso",
      "obturador",
      "raw",
      "live photo",
      "retrato",
      "sorriso",
      "scan",
      "composição",
      "heif",
      "jpeg",
    ],
  },
  {
    slug: "controles-manuais",
    title: "Controles manuais",
    summary: "Aprenda a equilibrar luz, movimento, ruído, foco e cor antes de fotografar.",
    group: "Fotografar",
    keywords: [
      "iso",
      "ev",
      "obturador",
      "zebra",
    ],
  },
  {
    slug: "formatos-de-arquivo",
    title: "Formatos de arquivo",
    summary: "Escolha HEIF, JPEG, DNG ou um par RAW + foto processada e entenda o que fica salvo.",
    group: "Fotografar",
    keywords: [
      "raw",
      "proraw",
      "heic",
      "jpeg",
      "display p3",
    ],
  },
  {
    slug: "heif-plus",
    title: "HEIF+",
    summary: "Revele um DNG localmente, ajuste o processamento e acompanhe trabalhos pendentes.",
    group: "Fotografar",
    keywords: [
      "dng",
      "revelação",
      "10-bit",
      "raw 9",
      "pendente",
    ],
  },
  {
    slug: "image-stacking",
    title: "Image Stacking",
    summary: "Combine capturas com Bulb, Motion Blur e Dupla exposição e saiba quando usar cada modo.",
    group: "Fotografar",
    keywords: [
      "bulb",
      "motion blur",
      "dupla exposição",
    ],
  },
  {
    slug: "focus-bracketing",
    title: "Focus Bracketing",
    summary: "Fotografe vários planos de foco e combine detalhes de uma cena estática.",
    group: "Fotografar",
    keywords: [
      "macro",
      "foco",
      "tripé",
    ],
  },
  {
    slug: "scanner-de-composicao",
    title: "Scanner de composição",
    summary: "Escolha um assunto, use a guia de recorte e entenda a análise local e seus limites.",
    group: "Fotografar",
    keywords: [
      "scan",
      "minicpm",
      "modelo",
      "reenquadramento",
    ],
  },
  {
    slug: "cores-e-efeitos",
    title: "Cores e efeitos",
    summary: "LUTs, arquivos .cube, grão, halation e cópia sem efeitos.",
    group: "Cores e efeitos",
    keywords: ["lut", "cube", "grão", "halation"],
  },
  {
    slug: "galeria-e-projetos",
    title: "Galeria e projetos",
    summary: "Álbuns, EXIF, mapa e organização das fotos.",
    group: "Organizar",
    keywords: ["galeria", "álbum", "exif", "gps", "mapa"],
  },
  {
    slug: "metadados-e-autoria",
    title: "Metadados e autoria",
    summary: "Grave autoria, classifique fotos e entenda tags, GPS, EXIF, IPTC e XMP.",
    group: "Organizar",
    keywords: [
      "iptc",
      "xmp",
      "estrelas",
      "rating",
      "direitos autorais",
      "tags",
      "nomes",
    ],
  },
  {
    slug: "configuracoes",
    title: "Configurações",
    summary: "Referência das preferências persistidas no dispositivo.",
    group: "Referência",
    keywords: [
      "topbar",
      "histograma",
      "nível",
      "som",
      "localização",
      "inteligência",
      "minicpm",
    ],
  },
  {
    slug: "compatibilidade",
    title: "Compatibilidade",
    summary: "Matriz pública de suporte por plataforma.",
    group: "Referência",
    keywords: ["ios", "android", "hardware", "requisitos"],
  },
  {
    slug: "desenvolvimento",
    title: "Desenvolvimento",
    summary: "Ambiente, arquitetura, módulos nativos e contribuição.",
    group: "Desenvolvimento",
    keywords: ["expo", "react native", "módulos", "contribuir"],
  },
  {
    slug: "pipeline-de-imagem",
    title: "Pipeline de imagem",
    summary: "Entenda os caminhos de captura, efeitos, metadados e salvamento para contribuir com o app.",
    group: "Desenvolvimento",
    keywords: [
      "arquitetura",
      "fila",
      "sentry",
      "gpu",
      "cancelamento",
    ],
  },
];

export const docsGroups = Array.from(
  new Set(docsNavigation.map((item) => item.group)),
);

export function getDocsNeighbors(slug: string) {
  const index = docsNavigation.findIndex((item) => item.slug === slug);
  return {
    previous: index > 0 ? docsNavigation[index - 1] : null,
    next:
      index >= 0 && index < docsNavigation.length - 1
        ? docsNavigation[index + 1]
        : null,
  };
}
