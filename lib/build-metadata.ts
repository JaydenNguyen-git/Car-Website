import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";
import { SERVICES } from "@/lib/services";

export function buildMetadata(shopName: string | null, serviceId: string | undefined): Metadata {
  const title = shopName ? `${shopName} | ${SITE.appName}` : `${SITE.appName} | ${SITE.title}`;
  const description = shopName
    ? `${shopName}: get an instant price, pick a time, and book online — no calls needed.`
    : SITE.description;

  const ogParams = new URLSearchParams();
  if (shopName) ogParams.set("shop", shopName);
  if (serviceId && SERVICES.some((s) => s.id === serviceId)) ogParams.set("service", serviceId);
  const ogImage = `/api/og${ogParams.size > 0 ? `?${ogParams.toString()}` : ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: SITE.siteUrl,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
