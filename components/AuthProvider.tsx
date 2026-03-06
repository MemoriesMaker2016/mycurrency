'use client';

import { getUsers } from '@/apiFasad/apiCalls/user';
import { useAuthStore } from '@/zustandStore/login';
import { useEffect, useState } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser)
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

  if (loading) return <div>Loading...</div> // or a spinner

  return <>{children}</>
}
