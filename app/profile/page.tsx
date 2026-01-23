'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  Mail,
  Phone,
  MapPin,
  Save,
  X,
  History,
  TrendingUp,
  Edit2,
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

const conversionHistory = [
  {
    id: 1,
    from: 'INR',
    to: 'USD',
    amount: 10000,
    converted: 120.5,
    date: '2024-01-15',
    rate: 83.0,
  },
  {
    id: 2,
    from: 'INR',
    to: 'EUR',
    amount: 15000,
    converted: 160.25,
    date: '2024-01-14',
    rate: 93.5,
  },
  {
    id: 3,
    from: 'INR',
    to: 'GBP',
    amount: 8000,
    converted: 94.8,
    date: '2024-01-13',
    rate: 84.32,
  },
  {
    id: 4,
    from: 'USD',
    to: 'INR',
    amount: 500,
    converted: 41625,
    date: '2024-01-12',
    rate: 83.25,
  },
  {
    id: 5,
    from: 'INR',
    to: 'AED',
    amount: 5000,
    converted: 1134,
    date: '2024-01-11',
    rate: 0.2268,
  },
  {
    id: 6,
    from: 'EUR',
    to: 'INR',
    amount: 1000,
    converted: 93500,
    date: '2024-01-10',
    rate: 93.5,
  },
  {
    id: 7,
    from: 'INR',
    to: 'USD',
    amount: 50000,
    converted: 602.5,
    date: '2024-01-09',
    rate: 83.0,
  },
];

const conversionStats = [
  { currency: 'USD', conversions: 12, totalAmount: 2500, flag: '🇺🇸' },
  { currency: 'EUR', conversions: 8, totalAmount: 1800, flag: '🇪🇺' },
  { currency: 'GBP', conversions: 5, totalAmount: 950, flag: '🇬🇧' },
  { currency: 'AED', conversions: 3, totalAmount: 500, flag: '🇦🇪' },
];

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 98765 43210',
    username: 'rajesh_forex',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    city: 'Bangalore',
    state: 'Karnataka',
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  My Profile
                </h1>
                <p className="text-muted-foreground text-sm">
                  Manage your account and view your transaction history
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full px-4 py-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
              {/* Profile Card */}
              <div className="col-span-1">
                <Card className="sticky top-24">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage
                        src="https://avatar.vercel.sh/rajesh"
                        alt={profileData.name}
                      />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">
                      {profileData.name}
                    </CardTitle>
                    <CardDescription>@{profileData.username}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="break-all font-medium">
                            {profileData.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="font-medium">{profileData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Location
                          </p>
                          <p className="font-medium">
                            {profileData.city}, {profileData.state}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleEdit}
                      className="w-full gap-2"
                      disabled={isEditing}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Details & History */}
              <div className="col-span-1 lg:col-span-2 space-y-8">
                {/* Edit Form */}
                {isEditing && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        Edit Personal Details
                        <button
                          onClick={handleCancel}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input
                            value={editData.name}
                            onChange={(e) =>
                              handleChange('name', e.target.value)
                            }
                            placeholder="Full Name"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Username
                          </label>
                          <Input
                            value={editData.username}
                            onChange={(e) =>
                              handleChange('username', e.target.value)
                            }
                            placeholder="Username"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            value={editData.email}
                            onChange={(e) =>
                              handleChange('email', e.target.value)
                            }
                            placeholder="Email"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Phone Number
                          </label>
                          <Input
                            value={editData.phone}
                            onChange={(e) =>
                              handleChange('phone', e.target.value)
                            }
                            placeholder="Phone Number"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">State</label>
                          <Input
                            value={editData.state}
                            onChange={(e) =>
                              handleChange('state', e.target.value)
                            }
                            placeholder="State"
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">City</label>
                          <Input
                            value={editData.city}
                            onChange={(e) =>
                              handleChange('city', e.target.value)
                            }
                            placeholder="City"
                            className="bg-background"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Full Address
                        </label>
                        <Input
                          value={editData.address}
                          onChange={(e) =>
                            handleChange('address', e.target.value)
                          }
                          placeholder="Complete Address"
                          className="min-h-24 bg-background"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave} className="flex-1 gap-2">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="flex-1 bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Conversion Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Your Performance
                    </CardTitle>
                    <CardDescription>
                      Currency conversion statistics and activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {conversionStats.map((stat) => (
                        <div
                          key={stat.currency}
                          className="rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{stat.flag}</span>
                              <div>
                                <p className="font-semibold">{stat.currency}</p>
                                <p className="text-xs text-muted-foreground">
                                  {stat.conversions} conversions
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Total Amount (INR)
                              </span>
                              <span className="font-semibold">
                                ₹{stat.totalAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Conversion History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Transaction History
                    </CardTitle>
                    <CardDescription>
                      Your recent currency conversions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {conversionHistory.map((record) => (
                        <div
                          key={record.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-sm">
                                {record.from}
                              </Badge>
                              <span className="text-muted-foreground">→</span>
                              <Badge variant="outline" className="text-sm">
                                {record.to}
                              </Badge>
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-sm text-muted-foreground">
                                Rate: {record.rate.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {record.converted.toFixed(2)} {record.to}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {record.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
