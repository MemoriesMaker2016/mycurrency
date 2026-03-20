import { ExchangeCalculator } from './exchange-calculator';
import { Shield, Clock, Star, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

const stats = [
  { icon: Users, value: '10K+', label: 'Happy Customers' },
  { icon: Star, value: '4.8', label: 'Rating' },
  { icon: Shield, value: '100%', label: 'Secure' },
  { icon: Clock, value: '24/7', label: 'Support' },
];
export function HeroSection() {
  const t = useTranslations('HomePage.aboutHomepage');
  return (
    <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Cashback */}
            <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-bold tracking-widest text-gray-800">
                {t('hero.cashback')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              <span style={{ color: '#1F3C6D' }}>
                {t('hero.title').split('Foreign Exchange')[0]}
              </span>{' '}
              <span className="text-primary">
                Foreign Exchange
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t('hero.description')}
            </p>

            {/* Stats */}
           

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs font-bold">
                  RBI
                </div>
                <span className="text-sm text-muted-foreground">
                  {t('security.rbi')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">
                  {t('security.encryption')}
                </span>
              </div>
            </div>
          </div>

          {/* Right - Calculator */}
          <div className="lg:pl-8">
            <ExchangeCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
