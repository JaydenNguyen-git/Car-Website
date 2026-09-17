// Thin wrapper so event tracking works with Plausible (or Vercel Analytics' `va`)
// when present, and no-ops otherwise. No analytics library is bundled.

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
    va?: (event: "event", name: string, props?: EventProps) => void;
  }
}

export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.va?.("event", event, props);
  } catch {
    // Analytics must never break the page.
  }
}
