import { getTranslator } from "@/lib/i18n/translate";
import { resolveLocale, type LocaleRouteProps } from "@/lib/i18n/metadata";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Komorebi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpenGraphImage({ params }: LocaleRouteProps) {
  const locale = await resolveLocale(params);
  const t = getTranslator(locale);
  const logo = await readFile(join(process.cwd(), "public/images/app-icon-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    <div
      style={{
        background: "#171815",
        color: "#f5f2e9",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          border: "1px solid rgba(245,242,233,.18)",
          borderRadius: "50%",
          right: -110,
          top: -10,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          border: "1px solid rgba(245,242,233,.12)",
          borderRadius: "50%",
          right: 0,
          top: 100,
          display: "flex",
        }}
      />
      {/* ImageResponse requires native image elements. */}
      <img
        src={logoSrc}
        alt=""
        width={260}
        height={260}
        style={{ position: "absolute", right: 85, top: 185 }}
      />
      <div
        style={{
          padding: "70px 76px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 800,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={logoSrc} alt="" width={40} height={40} />
          <span style={{ fontSize: 30, fontWeight: 700 }}>komorebi.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#f6a800",
              fontSize: 18,
              letterSpacing: 5,
              fontWeight: 700,
            }}
          >{t("MENOS AUTOMÁTICO. MAIS SEU.")}</div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.03,
              letterSpacing: -3,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{t("O instante passa.")}</span>
            <span>{t("O seu olhar fica.")}</span>
          </div>
          <div style={{ fontSize: 24, color: "#c9c8bf" }}>{t("Controle manual · RAW · LUTs autorais")}</div>
        </div>
      </div>
    </div>,
    size,
  );
}
