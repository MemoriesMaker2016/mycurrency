"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/app/contexts/admin-context";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Home,
  LogOut,
  Menu,
  MoreHorizontal,
  RefreshCcw,
  Save,
  Search,
  Settings,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { deleteUsersData, getAllUsersData } from "@/apiFasad/apiCalls/admin";
import { Pagination } from "@/components/ui/pagination";
import { UsersTable } from "@/components/ui/UserTable";
import { EditUserModal } from "@/components/ui/EditUserModal";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string; // "active" | "inactive" | "pending"
  role: string;
  country: string;
  createdAt: string;
};

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

const SIDEBAR_LINKS = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users", active: true },
  { icon: RefreshCcw, label: "Orders", href: "/admin/orders" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

// ─────────────────────────────────────────────────────────────
// Stat cards
// ─────────────────────────────────────────────────────────────
function StatsCards({ totalUsers }: { totalUsers: number }) {
  const cards = [
    {
      icon: Users,
      bg: "bg-primary/10",
      iconColor: "text-primary",
      label: "Total Users",
      value: totalUsers.toLocaleString(),
    },
    {
      icon: UserCheck,
      bg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      label: "Active",
      value: "—",
    },
    {
      icon: Clock,
      bg: "bg-amber-100",
      iconColor: "text-amber-600",
      label: "Pending",
      value: "—",
    },
    {
      icon: Shield,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: "KYC Verified",
      value: "—",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(({ icon: Icon, bg, iconColor, label, value }) => (
        <Card key={label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────
interface SidebarProps {
  open: boolean;
  onClose: () => void;
  profile: { name: string; role: string; avatar?: string };
}

function Sidebar({ open, onClose, profile }: SidebarProps) {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary text-primary-foreground transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-primary-foreground/20">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/mycurrency-logo-white.png"
                alt="MyCurrency Logo"
                width={200}
                height={70}
                className="object-contain"
                priority
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  link.active
                    ? "bg-primary-foreground text-primary shadow-md"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Profile */}
          <div className="p-4 border-t border-primary-foreground/20">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/10">
              <Avatar className="h-10 w-10 border-2 border-primary-foreground/30">
                <AvatarImage
                  src={profile.avatar || `https://avatar.vercel.sh/admin`}
                />
                <AvatarFallback className="bg-primary-foreground text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{profile.name}</p>
                <p className="text-xs text-primary-foreground/70 truncate">
                  {profile.role}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


// ─────────────────────────────────────────────────────────────
// Page (orchestrator — only state + data fetching lives here)
// ─────────────────────────────────────────────────────────────
export default function UsersPage() {
  const { profile } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // ── fetch ──────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery }),
      });
      const data = await getAllUsersData(params);
      if (data) {
        setUsers(data.data);
        setTotalPages(data.totalPages);
        setTotalUsers(data.totalUsers);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchQuery]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(fetchUsers, searchQuery ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchUsers, searchQuery]);

  // ── handlers ───────────────────────────────────────────────
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (v: string) => {
    setStatusFilter(v);
    setCurrentPage(1);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const params = new URLSearchParams({ id });
      await deleteUsersData(params);
      await fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSaveUser = async (id: string, data: EditForm) => {
    try {
      // await updateUserData(id, data);
      await fetchUsers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // ── render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/30">
     
      <div >
     

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Users
                </h1>
                <p className="text-muted-foreground text-sm">
                  Manage all registered users
                </p>
              </div>
            </div>
            <Button className="gap-2 w-full sm:w-auto">
              <UserPlus className="w-4 h-4" /> Add User
            </Button>
          </div>

          <StatsCards totalUsers={totalUsers} />

          <UsersTable
            users={users}
            loading={loading}
            totalUsers={totalUsers}
            currentPage={currentPage}
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            onStatusFilterChange={handleStatusFilterChange}
            onSearchChange={handleSearchChange}
            onEdit={setEditingUser}
            onDelete={handleDeleteUser}
            itemsPerPage={0}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            onPageChange={handlePageChange}
          />
        </main>
      </div>

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
      />
    </div>
  );
}
