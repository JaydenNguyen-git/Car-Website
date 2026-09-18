import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SITE } from "@/lib/site-config";
import { SERVICES } from "@/lib/services";
import { shopNameFromSlug } from "@/lib/personalize";

const size = { width: 1200, height: 630 };

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

export async function GET(req: NextRequest) {
  // Reuse the same cleaner the slug route uses, so this route is safe even
  // when someone hits it directly with an arbitrary query string.
  const shop = shopNameFromSlug(req.nextUrl.searchParams.get("shop"));
  const serviceId = req.nextUrl.searchParams.get("service");
  const service = SERVICES.find((x) => x.id === serviceId);

  const eyebrow = service ? `${service.label} · quotes & booking` : SITE.appName;
  const headline = shop ? `${shop}'s new booking page is ready.` : "Let customers price and book your work. Without calling you.";
  const description = shop
    ? "Get an instant price, pick a time, and book — no calls needed."
    : SITE.description;

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
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: shop ? 50 : 56,
              fontWeight: 700,
              lineHeight: 1.05,
              textTransform: shop ? "none" : "uppercase",
            }}
          >
            {headline}
          </div>
          <div style={{ fontSize: 24, color: "#C9C6BF" }}>{description}</div>
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
