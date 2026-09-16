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

export const APP_VERIFIED_COMMIT = "e3bb093cc7ad5323db62e1d1cb14d45d943c3f54";
export const APP_VERIFIED_DATE = "15 de setembro de 2026";

export const featureMatrix: Feature[] = [
  {
    id: "standard-capture",
    title: "Captura padrão",
    ios: "supported",
    android: "supported",
    condition: "Câmera e biblioteca de Fotos autorizadas.",
    sources: ["app/index.jsx", "app/hooks/usePhotoCapture.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "physical-lenses",
    title: "Lentes físicas",
    ios: "conditional",
    android: "conditional",
    condition: "O aparelho precisa informar mais de uma lente compatível.",
    sources: [
      "app/hooks/useCameraDevices.js",
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
    id: "gps-weather",
    title: "GPS e clima",
    ios: "conditional",
    android: "conditional",
    condition:
      "Localização durante o uso precisa estar autorizada; clima requer internet.",
    sources: ["app/hooks/useWeather.js", "app/utils/exifLocation.js"],
    verifiedCommit: APP_VERIFIED_COMMIT,
  },
  {
    id: "gallery-projects",
    title: "Galeria e projetos",
    ios: "supported",
    android: "supported",
    condition:
      "Requer acesso à biblioteca de mídia; projetos usam álbuns locais.",
    sources: ["app/components/Gallery.jsx", "app/utils/projects.js"],
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
  "O Komorebi requer iOS 18 ou Android 8. RAW/ProRAW, Live Photo, retrato e Camera Control são recursos condicionais do iOS e dependem do aparelho e da lente.";
