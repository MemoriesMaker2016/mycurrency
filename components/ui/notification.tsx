"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Bell, BellOff, Check, CheckCheck,
  Package, RefreshCcw, ShoppingBag, Trash2, X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type NotificationRole = "admin" | "user";

type Notification = {
  _id: string;
  type: "new_order" | "status_change";
  title: string;
  message: string;
  orderId: string;
  isRead: boolean;
  createdAt: string;
  // admin only
  customerName?: string;
  // user only
  oldStatus?: string;
  newStatus?: string;
};

// ─────────────────────────────────────────────────────────────
// Dummy Data
// ─────────────────────────────────────────────────────────────
const ADMIN_NOTIFICATIONS: Notification[] = [
  {
    _id: "n1", type: "new_order", title: "New Order Received",
    message: "Rahul Sharma placed a new buy order for USD",
    orderId: "ORD-42", customerName: "Rahul Sharma",
    isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    _id: "n2", type: "new_order", title: "New Order Received",
    message: "Priya Patel placed a new sell order for EUR",
    orderId: "ORD-41", customerName: "Priya Patel",
    isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
  },
  {
    _id: "n3", type: "new_order", title: "New Order Received",
    message: "Amit Kumar placed a new buy order for GBP",
    orderId: "ORD-40", customerName: "Amit Kumar",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: "n4", type: "new_order", title: "New Order Received",
    message: "Sneha Gupta placed a new sell order for AED",
    orderId: "ORD-39", customerName: "Sneha Gupta",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    _id: "n5", type: "new_order", title: "New Order Received",
    message: "Vikram Singh placed a new buy order for USD",
    orderId: "ORD-38", customerName: "Vikram Singh",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: "n6", type: "new_order", title: "New Order Received",
    message: "Meera Das placed a new buy order for JPY",
    orderId: "ORD-37", customerName: "Meera Das",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
];

const USER_NOTIFICATIONS: Notification[] = [
  {
    _id: "u1", type: "status_change", title: "Order Confirmed! 🎉",
    message: "Your order ORD-42 has been confirmed by our team.",
    orderId: "ORD-42", oldStatus: "pending", newStatus: "confirmed",
    isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    _id: "u2", type: "status_change", title: "Order Status Updated",
    message: "Your order ORD-39 has been cancelled.",
    orderId: "ORD-39", oldStatus: "pending", newStatus: "cancelled",
    isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    _id: "u3", type: "status_change", title: "Order Confirmed! 🎉",
    message: "Your order ORD-35 has been confirmed by our team.",
    orderId: "ORD-35", oldStatus: "pending", newStatus: "confirmed",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    _id: "u4", type: "status_change", title: "Order Confirmed! 🎉",
    message: "Your order ORD-31 has been confirmed by our team.",
    orderId: "ORD-31", oldStatus: "pending", newStatus: "confirmed",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    _id: "u5", type: "status_change", title: "Order Status Updated",
    message: "Your order ORD-28 has been cancelled.",
    orderId: "ORD-28", oldStatus: "pending", newStatus: "cancelled",
    isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return "just now";
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
}

// ─────────────────────────────────────────────────────────────
// Status pill
// ─────────────────────────────────────────────────────────────
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-600",
    pending:   "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${map[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Single notification card
// ─────────────────────────────────────────────────────────────
function NotifCard({
  notif,
  role,
  onRead,
  onDelete,
}: {
  notif: Notification;
  role: NotificationRole;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const isNew = !notif.isRead;

  const icon = role === "admin"
    ? <ShoppingBag className="w-4 h-4 text-white" />
    : notif.newStatus === "confirmed"
      ? <Check className="w-4 h-4 text-white" />
      : <X className="w-4 h-4 text-white" />;

  const iconBg = role === "admin"
    ? "bg-primary"
    : notif.newStatus === "confirmed"
      ? "bg-emerald-500"
      : "bg-red-400";

  return (
    <div
      className={`relative flex gap-3 p-4 rounded-2xl border transition-all
        ${isNew
          ? "bg-white border-primary/20 shadow-sm shadow-primary/5"
          : "bg-slate-50/60 border-slate-100"
        }`}
    >
      {/* Unread dot */}
      {isNew && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
      )}

      {/* Icon */}
      <div className={`shrink-0 w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mt-0.5`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <p className={`text-sm font-semibold leading-snug ${isNew ? "text-slate-900" : "text-slate-600"}`}>
          {notif.title}
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>

        {/* Meta row */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[10px] font-mono text-slate-400">#{notif.orderId}</span>

          {/* Admin: customer chip */}
          {role === "admin" && notif.customerName && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
              {notif.customerName}
            </span>
          )}

          {/* User: status change arrow */}
          {role === "user" && notif.oldStatus && notif.newStatus && (
            <div className="flex items-center gap-1">
              <StatusPill status={notif.oldStatus} />
              <span className="text-[10px] text-slate-400">→</span>
              <StatusPill status={notif.newStatus} />
            </div>
          )}

          <span className="text-[10px] text-slate-400 ml-auto">{timeAgo(notif.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1">
        {isNew && (
          <button
            onClick={() => onRead(notif._id)}
            className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
            title="Mark as read"
          >
            <CheckCheck className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete(notif._id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────
function SectionHeader({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</h2>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color === "bg-primary" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}>
        {count}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <BellOff className="w-7 h-7 text-slate-300" />
      </div>
      <p className="text-slate-500 font-semibold">All caught up!</p>
      <p className="text-slate-400 text-sm mt-1">No notifications yet</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component — pass role="admin" or role="user"
// ─────────────────────────────────────────────────────────────
interface NotificationsPageProps {
  role?: NotificationRole;
  backHref?: string;
}

export default function NotificationsPage({
  role = "user",
  backHref = "/",
}: NotificationsPageProps) {
  const rawData = role === "admin" ? ADMIN_NOTIFICATIONS : USER_NOTIFICATIONS;
  const [notifications, setNotifications] = useState<Notification[]>(rawData);

  const unread  = notifications.filter((n) => !n.isRead);
  const todayRead    = notifications.filter((n) => n.isRead && isToday(n.createdAt));
  const earlierRead  = notifications.filter((n) => n.isRead && !isToday(n.createdAt));

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => n._id === id ? { ...n, isRead: true } : n));

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

  const deleteOne = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n._id !== id));

  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href={backHref}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">Notifications</h1>
                <p className="text-xs text-slate-400">
                  {unread.length > 0 ? `${unread.length} unread` : "All read"}
                </p>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              {unread.length > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-400 bg-slate-100 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Role indicator */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {role === "admin"
                ? <><Package className="w-3 h-3" /> Admin — New Orders</>
                : <><Bell className="w-3 h-3" /> Your Order Updates</>
              }
            </div>
            <button
              onClick={() => setNotifications(rawData)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              title="Reset demo data"
            >
              <RefreshCcw className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* ── Unread / New ── */}
            {unread.length > 0 && (
              <section>
                <SectionHeader
                  label={role === "admin" ? "New Orders" : "New Updates"}
                  count={unread.length}
                  color="bg-primary"
                />
                <div className="space-y-3">
                  {unread.map((n) => (
                    <NotifCard key={n._id} notif={n} role={role} onRead={markRead} onDelete={deleteOne} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Today read ── */}
            {todayRead.length > 0 && (
              <section>
                <SectionHeader label="Earlier Today" count={todayRead.length} color="bg-slate-300" />
                <div className="space-y-3">
                  {todayRead.map((n) => (
                    <NotifCard key={n._id} notif={n} role={role} onRead={markRead} onDelete={deleteOne} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Older ── */}
            {earlierRead.length > 0 && (
              <section>
                <SectionHeader label="Previous" count={earlierRead.length} color="bg-slate-200" />
                <div className="space-y-3">
                  {earlierRead.map((n) => (
                    <NotifCard key={n._id} notif={n} role={role} onRead={markRead} onDelete={deleteOne} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}