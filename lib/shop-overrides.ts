// Explicit slug -> display name overrides.
//
// The generic fallback in shopNameFromSlug title-cases every word, which
// gets state abbreviations and other acronyms wrong (az-wrap-guys becomes
// "Az Wrap Guys" instead of "AZ Wrap Guys"). There's no reliable way to
// algorithmically guess which words should stay uppercase, so any shop
// whose real name doesn't survive naive title-casing gets an entry here
// instead — this map is checked first and wins outright.
//
// Key: the exact slug as it appears in the URL (e.g. "/az-wrap-guys").
// Value: the name to display exactly as it should read.
export const SHOP_NAME_OVERRIDES: Record<string, string> = {
  "az-wrap-guys": "AZ Wrap Guys",
};
