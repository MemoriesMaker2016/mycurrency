"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, XCircle, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

// ── Dummy Data ─────────────────────────────────────────────────────────────────
const dummyOrders = [
  {
    _id: "ord_001",
    orderType: "buy",
    product: "notes",
    fromCurrency: "INR",
    toCurrency: "USD",
    inputAmount: 82500,
    convertedAmount: 1000,
    rate: 82.5,
    status: "pending",
    createdAt: "2026-02-26T08:30:00Z",
    confirmedAt: null,
  },
  {
    _id: "ord_002",
    orderType: "buy",
    product: "card",
    fromCurrency: "INR",
    toCurrency: "EUR",
    inputAmount: 45000,
    convertedAmount: 500,
    rate: 90.0,
    status: "confirmed",
    createdAt: "2026-02-24T10:15:00Z",
    confirmedAt: "2026-02-24T14:30:00Z",
  },
  {
    _id: "ord_003",
    orderType: "sell",
    product: "notes",
    fromCurrency: "USD",
    toCurrency: "INR",
    inputAmount: 500,
    convertedAmount: 41250,
    rate: 82.5,
    status: "pending",
    createdAt: "2026-02-25T09:00:00Z",
    confirmedAt: null,
  },
  {
    _id: "ord_004",
    orderType: "sell",
    product: "card",
    fromCurrency: "GBP",
    toCurrency: "INR",
    inputAmount: 200,
    convertedAmount: 21200,
    rate: 106.0,
    status: "cancelled",
    createdAt: "2026-02-20T12:00:00Z",
    confirmedAt: null,
  },
  {
    _id: "ord_005",
    orderType: "buy",
    product: "notes",
    fromCurrency: "INR",
    toCurrency: "GBP",
    inputAmount: 31800,
    convertedAmount: 300,
    rate: 106.0,
    status: "confirmed",
    createdAt: "2026-02-22T07:45:00Z",
    confirmedAt: "2026-02-22T16:00:00Z",
  },
  {
    _id: "ord_006",
    orderType: "sell",
    product: "notes",
    fromCurrency: "EUR",
    toCurrency: "INR",
    inputAmount: 250,
    convertedAmount: 22500,
    rate: 90.0,
    status: "cancelled",
    createdAt: "2026-02-18T11:30:00Z",
    confirmedAt: null,
  },
];

// ── Types ──────────────────────────────────────────────────────────────────────
type Order = (typeof dummyOrders)[0];
type TabType = "buy" | "sell";

// ── Status config ──────────────────────────────────────────────────────────────
const statusConfig = {
  pending: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
    icon: Clock,
    label: "Pending",
  },
  confirmed: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
    label: "Confirmed",
  },
  cancelled: {
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-400",
    icon: XCircle,
    label: "Cancelled",
  },
};

