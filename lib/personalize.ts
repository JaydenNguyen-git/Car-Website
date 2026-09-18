// Turns a URL slug (e.g. /man-cave-colorado) into a display name for
// personalizing the page — the demo's phone header, the CTA heading, and
// the link-preview title/OG image sent in cold outreach.
//
// Never throws and never returns garbage: anything that doesn't look like a
// real business name (empty, no letters, a reserved technical filename)
// resolves to null so callers fall back to the generic copy instead of
// rendering something like "Quote your work, undefined."

import { SHOP_NAME_OVERRIDES } from "@/lib/shop-overrides";

const MAX_LEN = 60;

// Filenames/paths a browser or crawler might request that would otherwise
// fall through to this catch-all route.
const RESERVED_RAW = new Set(["favicon.ico", "robots.txt", "sitemap.xml", "manifest.json", "sw.js", "undefined", "null", "api", "icon", "og"]);

export function shopNameFromSlug(slug: string | string[] | undefined | null): string | null {
  const raw = Array.isArray(slug) ? slug[0] : slug;
  if (!raw) return null;

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  const rawLower = decoded.trim().toLowerCase();
  if (!rawLower || RESERVED_RAW.has(rawLower)) return null;
  if (rawLower in SHOP_NAME_OVERRIDES) return SHOP_NAME_OVERRIDES[rawLower];

  const spaced = decoded.replace(/[-_]+/g, " ");
  const cleaned = spaced
    .replace(/[^a-zA-Z0-9'&\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_LEN)
    .trim();

  if (!cleaned || !/[a-zA-Z]/.test(cleaned)) return null;

  return cleaned
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word))
    .join(" ");
}
