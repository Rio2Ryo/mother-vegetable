"use client";

import { useEffect, useState, useCallback } from "react";
import DataTable, { type Column } from "@/components/admin/DataTable";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  type AdminNews,
} from "@/lib/admin-data";

const EMPTY_FORM = {
  title: "",
  content: "",
  slug: "",
  isPublished: false,
};

export default function NewsPage() {
  const [news, setNews] = useState<AdminNews[]>([]);
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
      const all = await getNews();
      setNews(all);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news");
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

  function openEdit(n: AdminNews) {
    setEditingId(n.id);
    setForm({
      title: n.title,
      content: n.content,
      slug: n.slug,
      isPublished: n.isPublished,
    });
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    setFormError(null);
    try {
      if (editingId) {
        await updateNews(editingId, form);
      } else {
        await createNews(form);
      }
      setFormOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish(n: AdminNews) {
    try {
      await updateNews(n.id, { isPublished: !n.isPublished });
      await load();
    } catch {
      // silent
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNews(id);
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

  const columns: Column<AdminNews>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      sortValue: (r) => r.title,
      render: (r) => (
        <span className="font-medium text-gray-900">{r.title}</span>
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
      key: "isPublished",
      header: "Published",
      render: (r) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePublish(r);
          }}
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            r.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {r.isPublished ? "Published" : "Draft"}
        </button>
      ),
    },
    {
      key: "publishedAt",
      header: "Published At",
      sortable: true,
      sortValue: (r) =>
        r.publishedAt ? new Date(r.publishedAt).getTime() : 0,
      render: (r) =>
        r.publishedAt
          ? new Date(r.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "-",
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
          <h1 className="text-2xl font-bold text-gray-900">News</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage news articles and announcements.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
        >
          Add Article
        </button>
      </div>

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "Edit Article" : "New Article"}
            </h2>
            {formError && (
              <p className="mb-3 text-sm text-red-600">{formError}</p>
            )}
            <div className="space-y-3">
              <input
                placeholder="Title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                placeholder="Slug *"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <textarea
                placeholder="Content *"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) =>
                    setForm({ ...form, isPublished: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                Publish immediately
              </label>
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
        data={news}
        rowKey={(r) => r.id}
        searchPlaceholder="Search by title or slug..."
        searchFilter={(r, q) =>
          r.title.toLowerCase().includes(q) ||
          r.slug.toLowerCase().includes(q)
        }
        pageSize={10}
      />
    </div>
  );
}
