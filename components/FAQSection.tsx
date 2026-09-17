import { SITE } from "@/lib/site-config";

export default function FAQSection() {
  const items = [
    {
      q: "What if the car is worse than the photos?",
      a: "Customers agree up front that the price can change if the condition differs. They approve any change before you start.",
    },
    {
      q: "Do my customers need an app?",
      a: "No. It opens in their phone's browser from your link.",
    },
    {
      q: "How long does setup take?",
      a: "Pick your packages, enter prices by vehicle size, set your hours. Founding shops get it set up for them.",
    },
    {
      q: "Where do deposits go?",
      a: `Straight to your own payment account. ${SITE.paymentProviderNote}`,
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
