export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  memberSince: string;
}

export type OrderStatus = "pending" | "completed" | "failed";
export type OrderType = "buy" | "sell";

export interface Order {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  type: OrderType;
  product: string;
  status: OrderStatus;
  date: string; // ISO date string, e.g. "2026-06-19"
}