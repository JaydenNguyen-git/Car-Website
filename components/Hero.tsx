import HeroServiceChips from "./HeroServiceChips";

export default function Hero() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="eyebrow">For tint, detailing, ceramic coating, PPF, and wrap shops</div>
        <h1 className="h1-hero" style={{ maxWidth: 1000 }}>
          Let customers price and book your work without calling you.
        </h1>
        <p className="body-lg" style={{ margin: 0, color: "var(--muted)", maxWidth: 720 }}>
          Most people won&apos;t call, fill out a form, or wait on a DM just to find out what tint
          or a coating costs. Give them one link where they get a price and pick a time in a
          couple of minutes, while you keep working.
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", paddingTop: 8, flexWrap: "wrap" }}>
          <a href="#demo" className="btn btn-accent">
            Try the 2-minute demo
          </a>
          <a href="#offer" className="btn btn-outline">
            See the founding offer
          </a>
        </div>
        <HeroServiceChips />
      </div>
    </div>
  );
}
