'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getLiveRate } from '@/lib/liveRates';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  currencies,
  formatCurrency,
  getCurrencyByCode,
} from '@/lib/currencies';
import {
  ArrowRightLeft,
  RefreshCw,
  Banknote,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import { useAuthStore } from '@/zustandStore/login';
import { useRouter } from 'next/navigation';
import urlOfBakEnd from '../restData';
interface ExchangeCalculatorProps {
  defaultTab?: 'buy' | 'sell';
}

export function ExchangeCalculator({
  defaultTab = 'buy',
}: ExchangeCalculatorProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>(defaultTab);
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState<string>('10000');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [product, setProduct] = useState<'notes' | 'card'>('notes');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const run = async () => {
      const target = activeTab === 'buy' ? toCurrency : fromCurrency;
      if (!target || target === 'INR') return;

      const liveRate = await getLiveRate(target, activeTab, product);
      if (!liveRate) return;

      setRate(liveRate);

      const amt = Number(amount) || 0;

      if (activeTab === 'buy') {
        setConvertedAmount(+(amt / liveRate).toFixed(2));
      } else {
        setConvertedAmount(+(amt * liveRate).toFixed(2));
      }
    };

    run();
  }, [activeTab, toCurrency, fromCurrency, amount, product]);

  const handleSwap = () => {
    setActiveTab(activeTab === 'buy' ? 'sell' : 'buy');
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleBookOrder = async () => {
    if (!isAuthenticated || !token) {
      router.push('/login');
      return;
    }

    try {
      const payload = {
        orderType: 'buy', // buy | sell
        product, // notes | card
        fromCurrency: activeTab === 'buy' ? 'INR' : fromCurrency,
        toCurrency: activeTab === 'buy' ? toCurrency : 'INR',
        inputAmount: Number(amount),
        convertedAmount,
        rate,
      };

      const res = await fetch(`${urlOfBakEnd}/api/auth/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Order failed');
        return;
      }

      // ✅ success
      setOpen(true);
    } catch (error) {
      console.error(error);
      alert('Something went wrong while booking order');
    }
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-card">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600 text-xl">
              Order Booked Successfully 🎉
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground mt-3">
            Your order has been booked. We will get back to you soon. <br />
            Thank you!
          </p>

          <Button onClick={() => setOpen(false)} className="mt-5 w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <CardContent className="p-0">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'buy')}
          className="w-full"
        >
          <TabsList className="w-full rounded-none rounded-t-lg h-14 bg-secondary">
            <TabsTrigger
              value=""
              className="text-base font-semibold  bg-white
               rounded-none rounded-tl-lg h-full"
            >
              Buy Forex
            </TabsTrigger>
          </TabsList>

          <div className="p-6 space-y-6">
            {/* Product Selection */}
            <div className="flex gap-2">
              <Button
                variant={product === 'notes' ? 'default' : 'outline'}
                onClick={() => setProduct('notes')}
                className="flex-1 gap-2"
              >
                <Banknote className="h-4 w-4" />
                Currency Notes
              </Button>
              <Button
                variant={product === 'card' ? 'default' : 'outline'}
                onClick={() => setProduct('card')}
                className="flex-1 gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Forex Card
              </Button>
            </div>

            <TabsContent value="buy" className="mt-0 space-y-4">
              {/* INR Amount */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">You Pay (INR)</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 h-12 text-lg font-semibold"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="w-24 h-12 flex items-center justify-center bg-secondary rounded-lg font-medium">
                    INR
                  </div>
                </div>
              </div>

              {/* Rate Display */}
              <div className="flex items-center justify-center py-2">
                <button
                  onClick={handleSwap}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                </button>
                <div className="ml-3 text-md">
                  <span className="text-muted-foreground">Rate: </span>
                  <span className="font-semibold text-foreground">
                    1 {toCurrency} = ₹{rate.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Foreign Currency Amount */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">You Get</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      value={formatCurrency(convertedAmount)}
                      readOnly
                      className="h-12 text-lg font-semibold bg-secondary/50"
                    />
                  </div>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <span className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sell" className="mt-0 space-y-4">
              {/* Foreign Currency Amount */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">You Have</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12 text-lg font-semibold"
                      placeholder="Enter amount"
                    />
                  </div>
                  <Select
                    value={fromCurrency === 'INR' ? 'USD' : fromCurrency}
                    onValueChange={setFromCurrency}
                  >
                    <SelectTrigger className="w-32 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <span className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Rate Display */}
              <div className="flex items-center justify-center py-2">
                <button
                  onClick={handleSwap}
                  className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                </button>
                <div className="ml-3 text-lg">
                  <span className="text-muted-foreground">Rate: </span>
                  <span className="font-semibold text-foreground">
                    1 {fromCurrency === 'INR' ? 'USD' : fromCurrency} = ₹
                    {rate.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* INR Amount */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">You Get (INR)</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      type="text"
                      value={formatCurrency(convertedAmount)}
                      readOnly
                      className="pl-8 h-12 text-lg font-semibold bg-secondary/50"
                    />
                  </div>
                  <div className="w-24 h-12 flex items-center justify-center bg-secondary rounded-lg font-medium">
                    INR
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Savings Info */}
            <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-center">
              <p className="text-sm text-success font-medium">
                Save up to ₹
                {formatCurrency((Number.parseFloat(amount) || 0) * 0.02)}{' '}
                compared to banks!
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleBookOrder}
              className="w-full h-12 text-lg font-semibold bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            >
              Book This Order
              <ArrowRight className="h-5 w-5" />
            </Button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                <span>Live Rates</span>
              </div>
              <span>•</span>
              <span>RBI Authorized</span>
              <span>•</span>
              <span>Secure Payments</span>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
