"use client";

import { useEffect, useState, useCallback } from "react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  type AdminCoupon,
} from "@/lib/admin-data";

const EMPTY_FORM = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "",
  maxUses: "",
  isActive: true,
  expiresAt: "",
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const all = await getCoupons();
      setCoupons(all);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load coupons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(c: AdminCoupon) {
    setEditingId(c.id);
    setForm({
      code: c.code,
      discountType: c.discountType,
      discountValue: String(c.discountValue),
      minOrderAmount: c.minOrderAmount != null ? String(c.minOrderAmount) : "",
      maxUses: c.maxUses != null ? String(c.maxUses) : "",
      isActive: c.isActive,
      expiresAt: c.expiresAt
        ? new Date(c.expiresAt).toISOString().slice(0, 16)
        : "",
    });
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        code: form.code,
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrderAmount: form.minOrderAmount
          ? Number(form.minOrderAmount)
          : null,
        maxUses: form.maxUses ? Number(form.maxUses) : null,
        isActive: form.isActive,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      };

      if (editingId) {
        await updateCoupon(editingId, payload);
      } else {
        await createCoupon(payload);
      }
      setFormOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(c: AdminCoupon) {
    try {
      await updateCoupon(c.id, { isActive: !c.isActive });
      await load();
    } catch {
      // silent
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteCoupon(id);
      setDeleteConfirm(null);
      await load();
    } catch {
      // silent
    }
  }

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

  const columns: Column<AdminCoupon>[] = [
    {
      key: "code",
      header: "Code",
      sortable: true,
      sortValue: (r) => r.code,
      render: (r) => (
        <span className="font-mono font-medium text-gray-900">{r.code}</span>
      ),
    },
    {
      key: "discountType",
      header: "Type",
      render: (r) => (
        <span className="capitalize">{r.discountType}</span>
      ),
    },
    {
      key: "discountValue",
      header: "Value",
      sortable: true,
      sortValue: (r) => r.discountValue,
      render: (r) => (
        <span className="font-semibold">
          {r.discountType === "percentage"
            ? `${r.discountValue}%`
            : `$${r.discountValue.toFixed(2)}`}
        </span>
      ),
    },
    {
      key: "usedCount",
      header: "Used",
      sortable: true,
      sortValue: (r) => r.usedCount,
      render: (r) => (
        <span>
          {r.usedCount}
          {r.maxUses != null ? ` / ${r.maxUses}` : ""}
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Active",
      render: (r) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleActive(r);
          }}
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            r.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {r.isActive ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      key: "expiresAt",
      header: "Expires",
      sortable: true,
      sortValue: (r) =>
        r.expiresAt ? new Date(r.expiresAt).getTime() : Infinity,
      render: (r) =>
        r.expiresAt
          ? new Date(r.expiresAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Never",
    },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEdit(r);
            }}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Edit
          </button>
          {deleteConfirm === r.id ? (
            <span className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(r.id);
                }}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Confirm
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirm(null);
                }}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteConfirm(r.id);
              }}
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage discount codes and promotions.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Add Coupon
        </button>
      </div>

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "Edit Coupon" : "New Coupon"}
            </h2>
            {formError && (
              <p className="mb-3 text-sm text-red-600">{formError}</p>
            )}
            <div className="space-y-3">
              <input
                placeholder="Code * (e.g. SAVE20)"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.discountType}
                  onChange={(e) =>
                    setForm({ ...form, discountType: e.target.value })
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed ($)</option>
                </select>
                <input
                  placeholder="Discount Value *"
                  type="number"
                  step="0.01"
                  value={form.discountValue}
                  onChange={(e) =>
                    setForm({ ...form, discountValue: e.target.value })
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Min Order Amount"
                  type="number"
                  step="0.01"
                  value={form.minOrderAmount}
                  onChange={(e) =>
                    setForm({ ...form, minOrderAmount: e.target.value })
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  placeholder="Max Uses"
                  type="number"
                  value={form.maxUses}
                  onChange={(e) =>
                    setForm({ ...form, maxUses: e.target.value })
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Expires At
                  </label>
                  <input
                    type="datetime-local"
                    value={form.expiresAt}
                    onChange={(e) =>
                      setForm({ ...form, expiresAt: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-700 pt-5">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setFormOpen(false)}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={coupons}
        rowKey={(r) => r.id}
        searchPlaceholder="Search by coupon code..."
        searchFilter={(r, q) => r.code.toLowerCase().includes(q)}
        pageSize={10}
      />
    </div>
  );
}
