'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  CreditCard,
  Send,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/zustandStore/login';
import { useRouter } from 'next/navigation';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = !!user;
console.log(user);

  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push('/login');
  };

  const profileRoute =
    user?.role === 'admin' ? '/admin' : '/profile';

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-lg">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-3 w-3" />
              <span>+91 99912 25544</span>
            </a>
            <span className="hidden md:inline text-primary-foreground/70">
              |
            </span>
            <span className="hidden md:inline">
              Mon - Sat: 9:00 AM - 7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/track-orders" className="hover:underline">
              Track Order
            </Link>
            <span className="text-primary-foreground/70">|</span>
            <Link href="#" className="hover:underline">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/mycurrency-logo_1.png"
              alt="MyCurrency Logo"
              width={230}
              height={70}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm cursor-pointer"
                >
                  Exchange Currency
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href="/exchange"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4" />
                    Buy Foreign Currency
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/exchange?type=sell"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4" />
                    Sell Foreign Currency
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/transfer">
              <Button
                variant="ghost"
                className="flex items-center gap-1 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Money Transfer
              </Button>
            </Link>

            <Link href="/rates">
              <Button variant="ghost" className="cursor-pointer">
                Live Rates
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="cursor-pointer">
                About Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="cursor-pointer">
                Contact
              </Button>
            </Link>
          </nav>

          {/* CTA Buttons */}
          {isAuthenticated ? (
            <div ref={ref} className="hidden lg:flex items-center relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
                  {user?.firstName ? user?.firstName.slice(0,1) :  <User size={16} />}
                </div>
                <span className="hidden lg:block">
                  {user?.firstName}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-md z-50">
                  <Link
                    href={profileRoute}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <Link href="/exchange" className="px-4 py-2 hover:bg-secondary rounded-md">
                Buy Currency
              </Link>
              <Link href="/exchange?type=sell" className="px-4 py-2 hover:bg-secondary rounded-md">
                Sell Currency
              </Link>
              <Link href="/transfer" className="px-4 py-2 hover:bg-secondary rounded-md">
                Money Transfer
              </Link>
              <Link href="/rates" className="px-4 py-2 hover:bg-secondary rounded-md">
                Live Rates
              </Link>
              <Link href="/about" className="px-4 py-2 hover:bg-secondary rounded-md">
                About Us
              </Link>
              <Link href="/contact" className="px-4 py-2 hover:bg-secondary rounded-md">
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link href={profileRoute} className="px-4 py-2 hover:bg-secondary rounded-md">
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-red-600 hover:bg-secondary rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4 pt-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="flex-1 bg-accent text-accent-foreground">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}