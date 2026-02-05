'use client';

import { currencies } from '@/lib/currencies';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function RateTicker() {
  return (
    <div className="bg-primary/5 border-b border-border overflow-hidden py-2">
      <div
        className="flex animate-scroll-left whitespace-nowrap"
        style={{ fontSize: '20px' }}
      >
        {[...currencies, ...currencies].map((currency, index) => (
          <div
            key={`${currency.code}-${index}`}
            className="inline-flex items-center gap-3 px-6"
          >
            <img
              src={`/flags/${currency.country}.svg`}
              alt={currency.code}
              className="h-4 w-6 object-cover"
            />
            <span className="font-medium text-foreground">{currency.code}</span>
            <span className="text-sm text-muted-foreground">Buy:</span>
            <span className="font-semibold text-foreground">
              ₹{currency.buyRate.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">Sell:</span>
            <span className="font-semibold text-foreground">
              ₹{currency.sellRate.toFixed(2)}
            </span>
            {index % 2 === 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className="text-muted-foreground/50">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
