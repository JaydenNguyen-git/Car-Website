import Nav from "./Nav";
import Hero from "./Hero";
import WhyNotSection from "./WhyNotSection";
import DemoSection from "./DemoSection";
import HowItWorks from "./HowItWorks";
import FoundingOfferSection from "./FoundingOfferSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import { ShopNameProvider } from "./ShopNameProvider";

export default function LandingPage({ shopName }: { shopName: string | null }) {
  return (
    <ShopNameProvider shopName={shopName}>
      <main>
        <Nav />
        <Hero />
        <WhyNotSection />
        <DemoSection />
        <HowItWorks />
        <FoundingOfferSection />
        <FAQSection />
        <CTASection />
      </main>
    </ShopNameProvider>
  );
}
