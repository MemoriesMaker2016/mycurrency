"use client";

import { Button } from "@/components/ui/button";
import { useNotificationCount } from "@/zustandStore/notificationCount";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";

export default function ProfileHeader() {
  const count = useNotificationCount((s) => s.count);
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="max-w-400 mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground text-sm">
              Manage your account and view your transaction history
            </p>
          </div>
        </div>

        <Link href={"/notifications"}>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />

            {count >= 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
