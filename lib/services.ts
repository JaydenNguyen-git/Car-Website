// All service data for the demo. Shaped so a shop's real config could later
// come from a database with the same structure.

export type Vehicle = { id: string; label: string; multiplier: number };
export type Package = { id: string; label: string; base: number; time: string };
export type Option = { id: string; label: string; sub: string; mult: number };

export type Service = {
  id: string;
  label: string;
  sub: string;
  deposit: number;
  photos: boolean;
  photoPrompt?: string;
  multiDay: boolean;
  optionTitle: string;
  optionHeading: string;
  packages: Package[];
  options: Option[];
  needsApproval: (pkgId: string | null, optId: string | null) => boolean;
};

export const VEHICLES: Vehicle[] = [
  { id: "sedan", label: "Sedan / Coupe", multiplier: 1 },
  { id: "suv", label: "SUV / Crossover", multiplier: 1.15 },
  { id: "truck", label: "Truck", multiplier: 1.2 },
  { id: "xl", label: "Van / 3-row SUV", multiplier: 1.3 },
];

export const SAME_DAY_SLOTS: string[] = ["Thu 9:00 AM", "Thu 2:00 PM", "Fri 10:00 AM", "Sat 8:00 AM"];
export const DROPOFF_SLOTS: string[] = ["Drop off Mon 8:00 AM", "Drop off Tue 8:00 AM", "Drop off Wed 8:00 AM", "Drop off Thu 8:00 AM"];

export const SERVICES: Service[] = [
  {
    id: "tint",
    label: "Window tint",
    sub: "Heat, glare, and privacy",
    deposit: 50,
    photos: false,
    multiDay: false,
    optionTitle: "Pick a film",
    optionHeading: "Film",
    packages: [
      { id: "front-two", label: "Front two windows", base: 150, time: "About 1 hour" },
      { id: "all-sides", label: "All sides and rear", base: 300, time: "About 2–3 hours" },
      { id: "windshield", label: "Windshield", base: 250, time: "About 1–2 hours" },
      { id: "full-plus-windshield", label: "Full car plus windshield", base: 500, time: "About 3–4 hours" },
    ],
    options: [
      { id: "carbon", label: "Carbon", sub: "Cuts glare, no signal interference", mult: 1.0 },
      { id: "ceramic", label: "Ceramic", sub: "Much better heat rejection", mult: 1.35 },
      { id: "ir-ceramic", label: "IR ceramic", sub: "Best heat rejection", mult: 1.7 },
    ],
    needsApproval: () => false,
  },
  {
    id: "detail",
    label: "Detailing",
    sub: "Interior, exterior, or both",
    deposit: 50,
    photos: true,
    photoPrompt: "Add photos (helps lock your price)",
    multiDay: false,
    optionTitle: "How does it look right now?",
    optionHeading: "Condition",
    packages: [
      { id: "wash", label: "Maintenance wash", base: 60, time: "About 1–2 hours" },
      { id: "interior", label: "Full interior", base: 150, time: "About 3 hours" },
      { id: "full", label: "Full detail", base: 230, time: "About 4–5 hours" },
    ],
    options: [
      { id: "light", label: "Light", sub: "Regular upkeep, no stains", mult: 1.0 },
      { id: "moderate", label: "Moderate", sub: "Some stains, crumbs, a little pet hair", mult: 1.15 },
      { id: "heavy", label: "Heavy", sub: "Lots of pet hair, spills, or odors", mult: 1.35 },
    ],
    needsApproval: (_pkg, opt) => opt === "heavy",
  },
  {
    id: "coating",
    label: "Ceramic coating",
    sub: "Long-term paint protection",
    deposit: 100,
    photos: true,
    photoPrompt: "Add photos of the paint in sunlight",
    multiDay: true,
    optionTitle: "What's the paint like?",
    optionHeading: "Paint",
    packages: [
      { id: "1yr", label: "1-year coating", base: 500, time: "About 1 day" },
      { id: "3yr", label: "3-year coating", base: 900, time: "1–2 days" },
      { id: "5yr", label: "5-year coating", base: 1400, time: "2 days" },
    ],
    options: [
      { id: "new", label: "New or like new", sub: "No correction needed", mult: 1.0 },
      { id: "light-swirls", label: "Light swirls", sub: "One-step polish before coating", mult: 1.25 },
      { id: "swirls-scratches", label: "Swirls and scratches", sub: "Multi-step paint correction", mult: 1.6 },
    ],
    needsApproval: (_pkg, opt) => opt !== "new",
  },
  {
    id: "ppf",
    label: "Paint protection film",
    sub: "Clear film against chips and scratches",
    deposit: 200,
    photos: true,
    photoPrompt: "Add photos of any existing chips or damage",
    multiDay: true,
    optionTitle: "Pick a finish",
    optionHeading: "Finish",
    packages: [
      { id: "partial-front", label: "Partial front", base: 900, time: "About 1 day" },
      { id: "full-front", label: "Full front", base: 1800, time: "1–2 days" },
      { id: "track", label: "Track pack", base: 2400, time: "2 days" },
      { id: "full-body", label: "Full body", base: 5500, time: "3–5 days" },
    ],
    options: [
      { id: "gloss", label: "Gloss", sub: "Keeps the factory shine", mult: 1.0 },
      { id: "matte", label: "Matte (stealth)", sub: "Turns gloss paint satin", mult: 1.15 },
    ],
    needsApproval: (pkg) => pkg === "track" || pkg === "full-body",
  },
  {
    id: "vinyl",
    label: "Vinyl wrap",
    sub: "Color change, roof, or chrome delete",
    deposit: 250,
    photos: true,
    photoPrompt: "Add photos of the current paint",
    multiDay: true,
    optionTitle: "Pick a finish",
    optionHeading: "Finish",
    packages: [
      { id: "roof", label: "Roof wrap", base: 400, time: "Half a day" },
      { id: "chrome-delete", label: "Chrome delete", base: 600, time: "About 1 day" },
      { id: "color-change", label: "Full color change", base: 3500, time: "3–5 days" },
    ],
    options: [
      { id: "gloss", label: "Gloss", sub: "Looks like paint", mult: 1.0 },
      { id: "satin", label: "Satin", sub: "Soft sheen", mult: 1.1 },
      { id: "matte", label: "Matte", sub: "Flat, no shine", mult: 1.1 },
      { id: "color-shift", label: "Color-shift", sub: "Changes color by angle", mult: 1.4 },
    ],
    needsApproval: (pkg) => pkg === "color-change",
  },
];

export function money(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function roundPrice(n: number): number {
  const step = n >= 1000 ? 50 : 10;
  return Math.round(n / step) * step;
}

export function computePriceRange(vehicle: Vehicle | undefined, pkg: Package | undefined, opt: Option | undefined) {
  if (!vehicle || !pkg || !opt) return { low: 0, high: 0 };
  const low = roundPrice(pkg.base * vehicle.multiplier * opt.mult);
  const high = roundPrice(low * 1.2);
  return { low, high };
}
