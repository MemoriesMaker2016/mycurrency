'use client';

import { getUsers } from '@/apiFasad/apiCalls/user';
import { useAuthStore } from '@/zustandStore/login';
import { useNotificationCount } from '@/zustandStore/notificationCount';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner'
import Loader from './ui/Loader';
import { useRouter } from "next/navigation"; // ✅ App Router


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser)
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(true) // ✅ add this

  const increment = useNotificationCount((s) => s.increment);
  const router = useRouter();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUsers()
        setUser(res)
      } catch {
        // not logged in, thats fine
      } finally {
        setLoading(false) // ✅ always set false
      }
    }
    getUserData()
  }, [])

 // Admin has its own socket in AdminProvider
  useEffect(() => {
    if (!user || user.role === 'admin') return; // admins handled in AdminProvider

    const socket = io(process.env.NEXT_PUBLIC_API_URL!);

    // join personal room by userId
    socket.emit('registerUser', user._id);

    // listen for status changes on their orders
    socket.on('orderStatusNotification', () => {
      console.log("yes");
      
      increment(); // bump user notification badge
      toast("📦 New Order Placed!", {
        description: "A customer just placed a new order.",
        action: {
          label: "View",
          onClick: () => router.push("/notifications"), // ✅ works now
        },
        duration: 5000,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  if (loading) return <Loader/> // or a spinner

  return <>{children}</>
}

