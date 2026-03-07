'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { io } from 'socket.io-client';



interface AdminContextType {
  activeUsersCount: number;
  activeUserIds: string[] | null
}



const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
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



  

  return (
    <AdminContext.Provider value={{ activeUsersCount ,activeUserIds }}>
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
