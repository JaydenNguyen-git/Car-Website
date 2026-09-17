import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DemoSection from "@/components/DemoSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <DemoSection />
      <HowItWorks />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
