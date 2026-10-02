export type FeatureStatus =
  "supported" | "conditional" | "unavailable" | "validate";

export type Feature = {
  id: string;
  title: string;
  ios: FeatureStatus;
  android: FeatureStatus;
  condition: string;
  sources: string[];
  verifiedCommit: string;
};

export const APP_VERIFIED_COMMIT = "a24c4ab619cdb8f4d16dbb5586876957b5700f43";
export const APP_VERIFIED_DATE = "2 de outubro de 2026";

export const featureMatrix: Feature[] = [
  {
    id: "standard-capture",
    title: "Captura padrão",
    ios: "supported",
    android: "supported",
    condition: "Câmera e biblioteca de Fotos autorizadas.",
    sources: ["app/index.jsx", "app/utils/cameraUtils.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "physical-lenses",
    title: "Lentes físicas",
    ios: "conditional",
    android: "conditional",
    condition: "O aparelho precisa informar mais de uma lente compatível.",
    sources: [
      "app/hooks/uselensselector.js",
      "app/components/LensSelector.jsx",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "manual-controls",
    title: "Controles manuais",
    ios: "conditional",
    android: "unavailable",
    condition:
      "O módulo manual existe apenas no iOS; ISO, obturador, foco e balanço de branco dependem da câmera ativa.",
    sources: [
      "app/hooks/useManualCameraControls.js",
      "modules/camera-manual-controls",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "luts-effects",
    title: "LUTs, grão e halation",
    ios: "supported",
    android: "supported",
    condition:
      "O processamento depende de uma captura válida e acesso ao armazenamento local.",
    sources: [
      "app/utils/lutCatalog.js",
      "app/utils/grainCatalog.js",
      "app/utils/halationCatalog.js",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "raw-proraw",
    title: "RAW e ProRAW",
    ios: "conditional",
    android: "unavailable",
    condition:
      "Requer módulo nativo iOS e formato RAW informado pela câmera ativa.",
    sources: ["modules/camera-raw-capture", "app/hooks/useRawCapture.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "live-photo",
    title: "Live Photo",
    ios: "conditional",
    android: "unavailable",
    condition: "Requer iOS, lente compatível e RAW e retrato desativados.",
    sources: ["modules/camera-live-photo", "app/hooks/useLivePhotoCapture.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "portrait",
    title: "Modo retrato",
    ios: "conditional",
    android: "unavailable",
    condition: "Requer iOS e suporte a profundidade ou matte na câmera ativa.",
    sources: [
      "modules/camera-portrait-capture",
      "app/hooks/usePortraitCapture.js",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "camera-control",
    title: "Camera Control",
    ios: "conditional",
    android: "unavailable",
    condition:
      "Disponível somente em iPhones com o controle físico correspondente.",
    sources: [
      "modules/camera-control-button",
      "app/hooks/useCameraControlButton.js",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "composition-scan",
    title: "Scanner de composição",
    ios: "validate",
    android: "unavailable",
    condition:
      "Beta no iOS. A análise básica é local; o modelo semântico opcional ocupa cerca de 1,6 GB. Validação final em aparelho físico está pendente.",
    sources: [
      "modules/composition-scan",
      "app/hooks/useCompositionScan.js",
      "docs/composition-scan.md",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "heif-jpeg",
    title: "Seleção entre HEIF e JPEG",
    ios: "supported",
    android: "unavailable",
    condition:
      "HEIF é o padrão no iOS; HEIF+ exige RAW e JPEG é opcional. O Android mantém saída JPEG.",
    sources: [
      "app/context/SettingsContext.js",
      "app/hooks/usePhotoProcessingQueue.js",
      "app/utils/cameraUtils.js",
    ],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "gps-weather",
    title: "GPS e clima",
    ios: "conditional",
    android: "conditional",
    condition:
      "Localização durante o uso precisa estar autorizada; clima requer internet.",
    sources: ["app/components/PhotoWeather.jsx", "app/index.jsx"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "gallery-projects",
    title: "Galeria e projetos",
    ios: "supported",
    android: "supported",
    condition:
      "Requer acesso à biblioteca de mídia; projetos usam álbuns locais.",
    sources: ["app/components/Galery.jsx", "app/utils/projects.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "heif-plus", title: "Revelação HEIF+", ios: "validate", android: "unavailable",
    condition: "Exige RAW na lente ativa. Pausado em Live Photo, Retrato e stacking. Qualidade e desempenho em iPhone ainda precisam de validação.",
    sources: ["app/utils/heifPlusSettings.js", "modules/camera-raw-capture/ios/HeifPlusEngine.swift"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "raw-pair", title: "RAW + foto processada", ios: "conditional", android: "unavailable",
    condition: "Lente com RAW e ambas as saídas selecionadas; um asset contém DNG e HEIC/JPEG. A escolha do original pelo Fotos varia por versão do iOS.",
    sources: ["app/utils/fileFormatSelection.js", "modules/camera-raw-capture/index.ts"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "image-stacking", title: "Bulb, Motion Blur e Dupla exposição", ios: "validate", android: "unavailable",
    condition: "Requer capacidade nativa anunciada pela lente. Composição, interrupção e desempenho precisam de validação física.",
    sources: ["modules/camera-image-stacking/index.ts", "app/components/ImageStackingSelector.jsx"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "focus-bracketing", title: "Focus Bracketing", ios: "validate", android: "unavailable",
    condition: "Lente física com Metal, foco personalizado e bloqueio de exposição/balanço de branco. De 3 a 20 fotos; exige cena estática e confirmação dos limites.",
    sources: ["modules/camera-image-stacking/ios/FocusBracketing.swift", "app/hooks/useFocusBracketing.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "catalog-metadata", title: "Autoria e classificação", ios: "conditional", android: "conditional",
    condition: "Permissão de escrita. No iOS 27 com SDK compatível, a nota sincroniza com o catálogo Fotos; demais casos usam metadados da imagem.",
    sources: ["modules/shared/PhotoCatalogMetadata.swift", "app/utils/photoCatalogMetadata.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "photo-intelligence", title: "Tags e nomes inteligentes", ios: "conditional", android: "unavailable",
    condition: "Opções independentes, desligadas por padrão. Requerem modelo local pronto; falha na análise não impede a captura.",
    sources: ["app/utils/photoIntelligence.js", "app/hooks/usePhotoProcessingQueue.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "apple-styles", title: "Edição no Fotos da Apple", ios: "validate", android: "unavailable",
    condition: "Experimental, com módulo nativo iOS. Gera HEIF para edição no Fotos e pausa em Live Photo, Retrato, RAW e HEIF+.",
    sources: ["app/utils/photographicStylesPolicy.js", "modules/camera-photographic-styles/index.ts"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
];

export const statusLabels: Record<FeatureStatus, string> = {
  supported: "Suportado",
  conditional: "Condicional",
  unavailable: "Indisponível",
  validate: "A validar",
};

export const compatibilitySummary =
  "O Komorebi requer iOS 18 ou Android 8. Controles manuais completos, RAW/ProRAW, Live Photo, retrato e Camera Control são recursos condicionais do iOS. Scanner de composição, HEIF+ e Image Stacking também exigem iOS e têm validações de qualidade ou desempenho pendentes em aparelho físico.";
