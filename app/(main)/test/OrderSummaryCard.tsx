import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export interface OrderSummary {
  orderType: "buy" | "sell";
  product: string;
  fromCurrency: string;
  toCurrency: string;
  inputAmount: number;
  convertedAmount: number;
  rate: number;
}

export default function OrderSummaryCard({ order }: { order: OrderSummary }) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm capitalize text-muted-foreground">
            {order.orderType} forex • {order.product}
          </span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            Pending documents
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-secondary/40 p-4">
          <div>
            <p className="text-xs text-muted-foreground">You pay</p>
            <p className="text-lg font-semibold">
              {order.inputAmount.toLocaleString("en-IN")} {order.fromCurrency}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">You get</p>
            <p className="text-lg font-semibold text-primary">
              {order.convertedAmount.toLocaleString("en-IN")} {order.toCurrency}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Rate applied: 1 unit = ₹{order.rate}</p>
      </CardContent>
    </Card>
  );
}
