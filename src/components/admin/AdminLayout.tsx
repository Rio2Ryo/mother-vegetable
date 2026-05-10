"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminCheck, setAdminCheck] = useState<"checking" | "authorized" | "denied">("checking");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => {
        setAdminCheck(res.ok ? "authorized" : "denied");
      })
      .catch(() => {
        setAdminCheck("denied");
      });
  }, []);

  if (adminCheck === "checking") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (adminCheck === "denied") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-sm text-gray-500">
            Admin access could not be verified. Please reload and enter the Basic authentication credentials again.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