// ── Pending Order Card (with progress tracker) ─────────────────────────────────
function PendingOrderCard({ order }: { order: Order }) {
  const placedDate = new Date(order.createdAt);
  const expectedDate = new Date(placedDate);
  expectedDate.setDate(expectedDate.getDate() + 1);

  return (
    <div className="relative bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                #{order._id.slice(-6)}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium capitalize">
                {order.product}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <span className="text-lg font-bold">{order.fromCurrency}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-lg font-bold">{order.toCurrency}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-0.5">You pay</p>
            <p className="text-xl font-bold text-slate-900">
              {order.inputAmount.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400">{order.fromCurrency}</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="relative py-2">
          {/* Track line */}
          <div className="absolute top-[26px] left-[20px] right-[20px] h-0.5 bg-slate-100" />
          {/* Active portion */}
          <div className="absolute top-[26px] left-[20px] w-[calc(50%-20px)] h-0.5 bg-gradient-to-r from-amber-400 to-amber-300" />

          <div className="relative flex justify-between items-start">
            {/* Step 1 — Order Placed */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center shadow-md shadow-amber-100">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-700">Order Placed</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {placedDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
                <p className="text-[10px] text-slate-400">
                  {placedDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>

            {/* Step 2 — Processing */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-amber-600">Processing</p>
                <p className="text-[10px] text-slate-400 mt-0.5">In review</p>
              </div>
            </div>

            {/* Step 3 — Confirmed */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-400">Confirmed</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  ~{expectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details row */}
        <div className="mt-5 pt-4 border-t border-slate-50 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">You Get</p>
            <p className="text-sm font-bold text-slate-800">
              {order.convertedAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">{order.toCurrency}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Rate</p>
            <p className="text-sm font-bold text-slate-800">{order.rate}</p>
            <p className="text-[10px] text-slate-400">per unit</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Status</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" />
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Completed / Cancelled Order Card ──────────────────────────────────────────
function CompletedOrderCard({ order }: { order: Order }) {
  const cfg = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = cfg.icon;
  const date = new Date(order.createdAt);

  return (
    <div
      className={`bg-white rounded-2xl border ${cfg.border} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center`}
            >
              <StatusIcon className={`w-4.5 h-4.5 ${cfg.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">
                  {order.fromCurrency}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-bold text-slate-800 text-sm">
                  {order.toCurrency}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                #{order._id.slice(-6)} · {order.product}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}
          >
            {cfg.label}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center py-3 px-2 rounded-xl bg-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 mb-1">Paid</p>
            <p className="text-xs font-bold text-slate-700">
              {order.inputAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">{order.fromCurrency}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1">Got</p>
            <p className="text-xs font-bold text-slate-700">
              {order.convertedAmount.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">{order.toCurrency}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1">Rate</p>
            <p className="text-xs font-bold text-slate-700">{order.rate}</p>
            <p className="text-[10px] text-slate-400">per unit</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1">Date</p>
            <p className="text-xs font-bold text-slate-700">
              {date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </p>
            <p className="text-[10px] text-slate-400">
              {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ tab }: { tab: TabType }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        {tab === "buy" ? (
          <TrendingUp className="w-8 h-8 text-slate-300" />
        ) : (
          <TrendingDown className="w-8 h-8 text-slate-300" />
        )}
      </div>
      <p className="text-slate-500 font-medium">No {tab} orders yet</p>
      <p className="text-slate-400 text-sm mt-1">Your orders will appear here</p>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function TrackOrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("buy");

  const filtered = dummyOrders.filter((o) => o.orderType === activeTab);
  const pendingOrders = filtered.filter((o) => o.status === "pending");
  const completedOrders = filtered.filter((o) => o.status !== "pending");

  const buyCount = dummyOrders.filter((o) => o.orderType === "buy").length;
  const sellCount = dummyOrders.filter((o) => o.orderType === "sell").length;
  const buyPending = dummyOrders.filter(
    (o) => o.orderType === "buy" && o.status === "pending"
  ).length;
  const sellPending = dummyOrders.filter(
    (o) => o.orderType === "sell" && o.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              Track Orders
            </h1>
            <p className="text-xs text-slate-400">
              {dummyOrders.length} total orders
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Buy / Sell Tabs */}
        <div className="grid grid-cols-2 gap-3">
          {(["buy", "sell"] as TabType[]).map((tab) => {
            const count = tab === "buy" ? buyCount : sellCount;
            const pending = tab === "buy" ? buyPending : sellPending;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-2xl p-4 text-left transition-all border-2 ${
                  isActive
                    ? tab === "buy"
                      ? "border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-100"
                      : "border-blue-400 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive
                        ? tab === "buy"
                          ? "bg-emerald-400"
                          : "bg-blue-400"
                        : "bg-slate-100"
                    }`}
                  >
                    {tab === "buy" ? (
                      <TrendingUp
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                      />
                    ) : (
                      <TrendingDown
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-sm font-bold capitalize ${
                      isActive
                        ? tab === "buy"
                          ? "text-emerald-700"
                          : "text-blue-700"
                        : "text-slate-500"
                    }`}
                  >
                    {tab} Orders
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span
                    className={`text-2xl font-black ${
                      isActive
                        ? tab === "buy"
                          ? "text-emerald-600"
                          : "text-blue-600"
                        : "text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                  {pending > 0 && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      {pending} pending
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div className="space-y-6">
            {/* Pending Section */}
            {pendingOrders.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Awaiting Confirmation
                  </h2>
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                    {pendingOrders.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <PendingOrderCard key={order._id} order={order} />
                  ))}
                </div>
              </section>
            )}

            {/* Completed / Cancelled Section */}
            {completedOrders.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Order History
                  </h2>
                  <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full">
                    {completedOrders.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {completedOrders.map((order) => (
                    <CompletedOrderCard key={order._id} order={order} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}