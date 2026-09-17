export default function FAQSection() {
  const items = [
    {
      q: "What if the vehicle isn't what they described?",
      a: "Customers agree up front that the price can change if the vehicle differs. They approve any change before you start. For big jobs, you confirm the price before anything is final.",
    },
    {
      q: "Do my customers need an app?",
      a: "No. It opens in their phone's browser from your link.",
    },
    {
      q: "Can I offer only some services?",
      a: "Yes. Turn on the services you do, whether that's tint only or all five. Pick your packages, enter prices, set your hours. Founding shops get it set up for them.",
    },
    {
      q: "Where do deposits go?",
      a: "When deposits launch, they go straight to your own payment account and come off the customer's final bill.",
    },
    {
      q: "What does it cost?",
      a: "Setup is free for founding shops, and you keep a locked-in monthly price. Request a setup and I'll walk you through it before you commit to anything.",
    },
    {
      q: "Do I have to change how I run my shop?",
      a: "No. Keep taking calls and DMs like you do now. This just catches the people who would never have reached out.",
    },
  ];

  return (
    <div id="faq" className="container section" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <h2 className="h2-section">Questions</h2>
      <div className="faq-grid">
        {items.map((item) => (
          <div key={item.q} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3 style={{ fontSize: 26, textTransform: "uppercase", fontFamily: "var(--font-display), sans-serif" }}>{item.q}</h3>
            <p className="body" style={{ margin: 0, color: "var(--muted)" }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
