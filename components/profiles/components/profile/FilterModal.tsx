"use client";

import { Button } from "@/components/ui/button";

type Props = {
  filterDate: string;
  filterStatus: string;
  filterOrderType: string;
  onDateChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onOrderTypeChange: (v: string) => void;
  onApply: () => void;
  onClose: () => void;
};

export default function FilterModal({
  filterDate,
  filterStatus,
  filterOrderType,
  onDateChange,
  onStatusChange,
  onOrderTypeChange,
  onApply,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">Filter Orders</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Date</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filterDate}
            onChange={(e) => onDateChange(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="today">Today</option>
            <option value="last7">Last 7 Days</option>
            <option value="last10">Last 10 Days</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Order Type</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={filterOrderType}
            onChange={(e) => onOrderTypeChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onApply}>Apply</Button>
        </div>
      </div>
    </div>
  );
}