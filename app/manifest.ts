import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Komorebi — Câmera manual",
    short_name: "Komorebi",
    description:
      "Câmera para fotografar com intenção, com controles manuais, RAW e LUTs autorais.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2e9",
    theme_color: "#f5f2e9",
    lang: "pt-BR",
    orientation: "portrait-primary",
    categories: ["photography", "utilities"],
    icons: [
      {
        src: "/images/app-icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
