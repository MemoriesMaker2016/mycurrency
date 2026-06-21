import {
  ArrowRightLeft,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

import { Order } from "./types";

export default function StatsOverview({
  orders,
}: {
  orders: Order[];
}) {
  const completed = orders.filter(
    (o) => o.status === "completed"
  ).length;

  const pending = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const totalInrVolume = orders
    .filter((o) => o.fromCurrency === "INR")
    .reduce(
      (sum, o) =>
        sum + (o.inputAmount || 0),
      0
    );

  const stats = [
    {
      label: "Total orders",
      value: orders.length,
      icon: Wallet,
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
    },
    {
      label: "INR volume converted",
      value: `₹${totalInrVolume.toLocaleString(
        "en-IN"
      )}`,
      icon: ArrowRightLeft,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(
        ({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <Icon className="h-5 w-5 text-blue-700" />

            <p className="mt-2 text-xl font-semibold text-slate-900">
              {value}
            </p>

            <p className="text-xs text-slate-500">
              {label}
            </p>
          </div>
        )
      )}
    </div>
  );
}