"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle, Clock, Eye,
  Filter, MoreHorizontal, XCircle, Loader2, Search, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { getAllUsersOrderData, updateStatusUsersOrderData } from "@/apiFasad/apiCalls/admin";


// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type OrderStatus = "pending" | "confirmed" | "cancelled";

type Order = {
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

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ReactNode; className: string }> = {
  pending:   { label: "Pending",   icon: <Clock className="w-3 h-3 mr-1" />,       className: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Confirmed", icon: <CheckCircle className="w-3 h-3 mr-1" />, className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelled", icon: <XCircle className="w-3 h-3 mr-1" />,     className: "bg-red-100 text-red-600" },
};

// ─────────────────────────────────────────────────────────────
// Status Badge
// ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <Badge variant="secondary" className={`flex items-center w-fit ${cfg.className}`}>
      {cfg.icon}{cfg.label}
    </Badge>
  );
}

// ─────────────────────────────────────────────────────────────
// Order Details Modal
// ─────────────────────────────────────────────────────────────
function OrderDetailsModal({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  if (!order) return null;
  const user = order.userId;

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Order {order.orderId}
            <StatusBadge status={order.status} />
          </DialogTitle>
          <DialogDescription>
            Placed on {new Date(order.createdAt).toLocaleString("en-IN")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Customer */}
          <section>
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Customer</p>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{user.firstName} {user.lastName}</span>
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium truncate">{user.email}</span>
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{user.phone}</span>
            </div>
          </section>

          <Separator />

          {/* Transaction */}
          <section>
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Transaction</p>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium capitalize">{order.orderType} {order.product}</span>
              <span className="text-muted-foreground">From</span>
              <span className="font-medium">{order.inputAmount.toLocaleString()} {order.fromCurrency}</span>
              <span className="text-muted-foreground">To</span>
              <span className="font-medium">{order.convertedAmount.toLocaleString()} {order.toCurrency}</span>
              <span className="text-muted-foreground">Rate</span>
              <span className="font-medium">1 {order.fromCurrency} = {order.rate} {order.toCurrency}</span>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────
// Skeleton Rows
// ─────────────────────────────────────────────────────────────
function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: 7 }).map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 bg-muted animate-pulse rounded w-20" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function AllOrdersPage() {
  const [orders, setOrders]               = useState<Order[]>([]);
  const [totalOrders, setTotalOrders]     = useState(0);
  const [totalPages, setTotalPages]       = useState(1);
  const [currentPage, setCurrentPage]     = useState(1);
  const [statusFilter, setStatusFilter]   = useState("all");
  const [searchQuery, setSearchQuery]     = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading]             = useState(true);
  const [viewOrder, setViewOrder]         = useState<Order | null>(null);
  const [updatingId, setUpdatingId]       = useState<string | null>(null);
  const debounceRef                       = useRef<NodeJS.Timeout | null>(null);

  // ── Search with debounce ─────────────────────────────────
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  // ── Fetch orders ─────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page:  String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(statusFilter !== "all"   && { status: statusFilter }),
        ...(debouncedSearch.trim()   && { search: debouncedSearch.trim() }),
      });
      const data = await getAllUsersOrderData(params);
      if (data && Array.isArray(data.data)) {
        setOrders(data.data);
        setTotalOrders(data.totalOrders ?? 0);
        setTotalPages(data.totalPages ?? 1);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, debouncedSearch]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // ── Handlers ─────────────────────────────────────────────
  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusUpdate = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    try {
      await updateStatusUsersOrderData({ id, status });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // ─────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────
  return (
    <div>
      <main className="p-4 sm:p-6 lg:p-8">

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">All Orders</h1>
              <p className="text-muted-foreground text-sm">View and manage all forex transactions</p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <Card>
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-col  w-full sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  {loading
                    ? "Loading…"
                    : totalOrders === 0
                    ? "No orders found"
                    : `Showing ${startIndex + 1}–${Math.min(startIndex + ITEMS_PER_PAGE, totalOrders)} of ${totalOrders} orders`}
                </CardDescription>
              </div>

              {/* Search + Filter */}
              <div className="flex  items-center justify-end  gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Order ID, name, email…"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-9 pr-8 w-56 sm:w-64"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active search indicator */}
            {debouncedSearch && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="w-3 h-3" />
                Searching for <span className="font-medium text-foreground">"{debouncedSearch}"</span>
                <button
                  onClick={clearSearch}
                  className="text-destructive hover:underline text-xs ml-1"
                >
                  Clear
                </button>
              </div>
            )}
          </CardHeader>

          <CardContent>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <SkeletonRows />
                  ) : orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-16">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="w-8 h-8 text-muted-foreground/50" />
                          <p className="font-medium">No orders found</p>
                          {debouncedSearch && (
                            <p className="text-xs">
                              No results for "{debouncedSearch}".{" "}
                              <button onClick={clearSearch} className="underline hover:text-foreground">
                                Clear search
                              </button>
                            </p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order._id} className="hover:bg-secondary/30">

                        <TableCell className="font-medium">{order.orderId}</TableCell>

                        <TableCell>
                          <p className="font-medium">
                            {order.userId.firstName} {order.userId.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">{order.userId.email}</p>
                        </TableCell>

                        <TableCell className="hidden sm:table-cell capitalize">
                          {order.orderType} {order.product}
                        </TableCell>

                        <TableCell className="hidden sm:table-cell font-semibold">
                          {order.inputAmount.toLocaleString()} {order.fromCurrency}
                        </TableCell>

                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </TableCell>

                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>

                        <TableCell className="text-right">
                          {updatingId === order._id ? (
                            <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">

                                <DropdownMenuItem onClick={() => setViewOrder(order)}>
                                  <Eye className="w-4 h-4 mr-2" /> View Details
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  disabled={order.status === "confirmed"}
                                  onClick={() => handleStatusUpdate(order._id, "confirmed")}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" /> Mark Confirmed
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  disabled={order.status === "pending"}
                                  onClick={() => handleStatusUpdate(order._id, "pending")}
                                >
                                  <Clock className="w-4 h-4 mr-2 text-amber-600" /> Mark Pending
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  disabled={order.status === "cancelled"}
                                  className="text-destructive"
                                  onClick={() => handleStatusUpdate(order._id, "cancelled")}
                                >
                                  <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                                </DropdownMenuItem>

                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>

                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              loading={loading}
              onPageChange={handlePageChange}
            />
          </CardContent>
        </Card>
      </main>

      {/* View Details Modal */}
      <OrderDetailsModal order={viewOrder} onClose={() => setViewOrder(null)} />
    </div>
  );
}