import AdminLayout from "@/components/admin/AdminLayout";
import {
  usePrograms,
  useBlogPosts,
  useGalleryImages,
  useTestimonials,
  useTeamMembers,
  useCareerPosts,
} from "@/hooks/useSchoolData";
import {
  LayoutDashboard,
  GraduationCap,
  Newspaper,
  Image,
  MessageSquare,
  Users,
  Briefcase,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router";
import { RequireAdminAuth } from "../../lib/firebase/adminAuth";

export default function Dashboard() {
  const { data: programs } = usePrograms();
  const { data: blogs } = useBlogPosts();
  const { data: gallery } = useGalleryImages();
  const { data: testimonials } = useTestimonials();
  const { data: team } = useTeamMembers();
  const { data: careers } = useCareerPosts();

  const stats = [
    { label: "Programs", value: programs.filter((p) => p.isActive).length, icon: GraduationCap, path: "/admin/programs", color: "bg-blue-50 text-blue-600" },
    { label: "Blog Posts", value: blogs.filter((b) => b.isActive).length, icon: Newspaper, path: "/admin/blogs", color: "bg-green-50 text-green-600" },
    { label: "Gallery Images", value: gallery.filter((g) => g.isActive).length, icon: Image, path: "/admin/media", color: "bg-purple-50 text-purple-600" },
    { label: "Testimonials", value: testimonials.filter((t) => t.isActive).length, icon: MessageSquare, path: "/admin/content", color: "bg-amber-50 text-amber-600" },
    { label: "Team Members", value: team.filter((t) => t.isActive).length, icon: Users, path: "/admin/content", color: "bg-rose-50 text-rose-600" },
    { label: "Open Careers", value: careers.filter((c) => c.isActive).length, icon: Briefcase, path: "/admin/content", color: "bg-cyan-50 text-cyan-600" },
    { label: "Admission", value: 1, icon: ClipboardList, path: "/admin/admission", color: "bg-orange-50 text-orange-600" },
  ];

  const quickLinks = [
    { label: "Manage Programs", path: "/admin/programs", desc: "Add or edit academic programs", icon: GraduationCap },
    { label: "Manage Admission", path: "/admin/admission", desc: "Update admission page content", icon: ClipboardList },
    { label: "Manage Blogs", path: "/admin/blogs", desc: "Create and edit blog posts", icon: Newspaper },
    { label: "Upload Media", path: "/admin/media", desc: "Manage gallery images", icon: Image },
    { label: "Site Settings", path: "/admin/settings", desc: "Update school info and contacts", icon: LayoutDashboard },
  ];

  return (
    <RequireAdminAuth>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Welcome to your school website admin panel</p>
          </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.path}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-amber-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center text-sm text-amber-600 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Manage
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
       
        </div>
      </AdminLayout>
    </RequireAdminAuth>
  );
}
