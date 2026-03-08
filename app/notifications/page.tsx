// app/(user)/notifications/page.tsx
"use client";
import NotificationsPage from "@/components/ui/notification";
import { useNotifications } from "@/utility/notification";


export default function Page() {
  const notif = useNotifications();
  
  return (
    <NotificationsPage
      role="user"
      backHref="/"
      {...notif}
      onMarkRead={notif.handleMarkRead}
      onMarkAllRead={notif.handleMarkAllRead}
      onClearAll={notif.handleClearAll}
      onDelete={notif.handleDelete}
    />
  );
}