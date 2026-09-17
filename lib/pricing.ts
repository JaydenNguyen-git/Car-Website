// Demo pricing data. Detailers set their own packages and prices in the real product;
// this file only drives the interactive demo on the landing page.

export type Vehicle = { id: string; label: string; multiplier: number };
export type Package = { id: string; label: string; base: number; time: string };
export type Condition = { id: string; label: string; sub: string; multiplier: number };

export const VEHICLES: Vehicle[] = [
  { id: "sedan", label: "Sedan / Coupe", multiplier: 1 },
  { id: "suv", label: "SUV / Crossover", multiplier: 1.2 },
  { id: "truck", label: "Truck", multiplier: 1.3 },
  { id: "xl", label: "Van / 3-row SUV", multiplier: 1.45 },
];

export const PACKAGES: Package[] = [
  { id: "wash", label: "Maintenance wash", base: 60, time: "About 1–2 hours" },
  { id: "interior", label: "Full interior", base: 150, time: "About 3 hours" },
  { id: "full", label: "Full detail", base: 230, time: "About 4–5 hours" },
  { id: "coating", label: "Ceramic coating", base: 650, time: "1–2 days" },
];

export const CONDITIONS: Condition[] = [
  { id: "light", label: "Light", sub: "Regular upkeep, no stains", multiplier: 1 },
  {
    id: "moderate",
    label: "Moderate",
    sub: "Some stains, crumbs, a little pet hair",
    multiplier: 1.15,
  },
  {
    id: "heavy",
    label: "Heavy",
    sub: "Lots of pet hair, spills, or odors",
    multiplier: 1.35,
  },
];

export const TIME_SLOTS: string[] = ["Thu 9:00 AM", "Thu 2:00 PM", "Fri 10:00 AM", "Sat 8:00 AM"];

export function money(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function roundToTen(n: number): number {
  return Math.round(n / 10) * 10;
}

export function computePriceRange(vehicle: Vehicle | undefined, pkg: Package | undefined, cond: Condition | undefined) {
  if (!vehicle || !pkg || !cond) return { low: 0, high: 0 };
  const low = roundToTen(pkg.base * vehicle.multiplier * cond.multiplier);
  const high = roundToTen(low * 1.2);
  return { low, high };
}

export function needsApproval(pkgId: string | null, condId: string | null): boolean {
  return pkgId === "coating" || condId === "heavy";
}

export function depositFor(pkgId: string | null): number {
  return pkgId === "coating" ? 100 : 50;
}
