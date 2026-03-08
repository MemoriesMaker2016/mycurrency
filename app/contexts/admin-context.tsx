"use client";

import { useNotificationCount } from "@/zustandStore/notificationCount";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminContextType {
  activeUsersCount: number;
  activeUserIds: string[] | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]);

  const increment = useNotificationCount((s) => s.increment);
  const count = useNotificationCount((s) => s.count);
 const router = useRouter()

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL!);

    // existing — active users tracking
    socket.emit("adminJoin");
    socket.on("activeUsers", (data: { count: number; ids: string[] }) => {
      setActiveUsersCount(data.count);
      setActiveUserIds(data.ids);
    });

    // ── new — admin joins order room, listens for new orders ──
    socket.emit("registerAdmin");
    socket.on("newOrderNotification", () => {
      increment(); // bump admin notification badge
      
      toast("📦 New Order Placed!", {
        description: "A customer just placed a new order.",
        action: {
          label: "View",
          onClick: () => router.push("/admin/notifications"), // ✅ works now
        },
        duration: 5000,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AdminContext.Provider value={{ activeUsersCount, activeUserIds }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
