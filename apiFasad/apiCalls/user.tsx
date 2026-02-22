import { DELETE, GET, PUT } from "../httpMethod/method";
import { ENDPOINTS } from "../apiEndPoints/auth.endpoints";


export const getUsers = () =>
  GET<any[]>(ENDPOINTS.USERS.LIST);

export const getUserById = (id: string) =>
  GET(ENDPOINTS.USERS.DETAIL(id));

export const updateUser = (id: string, data: any) =>
  PUT(ENDPOINTS.USERS.DETAIL(id), data);

export const deleteUser = (id: string) =>
  DELETE(ENDPOINTS.USERS.DETAIL(id));
