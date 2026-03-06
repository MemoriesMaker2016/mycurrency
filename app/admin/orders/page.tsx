'use client';

import { useState } from 'react';
import { useAdmin } from '@/app/contexts/admin-context';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Bell,
  BarChart3,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  Home,
  LogOut,
  Menu,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Settings,
  Shield,
  UserCheck,
  Users,
  Wallet,
  X,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const adminSidebarLinks = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  {
    icon: RefreshCcw,
    label: 'Orders',
    href: '/admin/orders',
    active: true,
  },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

// Extended orders data for pagination demo
const allOrders = [
  {
    id: 'ORD-001',
    user: 'Rahul Sharma',
    email: 'rahul@email.com',
    type: 'Buy USD',
    amount: '₹83,250',
    status: 'pending',
    date: '2024-01-15 10:30',
  },
  {
    id: 'ORD-002',
    user: 'Priya Patel',
    email: 'priya@email.com',
    type: 'Transfer GBP',
    amount: '₹1,05,200',
    status: 'completed',
    date: '2024-01-15 09:45',
  },
  {
    id: 'ORD-003',
    user: 'Amit Kumar',
    email: 'amit@email.com',
    type: 'Sell EUR',
    amount: '₹45,225',
    status: 'processing',
    date: '2024-01-15 09:15',
  },
  {
    id: 'ORD-004',
    user: 'Sneha Gupta',
    email: 'sneha@email.com',
    type: 'Buy AED',
    amount: '₹22,680',
    status: 'completed',
    date: '2024-01-15 08:50',
  },
  {
    id: 'ORD-005',
    user: 'Vikram Singh',
    email: 'vikram@email.com',
    type: 'Transfer USD',
    amount: '₹2,49,750',
    status: 'failed',
    date: '2024-01-14 18:30',
  },
  {
    id: 'ORD-006',
    user: 'Ananya Reddy',
    email: 'ananya@email.com',
    type: 'Buy EUR',
    amount: '₹67,890',
    status: 'completed',
    date: '2024-01-14 17:20',
  },
  {
    id: 'ORD-007',
    user: 'Karan Mehta',
    email: 'karan@email.com',
    type: 'Sell USD',
    amount: '₹1,23,450',
    status: 'pending',
    date: '2024-01-14 16:45',
  },
  {
    id: 'ORD-008',
    user: 'Divya Nair',
    email: 'divya@email.com',
    type: 'Transfer AED',
    amount: '₹34,500',
    status: 'completed',
    date: '2024-01-14 15:30',
  },
  {
    id: 'ORD-009',
    user: 'Rohan Joshi',
    email: 'rohan@email.com',
    type: 'Buy GBP',
    amount: '₹89,100',
    status: 'processing',
    date: '2024-01-14 14:15',
  },
  {
    id: 'ORD-010',
    user: 'Meera Das',
    email: 'meera@email.com',
    type: 'Sell EUR',
    amount: '₹56,780',
    status: 'completed',
    date: '2024-01-14 13:00',
  },
  {
    id: 'ORD-011',
    user: 'Arjun Kapoor',
    email: 'arjun@email.com',
    type: 'Buy USD',
    amount: '₹1,45,000',
    status: 'completed',
    date: '2024-01-14 12:30',
  },
  {
    id: 'ORD-012',
    user: 'Pooja Sharma',
    email: 'pooja@email.com',
    type: 'Transfer GBP',
    amount: '₹78,900',
    status: 'pending',
    date: '2024-01-14 11:45',
  },
  {
    id: 'ORD-013',
    user: 'Nikhil Verma',
    email: 'nikhil@email.com',
    type: 'Sell AED',
    amount: '₹23,450',
    status: 'failed',
    date: '2024-01-14 10:20',
  },
  {
    id: 'ORD-014',
    user: 'Ritu Agarwal',
    email: 'ritu@email.com',
    type: 'Buy EUR',
    amount: '₹98,760',
    status: 'completed',
    date: '2024-01-14 09:15',
  },
  {
    id: 'ORD-015',
    user: 'Sanjay Gupta',
    email: 'sanjay@email.com',
    type: 'Transfer USD',
    amount: '₹2,34,500',
    status: 'processing',
    date: '2024-01-13 18:00',
  },
  {
    id: 'ORD-016',
    user: 'Neha Verma',
    email: 'neha@email.com',
    type: 'Buy GBP',
    amount: '₹67,800',
    status: 'completed',
    date: '2024-01-13 17:30',
  },
  {
    id: 'ORD-017',
    user: 'Aditya Rao',
    email: 'aditya@email.com',
    type: 'Sell USD',
    amount: '₹1,12,350',
    status: 'pending',
    date: '2024-01-13 16:45',
  },
  {
    id: 'ORD-018',
    user: 'Kavita Singh',
    email: 'kavita@email.com',
    type: 'Transfer EUR',
    amount: '₹45,670',
    status: 'completed',
    date: '2024-01-13 15:20',
  },
  {
    id: 'ORD-019',
    user: 'Rajesh Iyer',
    email: 'rajesh@email.com',
    type: 'Buy AED',
    amount: '₹34,890',
    status: 'completed',
    date: '2024-01-13 14:00',
  },
  {
    id: 'ORD-020',
    user: 'Sunita Patel',
    email: 'sunita@email.com',
    type: 'Sell GBP',
    amount: '₹89,450',
    status: 'failed',
    date: '2024-01-13 13:15',
  },
  {
    id: 'ORD-021',
    user: 'Vijay Kumar',
    email: 'vijay@email.com',
    type: 'Buy USD',
    amount: '₹1,56,780',
    status: 'completed',
    date: '2024-01-13 12:00',
  },
  {
    id: 'ORD-022',
    user: 'Lakshmi Nair',
    email: 'lakshmi@email.com',
    type: 'Transfer AED',
    amount: '₹23,450',
    status: 'processing',
    date: '2024-01-13 11:30',
  },
  {
    id: 'ORD-023',
    user: 'Manish Jain',
    email: 'manish@email.com',
    type: 'Sell EUR',
    amount: '₹78,900',
    status: 'completed',
    date: '2024-01-13 10:15',
  },
  {
    id: 'ORD-024',
    user: 'Shweta Reddy',
    email: 'shweta@email.com',
    type: 'Buy GBP',
    amount: '₹1,23,400',
    status: 'pending',
    date: '2024-01-12 18:45',
  },
  {
    id: 'ORD-025',
    user: 'Deepak Sharma',
    email: 'deepak@email.com',
    type: 'Transfer USD',
    amount: '₹3,45,670',
    status: 'completed',
    date: '2024-01-12 17:30',
  },
  {
    id: 'ORD-026',
    user: 'Anjali Mehta',
    email: 'anjali@email.com',
    type: 'Buy EUR',
    amount: '₹56,780',
    status: 'completed',
    date: '2024-01-12 16:00',
  },
  {
    id: 'ORD-027',
    user: 'Suresh Gupta',
    email: 'suresh@email.com',
    type: 'Sell AED',
    amount: '₹12,340',
    status: 'failed',
    date: '2024-01-12 15:15',
  },
  {
    id: 'ORD-028',
    user: 'Pallavi Das',
    email: 'pallavi@email.com',
    type: 'Transfer GBP',
    amount: '₹89,100',
    status: 'completed',
    date: '2024-01-12 14:00',
  },
  {
    id: 'ORD-029',
    user: 'Ashok Verma',
    email: 'ashok@email.com',
    type: 'Buy USD',
    amount: '₹2,34,560',
    status: 'processing',
    date: '2024-01-12 13:30',
  },
  {
    id: 'ORD-030',
    user: 'Geeta Nair',
    email: 'geeta@email.com',
    type: 'Sell EUR',
    amount: '₹67,890',
    status: 'completed',
    date: '2024-01-12 12:15',
  },
];

