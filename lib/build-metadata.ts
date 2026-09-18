import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";
import { SERVICES } from "@/lib/services";

// `path` is the page's own URL path (e.g. "/" or "/az-wrap-guys"), used for
// both og:url and the canonical tag. It intentionally excludes query params
// like ?service= so every service-preselected variant of a page canonicalizes
// to the same URL instead of splitting as separate pages.
//
// `shopSlug` is the raw URL slug (e.g. "az-wrap-guys"), passed through to the
// OG image route as-is rather than the already-humanized `shopName`. The
// image route runs it through the same shopNameFromSlug as everywhere else —
// if we instead forwarded the display name ("AZ Wrap Guys"), the override
// map's hyphenated keys wouldn't match it and it would get re-mangled by the
// generic title-case fallback on the way back out.
export function buildMetadata(shopName: string | null, shopSlug: string | null, serviceId: string | undefined, path: string): Metadata {
  const title = shopName ? `${shopName} | ${SITE.appName}` : `${SITE.appName} | ${SITE.title}`;
  const description = shopName
    ? `${shopName}: get an instant price, pick a time, and book online — no calls needed.`
    : SITE.description;

  const ogParams = new URLSearchParams();
  if (shopSlug) ogParams.set("shop", shopSlug);
  if (serviceId && SERVICES.some((s) => s.id === serviceId)) ogParams.set("service", serviceId);
  const ogImage = `/api/og${ogParams.size > 0 ? `?${ogParams.toString()}` : ""}`;

  const canonicalUrl = `${SITE.siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
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
