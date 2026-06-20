
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Banknote,
  Send,
  CreditCard,
  Shield,
  Clock,
  BadgeCheck,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function ServicesSection() {
  const t = useTranslations("AboutWebSiteSection")

  const services = [
    {
      icon: Banknote,
      title: t("CurrencyExchange.services.currencyExchange.title"),
      description: t("CurrencyExchange.services.currencyExchange.description"),
      href: "/exchange",
      features: t.raw("CurrencyExchange.services.currencyExchange.tags") as string[],
      button: t("CurrencyExchange.services.currencyExchange.button"),
    },
    {
      icon: Send,
      title: t("CurrencyExchange.services.moneyTransfer.title"),
      description: t("CurrencyExchange.services.moneyTransfer.description"),
      href: "/transfer",
      features: t.raw("CurrencyExchange.services.moneyTransfer.tags") as string[],
      button: t("CurrencyExchange.services.moneyTransfer.button"),
    },
    {
      icon: CreditCard,
      title: t("CurrencyExchange.services.forexCards.title"),
      description: t("CurrencyExchange.services.forexCards.description"),
      href: "#",
      features: t.raw("CurrencyExchange.services.forexCards.tags") as string[],
      button: t("CurrencyExchange.services.forexCards.button"),
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: t("CurrencyExchange.trustFeatures.rbiAuthorized.title"),
      description: t("CurrencyExchange.trustFeatures.rbiAuthorized.description"),
    },
    {
      icon: Clock,
      title: t("CurrencyExchange.trustFeatures.sameDayDelivery.title"),
      description: t("CurrencyExchange.trustFeatures.sameDayDelivery.description"),
    },
    {
      icon: BadgeCheck,
      title: t("CurrencyExchange.trustFeatures.bestRateGuarantee.title"),
      description: t("CurrencyExchange.trustFeatures.bestRateGuarantee.description"),
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t("AboutTitle.title")}
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("AboutTitle.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-shadow border-border"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>

                <CardTitle className="text-xl">
                  {service.title}
                </CardTitle>

                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={service.href}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors gap-2 bg-transparent"
                  >
                    {service.button}
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
              <div
                key={benefit.title}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                  <benefit.icon className="h-5 w-5 text-accent" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
