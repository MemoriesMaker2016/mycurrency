"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Clock, XCircle,
  ArrowRight, TrendingUp, TrendingDown, Loader2,
} from "lucide-react";
import { getUsersOrderTrack } from "@/apiFasad/apiCalls/userOrders";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type OrderStatus = "pending" | "confirmed" | "cancelled";

type Order = {
  _id: string;
  orderId: string;
  orderType: "buy" | "sell";
  product: "notes" | "card";
  fromCurrency: string;
  toCurrency: string;
  inputAmount: number;
  convertedAmount: number;
  rate: number;
  status: OrderStatus;
  createdAt: string;
};

type TabType = "buy" | "sell";

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const LIMIT = 10;

const STATUS_CONFIG = {
  pending: {
    color: "text-amber-600", bg: "bg-amber-50",
    border: "border-amber-200", icon: Clock, label: "Pending",
  },
  confirmed: {
    color: "text-emerald-600", bg: "bg-emerald-50",
    border: "border-emerald-200", icon: CheckCircle2, label: "Confirmed",
  },
  cancelled: {
    color: "text-red-500", bg: "bg-red-50",
    border: "border-red-200", icon: XCircle, label: "Cancelled",
  },
};

// ─────────────────────────────────────────────────────────────
// Pending Order Card
// ─────────────────────────────────────────────────────────────
function PendingOrderCard({ order }: { order: Order }) {
  const placedDate   = new Date(order.createdAt);
  const expectedDate = new Date(placedDate);
  expectedDate.setDate(expectedDate.getDate() + 1);

  return (
    <div className="relative bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400" />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                #{order.orderId}
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
            <p className="text-xl font-bold text-slate-900">{order.inputAmount.toLocaleString()}</p>
            <p className="text-xs text-slate-400">{order.fromCurrency}</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="relative py-2">
          <div className="absolute top-[26px] left-[20px] right-[20px] h-0.5 bg-slate-100" />
          <div className="absolute top-[26px] left-[20px] w-[calc(50%-20px)] h-0.5 bg-gradient-to-r from-amber-400 to-amber-300" />
          <div className="relative flex justify-between items-start">
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
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-amber-600">Processing</p>
                <p className="text-[10px] text-slate-400 mt-0.5">In review</p>
              </div>
            </div>
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

        {/* Details */}
        <div className="mt-5 pt-4 border-t border-slate-50 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">You Get</p>
            <p className="text-sm font-bold text-slate-800">{order.convertedAmount.toLocaleString()}</p>
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
              <Clock className="w-3 h-3" /> Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Confirmed / Cancelled Card
// ─────────────────────────────────────────────────────────────
function CompletedOrderCard({ order }: { order: Order }) {
  const cfg        = STATUS_CONFIG[order.status];
  const StatusIcon = cfg.icon;
  const date       = new Date(order.createdAt);

  return (
    <div className={`bg-white rounded-2xl border ${cfg.border} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center`}>
              <StatusIcon className={`w-4 h-4 ${cfg.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">{order.fromCurrency}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-bold text-slate-800 text-sm">{order.toCurrency}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                #{order.orderId} · {order.product}
              </p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
            {cfg.label}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center py-3 px-2 rounded-xl bg-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 mb-1">Paid</p>
            <p className="text-xs font-bold text-slate-700">{order.inputAmount.toLocaleString()}</p>
            <p className="text-[10px] text-slate-400">{order.fromCurrency}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 mb-1">Got</p>
            <p className="text-xs font-bold text-slate-700">{order.convertedAmount.toLocaleString()}</p>
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

// ─────────────────────────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────────────────────────
function EmptyState({ tab }: { tab: TabType }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        {tab === "buy"
          ? <TrendingUp className="w-8 h-8 text-slate-300" />
          : <TrendingDown className="w-8 h-8 text-slate-300" />
        }
      </div>
      <p className="text-slate-500 font-medium">No {tab} orders yet</p>
      <p className="text-slate-400 text-sm mt-1">Your orders will appear here</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function TrackOrdersPage() {
  const [activeTab, setActiveTab]   = useState<TabType>("buy");
  const [orders, setOrders]         = useState<Order[]>([]);
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(true);
  const [loading, setLoading]       = useState(true);   // initial load
  const [loadingMore, setLoadingMore] = useState(false); // subsequent loads
  const [error, setError]           = useState<string | null>(null);

 // ── Fetch a page ──────────────────────────────────────────
const isFetchingRef = useRef(false);
const hasMoreRef    = useRef(true);   // ← mirror hasMore in a ref
const pageRef       = useRef(1);      // ← mirror page in a ref
const sentinelRef   = useRef<HTMLDivElement>(null);

// Keep refs in sync with state
useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
useEffect(() => { pageRef.current = page; },     [page]);

const fetchPage = useCallback(async (pageNum: number, replace: boolean) => {
  if (isFetchingRef.current) return;
  isFetchingRef.current = true;
  pageNum === 1 ? setLoading(true) : setLoadingMore(true);
  setError(null);
  try {
    const params = new URLSearchParams({ page: String(pageNum), limit: String(LIMIT) });
    const data = await getUsersOrderTrack(params);
    if (data?.success) {
      setOrders((prev) => replace ? data.data : [...prev, ...data.data]);
      setHasMore(data.hasMore);
      setPage(pageNum);
    }
  } catch (err) {
    setError("Failed to load orders. Please try again.");
  } finally {
    setLoading(false);
    setLoadingMore(false);
    isFetchingRef.current = false;
  }
}, []);

// ── Create observer ONCE — never recreate it ──────────────
useEffect(() => {
  const sentinel = sentinelRef.current;
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        hasMoreRef.current &&          // ← read from ref, not state
        !isFetchingRef.current         // ← already locked
      ) {
        fetchPage(pageRef.current + 1, false);  // ← read from ref
      }
    },
    { rootMargin: "200px", threshold: 0 },
  );

  observer.observe(sentinel);
  return () => observer.disconnect();
}, []); // ← empty deps = created once, never recreated

useEffect(() => {
  fetchPage(1, true);
}, [fetchPage]);

  // Initial load

  // ── IntersectionObserver — load next page when sentinel visible ──
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          fetchPage(page + 1, false);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page, fetchPage]);

  // ── Derived per-tab data ──────────────────────────────────
  const buyOrders  = orders.filter((o) => o.orderType === "buy");
  const sellOrders = orders.filter((o) => o.orderType === "sell");
  const filtered   = activeTab === "buy" ? buyOrders : sellOrders;

  const pendingOrders   = filtered.filter((o) => o.status === "pending");
  const completedOrders = filtered.filter((o) => o.status !== "pending");

  const buyPending  = buyOrders.filter((o)  => o.status === "pending").length;
  const sellPending = sellOrders.filter((o) => o.status === "pending").length;

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
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Track Orders</h1>
            <p className="text-xs text-slate-400">
              {loading ? "Loading…" : `${orders.length} orders loaded`}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Buy / Sell Tabs */}
        <div className="grid grid-cols-2 gap-3">
          {(["buy", "sell"] as TabType[]).map((tab) => {
            const tabOrders = tab === "buy" ? buyOrders : sellOrders;
            const pending   = tab === "buy" ? buyPending : sellPending;
            const isActive  = activeTab === tab;

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
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive
                      ? tab === "buy" ? "bg-emerald-400" : "bg-blue-400"
                      : "bg-slate-100"
                  }`}>
                    {tab === "buy"
                      ? <TrendingUp className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                      : <TrendingDown className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    }
                  </div>
                  <span className={`text-sm font-bold capitalize ${
                    isActive
                      ? tab === "buy" ? "text-emerald-700" : "text-blue-700"
                      : "text-slate-500"
                  }`}>
                    {tab} Orders
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className={`text-2xl font-black ${
                    isActive
                      ? tab === "buy" ? "text-emerald-600" : "text-blue-600"
                      : "text-slate-300"
                  }`}>
                    {loading ? "—" : tabOrders.length}
                  </span>
                  {!loading && pending > 0 && (
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
            <p className="text-slate-400 text-sm">Loading orders…</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 text-sm">{error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div className="space-y-6">
            {/* Pending */}
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

            {/* History */}
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

        {/* ── Sentinel + load-more indicator ── */}
        <div ref={sentinelRef} className="py-2 flex justify-center">
          {loadingMore && (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading more…
            </div>
          )}
          {!hasMore && !loading && orders.length > 0 && (
            <p className="text-xs text-slate-300">You've seen all orders</p>
          )}
        </div>
      </main>
    </div>
  );
}