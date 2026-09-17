import { PLANS, SITE } from "@/lib/site-config";

export default function PricingSection() {
  return (
    <div id="pricing" className="container section" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <h2 className="h2-section">Simple pricing</h2>
      <div className="pricing-grid">
        <div className="price-card" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
          <h3 className="h3-card">{PLANS.starter.name}</h3>
          <div className="price-amount">
            {PLANS.starter.price}
            <span style={{ fontSize: 22, color: "var(--muted)" }}> /mo</span>
          </div>
          <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
            {PLANS.starter.features}
          </p>
        </div>
        <div className="price-card" style={{ background: "var(--ink)", color: "var(--ground)" }}>
          <h3 className="h3-card">{PLANS.pro.name}</h3>
          <div className="price-amount">
            {PLANS.pro.price}
            <span style={{ fontSize: 22, color: "var(--muted-on-dark)" }}> /mo</span>
          </div>
          <p className="body" style={{ margin: 0, color: "var(--muted-on-dark)" }}>
            {PLANS.pro.features}
          </p>
        </div>
      </div>
      <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
        Founding detailers: locked-in price and free setup for the first {SITE.foundingSpots} shops.
      </p>
    </div>
  );
}
