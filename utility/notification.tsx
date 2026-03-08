// hooks/useNotifications.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAllUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearAllNotifications,
  deleteNotification,
} from "@/apiFasad/apiCalls/notification";
import { useNotificationCount } from "@/zustandStore/notificationCount";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const restart = useNotificationCount((s)=>s.reset)
  const count = useNotificationCount((s)=>s.count)

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUserNotifications();
      if (res?.success)
        {
            setNotifications(res.data);
        restart()
        }
            
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications , count]);

  const handleMarkRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );
    try {
      await markNotificationRead(id);
    } catch {
      fetchNotifications();
    }
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllNotificationsRead();
    } catch {
      fetchNotifications();
    }
  };

  const handleClearAll = async () => {
    setNotifications([]);
    try {
      await clearAllNotifications();
    } catch {
      fetchNotifications();
    }
  };

  const handleDelete = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    try {
      await deleteNotification(id);
    } catch {
      fetchNotifications();
    }
  };

  return {
    notifications,
    loading,
    handleMarkRead,
    handleMarkAllRead,
    handleClearAll,
    handleDelete,
  };
}
