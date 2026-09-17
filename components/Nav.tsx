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
            fontSize: 26,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          Instant Quote <span style={{ color: "var(--accent)" }}>+</span> Booking
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 16 }}>
          <a href="#demo" className="nav-link">
            Demo
          </a>
          <a href="#offer" className="nav-link">
            Founding offer
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
          <a href="#join" className="btn btn-accent" style={{ padding: "12px 20px" }}>
            Get it for your shop
          </a>
        </div>
      </nav>
    </div>
  );
}
