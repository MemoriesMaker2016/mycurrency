import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RateTicker } from "@/components/rate-ticker"
import { ExchangeCalculator } from "@/components/exchange-calculator"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Clock, BadgeCheck, MapPin } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Doorstep Delivery",
    description: "Get forex delivered to your doorstep in 65+ cities across India",
  },
  {
    icon: Shield,
    title: "100% Genuine Notes",
    description: "All currency notes are verified and sourced from RBI-authorized dealers",
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    description: "Order before 1 PM and get delivery on the same day",
  },
  {
    icon: BadgeCheck,
    title: "Best Rate Guarantee",
    description: "Find a better rate? We'll match it or pay you double the difference",
  },
]

const steps = [
  {
    step: "01",
    title: "Select Currency",
    description: "Choose the currency you want to buy or sell",
  },
  {
    step: "02",
    title: "Enter Amount",
    description: "Specify the amount and see live exchange rates",
  },
  {
    step: "03",
    title: "Add Details",
    description: "Enter delivery address and upload documents",
  },
  {
    step: "04",
    title: "Make Payment",
    description: "Pay securely online and track your order",
  },
]

export default function ExchangePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RateTicker />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  Buy & Sell Foreign Currency Online
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Get the best exchange rates for 40+ currencies with same-day doorstep delivery. Pay on delivery
                  available for orders up to ₹50,000.
                </p>

                {/* Quick Features */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator */}
              <div>
                <ExchangeCalculator />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-muted-foreground">Exchange foreign currency in 4 simple steps</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((item, index) => (
                <Card key={item.step} className="relative border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Cities */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-2xl border border-border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Doorstep Delivery Available</h2>
                  <p className="text-muted-foreground">We deliver forex to your doorstep in 65+ cities across India</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Mumbai",
                  "Delhi",
                  "Bangalore",
                  "Chennai",
                  "Hyderabad",
                  "Pune",
                  "Kolkata",
                  "Ahmedabad",
                  "Jaipur",
                  "Lucknow",
                  "Chandigarh",
                  "Kochi",
                ].map((city) => (
                  <span key={city} className="px-3 py-1.5 bg-secondary rounded-full text-sm text-secondary-foreground">
                    {city}
                  </span>
                ))}
                <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium">
                  +53 more cities
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
