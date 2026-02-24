"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, ExternalLink } from "lucide-react";
import type { Instructor, Order } from "@/types/admin";
import { getInstructorById, updateInstructorStatus } from "@/lib/admin-data";
import StatusBadge from "@/components/admin/StatusBadge";

// Extended instructor detail from the API
interface InstructorDetail extends Omit<Instructor, "referredBy"> {
  subscriptionStatus?: string;
  connectOnboarded?: boolean;
  availableBalance?: number;
  commissions?: {
    id: string;
    orderId: string | null;
    type: string;
    orderTotal: number;
    commissionRate: number;
    commissionAmount: number;
    paidOut: boolean;
    createdAt: string;
  }[];
  referredInstructors?: {
    id: string;
    name: string;
    email: string;
    referralCode: string;
    status: string;
    createdAt: string;
  }[];
  payoutHistory?: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
  relatedOrders?: {
    id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
  referredBy?:
    | string
    | { id: string; name: string; referralCode: string };
}

export default function InstructorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [instructor, setInstructor] = useState<InstructorDetail | null | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getInstructorById(id);
        setInstructor((data as InstructorDetail) ?? null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load instructor"
        );
      }
    }
    load();
  }, [id]);

  async function copyUrl() {
    if (!instructor) return;
    await navigator.clipboard.writeText(instructor.referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleStatusChange(
    newStatus: "active" | "inactive" | "canceled"
  ) {
    if (!instructor) return;
    setUpdating(true);
    try {
      const result = await updateInstructorStatus(instructor.id, newStatus);
      setInstructor((prev) =>
        prev
          ? {
              ...prev,
              subscriptionStatus: result.subscriptionStatus,
              status: result.status as "active" | "pending" | "inactive",
            }
          : prev
      );
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Failed to update status"
      );
    } finally {
      setUpdating(false);
    }
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
        <p className="text-lg font-medium">Error</p>
        <p className="text-sm">{error}</p>
        <Link
          href="/admin/instructors"
          className="mt-2 text-sm text-emerald-600 hover:underline"
        >
          Back to instructors
        </Link>
      </div>
    );
  }

  if (instructor === undefined) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (instructor === null) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-gray-400">
        <p className="text-lg">Instructor not found</p>
        <Link
          href="/admin/instructors"
          className="text-sm text-emerald-600 hover:underline"
        >
          Back to instructors
        </Link>
      </div>
    );
  }

  // Referral info
  const referredByInfo =
    typeof instructor.referredBy === "object" && instructor.referredBy
      ? instructor.referredBy
      : null;

  const commissions = instructor.commissions || [];
  const directComm = commissions.filter((c) => c.type === "direct");
  const referralComm = commissions.filter((c) => c.type === "referral");
  const directEarned = directComm.reduce((s, c) => s + c.commissionAmount, 0);
  const referralEarned = referralComm.reduce(
    (s, c) => s + c.commissionAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Back + title */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/instructors"
          className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {instructor.name}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Registered on{" "}
            {new Date(instructor.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={instructor.status} />
          {instructor.status !== "active" && (
            <button
              onClick={() => handleStatusChange("active")}
              disabled={updating}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              Approve
            </button>
          )}
          {instructor.status === "active" && (
            <button
              onClick={() => handleStatusChange("inactive")}
              disabled={updating}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              Deactivate
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Profile
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="mt-0.5 text-gray-900">{instructor.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Phone</dt>
              <dd className="mt-0.5 text-gray-900">{instructor.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Referral Code</dt>
              <dd className="mt-0.5">
                <code className="rounded bg-gray-100 px-2 py-0.5 text-sm font-mono text-emerald-700">
                  {instructor.referralCode}
                </code>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Referral URL</dt>
              <dd className="mt-1">
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={instructor.referralUrl}
                    className="flex-1 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-mono text-gray-600"
                  />
                  <button
                    onClick={copyUrl}
                    className="rounded border border-gray-200 p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                    title="Copy URL"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </dd>
            </div>
            {instructor.subscriptionStatus && (
              <div>
                <dt className="font-medium text-gray-500">Subscription</dt>
                <dd className="mt-0.5 capitalize text-gray-900">
                  {instructor.subscriptionStatus}
                </dd>
              </div>
            )}
            {referredByInfo && (
              <div>
                <dt className="font-medium text-gray-500">Referred By</dt>
                <dd className="mt-0.5">
                  <Link
                    href={`/admin/instructors/${referredByInfo.id}`}
                    className="text-emerald-600 hover:underline inline-flex items-center gap-1"
                  >
                    {referredByInfo.name}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Commission */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Commission Breakdown
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-xs font-medium text-emerald-600">
                Direct Sales (25%)
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-700">
                {instructor.directSales}
              </p>
              <p className="mt-0.5 text-sm text-emerald-600">
                ${directEarned.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-600">
                Referral Sales (10%)
              </p>
              <p className="mt-1 text-2xl font-bold text-blue-700">
                {instructor.referralSales}
              </p>
              <p className="mt-0.5 text-sm text-blue-600">
                ${referralEarned.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-600">
                Total Earned
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                ${instructor.commissionEarned.toFixed(2)}
              </p>
              {instructor.availableBalance !== undefined && (
                <p className="mt-0.5 text-sm text-gray-500">
                  Available: ${instructor.availableBalance.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Payout history */}
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              Payout History
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                      Amount
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(instructor.payoutHistory || []).length > 0 ? (
                    (instructor.payoutHistory || []).map((p) => (
                      <tr key={p.id}>
                        <td className="px-4 py-2 text-gray-700">
                          {new Date(p.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900">
                          ${p.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">
                          <StatusBadge status={p.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-gray-400"
                      >
                        No payouts yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Referred instructors */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Referred Instructors ({(instructor.referredInstructors || []).length})
        </h2>
        {(instructor.referredInstructors || []).length === 0 ? (
          <p className="text-sm text-gray-400">
            This instructor has not referred anyone yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(instructor.referredInstructors || []).map((ri) => (
                  <tr
                    key={ri.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/instructors/${ri.id}`}
                        className="font-medium text-emerald-600 hover:underline"
                      >
                        {ri.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{ri.email}</td>
                    <td className="px-4 py-2">
                      <StatusBadge status={ri.status} />
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(ri.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sales history */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Sales History ({(instructor.relatedOrders || []).length} orders)
        </h2>
        {(instructor.relatedOrders || []).length === 0 ? (
          <p className="text-sm text-gray-400">No orders with this referral code yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Total
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(instructor.relatedOrders || []).map((o) => (
                  <tr
                    key={o.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="font-medium text-emerald-600 hover:underline"
                      >
                        {o.id}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {o.customerName}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      ${o.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
