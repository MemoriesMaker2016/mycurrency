"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RateTicker } from "@/components/rate-ticker"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencies } from "@/lib/currencies"
import { Search, RefreshCw, Bell, Download, TrendingUp, TrendingDown } from "lucide-react"

export default function RatesPage() {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <RateTicker />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Live Exchange Rates</h1>
              <p className="text-muted-foreground">Real-time forex rates for 40+ currencies. Last updated: Just now</p>
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
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by currency name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Rates Table */}
          <Card className="border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">Currency</TableHead>
                    <TableHead className="text-right font-semibold">Buy Rate</TableHead>
                    <TableHead className="text-right font-semibold">Sell Rate</TableHead>
                    <TableHead className="text-right font-semibold">Remit Rate</TableHead>
                    <TableHead className="text-right font-semibold">Change</TableHead>
                    <TableHead className="text-right font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCurrencies.map((currency, index) => (
                    <TableRow key={currency.code} className="hover:bg-secondary/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currency.flag}</span>
                          <div>
                            <p className="font-semibold text-foreground">{currency.code}</p>
                            <p className="text-sm text-muted-foreground">{currency.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        ₹{currency.buyRate.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        ₹{currency.sellRate.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        {currency.remitRate ? `₹${currency.remitRate.toFixed(2)}` : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {index % 2 === 0 ? (
                          <span className="inline-flex items-center gap-1 text-success text-sm">
                            <TrendingUp className="h-3 w-3" />
                            +0.2%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-destructive text-sm">
                            <TrendingDown className="h-3 w-3" />
                            -0.1%
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline">
                            Buy
                          </Button>
                          <Button size="sm" variant="outline">
                            Sell
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Understanding Our Rates</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Buy Rate:</strong> The rate at which you buy foreign currency
                    from us
                  </li>
                  <li>
                    <strong className="text-foreground">Sell Rate:</strong> The rate at which you sell foreign currency
                    to us
                  </li>
                  <li>
                    <strong className="text-foreground">Remit Rate:</strong> The rate for international wire transfers
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Rate Alerts</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up rate alerts to get notified when your target rate is reached. Never miss the best time to
                  exchange currency.
                </p>
                <Button className="gap-2">
                  <Bell className="h-4 w-4" />
                  Set Rate Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
