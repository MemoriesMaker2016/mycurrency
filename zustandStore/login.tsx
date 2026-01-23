import { create } from 'zustand';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User, remember: boolean) => void;
  hydrate: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token, user, remember) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  hydrate: () => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },

  logout: () => {
    localStorage.clear();
    sessionStorage.clear();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
