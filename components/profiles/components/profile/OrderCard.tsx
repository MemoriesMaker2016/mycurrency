"use client";

import { Badge } from "@/components/ui/badge";

type Order = {
  _id: string;
  fromCurrency: string;
  toCurrency: string;
  inputAmount: number;
  convertedAmount: number;
  rate: number;
  orderType: string;
  product: string;
  status: string;
  createdAt: string;
};

export default function OrderCard({ record }: { record: Order }) {
  return (
    <div className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{record.fromCurrency}</Badge>
          <span className="text-muted-foreground">→</span>
          <Badge variant="outline">{record.toCurrency}</Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          {new Date(record.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {record.inputAmount} {record.fromCurrency}
        </span>
        <span className="font-semibold">
          {record.convertedAmount?.toFixed(2)} {record.toCurrency}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div>Rate: {record.rate}</div>
        <div>Type: {record.orderType}</div>
        <div>Product: {record.product}</div>
        <div>Status: {record.status}</div>
      </div>
    </div>
  );
}