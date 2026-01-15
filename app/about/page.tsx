import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { RateTicker } from '@/components/rate-ticker';
import { Card, CardContent } from '@/components/ui/card';
import {
  Shield,
  Award,
  Users,
  Globe,
  Target,
  Heart,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '1M+', label: 'Happy Customers' },
  { value: '50+', label: 'Currency Pairs' },
  { value: '100+', label: 'Cities Covered' },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description:
      'RBI authorized dealer ensuring all transactions are secure and compliant with regulatory guidelines.',
  },
  {
    icon: Award,
    title: 'Best Rates',
    description:
      'We offer the most competitive exchange rates with zero hidden charges or commissions.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description:
      'Our dedicated support team is available 6 days a week to assist you with all your forex needs.',
  },
  {
    icon: Globe,
    title: 'Wide Coverage',
    description:
      'Serving customers across 100+ cities in India with doorstep delivery and pickup services.',
  },
];

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO & Founder',
    image: '/professional-indian-man-ceo-portrait.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Chief Operations Officer',
    image: '/professional-indian-woman-coo-portrait.jpg',
  },
  {
    name: 'Amit Patel',
    role: 'Head of Technology',
    image: '/professional-indian-man-cto-portrait.jpg',
  },
  {
    name: 'Sneha Reddy',
    role: 'Head of Customer Success',
    image: '/professional-indian-woman-customer-success-portrai.jpg',
  },
];

const milestones = [
  {
    year: '2014',
    event: 'MyCurrency founded with a vision to simplify currency exchange',
  },
  { year: '2016', event: 'Expanded to 25+ cities across India' },
  { year: '2018', event: 'Launched online platform and mobile app' },
  { year: '2020', event: 'Reached 500,000 customers milestone' },
  { year: '2022', event: 'Introduced international money transfer services' },
  { year: '2024', event: 'Serving 1 million+ happy customers nationwide' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RateTicker />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                About MyCurrency
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                India's most trusted platform for foreign exchange and
                international money transfers. We're committed to making
                currency exchange simple, transparent, and accessible for
                everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    MyCurrency was founded in 2014 with a simple mission: to
                    make foreign exchange accessible, transparent, and
                    hassle-free for every Indian traveler and business.
                  </p>
                  <p>
                    What started as a small operation in Mumbai has grown into
                    India's leading forex platform, serving over a million
                    customers across 100+ cities. Our journey has been fueled by
                    our commitment to offering the best exchange rates,
                    exceptional customer service, and innovative technology.
                  </p>
                  <p>
                    Today, we're proud to be an RBI-authorized dealer,
                    partnering with leading banks and financial institutions to
                    provide you with safe, secure, and seamless forex services.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/modern-forex-office-team-collaboration.jpg"
                  alt="ForexHub Office"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-4 rounded-lg shadow-lg hidden md:block">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-semibold">RBI Authorized Dealer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize foreign exchange services by providing
                    transparent pricing, convenient access, and exceptional
                    customer experience to every Indian traveler and business
                    owner.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India's most loved and trusted forex brand,
                    setting new standards in transparency, technology, and
                    customer satisfaction in the financial services industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These values guide every decision we make and every interaction
                we have with our customers.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="bg-card border-border hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From a small startup to India's leading forex platform - here's
                how we've grown over the years.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                        {milestone.year}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <Card className="bg-card border-border">
                        <CardContent className="p-4">
                          <p className="text-foreground">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Leadership Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the people driving MyCurrency's mission to revolutionize
                forex services in India.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          className="py-16 md:py-20 text-primary-foreground"
          style={{ backgroundColor: '#2c4777' }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why Choose MyCurrency?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                We're committed to providing you with the best forex experience
                possible.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                'RBI Authorized Dealer',
                'Best Exchange Rates Guaranteed',
                'Zero Hidden Charges',
                'Doorstep Delivery & Pickup',
                '24/7 Online Booking',
                '100+ Cities Coverage',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
