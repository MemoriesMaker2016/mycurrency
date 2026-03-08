"use client";

import React, { useState } from "react";
import { AdminProvider } from "@/app/contexts/admin-context";
import { useAdmin } from "@/app/contexts/admin-context";
import { AdminSidebar } from "@/components/ui/admin-siderbar";
import { AdminHeader } from "@/components/ui/amin-header";
import { Toaster } from "sonner";

// ─────────────────────────────────────────────────────────────
// Inner shell — needs useAdmin so must sit inside AdminProvider
// ─────────────────────────────────────────────────────────────
function AdminShell({ children }: { children: React.ReactNode }) {
  const { profile } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed]   = useState(false);

  return (
    <div className="min-h-screen bg-secondary/30">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        profile={profile}
      />

      {/* Shift main content based on sidebar width */}
      <div className={`transition-all duration-300 ${collapsed ? "lg:ml-[68px]" : "lg:ml-64"}`}>
        <AdminHeader
          profile={profile}
          onMenuOpen={() => setMobileOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Layout export
// ─────────────────────────────────────────────────────────────
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <Toaster position="top-right" richColors />
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}