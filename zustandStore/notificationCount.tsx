// zustandStore/notificationCount.ts
import { create } from "zustand";

interface NotificationCountStore {
  count: number;
  setCount: (count: number) => void;
  increment: () => void;
  reset: () => void;
}

export const useNotificationCount = create<NotificationCountStore>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));