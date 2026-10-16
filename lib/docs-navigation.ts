export type DocsNavItem = {
  slug: string;
  title: string;
  summary: string;
  group:
    | "Começar"
    | "Fotografar"
    | "Cores e efeitos"
    | "Organizar"
    | "Referência";
  keywords: string[];
};

export const docsNavigation: DocsNavItem[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros passos",
    summary: "Permissões, primeira captura e configuração inicial.",
    group: "Começar",
    keywords: ["instalação", "onboarding", "permissões", "presets", "profissionais", "criativos", "atalhos", "tour"],
  },
  {
    slug: "camera",
    title: "Câmera e captura",
    summary: "Interface, lentes, controles e modos de captura.",
    group: "Fotografar",
    keywords: [
      "iso",
      "obturador",
      "raw",
      "live photo",
      "retrato",
      "composição",
      "heif",
      "jpeg",
      "timer",
      "gestos",
      "volume",
      "atalhos",
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
      "ss",
      "wb",
      "af",
      "auto",
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
      "bayer",
      "zoom",
      "nenhum",
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
    summary: "Combine capturas com Rastros de luz, Motion Blur e Dupla exposição e saiba quando usar cada modo.",
    group: "Fotografar",
    keywords: [
      "rastros de luz",
      "light trails",
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
    slug: "cores-e-efeitos",
    title: "Cores e efeitos",
    summary: "LUTs, arquivos .cube, grão, halation e cópia sem efeitos.",
    group: "Cores e efeitos",
    keywords: ["lut", "cube", "grão", "halation"],
  },
  {
    slug: "galeria-e-projetos",
    title: "Galeria e projetos",
    summary: "Álbuns, EXIF, avaliação, compartilhamento e exclusão em lote.",
    group: "Organizar",
    keywords: ["galeria", "álbum", "exif", "gps", "mapa", "selecionar", "lote", "compartilhar", "apagar", "avaliar"],
  },
  {
    slug: "profundidade-na-galeria",
    title: "Profundidade na galeria",
    summary: "Profundidade local no iOS, original ou cópia, Retrato no Fotos e recuperação.",
    group: "Organizar",
    keywords: ["profundidade", "depth", "retrato", "cópia", "reverter", "live photo", "depthanything"],
  },
  {
    slug: "metadados-e-autoria",
    title: "Metadados e autoria",
    summary: "Grave autoria, classifique fotos e entenda GPS, EXIF, IPTC e XMP.",
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
      "tutorial",
      "guia",
      "prévia de efeitos",
      "histograma",
      "focus peaking",
      "megapixels",
      "widgets",
      "presets",
      "idioma",
      "posthog",
      "nível",
      "som",
      "localização",
      "diagnósticos",
      "sentry",
      "gestos",
    ],
  },
  {
    slug: "compatibilidade",
    title: "Compatibilidade",
    summary: "Matriz pública de suporte por plataforma.",
    group: "Referência",
    keywords: ["ios", "android", "hardware", "requisitos"],
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
