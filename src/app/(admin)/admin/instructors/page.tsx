"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { type Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import type { Instructor, InstructorStatus } from "@/types/admin";
import { getInstructors } from "@/lib/admin-data";

const STATUS_OPTIONS: (InstructorStatus | "all")[] = [
  "all",
  "active",
  "pending",
  "inactive",
];

export default function InstructorsPage() {
  const router = useRouter();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    InstructorStatus | "all"
  >("all");

  useEffect(() => {
    async function load() {
      try {
        const all = await getInstructors();
        setInstructors(all);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load instructors"
        );
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
      ? instructors
      : instructors.filter((i) => i.status === statusFilter);

  const columns: Column<Instructor>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      sortValue: (r) => r.name,
      render: (r) => (
        <span className="font-medium text-gray-900">{r.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      className: "hidden md:table-cell",
    },
    {
      key: "createdAt",
      header: "Registered",
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
      key: "referralCode",
      header: "Referral Code",
      render: (r) => (
        <code className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-emerald-700">
          {r.referralCode}
        </code>
      ),
    },
    {
      key: "directSales",
      header: "Direct Sales",
      sortable: true,
      sortValue: (r) => r.directSales,
      render: (r) => <span>{r.directSales}</span>,
    },
    {
      key: "referralSales",
      header: "Referral Sales",
      sortable: true,
      sortValue: (r) => r.referralSales,
      render: (r) => <span>{r.referralSales}</span>,
      className: "hidden lg:table-cell",
    },
    {
      key: "commissionEarned",
      header: "Commission",
      sortable: true,
      sortValue: (r) => r.commissionEarned,
      render: (r) => (
        <span className="font-semibold">
          ${r.commissionEarned.toFixed(2)}
        </span>
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
        <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage instructor accounts, referral links, and commissions.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(r) => r.id}
        onRowClick={(r) => router.push(`/admin/instructors/${r.id}`)}
        searchPlaceholder="Search by name or email..."
        searchFilter={(r, q) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
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
