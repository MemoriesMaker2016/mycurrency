"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Globe,
  RefreshCcw,
  Shield,
  ShoppingCart,
  UserCheck,
  Users
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// ── shared table components ───────────────────────────────────


// ── API calls (replace with your actual imports) ──────────────
import { getAllUsersData, getAllUsersOrderData } from "@/apiFasad/apiCalls/admin";
import { useAdmin } from "@/app/contexts/admin-context";
import { Order, RecentOrdersTable } from "@/components/ui/RecentOrdersTable";
import { RecentUsersTable } from "@/components/ui/Recentuserstable";
import { User } from "./users/page";

// ─────────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: string;
  changeUp?: boolean;
  gradient?: boolean;
  iconBg?: string;
  iconColor?: string;
  changeBg?: string;
  changeColor?: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  changeUp,
  gradient = false,
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
  changeBg,
  changeColor,
}: StatCardProps) {
  if (gradient) {
    return (
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            {change && (
              <span className="text-xs px-2 py-1 rounded-full bg-primary-foreground/20 flex items-center gap-1">
                {changeUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {change}
              </span>
            )}
          </div>
          <p className="text-sm text-primary-foreground/80 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          {change && (
            <span
              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                changeBg ?? (changeUp ? "bg-emerald-100" : "bg-red-100")
              } ${changeColor ?? (changeUp ? "text-emerald-700" : "text-red-600")}`}
            >
              {changeUp ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {change}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Dashboard Page
// ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { activeUsersCount } = useAdmin();

  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [usersLoading, setUsersLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [period, setPeriod] = useState("today");

  const inactiveUsers = totalUsers - activeUsersCount;

  // ── fetch 5 most recent users ─────────────────────────────
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const params = new URLSearchParams({ page: "1", limit: "5" });
      const data = await getAllUsersData(params);
      if (data) {
        setUsers(data.data);
        setTotalUsers(data.totalUsers);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  // ── fetch 5 most recent orders ────────────────────────────
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const params = new URLSearchParams({ page: "1", limit: "5" });
      const data = await getAllUsersOrderData(params);
      if (data) {
        setOrders(data.data);
        setTotalOrders(data.totalOrders);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, [fetchUsers, fetchOrders]);

  const handleRefresh = () => {
    fetchUsers();
    fetchOrders();
  };

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/30">
      <main className="p-4 sm:p-6 lg:p-8">

        {/* ── Page header ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Monitor and manage your forex platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ── Stat cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="Total visiter"
            value="2000"
            change="18%"
            changeUp
            gradient
          />
          <StatCard
            icon={Users}
            label="Total Users"
            value={totalUsers.toLocaleString()}
            change={usersLoading ? undefined : "324"}
            changeUp
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={UserCheck}
            label="Active Users"
            value={activeUsersCount.toLocaleString()}
            iconBg="bg-sky-100"
            iconColor="text-sky-600"
            change={undefined}
          />
          <StatCard
            icon={ShoppingCart}
            label="Total Orders"
            value={totalOrders.toLocaleString()}
            change="12%"
            changeUp
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />
        </div>

      

        {/* ── Recent Orders ────────────────────────────────── */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest 5 forex transactions</CardDescription>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable
              orders={orders}
              loading={ordersLoading}
              skeletonCount={5}
              /* no onView / onStatusUpdate here — dashboard is read-only */
            />
          </CardContent>
        </Card>

        {/* ── Bottom row: Recent Users + System Overview ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" /> Recent Users
                </CardTitle>
                <CardDescription>Latest 5 registrations</CardDescription>
              </div>
              <Link href="/admin/users">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentUsersTable
                users={users}
                loading={usersLoading}
                skeletonCount={5}
                /* no onEdit / onDelete here — dashboard is read-only */
              />
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" /> System Overview
              </CardTitle>
              <CardDescription>Platform health metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Server Uptime", value: 99.98, display: "99.98%", color: "text-emerald-600" },
                { label: "API Response Time", value: 15, display: "45ms", color: "text-foreground" },
                { label: "Order Success Rate", value: 97.5, display: "97.5%", color: "text-emerald-600" },
                { label: "Database Load", value: 42, display: "42%", color: "text-amber-600" },
              ].map(({ label, value, display, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className={`text-sm font-medium ${color}`}>{display}</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">16</p>
                    <p className="text-xs text-muted-foreground">Currencies</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                    <p className="text-2xl font-bold text-foreground">100%</p>
                    <p className="text-xs text-muted-foreground">Secure</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}