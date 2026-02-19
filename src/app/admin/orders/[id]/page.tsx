"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Order, OrderStatus } from "@/types/admin";
import { getOrderById, updateOrderStatus } from "@/lib/admin-data";
import StatusBadge from "@/components/admin/StatusBadge";
import OrderTimeline from "@/components/admin/OrderTimeline";

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrderById(id) ?? null);
  }, [id]);

  function handleStatusChange(newStatus: OrderStatus) {
    if (!order) return;
    updateOrderStatus(order.id, newStatus);
    setOrder({ ...order, status: newStatus });
  }

  if (order === undefined) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-gray-400">
        <p className="text-lg">Order not found</p>
        <Link
          href="/admin/orders"
          className="text-sm text-emerald-600 hover:underline"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back + title */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Order Progress
        </h2>
        <OrderTimeline currentStatus={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Customer details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Customer Details
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Name</dt>
              <dd className="mt-0.5 text-gray-900">{order.customerName}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="mt-0.5 text-gray-900">{order.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Phone</dt>
              <dd className="mt-0.5 text-gray-900">
                {order.phone || "N/A"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Address</dt>
              <dd className="mt-0.5 text-gray-900">
                {order.address.address}
                <br />
                {order.address.city}
                {order.address.state ? `, ${order.address.state}` : ""}{" "}
                {order.address.zip}
                <br />
                {order.address.country}
              </dd>
            </div>
            {order.referralCode && (
              <div>
                <dt className="font-medium text-gray-500">Referral Code</dt>
                <dd className="mt-0.5 font-mono text-emerald-600">
                  {order.referralCode}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Line items */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Order Items
          </h2>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Qty: {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 whitespace-nowrap">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold text-gray-900">
                ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status change */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Change Status
        </h2>
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              disabled={s === order.status}
              onClick={() => handleStatusChange(s)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                s === order.status
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : s === "cancelled"
                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {s === order.status ? `${s} (current)` : `Mark as ${s}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
