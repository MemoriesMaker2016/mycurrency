import { DELETE, GET, POST, PUT } from "../httpMethod/method";
import { ENDPOINTS } from "../apiEndPoints/auth.endpoints";


export const getAllUsersData = (query = '') =>
  GET<any[]>(`${ENDPOINTS.ADMIN.allUserData}/?${query}`);

export const deleteUsersData = (query = '') =>
  DELETE<any[]>(`${ENDPOINTS.ADMIN.allUserData}/?${query}`);