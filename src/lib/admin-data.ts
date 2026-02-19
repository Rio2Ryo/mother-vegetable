"use client";

import type {
  Order,
  Instructor,
  OrderStatus,
  DashboardStats,
} from "@/types/admin";

// ---------------------------------------------------------------------------
// LocalStorage keys
// ---------------------------------------------------------------------------
const ORDERS_KEY = "mv-orders";
const INSTRUCTORS_KEY = "mv-instructors";
const SEEDED_KEY = "mv-admin-seeded";

// ---------------------------------------------------------------------------
// Seed / demo data
// ---------------------------------------------------------------------------

const SEED_ORDERS: Order[] = [
  {
    id: "MV-ORD-001",
    customerName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1-555-0101",
    address: {
      address: "123 Wellness Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    items: [
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 2,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
    ],
    total: 300.0,
    status: "delivered",
    createdAt: "2026-01-15T10:23:00Z",
    referralCode: "INST-TANAKA",
  },
  {
    id: "MV-ORD-002",
    customerName: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1-555-0102",
    address: {
      address: "456 Health Blvd",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
    items: [
      {
        productId: "confidence-tube-30",
        name: "Mother Vegetable Confidence",
        quantity: 1,
        price: 180.0,
        image: "/cdn/products_confidence_10001.png",
      },
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 1,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
    ],
    total: 330.0,
    status: "shipped",
    createdAt: "2026-01-22T14:05:00Z",
  },
  {
    id: "MV-ORD-003",
    customerName: "Emily Tanaka",
    email: "emily.t@example.com",
    phone: "+81-90-1234-5678",
    address: {
      address: "2-3-4 Shibuya",
      city: "Tokyo",
      state: "Tokyo",
      zip: "150-0002",
      country: "Japan",
    },
    items: [
      {
        productId: "forever-capsule-30",
        name: "Mother Vegetable Forever",
        quantity: 3,
        price: 120.0,
        image: "/cdn/products_forever_10001.png",
      },
    ],
    total: 360.0,
    status: "processing",
    createdAt: "2026-02-01T09:45:00Z",
    referralCode: "INST-YAMADA",
  },
  {
    id: "MV-ORD-004",
    customerName: "David Park",
    email: "dpark@example.com",
    phone: "+1-555-0104",
    address: {
      address: "789 Vitality St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 1,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
    ],
    total: 150.0,
    status: "pending",
    createdAt: "2026-02-10T16:30:00Z",
  },
  {
    id: "MV-ORD-005",
    customerName: "Lisa Wang",
    email: "lisa.wang@example.com",
    phone: "+1-555-0105",
    address: {
      address: "321 Nature Way",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
    items: [
      {
        productId: "confidence-tube-30",
        name: "Mother Vegetable Confidence",
        quantity: 2,
        price: 180.0,
        image: "/cdn/products_confidence_10001.png",
      },
    ],
    total: 360.0,
    status: "delivered",
    createdAt: "2026-01-28T11:15:00Z",
    referralCode: "INST-TANAKA",
  },
  {
    id: "MV-ORD-006",
    customerName: "James Miller",
    email: "j.miller@example.com",
    phone: "+1-555-0106",
    address: {
      address: "555 Organic Lane",
      city: "Portland",
      state: "OR",
      zip: "97201",
      country: "United States",
    },
    items: [
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 1,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
      {
        productId: "forever-capsule-30",
        name: "Mother Vegetable Forever",
        quantity: 1,
        price: 120.0,
        image: "/cdn/products_forever_10001.png",
      },
    ],
    total: 270.0,
    status: "shipped",
    createdAt: "2026-02-05T08:00:00Z",
  },
  {
    id: "MV-ORD-007",
    customerName: "Yuki Suzuki",
    email: "yuki.s@example.com",
    phone: "+81-80-5678-1234",
    address: {
      address: "1-2-3 Shinjuku",
      city: "Tokyo",
      state: "Tokyo",
      zip: "160-0022",
      country: "Japan",
    },
    items: [
      {
        productId: "confidence-tube-30",
        name: "Mother Vegetable Confidence",
        quantity: 1,
        price: 180.0,
        image: "/cdn/products_confidence_10001.png",
      },
    ],
    total: 180.0,
    status: "pending",
    createdAt: "2026-02-14T13:20:00Z",
    referralCode: "INST-YAMADA",
  },
  {
    id: "MV-ORD-008",
    customerName: "Amanda Foster",
    email: "a.foster@example.com",
    phone: "+1-555-0108",
    address: {
      address: "888 Green St",
      city: "Austin",
      state: "TX",
      zip: "73301",
      country: "United States",
    },
    items: [
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 3,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
      {
        productId: "confidence-tube-30",
        name: "Mother Vegetable Confidence",
        quantity: 1,
        price: 180.0,
        image: "/cdn/products_confidence_10001.png",
      },
    ],
    total: 630.0,
    status: "processing",
    createdAt: "2026-02-12T07:55:00Z",
  },
  {
    id: "MV-ORD-009",
    customerName: "Robert Kim",
    email: "r.kim@example.com",
    phone: "+1-555-0109",
    address: {
      address: "999 Vitality Rd",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "United States",
    },
    items: [
      {
        productId: "forever-capsule-30",
        name: "Mother Vegetable Forever",
        quantity: 2,
        price: 120.0,
        image: "/cdn/products_forever_10001.png",
      },
    ],
    total: 240.0,
    status: "cancelled",
    createdAt: "2026-02-08T15:40:00Z",
  },
  {
    id: "MV-ORD-010",
    customerName: "Maria Garcia",
    email: "m.garcia@example.com",
    phone: "+1-555-0110",
    address: {
      address: "100 Sunset Blvd",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States",
    },
    items: [
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 1,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
    ],
    total: 150.0,
    status: "delivered",
    createdAt: "2026-01-20T12:10:00Z",
    referralCode: "INST-TANAKA",
  },
  {
    id: "MV-ORD-011",
    customerName: "Kevin Nguyen",
    email: "k.nguyen@example.com",
    phone: "+1-555-0111",
    address: {
      address: "222 Elm St",
      city: "Denver",
      state: "CO",
      zip: "80201",
      country: "United States",
    },
    items: [
      {
        productId: "confidence-tube-30",
        name: "Mother Vegetable Confidence",
        quantity: 1,
        price: 180.0,
        image: "/cdn/products_confidence_10001.png",
      },
      {
        productId: "forever-capsule-30",
        name: "Mother Vegetable Forever",
        quantity: 2,
        price: 120.0,
        image: "/cdn/products_forever_10001.png",
      },
    ],
    total: 420.0,
    status: "shipped",
    createdAt: "2026-02-16T09:00:00Z",
    referralCode: "INST-LEE",
  },
  {
    id: "MV-ORD-012",
    customerName: "Jennifer Wu",
    email: "j.wu@example.com",
    phone: "+1-555-0112",
    address: {
      address: "333 Pine Ave",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      country: "United States",
    },
    items: [
      {
        productId: "achieve-capsule-30",
        name: "Mother Vegetable Achieve",
        quantity: 2,
        price: 150.0,
        image: "/cdn/products_achieve_10001.png",
      },
    ],
    total: 300.0,
    status: "pending",
    createdAt: "2026-02-18T14:25:00Z",
  },
];

const SEED_INSTRUCTORS: Instructor[] = [
  {
    id: "INST-TANAKA",
    name: "Kenji Tanaka",
    email: "kenji.tanaka@example.com",
    phone: "+81-90-1111-2222",
    referralCode: "INST-TANAKA",
    referralUrl: "https://mothervegetable.com/?ref=INST-TANAKA",
    status: "active",
    directSales: 4,
    referralSales: 3,
    commissionEarned: 231.0,
    createdAt: "2025-11-01T09:00:00Z",
  },
  {
    id: "INST-YAMADA",
    name: "Aiko Yamada",
    email: "aiko.yamada@example.com",
    phone: "+81-80-3333-4444",
    referralCode: "INST-YAMADA",
    referralUrl: "https://mothervegetable.com/?ref=INST-YAMADA",
    referredBy: "INST-TANAKA",
    status: "active",
    directSales: 2,
    referralSales: 1,
    commissionEarned: 126.0,
    createdAt: "2025-12-15T10:30:00Z",
  },
  {
    id: "INST-LEE",
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    phone: "+1-555-0201",
    referralCode: "INST-LEE",
    referralUrl: "https://mothervegetable.com/?ref=INST-LEE",
    referredBy: "INST-TANAKA",
    status: "active",
    directSales: 1,
    referralSales: 0,
    commissionEarned: 105.0,
    createdAt: "2026-01-10T15:00:00Z",
  },
  {
    id: "INST-SMITH",
    name: "Mark Smith",
    email: "mark.smith@example.com",
    phone: "+1-555-0202",
    referralCode: "INST-SMITH",
    referralUrl: "https://mothervegetable.com/?ref=INST-SMITH",
    status: "pending",
    directSales: 0,
    referralSales: 0,
    commissionEarned: 0,
    createdAt: "2026-02-05T08:45:00Z",
  },
  {
    id: "INST-CHEN",
    name: "Wei Chen",
    email: "wei.chen@example.com",
    phone: "+86-138-0000-1111",
    referralCode: "INST-CHEN",
    referralUrl: "https://mothervegetable.com/?ref=INST-CHEN",
    referredBy: "INST-YAMADA",
    status: "inactive",
    directSales: 0,
    referralSales: 0,
    commissionEarned: 0,
    createdAt: "2025-10-20T12:00:00Z",
  },
  {
    id: "INST-PATEL",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+1-555-0203",
    referralCode: "INST-PATEL",
    referralUrl: "https://mothervegetable.com/?ref=INST-PATEL",
    status: "active",
    directSales: 3,
    referralSales: 2,
    commissionEarned: 195.0,
    createdAt: "2025-12-01T11:00:00Z",
  },
];

// ---------------------------------------------------------------------------
// Seed data into localStorage (runs once)
// ---------------------------------------------------------------------------

export function ensureSeedData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEEDED_KEY)) return;

  // Merge seed orders with any that already exist from checkout
  const existingRaw = localStorage.getItem(ORDERS_KEY);
  const existingOrders: Order[] = existingRaw
    ? JSON.parse(existingRaw)
    : [];

  // Normalise existing checkout orders to the admin Order shape
  const normalised = existingOrders.map(normaliseCheckoutOrder);
  const merged = [...SEED_ORDERS, ...normalised];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(merged));

  // Instructors — just write seed data
  localStorage.setItem(INSTRUCTORS_KEY, JSON.stringify(SEED_INSTRUCTORS));

  localStorage.setItem(SEEDED_KEY, "1");
}

