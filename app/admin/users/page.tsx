"use client";

import { useAdmin } from "@/app/contexts/admin-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { deleteUsersData, updateUserData, getAllUsersData } from "@/apiFasad/apiCalls/admin";
import { EditUserForm, EditUserModal } from "@/components/ui/EditUserModal";
import { Pagination } from "@/components/ui/pagination";
import { UsersTable } from "@/components/ui/UserTable";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  country: string;
  createdAt: string;
};

const ITEMS_PER_PAGE = 10;

// ─────────────────────────────────────────────────────────────
// Stat Cards
// ─────────────────────────────────────────────────────────────
function StatsCards({ totalUsers, activeUsers, inActiveUser }: {
  totalUsers: number;
  activeUsers: number;
  inActiveUser: number;
}) {
  const cards = [
    { icon: Users,     bg: "bg-primary/10",  iconColor: "text-primary",     label: "Total Users", value: totalUsers.toLocaleString() },
    { icon: UserCheck, bg: "bg-emerald-100", iconColor: "text-emerald-600", label: "Active",      value: activeUsers },
    { icon: Clock,     bg: "bg-amber-100",   iconColor: "text-amber-600",   label: "Inactive",    value: inActiveUser },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
// Page
// ─────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [currentPage, setCurrentPage]     = useState(1);
  const [searchQuery, setSearchQuery]     = useState("");
  const [statusFilter, setStatusFilter]   = useState("all");
  const [users, setUsers]                 = useState<User[]>([]);
  const [totalPages, setTotalPages]       = useState(1);
  const [totalUsers, setTotalUsers]       = useState(0);       // filtered — for table
  const [allUsersTotal, setAllUsersTotal] = useState(0);       // real total — for stats
  const [loading, setLoading]             = useState(true);
  const [editingUser, setEditingUser]     = useState<User | null>(null);

  const { activeUsersCount } = useAdmin();
  const inActiveUser = allUsersTotal - activeUsersCount;       // always stable

  // ── Fetch real total once on mount (never changes with search) ──
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const params = new URLSearchParams({ page: "1", limit: "1" });
        const data = await getAllUsersData(params);
        if (data) setAllUsersTotal(data.totalUsers ?? 0);
      } catch (err) {
        console.error("Failed to fetch total count", err);
      }
    };
    fetchTotal();
  }, []);

  // ── Fetch users (changes with search / filter / page) ──────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page:  String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(searchQuery.trim()     && { search: searchQuery.trim() }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });
      const data = await getAllUsersData(params);
      if (data && Array.isArray(data.data)) {
        setUsers(data.data);
        setTotalPages(data.totalPages ?? 1);
        setTotalUsers(data.totalUsers ?? 0);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(fetchUsers, searchQuery ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchUsers, searchQuery]);

  // ── Handlers ───────────────────────────────────────────────
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
      // also refresh real total after delete
      const data = await getAllUsersData(new URLSearchParams({ page: "1", limit: "1" }));
      if (data) setAllUsersTotal(data.totalUsers ?? 0);
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

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/30">
      <main className="p-4 sm:p-6 lg:p-8">

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon" className="bg-transparent">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Users</h1>
              <p className="text-muted-foreground text-sm">Manage all registered users</p>
            </div>
          </div>
        </div>

        {/* Stats — always shows real totals, never affected by search */}
        <StatsCards
          totalUsers={allUsersTotal}
          activeUsers={activeUsersCount}
          inActiveUser={inActiveUser}
        />

        {/* Table — shows filtered results */}
        <UsersTable
          users={users}
          loading={loading}
          totalUsers={totalUsers}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          searchQuery={searchQuery}
          searchPlaceholder="Search by name or email…"
          onStatusFilterChange={handleStatusFilterChange}
          onSearchChange={handleSearchChange}
          onEdit={setEditingUser}
          onDelete={handleDeleteUser}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </main>

      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveUser}
      />
    </div>
  );
}