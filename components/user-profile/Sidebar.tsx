"use client";

import Link from "next/link";
import Image from "next/image";
import { History, User, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Tab = "profile" | "transactions";

const navItems = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: History,
    href: "/transactions",
  },
];

export default function Sidebar({
  active,
  onSelect,
  collapsed,
  setCollapsed,
}: {
  active: Tab;
  onSelect: (tab: Tab) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={`
           fixed flex flex-col bg-white border-r border-slate-200
          transition-all duration-300 ease-in-out 
          ${collapsed ? "w-[72px]" : "w-60"}
          min-h-screen
        `}
      >
        {/* ── Logo ── */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
          {/* Full logo */}
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Image
              src="/mycurrency-logo_1.png"
                alt="MyCurrency"
                width={140}
                height={40}
                className="object-contain"
              />
               
            </Link>
          )}

          {/* Icon logo */}
          {collapsed && (
            <Link href="/" className="mx-auto">
              <Image
                src="/icon.png"
                alt="MyCurrency"
                width={32}
                height={32}
              />
            </Link>
          )}
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(({ id, label, icon: Icon, href }) => {
            const isActive =
              active === id || pathname === href;

            return (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelect(id as Tab)}
                    className={`
                      w-full flex items-center gap-3 rounded-lg px-3 py-2.5
                      transition
                      ${
                        isActive
                          ? "bg-blue-900 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }
                      ${collapsed ? "justify-center px-0" : ""}
                    `}
                  >
                    <Icon className="h-5 w-5 shrink-0" />

                    {/* text hidden when collapsed */}
                    {!collapsed && (
                      <span className="text-sm font-medium">
                        {label}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>

                {/* Tooltip only when collapsed */}
                {collapsed && (
                  <TooltipContent side="right">
                    {label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* ── Footer toggle ── */}
        <div className="border-t border-slate-200 p-2">
          <button
            onClick={() => setCollapsed((p) => !p)}
            className="w-full flex items-center justify-center rounded-lg p-2 hover:bg-slate-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}