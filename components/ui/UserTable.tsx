'use client'

import { MoreHorizontal, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/app/contexts/admin-context";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;   // "active" | "inactive" | "pending"
  role: string;
  country: string;
  createdAt: string;
};

interface UsersTableProps {
  users: User[];
  loading: boolean;
  totalUsers: number;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  onStatusFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

// ─────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  if (role === "admin")
    return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Admin</Badge>;
  return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">User</Badge>;
}

function StatusDot({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isActive ? "bg-emerald-500" : "bg-red-400"}`} />
      <span className={`text-xs font-medium ${isActive ? "text-emerald-600" : "text-red-500"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

function SkeletonRows({ cols = 7 }: { cols?: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: cols }).map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 bg-muted animate-pulse rounded w-24" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export function UsersTable({
  users, loading, totalUsers, currentPage, itemsPerPage,
  searchQuery, onSearchChange,
  onEdit, onDelete,
}: UsersTableProps) {
  const { activeUserIds } = useAdmin(); // Get live active users from context
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg">All Users</CardTitle>
            <CardDescription>
              {loading
                ? "Loading…"
                : `Showing ${startIndex + 1}–${Math.min(startIndex + itemsPerPage, totalUsers)} of ${totalUsers} users`}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative sm:hidden flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search…"
                className="pl-10 bg-secondary/50"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto -mx-6 px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Country</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden sm:table-cell">Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <SkeletonRows />
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                          <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-sm">{user.phone}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{user.country}</TableCell>

                    {/* Status: Active/Inactive based on live socket */}
                    <TableCell>
                      <StatusDot isActive={activeUserIds.includes(user._id)} />
                    </TableCell>

                    <TableCell><RoleBadge role={user.role} /></TableCell>

                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(user)}>
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete(user._id)}
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}