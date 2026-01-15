import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Banknote, Send, CreditCard, Shield, Clock, BadgeCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Banknote,
    title: "Currency Exchange",
    description:
      "Buy and sell foreign currency notes at the best exchange rates. Same-day doorstep delivery available.",
    href: "/exchange",
    features: ["40+ Currencies", "Doorstep Delivery", "Best Rates"],
  },
  {
    icon: Send,
    title: "Money Transfer",
    description: "Send money abroad quickly and securely. Wire transfers to 100+ countries with competitive rates.",
    href: "/transfer",
    features: ["100+ Countries", "Same Day Transfer", "Zero Hidden Fees"],
  },
  {
    icon: CreditCard,
    title: "Forex Cards",
    description:
      "Multi-currency travel cards with zero markup rates. Perfect for international travel and online shopping.",
    href: "#",
    features: ["Zero Markup", "Multiple Currencies", "Instant Reload"],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "RBI Authorized",
    description: "Licensed forex dealer with full regulatory compliance",
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Get your forex delivered within hours in 65+ cities",
  },
  {
    icon: BadgeCheck,
    title: "Best Rate Guarantee",
    description: "We match any better rate you find elsewhere",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Your Complete Forex Solution
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From currency exchange to international transfers, we&apos;ve got all your foreign exchange needs covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <Card key={service.title} className="group hover:shadow-lg transition-shadow border-border">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={service.href}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors gap-2 bg-transparent"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <benefit.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
