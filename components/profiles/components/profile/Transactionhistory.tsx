"use client";

import { useState, useEffect } from "react";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilterModal from "./FilterModal";
import ActiveFilters from "./ActiveFilters";
import OrderCard from "./OrderCard";
import { getUsersOrder } from "@/apiFasad/apiCalls/userOrders";

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

export default function TransactionHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("latest");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterOrderType, setFilterOrderType] = useState("");

  // ── Core fetch — takes values as args, no stale closure risk ──────────────
   const fetchOrders = async (value:boolean) => {
    try {
      let query = `?page=${page}&limit=5`;
      if (filterDate) query += `&date=${filterDate}`;
      if (filterStatus) query += `&status=${filterStatus}`;
      if (filterOrderType) query += `&orderType=${filterOrderType}`;
      if (value ) query =  `?page=${page}&limit=5`
      const res = await getUsersOrder(query);
      setOrders(res.data);
      setTotalPages(res.totalPages);
      value=false
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchOrders(true);
  }, [page]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleApply = () => {
    setIsFilterOpen(false);
    setPage(1); // triggers useEffect with new filter values
     fetchOrders(false)
  };

  const handleClear = () => {
    setFilterDate("");  
    setFilterStatus("");
    setFilterOrderType("");
    setPage(1);
    fetchOrders(true)
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {isFilterOpen && (
        <FilterModal
          filterDate={filterDate}
          filterStatus={filterStatus}
          filterOrderType={filterOrderType}
          onDateChange={setFilterDate}
          onStatusChange={setFilterStatus}
          onOrderTypeChange={setFilterOrderType}
          onApply={handleApply}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <ActiveFilters
        filterDate={filterDate}
        filterStatus={filterStatus}
        filterOrderType={filterOrderType}
        onClear={handleClear}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History
          </CardTitle>
          <CardDescription>Your recent currency conversions</CardDescription>
          <Button onClick={() => setIsFilterOpen(true)} className="mb-4">
            Filter Orders
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders?.map((record) => (
              <OrderCard key={record._id} record={record} />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </Button>
            <span className="px-2 py-1 bg-background rounded">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}