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
// Dashboard stats
// ---------------------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await adminFetch("/api/admin/stats");
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
