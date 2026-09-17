export default function Hero() {
  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="eyebrow">For mobile detailers and coating installers</div>
        <h1 className="h1-hero" style={{ maxWidth: 980 }}>
          Customers get a price, book a time, and pay a deposit. While you&apos;re working.
        </h1>
        <p className="body-lg" style={{ margin: 0, color: "var(--muted)", maxWidth: 720 }}>
          No more &ldquo;DM for a quote&rdquo; and waiting a day to reply. Put one link in your
          Instagram bio or on your site, and customers go from curious to booked in about two
          minutes.
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", paddingTop: 8, flexWrap: "wrap" }}>
          <a href="#join" className="btn btn-accent">
            Get early access
          </a>
          <a href="#demo" className="btn btn-outline">
            Try the demo below
          </a>
        </div>
      </div>
    </div>
  );
}
