import type { Metadata } from "next";
import "../../globals.css";
import AdminLayoutClient from "@/components/admin/AdminLayout";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Admin | Mother Vegetable",
  description: "Mother Vegetable administration dashboard",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Images/favicon.png" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <SessionProvider>
          <AdminLayoutClient>{children}</AdminLayoutClient>
        </SessionProvider>
      </body>
    </html>
  );
}
