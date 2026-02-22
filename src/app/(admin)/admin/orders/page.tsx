"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Order, OrderStatus } from "@/types/admin";
import { getOrders } from "@/lib/admin-data";

const STATUS_OPTIONS: (OrderStatus | "all")[] = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    async function load() {
      try {
        const all = await getOrders();
        setOrders(all);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
        <p className="text-lg font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  const columns: Column<Order>[] = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
      sortValue: (r) => r.id,
      render: (r) => (
        <span className="font-medium text-emerald-600">{r.id}</span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      sortable: true,
      sortValue: (r) => r.customerName,
    },
    {
      key: "email",
      header: "Email",
      className: "hidden md:table-cell",
    },
    {
      key: "createdAt",
      header: "Date",
      sortable: true,
      sortValue: (r) => new Date(r.createdAt).getTime(),
      render: (r) =>
        new Date(r.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
    {
      key: "items",
      header: "Items",
      render: (r) => (
        <span>{r.items.reduce((sum, i) => sum + i.quantity, 0)}</span>
      ),
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      sortValue: (r) => r.total,
      render: (r) => (
        <span className="font-semibold">${r.total.toFixed(2)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track all customer orders.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(r) => r.id}
        onRowClick={(r) => router.push(`/admin/orders/${r.id}`)}
        searchPlaceholder="Search by order ID or customer name..."
        searchFilter={(r, q) =>
          r.id.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q)
        }
        toolbar={
          <div className="flex items-center gap-2">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  statusFilter === s
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        }
        pageSize={10}
      />
    </div>
  );
}
