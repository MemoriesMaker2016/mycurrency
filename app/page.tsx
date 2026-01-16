import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RateTicker } from '@/components/rate-ticker';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { LiveRatesSection } from '@/components/live-rates-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RateTicker />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        {/* <LiveRatesSection /> */}
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
