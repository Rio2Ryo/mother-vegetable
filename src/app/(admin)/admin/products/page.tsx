"use client";

import { useEffect, useState, useCallback } from "react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type AdminProduct,
} from "@/lib/admin-data";

const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  price: "",
  currency: "USD",
  images: "[]",
  category: "",
  sku: "",
  inStock: true,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
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
      const all = await getProducts();
      setProducts(all);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
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

  function openEdit(p: AdminProduct) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description || "",
      price: String(p.price),
      currency: p.currency,
      images: JSON.stringify(p.images),
      category: p.category,
      sku: p.sku,
      inStock: p.inStock,
    });
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        price: Number(form.price),
        currency: form.currency,
        images: JSON.parse(form.images),
        category: form.category,
        sku: form.sku,
        inStock: form.inStock,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setFormOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStock(p: AdminProduct) {
    try {
      await updateProduct(p.id, { inStock: !p.inStock });
      await load();
    } catch {
      // silent
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteProduct(id);
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

  const columns: Column<AdminProduct>[] = [
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
      key: "slug",
      header: "Slug",
      className: "hidden md:table-cell",
      render: (r) => (
        <span className="text-xs text-gray-500">{r.slug}</span>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      sortValue: (r) => r.price,
      render: (r) => (
        <span className="font-semibold">${r.price.toFixed(2)}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      sortValue: (r) => r.category,
    },
    {
      key: "inStock",
      header: "In Stock",
      render: (r) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleStock(r);
          }}
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            r.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {r.inStock ? "Yes" : "No"}
        </button>
      ),
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
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product catalog.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Add Product
        </button>
      </div>

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "Edit Product" : "New Product"}
            </h2>
            {formError && (
              <p className="mb-3 text-sm text-red-600">{formError}</p>
            )}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  placeholder="Slug *"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  placeholder="Price *"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  placeholder="Category *"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  placeholder="SKU *"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Currency"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  In Stock
                </label>
              </div>
              <input
                placeholder='Images JSON (e.g. ["/img/a.jpg"])'
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
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
        data={products}
        rowKey={(r) => r.id}
        searchPlaceholder="Search by name, slug or category..."
        searchFilter={(r, q) =>
          r.name.toLowerCase().includes(q) ||
          r.slug.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        }
        pageSize={10}
      />
    </div>
  );
}
