"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  History,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { getUsersOrder } from "@/apiFasad/apiCalls/userOrders";
import { Order, OrderStatus, OrderType } from "./types";
import StatsOverview from "./StatsOverview";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

const typeStyles: Record<OrderType, string> = {
  buy: "bg-blue-50 text-blue-700 border-blue-200",
  sell: "bg-orange-50 text-orange-700 border-orange-200",
};

type SortOrder = "latest" | "oldest";

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalOrders , setTotalOrders] = useState(0);
  const [summaryData , setsummaryData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] =
    useState<OrderStatus | "all">("all");

  const [type, setType] =
    useState<OrderType | "all">("all");

  const [sort, setSort] =
    useState<SortOrder>("latest");

  const hasActiveFilters =
    status !== "all" ||
    type !== "all" ||
    sort !== "latest";

  const fetchOrders = async (reset = false) => {
    try {
      setLoading(true);

      let query = `?page=${page}&limit=5`;

      if (!reset) {
        if (sort) {
          query += `&date=${sort}`;
        }

        if (status !== "all") {
          query += `&status=${status}`;
        }

        if (type !== "all") {
          query += `&orderType=${type}`;
        }
      }

      const res = await getUsersOrder(query);

      setOrders(res?.data || []);
      setTotalPages(res?.totalPages || 1);
      setTotalOrders(res?.totalOrders || 0)
      setsummaryData(res?.summary ||[])
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
  }, [page, status, type, sort]);

  const clearFilters = () => {
    setStatus("all");
    setType("all");
    setSort("latest");
    setPage(1);
  };

  function updateAndResetPage<T>(
    setter: React.Dispatch<React.SetStateAction<T>>
  ) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <>
     <StatsOverview totalOrder={totalOrders} summary={summaryData} />
  
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-blue-700" />

          <div>
            <h3 className="font-semibold text-slate-900">
              Transaction History
            </h3>

            <p className="text-sm text-slate-500">
              Your recent currency conversions
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterSelect
            icon={
              <SlidersHorizontal className="h-3.5 w-3.5" />
            }
            value={status}
            onChange={updateAndResetPage(setStatus)}
            options={[
              {
                value: "all",
                label: "All statuses",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "completed",
                label: "Completed",
              },
              {
                value: "failed",
                label: "Failed",
              },
            ]}
          />

          <FilterSelect
            value={type}
            onChange={updateAndResetPage(setType)}
            options={[
              {
                value: "all",
                label: "All types",
              },
              {
                value: "buy",
                label: "Buy",
              },
              {
                value: "sell",
                label: "Sell",
              },
            ]}
          />

          <FilterSelect
            value={sort}
            onChange={updateAndResetPage(setSort)}
            options={[
              {
                value: "latest",
                label: "Date: latest",
              },
              {
                value: "oldest",
                label: "Date: oldest",
              },
            ]}
          />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {loading ? (
          <div className="py-10 text-center text-sm text-slate-500">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">
            No orders match your filters.
          </div>
        ) : (
          orders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
            />
          ))
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() =>
            setPage((p) => Math.max(1, p - 1))
          }
          disabled={page === 1}
          className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-slate-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <span className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(totalPages, p + 1)
            )
          }
          disabled={page === totalPages}
          className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-slate-200"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
      </>
  );
}

function OrderRow({ order }: { order: Order }) {
  const date = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
            {order.fromCurrency}
          </span>

          <span className="text-slate-400">→</span>

          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
            {order.toCurrency}
          </span>

          <span
            className={`rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${
              typeStyles[order.orderType]
            }`}
          >
            {order.orderType}
          </span>

          <span
            className={`rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${
              statusStyles[order.status]
            }`}
          >
            {order.status}
          </span>
        </div>

        <span className="text-xs text-slate-400">
          {date}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-slate-900">
            {order.inputAmount.toLocaleString(
              "en-IN"
            )}{" "}
            {order.fromCurrency}
          </p>

          <p className="text-xs text-slate-500">
            Rate: {order.rate}
            &nbsp;·&nbsp;
            Product: {order.product}
          </p>
        </div>

        <p className="text-base font-semibold text-blue-800">
          {order.convertedAmount.toLocaleString(
            "en-IN"
          )}{" "}
          {order.toCurrency}
        </p>
      </div>
    </div>
  );
}

function FilterSelect<T extends string>({
  value,
  onChange,
  options,
  icon,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5">
      {icon}

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as T)
        }
        className="bg-transparent text-sm font-medium text-slate-700 outline-none"
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}