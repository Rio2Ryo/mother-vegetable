// ---------------------------------------------------------------------------
// Admin Data Types
// ---------------------------------------------------------------------------

export interface OrderAddress {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: OrderAddress;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  referralCode?: string;
}

export type InstructorStatus = "active" | "pending" | "inactive";

export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referralUrl: string;
  referredBy?: string;
  status: InstructorStatus;
  directSales: number;
  referralSales: number;
  commissionEarned: number;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Summary stats for the dashboard
// ---------------------------------------------------------------------------

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeInstructors: number;
  pendingOrders: number;
}
