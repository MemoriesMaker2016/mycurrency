"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, LogOut, RefreshCcw, Settings, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/zustandStore/login";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface AdminSidebarProps {
  /** Mobile: is drawer open */
  mobileOpen: boolean;
  onMobileClose: () => void;
  /** Desktop: is sidebar collapsed to icon-only */
  collapsed: boolean;
  onToggleCollapse: () => void;
  profile: { name: string; role: string; avatar?: string };
}

// ─────────────────────────────────────────────────────────────
// Nav links — add new admin pages here
// ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { icon: Home,       label: "Dashboard", href: "/admin" },
  { icon: Users,      label: "Users",     href: "/admin/users" },
  { icon: RefreshCcw, label: "Orders",    href: "/admin/orders" },
  { icon: Settings,   label: "Settings",  href: "/admin/settings" },
];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export function AdminSidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const profile = useAuthStore((a)=>a.user)

  return (
    <TooltipProvider delayDuration={100}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-primary text-primary-foreground
          flex flex-col transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-[68px]" : "lg:w-64"}
          w-64
        `}
      >

        {/* ── Logo ── */}
        <div className={`flex items-center h-16 px-4 border-b border-primary-foreground/20
          ${collapsed ? "lg:justify-center" : "justify-between"}`}
        >
          {/* Full logo */}
          <Link href="/" onClick={onMobileClose} className={collapsed ? "lg:hidden" : ""}>
            <Image
              src="/mycurrency-logo-white.png"
              alt="MyCurrency"
              width={160} height={56}
              className="object-contain"
              priority
            />
          </Link>

          {/* Icon-only logo (collapsed desktop) */}
          {collapsed && (
            <Link href="/" className="hidden lg:block">
              <Image src="/icon.png" alt="MyCurrency" width={32} height={32} className="object-contain" />
            </Link>
          )}

          {/* Mobile close */}
          <Button
            variant="ghost" size="icon"
            className="lg:hidden    ml-9 bg-white text-black hover:bg-primary-foreground/10 shrink-0"
            onClick={onMobileClose}
          >
            <X className="w-8 h-8 text-3xl font-extrabold" />
          </Button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_LINKS.map(({ icon: Icon, label, href }) => {
            const active = pathname === href;
            const linkClass = `
              flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
              ${active
                ? "bg-primary-foreground text-primary shadow-md"
                : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }
              ${collapsed ? "lg:justify-center lg:px-0" : ""}
            `;

            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link href={href} onClick={onMobileClose} className={linkClass}>
                    <Icon className="w-5 h-5 shrink-0" />
                    {/* Label: always on mobile, hidden when collapsed on desktop */}
                    <span className={`font-medium whitespace-nowrap ${collapsed ? "lg:hidden" : ""}`}>
                      {label}
                    </span>
                  </Link>
                </TooltipTrigger>
                {/* Tooltip only useful when collapsed on desktop */}
                {collapsed && (
                  <TooltipContent side="right">{label}</TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* ── Profile ── */}
        <div className="p-3 border-t border-primary-foreground/20" onClick={onToggleCollapse}>
          {/* Collapsed desktop: avatar only with tooltip */}
        
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`justify-center py-1 ${collapsed ? "hidden lg:flex" : "hidden"}`}>
                <Avatar className="h-9 w-9 flex items-center justify-center bg-red-400 border-2 border-primary-foreground/30 cursor-pointer">
                A 
                     </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{profile?.firstName}</p>
              <p className="text-xs text-muted-foreground">{profile?.role}</p>
            </TooltipContent>
          </Tooltip>

          {/* Full profile row */}
          <div className={`flex items-center gap-3 p-2 rounded-lg bg-primary-foreground/10 ${collapsed ? "lg:hidden" : ""}`}>
            <Avatar className="h-9 w-9 flex items-center justify-center bg-red-400 border-2 border-primary-foreground/30 shrink-0">
                   A
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{profile?.firstName}</p>
              <p className="text-xs text-primary-foreground/70 truncate">{profile?.role}</p>
            </div>
            <Button
              variant="ghost" size="icon"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ── Desktop collapse toggle button ── */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden lg:flex absolute -right-3 top-[72px]
            h-6 w-6 rounded-full shadow-md
            bg-primary border border-primary-foreground/20
            text-primary-foreground hover:bg-primary/90"
        >
          {collapsed
            ? <ChevronRight className="w-3 h-3" />
            : <ChevronLeft className="w-3 h-3" />
          }
        </Button>

      </aside>
    </TooltipProvider>
  );
}