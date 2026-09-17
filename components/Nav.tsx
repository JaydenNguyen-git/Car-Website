import { SITE } from "@/lib/site-config";

export default function Nav() {
  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display), 'Arial Narrow', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 0.5,
          }}
        >
          {SITE.appName}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 16 }}>
          <a href="#how" className="nav-link">
            How it works
          </a>
          <a href="#pricing" className="nav-link">
            Pricing
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
          <a href="#join" className="btn btn-accent" style={{ padding: "12px 20px" }}>
            Get early access
          </a>
        </div>
      </nav>
    </div>
  );
}
