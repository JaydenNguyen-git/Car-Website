// Captures ?ref= and UTM params on first visit and keeps them for the session,
// so a signup submitted later can still be credited to the outreach channel
// that brought the visitor in (Instagram DM vs email vs an ad).

const STORAGE_KEY = "attribution";
const TRACKED_KEYS = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type Attribution = Partial<Record<(typeof TRACKED_KEYS)[number], string>>;

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return; // first touch wins
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of TRACKED_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // Storage can be unavailable (private browsing, etc.) — attribution is best-effort.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
