import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Newspaper,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap as SchoolIcon,
} from "lucide-react";
import { useState } from "react";
import { signOutAdmin } from "@/lib/firebase/adminAuth";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Programs", path: "/admin/programs", icon: GraduationCap },
  { label: "Blogs", path: "/admin/blogs", icon: Newspaper },
  { label: "Media", path: "/admin/media", icon: Image },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutAdmin();
      toast.success("Signed out");
      navigate("/admin/login", { replace: true });
    } catch (error: any) {
      toast.error(error?.message || "Sign out failed");
    }
  };

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-slate-700">
        <Link to="/" className="flex items-center gap-2">
          <SchoolIcon className="h-6 w-6 text-amber-400" />
          <div>
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(item.path)
                ? "bg-amber-500/10 text-amber-400"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700 space-y-1">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
        >
          <SchoolIcon className="h-5 w-5" />
          Exit to Site
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-800 h-screen fixed left-0 top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <aside className="lg:hidden flex flex-col w-64 bg-slate-800 h-screen fixed left-0 top-0 z-50">
          {sidebarContent}
        </aside>
      )}
    </>
  );
}
