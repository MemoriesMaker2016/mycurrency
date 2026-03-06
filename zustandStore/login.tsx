import { loginOutUser } from "@/apiFasad/authApiCall";
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
logout: async () => {
  await loginOutUser()
  set({ user: null })
}
}));