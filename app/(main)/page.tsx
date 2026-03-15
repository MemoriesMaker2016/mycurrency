import Header from "@/components/header";
import Footer from "@/components/footer";
import { RateTicker } from "@/components/rate-ticker";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import TestimonialSection from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { ForexCardSection } from "@/components/forexCardSection";
import SupportChatbot from "@/components/ui/chatbot";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ForexCardSection />
        <TestimonialSection />
        <CTASection />
      </main>

    </div>
  );
}
