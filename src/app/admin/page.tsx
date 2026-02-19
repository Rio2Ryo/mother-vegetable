"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  DollarSign,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import type { DashboardStats, Order } from "@/types/admin";
import { getDashboardStats, getOrders } from "@/lib/admin-data";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    setStats(getDashboardStats());
    const orders = getOrders();
    // Sort by date descending, take last 10
    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setRecentOrders(sorted.slice(0, 10));
  }, []);

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Here is an overview of your store.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend="+12% from last month"
          trendUp
        />
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}`}
          icon={DollarSign}
          trend="+8% from last month"
          trendUp
        />
        <StatCard
          title="Active Instructors"
          value={stats.activeInstructors}
          icon={Users}
          trend="+2 this month"
          trendUp
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          trend={`${stats.pendingOrders} awaiting action`}
        />
      </div>

      {/* Revenue chart placeholder */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Revenue Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monthly revenue for the current period
        </p>
        <div className="mt-6 flex h-56 items-end justify-between gap-2 px-4">
          {[40, 65, 50, 72, 60, 85, 78, 90, 70, 95, 88, 100].map(
            (h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t bg-emerald-500 transition-all hover:bg-emerald-600"
                  style={{ height: `${(h / 100) * 100}%` }}
                />
                <span className="text-xs text-gray-400">
                  {
                    [
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                      "Jan",
                      "Feb",
                    ][i]
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-emerald-600 hover:underline"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-gray-700">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
