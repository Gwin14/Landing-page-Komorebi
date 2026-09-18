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
