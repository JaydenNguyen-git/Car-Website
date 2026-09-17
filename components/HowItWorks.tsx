const CARDS = [
  {
    n: "01",
    title: "A price right away",
    body: "Customers see a real range for their vehicle and condition instead of waiting on a DM. People book the detailer who answers first.",
  },
  {
    n: "02",
    title: "Booking on the same screen",
    body: "Open times show next to the price, so there's no second conversation about scheduling.",
  },
  {
    n: "03",
    title: "A deposit locks it in",
    body: "People who pay something show up. You set the deposit amount and cancellation policy.",
  },
  {
    n: "04",
    title: "You approve big jobs",
    body: "Paint correction, coatings, and heavy interiors come to you with photos. Confirm or adjust the price with one tap.",
  },
  {
    n: "05",
    title: "Follow-ups on autopilot",
    body: "Got a price but didn't book? They get a reminder with their quote and a booking link.",
  },
  {
    n: "06",
    title: "No website needed",
    body: "Use your booking link in your Instagram bio, Google profile, or texts. Have a site? Embed it there too.",
  },
];

export default function HowItWorks() {
  return (
    <div id="how" className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <h2 className="h2-section" style={{ maxWidth: 800 }}>
        Why customers actually commit
      </h2>
      <div className="how-grid">
        {CARDS.map((card) => (
          <div key={card.n} className="how-card">
            <div className="how-card-num">{card.n}</div>
            <h3 className="h3-card">{card.title}</h3>
            <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
