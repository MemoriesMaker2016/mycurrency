import { ExchangeCalculator } from './exchange-calculator';
import { Shield, Clock, Star, Users } from 'lucide-react';

const stats = [
  { icon: Users, value: '5L+', label: 'Happy Customers' },
  { icon: Star, value: '4.8', label: 'Rating' },
  { icon: Shield, value: '100%', label: 'Secure' },
  { icon: Clock, value: '24/7', label: 'Support' },
];

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-sm font-medium text-accent-foreground">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Up to 2% Cashback on All Orders
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              <span style={{ color: '#1F3C6D' }}>Best Rates for</span>{' '}
              <span className="text-primary">Foreign Exchange</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Buy & sell foreign currency online at the best exchange rates.
              Same-day doorstep delivery in 65+ cities across India. RBI
              authorized and 100% secure.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-card rounded-xl border border-border"
                >
                  <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs font-bold">
                  RBI
                </div>
                <span className="text-sm text-muted-foreground">
                  Authorized Dealer
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">
                  256-bit Encryption
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
