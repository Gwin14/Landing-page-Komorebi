import { ImageResponse } from "next/og";

export const alt =
  "Komorebi — uma câmera para sentir a luz, encontrar suas cores e fotografar com intenção";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
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
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          background: "#f6a800",
          borderRadius: "50%",
          right: 85,
          top: 185,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#171815",
          fontSize: 92,
          fontWeight: 700,
        }}
      >
        K
      </div>
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
          <div
            style={{
              width: 34,
              height: 34,
              border: "2px solid #f6a800",
              borderRadius: "50%",
              display: "flex",
            }}
          />
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
          >
            MENOS AUTOMÁTICO. MAIS SEU.
          </div>
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
            <span>O instante passa.</span>
            <span>O seu olhar fica.</span>
          </div>
          <div style={{ fontSize: 24, color: "#c9c8bf" }}>
            Controle manual · RAW · LUTs autorais
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
