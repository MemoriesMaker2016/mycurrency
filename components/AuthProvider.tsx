'use client';

import { getUsers } from '@/apiFasad/apiCalls/user';
import { useAuthStore } from '@/zustandStore/login';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser)
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(true) // ✅ add this

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

   useEffect(() => {
  if (!user || user.role === 'admin') return; // skip admins

    const socket = io(process.env.NEXT_PUBLIC_API_URL!); // your Node.js backend URL
    socket.emit('registerUser', user._id, 'user');

    return () => {
      socket.disconnect();
    };
  }, [user]);

  if (loading) return <div>Loading...</div> // or a spinner

  return <>{children}</>
}

