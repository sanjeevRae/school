import { Link } from "react-router";
import { useSettings } from "@/hooks/useSchoolData";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { toast } from "sonner";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Admission", path: "/admission" },
  { label: "Career", path: "/career" },
  { label: "News/Events", path: "/news" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

export default function Footer() {
  const { data: settings } = useSettings();
  // const [email, setEmail] = useState("");

  // const handleNewsletter = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email) return;
  //   toast.success("Thank you for subscribing to our newsletter!");
  //   setEmail("");
  // };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Banner */}
      {/* <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Stay Updated
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Subscribe to our newsletter for the latest news and events.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 w-full md:w-72"
              />
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold shrink-0">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">
                  {settings?.schoolName || "Samriddhi School"}
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {settings?.tagline || "Inspiring and motivating learners to achieve the highest standards of intellectual development and personal growth."}
            </p>
            <div className="flex items-center gap-3">
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-1"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programs/pre-school"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Pre-School
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/primary-school"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Primary School
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/secondary-school"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Secondary School
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/plus2-management"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Plus-2 Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
                <span>{settings?.address || "Banasthali, Balaju, Kathmandu, Nepal"}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{settings?.phone || "01-4970590, 4970591"}</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <span>{settings?.email || "info@samriddhischool.edu.np"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              {settings?.schoolName || "Samriddhi School"}. All Rights Reserved.
            </p>
            <p>
              <Link to="/admin/login" className="hover:text-slate-400 transition-colors">
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
