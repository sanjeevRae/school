import { type ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:ml-64 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}
