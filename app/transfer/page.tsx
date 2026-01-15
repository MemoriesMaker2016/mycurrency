"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RateTicker } from "@/components/rate-ticker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency, getCurrencyByCode } from "@/lib/currencies"
import {
  ArrowRight,
  Send,
  Building2,
  GraduationCap,
  Home,
  Briefcase,
  Shield,
  Clock,
  Globe,
  CheckCircle,
} from "lucide-react"

const transferPurposes = [
  { value: "education", label: "University Fees", icon: GraduationCap },
  { value: "property", label: "Property Purchase", icon: Home },
  { value: "maintenance", label: "Family Maintenance", icon: Home },
  { value: "business", label: "Business Payment", icon: Briefcase },
  { value: "other", label: "Other Purpose", icon: Send },
]

const popularCountries = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD" },
]

const features = [
  {
    icon: Shield,
    title: "Secure Transfers",
    description: "Bank-grade security with end-to-end encryption",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Most transfers completed within 24-48 hours",
  },
  {
    icon: Globe,
    title: "100+ Countries",
    description: "Send money to over 100 countries worldwide",
  },
  {
    icon: CheckCircle,
    title: "Zero Hidden Fees",
    description: "What you see is what you pay, no surprises",
  },
]

export default function TransferPage() {
  const [sendingAmount, setSendingAmount] = useState<string>("100000")
  const [selectedCountry, setSelectedCountry] = useState("US")
  const [selectedPurpose, setSelectedPurpose] = useState("education")
  const [receivingAmount, setReceivingAmount] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)

  const selectedCountryData = popularCountries.find((c) => c.code === selectedCountry)

  useEffect(() => {
    if (selectedCountryData) {
      const currency = getCurrencyByCode(selectedCountryData.currency)
      if (currency && currency.remitRate) {
        setRate(currency.remitRate)
        const amount = Number.parseFloat(sendingAmount) || 0
        setReceivingAmount(amount / currency.remitRate)
      }
    }
  }, [sendingAmount, selectedCountry, selectedCountryData])

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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 rounded-full text-sm font-medium text-success">
                  <CheckCircle className="h-4 w-4" />
                  Zero Transfer Fees on First Transaction
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                  Send Money Abroad at the Best Rates
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fast, secure, and affordable international money transfers to 100+ countries. Perfect for university
                  fees, family support, and business payments.
                </p>

                {/* Features Grid */}
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

              {/* Transfer Calculator */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Money Abroad
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* From India */}
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Transfer From</Label>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <span className="text-2xl">🇮🇳</span>
                      <div>
                        <p className="font-semibold text-foreground">India</p>
                        <p className="text-sm text-muted-foreground">Indian Rupee (INR)</p>
                      </div>
                    </div>
                  </div>

                  {/* To Country */}
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Transfer To</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {popularCountries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                              <span className="text-muted-foreground">({country.currency})</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Purpose of Transfer</Label>
                    <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {transferPurposes.map((purpose) => (
                          <SelectItem key={purpose.value} value={purpose.value}>
                            <span className="flex items-center gap-2">
                              <purpose.icon className="h-4 w-4" />
                              <span>{purpose.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">You Send (INR)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        value={sendingAmount}
                        onChange={(e) => setSendingAmount(e.target.value)}
                        className="pl-8 h-12 text-lg font-semibold"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  {/* Rate Info */}
                  <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Exchange Rate</span>
                      <span className="font-semibold text-foreground">
                        1 {selectedCountryData?.currency} = ₹{rate.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transfer Fee</span>
                      <span className="font-semibold text-success">₹0 (Free)</span>
                    </div>
                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <span className="text-muted-foreground">Recipient Gets</span>
                      <span className="text-xl font-bold text-foreground">
                        {selectedCountryData?.currency} {formatCurrency(receivingAmount)}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full h-12 text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                    Start Transfer
                    <ArrowRight className="h-5 w-5" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Transfers are processed through RBI authorized banks
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Popular Destinations</h2>
              <p className="text-muted-foreground">Send money to these countries with the best exchange rates</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCountries.map((country) => {
                const currency = getCurrencyByCode(country.currency)
                return (
                  <Card key={country.code} className="hover:shadow-lg transition-shadow border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{country.flag}</span>
                        <div>
                          <h3 className="font-semibold text-foreground">{country.name}</h3>
                          <p className="text-sm text-muted-foreground">{country.currency}</p>
                        </div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Remittance Rate</p>
                        <p className="text-lg font-bold text-foreground">
                          1 {country.currency} = ₹{currency?.remitRate?.toFixed(2) || "N/A"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-6 text-primary-foreground" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Trusted Partner Banks</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                All our international transfers are processed through India&apos;s leading banks and RBI-authorized
                foreign exchange dealers, ensuring complete security and compliance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {["HDFC Bank", "ICICI Bank", "Axis Bank", "Yes Bank", "IndusInd Bank"].map((bank) => (
                  <div
                    key={bank}
                    className="px-6 py-3 bg-primary-foreground/10 rounded-lg text-primary-foreground font-medium"
                  >
                    {bank}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
