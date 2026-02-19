"use client";

import { Menu, Bell } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1" />

      {/* Notifications placeholder */}
      <button className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>

      {/* Admin avatar */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
          A
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Admin</p>
          <p className="text-xs text-gray-500">admin@mothervegetable.com</p>
        </div>
      </div>
    </header>
  );
}
