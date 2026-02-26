'use client';

import { getUsers } from '@/apiFasad/apiCalls/user';
import { useAuthStore } from '@/zustandStore/login';
import { useEffect, useState } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const getUserData = async () => {
    try {
      const res = await getUsers()
      setUser(res)
    } catch (error) {
      console.log("something went worng", error);

    }
  }
  useEffect(() => {
    getUserData()

  }, [logout]);

  return <>{children}</>;
}
