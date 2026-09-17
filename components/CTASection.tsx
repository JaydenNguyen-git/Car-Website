import SignupForm from "./SignupForm";

export default function CTASection() {
  return (
    <div id="join" className="container" style={{ paddingTop: 20, paddingBottom: 100 }}>
      <div className="cta-band">
        <h2 className="h2-section" style={{ fontSize: 60, maxWidth: 820 }}>
          Want this for your shop?
        </h2>
        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5, maxWidth: 640 }}>
          Leave your info and I&apos;ll reach out to set up your page for free. No payment needed
          to get started.
        </p>
        <SignupForm />
      </div>
    </div>
  );
}
