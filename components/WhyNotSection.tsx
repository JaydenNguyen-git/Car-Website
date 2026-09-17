const OLD_WAY = [
  {
    title: "“Call for a quote”",
    body: "Most people don't want to call. And when they do, you're usually in the middle of a job.",
  },
  {
    title: "DMs and contact forms",
    body: "They wait hours for a reply and keep shopping around in the meantime.",
  },
  {
    title: "Chatbots",
    body: "A string of questions that often ends with “someone will reach out.” Still no price and no time.",
  },
];

export default function WhyNotSection() {
  return (
    <div id="why" className="container section" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 className="h2-section" style={{ maxWidth: 860 }}>
          Most customers won&apos;t call or message you for a price
        </h2>
        <p className="body-lg" style={{ margin: 0, color: "var(--muted)", maxWidth: 720 }}>
          Calling a shop, filling out a contact form, or going back and forth with a chatbot feels
          like work. So people leave your page, or book whoever shows a price first. This gives
          them pricing and a booking without talking to anyone.
        </p>
      </div>
      <div className="why-grid">
        {OLD_WAY.map((item) => (
          <div key={item.title} className="why-card" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
            <div className="why-eyebrow" style={{ color: "var(--muted)" }}>
              The old way
            </div>
            <h3 className="h3-card" style={{ fontSize: 28 }}>
              {item.title}
            </h3>
            <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
              {item.body}
            </p>
          </div>
        ))}
        <div className="why-card" style={{ background: "var(--accent)", color: "#ffffff" }}>
          <div className="why-eyebrow" style={{ color: "#ffffff" }}>
            The easy way
          </div>
          <h3 className="h3-card" style={{ fontSize: 28 }}>
            Price and booking in one link
          </h3>
          <p className="body" style={{ margin: 0 }}>
            A few taps to a real price, an open spot, and a deposit. No calls, no waiting on a
            reply.
          </p>
          <a href="#demo" style={{ marginTop: "auto", color: "#ffffff", fontWeight: 600 }}>
            Try it below
          </a>
        </div>
      </div>
    </div>
  );
}
