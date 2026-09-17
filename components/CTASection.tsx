import SignupForm from "./SignupForm";

export default function CTASection() {
  return (
    <div id="join" className="container" style={{ paddingTop: 20, paddingBottom: 100 }}>
      <div className="cta-band">
        <h2 className="h2-section" style={{ fontSize: 60, maxWidth: 820 }}>
          Stop losing jobs to slow replies
        </h2>
        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5, maxWidth: 640 }}>
          Join the founding detailers. Free setup and a locked-in price.
        </p>
        <SignupForm />
      </div>
    </div>
  );
}
