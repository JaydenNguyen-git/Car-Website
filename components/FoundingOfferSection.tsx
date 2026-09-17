const OFFER_ITEMS = [
  "Free setup, done for you from your current prices",
  "Only the services you offer, with your packages",
  "A locked-in founding price that stays the same",
  "A direct line to me for changes and requests",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 20px", marginTop: 2 }}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function FoundingOfferSection() {
  return (
    <div id="offer" className="container section">
      <div className="grid-2">
        <div className="offer-card" style={{ background: "var(--ink)", color: "var(--ground)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--signal)" }}>
            Founding shop offer
          </div>
          <h2 className="h2-section" style={{ fontSize: 52 }}>
            I&apos;ll set it up for you
          </h2>
          <p className="body" style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--muted-on-dark)" }}>
            I&apos;m working with a small group of local shops first. You send me your price sheet
            or a photo of your menu, and I build your page. You just put the link in your bio and
            Google profile.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
            {OFFER_ITEMS.map((text) => (
              <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 16, lineHeight: 1.5 }}>
                <CheckIcon />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="offer-card" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 className="h3-card">Available first</h3>
            <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
              Instant price ranges for your services, booking requests with the customer&apos;s
              vehicle and photos, and a text to your phone for every new request.
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line-soft)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 className="h3-card">Rolling out next</h3>
            <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
              Deposits, calendar sync, one-tap price approval, and automatic follow-up texts.
              Founding shops help decide what comes first.
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line-soft)" }} />
          <a href="#join" className="btn btn-accent" style={{ alignSelf: "flex-start" }}>
            Request a free setup
          </a>
        </div>
      </div>
    </div>
  );
}
