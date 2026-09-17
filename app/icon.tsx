import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site-config";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B5E54",
          color: "#FFFFFF",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 14,
        }}
      >
        {SITE.iconInitial}
      </div>
    ),
    size,
  );
}
