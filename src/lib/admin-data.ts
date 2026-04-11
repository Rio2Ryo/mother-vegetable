import type {
  Order,
  Instructor,
  OrderStatus,
  DashboardStats,
} from "@/types/admin";

// ---------------------------------------------------------------------------
// Fetch helper — session cookies are auto-sent by the browser.
// Falls back to bearer token from sessionStorage if present (API access).
// ---------------------------------------------------------------------------

const TOKEN_KEY = "mv-admin-token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch(path: string, options?: RequestInit): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> || {}),
  };
  // Attach bearer token only if present (backward compat for API access)
  const token = getAdminToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(path, { ...options, headers });
}

// ---------------------------------------------------------------------------
// CRUD - Orders
// ---------------------------------------------------------------------------

export async function getOrders(): Promise<Order[]> {
  const res = await adminFetch("/api/admin/orders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const res = await adminFetch(`/api/admin/orders/${encodeURIComponent(id)}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error("Failed to fetch order");
  return res.json();
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  const res = await adminFetch(`/api/admin/orders/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order status");
}

// ---------------------------------------------------------------------------
// CRUD - Instructors
// ---------------------------------------------------------------------------

export async function getInstructors(): Promise<Instructor[]> {
  const res = await adminFetch("/api/admin/instructors");
  if (!res.ok) throw new Error("Failed to fetch instructors");
  return res.json();
}

export async function getInstructorById(
  id: string
): Promise<(Instructor & Record<string, unknown>) | undefined> {
  const res = await adminFetch(
    `/api/admin/instructors/${encodeURIComponent(id)}`
  );
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error("Failed to fetch instructor");
  return res.json();
}

export async function updateInstructorStatus(
  id: string,
  subscriptionStatus: "active" | "inactive" | "canceled"
): Promise<{ status: string; subscriptionStatus: string }> {
  const res = await adminFetch(
    `/api/admin/instructors/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ subscriptionStatus }),
    }
  );
  if (!res.ok) throw new Error("Failed to update instructor status");
  return res.json();
}

// ---------------------------------------------------------------------------
// CRUD - Products
// ---------------------------------------------------------------------------

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  images: string[];
  category: string;
  sku: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getProducts(): Promise<AdminProduct[]> {
  const res = await adminFetch("/api/admin/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createProduct(data: Partial<AdminProduct>): Promise<AdminProduct> {
  const res = await adminFetch("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to create product" }));
    throw new Error(err.error || "Failed to create product");
  }
  return res.json();
}

export async function updateProduct(id: string, data: Partial<AdminProduct>): Promise<AdminProduct> {
  const res = await adminFetch(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to update product" }));
    throw new Error(err.error || "Failed to update product");
  }
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
}

// ---------------------------------------------------------------------------
// CRUD - News
// ---------------------------------------------------------------------------

export interface AdminNews {
  id: string;
  title: string;
  content: string;
  slug: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getNews(): Promise<AdminNews[]> {
  const res = await adminFetch("/api/admin/news");
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function createNews(data: Partial<AdminNews>): Promise<AdminNews> {
  const res = await adminFetch("/api/admin/news", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to create news" }));
    throw new Error(err.error || "Failed to create news");
  }
  return res.json();
}

export async function updateNews(id: string, data: Partial<AdminNews>): Promise<AdminNews> {
  const res = await adminFetch(`/api/admin/news/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to update news" }));
    throw new Error(err.error || "Failed to update news");
  }
  return res.json();
}

export async function deleteNews(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/news/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete news");
}

// ---------------------------------------------------------------------------
// CRUD - Coupons
// ---------------------------------------------------------------------------

export interface AdminCoupon {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minOrderAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getCoupons(): Promise<AdminCoupon[]> {
  const res = await adminFetch("/api/admin/coupons");
  if (!res.ok) throw new Error("Failed to fetch coupons");
  return res.json();
}

export async function createCoupon(data: Partial<AdminCoupon>): Promise<AdminCoupon> {
  const res = await adminFetch("/api/admin/coupons", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to create coupon" }));
    throw new Error(err.error || "Failed to create coupon");
  }
  return res.json();
}

export async function updateCoupon(id: string, data: Partial<AdminCoupon>): Promise<AdminCoupon> {
  const res = await adminFetch(`/api/admin/coupons/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to update coupon" }));
    throw new Error(err.error || "Failed to update coupon");
  }
  return res.json();
}

export async function deleteCoupon(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/coupons/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete coupon");
}

// ---------------------------------------------------------------------------
// Dashboard stats
// ---------------------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await adminFetch("/api/admin/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