const ITEMS_PER_PAGE = 10;

export default function AllOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { profile } = useAdmin();

  // Filter orders based on status
  const filteredOrders =
    statusFilter === 'all'
      ? allOrders
      : allOrders.filter((order) => order.status === statusFilter);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Reset to page 1 when filter changes
  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile sidebar overlay */}
   

      {/* Main content */}
      <div >

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  All Orders
                </h1>
                <p className="text-muted-foreground">
                  View and manage all forex transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent">
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Orders Table Card */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredOrders.length)} of{' '}
                  {filteredOrders.length} orders
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="hover:bg-secondary/30"
                      >
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">
                              {order.user}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {order.type}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {order.amount}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                          {order.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              order.status === 'completed'
                                ? 'bg-success/10 text-success'
                                : order.status === 'pending'
                                  ? 'bg-accent/20 text-accent-foreground'
                                  : order.status === 'processing'
                                    ? 'bg-chart-4/20 text-chart-4'
                                    : 'bg-destructive/10 text-destructive'
                            }
                          >
                            {order.status === 'completed' && (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {order.status === 'pending' && (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {order.status === 'failed' && (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            <span className="hidden xs:inline">
                              {order.status}
                            </span>
                            <span className="xs:hidden capitalize">
                              {order.status.slice(0, 4)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Process Order</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground order-2 sm:order-1">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-1 order-1 sm:order-2">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <Button
                        key={index}
                        variant={page === currentPage ? 'default' : 'outline'}
                        size="sm"
                        onClick={() =>
                          typeof page === 'number' && goToPage(page)
                        }
                        disabled={typeof page === 'string'}
                        className={`w-9 h-9 p-0 ${typeof page === 'string' ? 'cursor-default border-0 bg-transparent hover:bg-transparent' : page === currentPage ? '' : 'bg-transparent'}`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-transparent"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
