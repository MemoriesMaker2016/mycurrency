"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { currencies } from "@/lib/currencies"
import { Search, TrendingUp, TrendingDown, RefreshCw, Bell } from "lucide-react"
import Link from "next/link"

export function LiveRatesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Live Exchange Rates</h2>
            <p className="text-muted-foreground">Real-time forex rates updated every minute</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2 bg-transparent">
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Bell className="h-4 w-4" />
              Set Alert
            </Button>
            <Link href="/rates">
              <Button size="sm">View All Rates</Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search currency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Rates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCurrencies.slice(0, 8).map((currency, index) => (
            <Card key={currency.code} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <p className="font-semibold text-foreground">{currency.code}</p>
                      <p className="text-xs text-muted-foreground">{currency.name}</p>
                    </div>
                  </div>
                  {index % 2 === 0 ? (
                    <div className="flex items-center gap-1 text-success text-xs">
                      <TrendingUp className="h-3 w-3" />
                      <span>+0.2%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-destructive text-xs">
                      <TrendingDown className="h-3 w-3" />
                      <span>-0.1%</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-secondary/50 rounded-md p-2">
                    <p className="text-muted-foreground text-xs">Buy</p>
                    <p className="font-semibold text-foreground">₹{currency.buyRate.toFixed(2)}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-md p-2">
                    <p className="text-muted-foreground text-xs">Sell</p>
                    <p className="font-semibold text-foreground">₹{currency.sellRate.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