// ---------------------------------------------------------------------------
// Normalise a checkout-stored order into admin Order shape
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normaliseCheckoutOrder(raw: any): Order {
  // The checkout page stores "shipping" with firstName/lastName; we flatten.
  const s = raw.shipping ?? {};
  return {
    id: raw.id ?? `MV-${Date.now().toString(36).toUpperCase()}`,
    customerName:
      raw.customerName ?? `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim(),
    email: raw.email ?? s.email ?? "",
    phone: raw.phone ?? s.phone ?? "",
    address: raw.address ??
      ({
        address: s.address ?? "",
        city: s.city ?? "",
        state: s.state ?? "",
        zip: s.zip ?? "",
        country: s.country ?? "",
      } as Order["address"]),
    items: (raw.items ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (i: any) =>
        ({
          productId: i.productId ?? "",
          name: i.name ?? "",
          quantity: i.quantity ?? 1,
          price: i.price ?? 0,
          image: i.image ?? "",
        }) as Order["items"][number]
    ),
    total: raw.total ?? 0,
    status: raw.status === "confirmed" ? "processing" : raw.status ?? "pending",
    createdAt: raw.createdAt ?? new Date().toISOString(),
    referralCode: raw.referralCode,
  };
}

// ---------------------------------------------------------------------------
// CRUD — Orders
// ---------------------------------------------------------------------------

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (JSON.parse(raw) as any[]).map(normaliseCheckoutOrder);
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return;
  orders[idx].status = status;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// ---------------------------------------------------------------------------
// CRUD — Instructors
// ---------------------------------------------------------------------------

export function getInstructors(): Instructor[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(INSTRUCTORS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getInstructorById(id: string): Instructor | undefined {
  return getInstructors().find((i) => i.id === id);
}

// ---------------------------------------------------------------------------
// Dashboard stats
// ---------------------------------------------------------------------------

export function getDashboardStats(): DashboardStats {
  const orders = getOrders();
  const instructors = getInstructors();
  return {
    totalOrders: orders.length,
    totalRevenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0),
    activeInstructors: instructors.filter((i) => i.status === "active").length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
  };
}
