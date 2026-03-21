"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  CreditCard,
  Send,
  User,
  Bell,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/zustandStore/login";
import { useRouter } from "next/navigation";
import { useNotificationCount } from "@/zustandStore/notificationCount";
import { useTranslations } from "next-intl";
import Language from "./ui/language";

export default function Header() {
  const t     = useTranslations("Header");
  const tNav  = useTranslations("Header.NavBar");
  const tTop  = useTranslations("Header.ContactHeader");

  const count = useNotificationCount((s) => s.count);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = !!user;

  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  const profileRoute = user?.role === "admin" ? "/admin" : "/profile";

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-lg">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${tTop("Number")}`}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-3 w-3" />
              <span>{tTop("Number")}</span>
            </a>
            <span className="hidden md:inline text-primary-foreground/70">|</span>
            <span className="hidden md:inline">
              {tTop("Week")} {tTop("time")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/track-orders" className="hover:underline">
              {tTop("oredr")}
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
                <Button variant="ghost" className="flex items-center gap-1 text-sm cursor-pointer">
                  {tNav("exchangeCurrency")}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/exchange" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Buy Foreign Currency
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/exchange?type=sell" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Sell Foreign Currency
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/transfer">
              <Button variant="ghost" className="flex items-center gap-1 cursor-pointer">
                <Send className="h-4 w-4" />
                {tNav("moneyTransfer")}
              </Button>
            </Link>
            <Link href="/rates">
              <Button variant="ghost" className="cursor-pointer">{tNav("liveRates")}</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="cursor-pointer">{tNav("aboutUs")}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="cursor-pointer">{tNav("contact")}</Button>
            </Link>
            <Language/>
          </nav>

          {/* Right side — desktop */}
          <div className="flex items-center gap-2">

            {/* Notification Bell */}
            {isAuthenticated && user?.role !=='subadmin' && (
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="w-5 h-5" />
                  {count >= 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center leading-none">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* Profile dropdown — desktop only */}
            {isAuthenticated ? (
              <div ref={ref} className="hidden lg:flex items-center relative">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold shrink-0">
                    {user?.firstName ? user.firstName.slice(0, 1).toUpperCase() : <User size={15} />}
                  </div>
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {user?.firstName}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                  <div className="absolute top-full right-0 mt-2 w-44 bg-card border border-border shadow-lg rounded-lg z-50 overflow-hidden">
                    <Link
                      href={profileRoute}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      My Profile
                    </Link>
                    <div className="border-t border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    {tNav("login")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer">
                    {tNav("signUp")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-1">
              <Link href="/exchange" className="px-4 py-2.5 hover:bg-secondary rounded-md text-sm" onClick={() => setMobileMenuOpen(false)}>
                Buy Currency
              </Link>
              <Link href="/exchange?type=sell" className="px-4 py-2.5 hover:bg-secondary rounded-md text-sm" onClick={() => setMobileMenuOpen(false)}>
                Sell Currency
              </Link>
              <Link href="/transfer" className="px-4 py-2.5 hover:bg-secondary rounded-md text-sm" onClick={() => setMobileMenuOpen(false)}>
                {tNav("moneyTransfer")}
              </Link>
              <Link href="/rates" className="px-4 py-2.5 hover:bg-secondary rounded-md text-sm" onClick={() => setMobileMenuOpen(false)}>
                {tNav("liveRates")}
              </Link>
              <Link href="/about" className="px-4 py-2.5 hover:bg-secondary rounded-md text-sm" onClick={() => setMobileMenuOpen(false)}>
                {tNav("aboutUs")}
              </Link>
              <Link href="/contact" className="px-4 py-2.5 hover:bg-secondary rounded-md text-sm" onClick={() => setMobileMenuOpen(false)}>
                {tNav("contact")}
              </Link>

              <div className="border-t border-border my-2" />

              {isAuthenticated ? (
                <>
                  <Link
                    href={profileRoute}
                    className="flex items-center gap-2 px-4 py-2.5 hover:bg-secondary rounded-md text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 text-muted-foreground" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-md"
                  >
                    <X className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4 pt-1">
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      {tNav("login")}
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button size="sm" className="w-full bg-accent text-accent-foreground">
                      {tNav("signUp")}
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