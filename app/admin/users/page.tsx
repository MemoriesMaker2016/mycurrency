"use client";

import { useAdmin } from "@/app/contexts/admin-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  Home,
  LogOut,
  RefreshCcw,
  Settings,
  Shield,
  UserCheck,
  UserPlus,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { deleteUsersData, updateUserData, getAllUsersData } from "@/apiFasad/apiCalls/admin";
import { EditUserForm, EditUserModal } from "@/components/ui/EditUserModal";
import { Pagination } from "@/components/ui/pagination";
import { UsersTable } from "@/components/ui/UserTable";
import Image from "next/image";

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



// ─────────────────────────────────────────────────────────────
// Stat cards
// ─────────────────────────────────────────────────────────────
function StatsCards({ totalUsers ,activeUsers }: { totalUsers: number  , activeUsers:number}) {
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
      value: activeUsers,
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
// Page (orchestrator — only state + data fetching lives here)
// ─────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const {activeUsersCount} = useAdmin()
console.log("user is " , users);

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

  const handleSaveUser = async (id: string, data: EditUserForm) => {
    try {
       const params = new URLSearchParams({ id });
      await updateUserData(params, data);
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

          <StatsCards totalUsers={totalUsers} activeUsers={activeUsersCount} />

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
