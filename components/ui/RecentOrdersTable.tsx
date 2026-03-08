"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import React from "react";

export type OrderStatus = "pending" | "confirmed" | "cancelled";

export type Order = {
  _id: string;
  orderId: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
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

interface RecentOrdersTableProps {
  orders: Order[];
  loading?: boolean;
  updatingId?: string | null;
  skeletonCount?: number;
  onView?: (order: Order) => void;
  onStatusUpdate?: (id: string, status: OrderStatus) => void;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  pending: {
    label: "Pending",
    icon: <Clock className="w-3 h-3 mr-1" />,
    className: "bg-amber-100 text-amber-700",
  },
  confirmed: {
    label: "Confirmed",
    icon: <CheckCircle className="w-3 h-3 mr-1" />,
    className: "bg-emerald-100 text-emerald-700",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle className="w-3 h-3 mr-1" />,
    className: "bg-red-100 text-red-600",
  },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <Badge
      variant="secondary"
      className={`flex items-center w-fit border-0 ${cfg.className}`}
    >
      {cfg.icon}
      {cfg.label}
    </Badge>
  );
}

function SkeletonRow() {
  return (
    <TableRow>
      {[16, 32, 20, 20, 18, 14, 10].map((w, i) => (
        <TableCell key={i}>
          <div
            className="h-4 bg-muted animate-pulse rounded"
            style={{ width: `${w * 4}px` }}
          />
        </TableCell>
      ))}
    </TableRow>
  );
}

export function RecentOrdersTable({
  orders,
  loading = false,
  skeletonCount = 5,
}: RecentOrdersTableProps) {

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">Type</TableHead>
            <TableHead className="hidden sm:table-cell">Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: skeletonCount }).map((_, i) => (
              <SkeletonRow key={i} />
            ))
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order._id} className="hover:bg-secondary/30">
                <TableCell className="font-medium text-sm">
                  {order.orderId}
                </TableCell>
                <TableCell>
                  <p className="font-medium text-sm">
                    {order.userId.firstName} {order.userId.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.userId.email}
                  </p>
                </TableCell>
                <TableCell className="hidden sm:table-cell capitalize text-sm">
                  {order.orderType} {order.product}
                </TableCell>
                <TableCell className="hidden sm:table-cell font-semibold text-sm">
                  {order.inputAmount.toLocaleString()} {order.fromCurrency}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}