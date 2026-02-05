'use client';

import { useState } from 'react';
import { useAdmin } from '@/app/contexts/admin-context';
import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  Filter,
  Globe,
  Home,
  LogOut,
  Menu,
  MoreHorizontal,
  RefreshCcw,
  Search,
  Settings,
  Shield,
  TrendingUp,
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
import { Progress } from '@/components/ui/progress';
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
import Image from 'next/image';

const adminSidebarLinks = [
  { icon: Home, label: 'Dashboard', href: '/admin', active: true },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: RefreshCcw, label: 'Orders', href: '/admin/orders' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const recentOrders = [
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
];

const recentUsers = [
  {
    id: 'USR-001',
    name: 'Rahul Sharma',
    email: 'rahul1@email.com',
    phone: '+91 79578 29812',
    status: 'active',
    kycStatus: 'verified',
    joinedDate: '05 Jan 2024',
    lastLogin: '23h ago',
  },
  {
    id: 'USR-002',
    name: 'Priya Patel',
    email: 'priya2@email.com',
    phone: '+91 89007 25534',
    status: 'active',
    kycStatus: 'verified',
    joinedDate: '04 Jan 2024',
    lastLogin: '10h ago',
  },
  {
    id: 'USR-003',
    name: 'Amit Kumar',
    email: 'amit3@email.com',
    phone: '+91 85113 65306',
    status: 'active',
    kycStatus: 'verified',
    joinedDate: '30 Jan 2024',
    lastLogin: '19h ago',
  },
  {
    id: 'USR-004',
    name: 'Sneha Gupta',
    email: 'sneha4@email.com',
    phone: '+91 97365 19661',
    status: 'inactive',
    kycStatus: 'pending',
    joinedDate: '06 Jan 2024',
    lastLogin: 'Never',
  },
  {
    id: 'USR-005',
    name: 'Vikram Singh',
    email: 'vikram5@email.com',
    phone: '+91 95036 42120',
    status: 'pending',
    kycStatus: 'rejected',
    joinedDate: '24 Jan 2024',
    lastLogin: '23h ago',
  },
];

const topCurrencies = [
  {
    code: 'USD',
    name: 'US Dollar',
    volume: '₹45.2 Cr',
    change: '+5.2%',
    trending: true,
  },
  {
    code: 'EUR',
    name: 'Euro',
    volume: '₹28.5 Cr',
    change: '+3.8%',
    trending: true,
  },
  {
    code: 'GBP',
    name: 'British Pound',
    volume: '₹18.9 Cr',
    change: '-1.2%',
    trending: false,
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    volume: '₹12.4 Cr',
    change: '+2.1%',
    trending: true,
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAdmin();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-0">
            Inactive
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
            Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getKycBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary text-primary-foreground transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {adminSidebarLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  link.active
                    ? 'bg-primary-foreground text-primary shadow-md'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Admin profile at bottom */}
          <div className="p-4 border-t border-primary-foreground/20">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/10">
              <Avatar className="h-10 w-10 border-2 border-primary-foreground/30">
                <AvatarImage
                  src={profile.avatar || 'https://avatar.vercel.sh/admin'}
                />
                <AvatarFallback className="bg-primary-foreground text-primary">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
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

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users, orders..."
                  className="pl-10 w-80 bg-secondary/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  12
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={profile.avatar || 'https://avatar.vercel.sh/admin'}
                      />
                      <AvatarFallback>
                        {profile.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/admin/settings">
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage your forex platform
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="today">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> 18%
                  </Badge>
                </div>
                <p className="text-sm text-primary-foreground/80 mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">₹2.45 Cr</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-success" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" /> 324
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-foreground">12,847</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <RefreshCcw className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/10 text-success"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Today's Orders
                </p>
                <p className="text-2xl font-bold text-foreground">1,248</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-chart-4/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-chart-4" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-destructive/10 text-destructive"
                  >
                    <ArrowDownRight className="w-3 h-3 mr-1" /> 5
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Pending KYC
                </p>
                <p className="text-2xl font-bold text-foreground">47</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Recent Orders */}
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest forex transactions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                  </Button>
                  <Link href="/admin/orders">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
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
                          <TableCell>{order.type}</TableCell>
                          <TableCell className="font-semibold">
                            {order.amount}
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
                              {order.status}
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
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Process Order
                                </DropdownMenuItem>
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
              </CardContent>
            </Card>

            {/* Currency Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Top Currencies
                </CardTitle>
                <CardDescription>By trading volume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCurrencies.map((currency, index) => (
                  <div key={currency.code} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-foreground">
                          {currency.code}
                        </p>
                        <span
                          className={`text-sm font-medium ${currency.trending ? 'text-success' : 'text-destructive'}`}
                        >
                          {currency.change}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currency.volume}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Users Registration section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" /> Users
                  </CardTitle>
                  <CardDescription>Recent user registrations</CardDescription>
                </div>
                <Link href="/admin/users">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Phone
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          KYC
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage
                                  src={`https://avatar.vercel.sh/${user.email}`}
                                />
                                <AvatarFallback>
                                  {user.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm">
                            {user.phone}
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {getKycBadge(user.kycStatus)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* System Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" /> System Overview
                </CardTitle>
                <CardDescription>Platform health metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Server Uptime
                    </span>
                    <span className="text-sm font-medium text-success">
                      99.98%
                    </span>
                  </div>
                  <Progress value={99.98} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      API Response Time
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      45ms
                    </span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Order Success Rate
                    </span>
                    <span className="text-sm font-medium text-success">
                      97.5%
                    </span>
                  </div>
                  <Progress value={97.5} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Database Load
                    </span>
                    <span className="text-sm font-medium text-accent-foreground">
                      42%
                    </span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-secondary/50 rounded-xl">
                      <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold text-foreground">16</p>
                      <p className="text-xs text-muted-foreground">
                        Currencies
                      </p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-xl">
                      <Shield className="w-6 h-6 mx-auto mb-2 text-success" />
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
    </div>
  );
}
