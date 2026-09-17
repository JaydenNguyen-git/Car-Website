import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyNotSection from "@/components/WhyNotSection";
import DemoSection from "@/components/DemoSection";
import HowItWorks from "@/components/HowItWorks";
import FoundingOfferSection from "@/components/FoundingOfferSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
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
  );
}
