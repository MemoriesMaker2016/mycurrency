'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { io } from 'socket.io-client';

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  avatar: string;
}

interface AdminContextType {
  profile: AdminProfile;
  updateProfile: (updates: Partial<AdminProfile>) => void;
}

const defaultProfile: AdminProfile = {
  name: 'Admin User',
  email: 'admin@mycurrency.in',
  phone: '+91 98765 43210',
  role: 'Super Admin',
  location: 'Mumbai, India',
  avatar: '',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AdminProfile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]);

console.log(activeUserIds);


  useEffect(() => {
   const socket = io(process.env.NEXT_PUBLIC_API_URL!);

    socket.emit("adminJoin");

    socket.on("activeUsers", (data: { count: number; ids: string[] }) => {
      setActiveUsersCount(data.count);
      setActiveUserIds(data.ids);
    });
    return () => {
      socket.disconnect();
    };
  }, []);



  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('adminProfile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('adminProfile', JSON.stringify(profile));
    }
  }, [profile, isLoaded]);

  const updateProfile = (updates: Partial<AdminProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AdminContext.Provider value={{ profile, updateProfile ,activeUsersCount ,activeUserIds }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
