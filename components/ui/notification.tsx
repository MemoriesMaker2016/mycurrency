"use client";

import Link from "next/link";
import {
  ArrowLeft, Bell, BellOff, Check, CheckCheck,
  Loader2, Package, ShoppingBag, Trash2, X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type NotificationRole = "admin" | "user";

export type Notification = {
  _id: string;
  type: "new_order" | "status_change";
  title: string;
  message: string;
  orderId: string;
  orderRef?: string;
  isRead: boolean;
  createdAt: string;
  customerName?: string;
  oldStatus?: string;
  newStatus?: string;
};

interface NotificationsPageProps {
  role?: NotificationRole;
  backHref?: string;
  loading?: boolean;
  notifications: Notification[];
  // accepts BOTH naming styles — hook uses handle*, pages can pass either
  handleMarkRead?: (id: string) => void;
  handleMarkAllRead?: () => void;
  handleClearAll?: () => void;
  handleDelete?: (id: string) => void;
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onClearAll?: () => void;
  onDelete?: (id: string) => void;
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diff  = Date.now() - new Date(iso).getTime();
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
  const n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
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
// Notification card
// ─────────────────────────────────────────────────────────────
function NotifCard({
  notif, role, onRead, onDelete,
}: {
  notif: Notification;
  role: NotificationRole;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const isNew  = !notif.isRead;
  const iconBg = role === "admin"
    ? "bg-primary"
    : notif.newStatus === "confirmed" ? "bg-emerald-500" : "bg-red-400";

  const icon = role === "admin"
    ? <ShoppingBag className="w-4 h-4 text-white" />
    : notif.newStatus === "confirmed"
      ? <Check className="w-4 h-4 text-white" />
      : <X className="w-4 h-4 text-white" />;

  return (
    <div className={`relative flex gap-3 p-4 rounded-2xl border transition-all
      ${isNew ? "bg-white border-primary/20 shadow-sm shadow-primary/5" : "bg-slate-50/60 border-slate-100"}`}
    >
      {isNew && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />}

      {/* Icon */}
      <div className={`shrink-0 w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mt-0.5`}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-6">
        <p className={`text-sm font-semibold leading-snug ${isNew ? "text-slate-900" : "text-slate-600"}`}>
          {notif.title}
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[10px] font-mono text-slate-400">
            #{notif.orderRef ?? notif.orderId}
          </span>

          {role === "admin" && notif.customerName && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
              {notif.customerName}
            </span>
          )}

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
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        color === "bg-primary" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
      }`}>
        {count}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Empty / Loading
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

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
      <p className="text-slate-400 text-sm">Loading notifications…</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main — works with {...notif} spread directly from useNotifications()
// ─────────────────────────────────────────────────────────────
export default function NotificationsPage({
  role = "user",
  backHref = "/",
  loading = false,
  notifications = [],
  // support both handle* (from hook spread) and on* (manual props)
  handleMarkRead,   onMarkRead,
  handleMarkAllRead, onMarkAllRead,
  handleClearAll,   onClearAll,
  handleDelete,     onDelete,
}: NotificationsPageProps) {
  // resolve whichever naming style was passed
  const markRead    = handleMarkRead    ?? onMarkRead    ?? (() => {});
  const markAllRead = handleMarkAllRead ?? onMarkAllRead ?? (() => {});
  const clearAll    = handleClearAll    ?? onClearAll    ?? (() => {});
  const deleteOne   = handleDelete      ?? onDelete      ?? (() => {});

  const unread      = notifications.filter((n) => !n.isRead);
  const todayRead   = notifications.filter((n) => n.isRead && isToday(n.createdAt));
  const earlierRead = notifications.filter((n) => n.isRead && !isToday(n.createdAt));

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* ── Header ── */}
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
                  {loading ? "Loading…" : unread.length > 0 ? `${unread.length} unread` : "All read"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!loading && unread.length > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              )}
              {!loading && notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-400 bg-slate-100 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear all
                </button>
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {role === "admin"
                ? <><Package className="w-3 h-3" /> Admin — New Orders</>
                : <><Bell className="w-3 h-3" /> Your Order Updates</>
              }
            </div>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {loading ? (
          <LoadingState />
        ) : notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Unread */}
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

            {/* Earlier today */}
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

            {/* Previous */}
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