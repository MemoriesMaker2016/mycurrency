import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RateTicker } from '@/components/rate-ticker';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { TestimonialSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { AuthProvider } from '@/components/AuthProvider';
import { ForexCardSection } from '@/components/forexCardSection';

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <RateTicker />
        <main className="flex-1">
          <HeroSection />
          <ServicesSection />
          <ForexCardSection />
          <TestimonialSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
