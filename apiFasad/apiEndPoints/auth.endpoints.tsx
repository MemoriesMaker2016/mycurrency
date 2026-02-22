export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  USERS: {  
    LIST: "/users",
    DETAIL: (id: string) => `/users/${id}`,
  },
};
