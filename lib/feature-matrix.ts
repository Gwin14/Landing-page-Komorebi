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

export const APP_VERIFIED_COMMIT = "9cd38a3f04c2876ccee0e006eee2d836de6e5820";
export const APP_VERIFIED_DATE = "18 de setembro de 2026";

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
    android: "conditional",
    condition:
      "ISO, obturador, foco e balanço de branco variam conforme a câmera ativa.",
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
      "HEIF é o padrão no iOS, com JPEG opcional. O Android mantém a saída JPEG.",
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
];

export const statusLabels: Record<FeatureStatus, string> = {
  supported: "Suportado",
  conditional: "Condicional",
  unavailable: "Indisponível",
  validate: "A validar",
};

export const compatibilitySummary =
  "O Komorebi requer iOS 18 ou Android 8. RAW/ProRAW, Live Photo, retrato e Camera Control são recursos condicionais do iOS. O Scanner de composição está em beta e ainda precisa de validação final em aparelho físico.";
