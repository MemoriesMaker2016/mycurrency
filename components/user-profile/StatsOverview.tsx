import {
  ArrowRightLeft,
  CheckCircle2,
  Clock3,
  Wallet,
} from "lucide-react";

import { Order } from "./types";

export default function StatsOverview({
  totalOrder,
  summary
}: {
  totalOrder:number,
  summary:any[]
}) {

  const stats = [
    {
      label: "Total orders",
      value:totalOrder,
      icon: Wallet,
    },
    {
      label: "Completed",
      value: summary?.confirmedCount,
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      value:summary?.pendingCount,
      icon: Clock3,
    },
    {
      label: "INR volume converted",
      value: `₹${summary?.totalamountAll}`,
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