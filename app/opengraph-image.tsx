import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Phone({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        width: 160,
        height: 320,
        borderRadius: 28,
        background: "#2A2D31",
        padding: 10,
        display: "flex",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          background: dark ? "#F3F1EC" : "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: 16,
          gap: 10,
        }}
      >
        <div style={{ width: "60%", height: 10, borderRadius: 5, background: "#D9D6D0" }} />
        <div style={{ width: "40%", height: 10, borderRadius: 5, background: "#D9D6D0" }} />
        <div style={{ flexGrow: 1 }} />
        <div style={{ width: "100%", height: 34, borderRadius: 10, background: "#0B5E54" }} />
      </div>
    </div>
  );
}

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#16181B",
          color: "#F3F1EC",
          padding: 64,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#4FD1B5",
            }}
          >
            {SITE.appName}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.02,
              textTransform: "uppercase",
            }}
          >
            A price, a time, a deposit. While you&apos;re working.
          </div>
          <div style={{ fontSize: 24, color: "#C9C6BF" }}>{SITE.description}</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <Phone />
          <Phone dark />
        </div>
      </div>
    ),
    size,
  );
}
