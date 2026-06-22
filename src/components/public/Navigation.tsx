import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useSettings } from "@/hooks/useSchoolData";
import {
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Admission", path: "/admission" },
  { label: "Career", path: "/career" },
  { label: "News/Events", path: "/news" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {settings?.phone || "01-4970590"}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {settings?.email || "info@samriddhischool.edu.np"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {settings?.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {settings?.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {settings?.youtube && (
              <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-slate-700" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-800 leading-tight">
                  {settings?.schoolName || "Samriddhi School"}
                </span>
                <span className="text-[10px] text-slate-500 leading-tight hidden sm:block">
                  {settings?.tagline || "Inspiring Excellence"}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive(link.path)
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="hidden sm:inline-flex bg-slate-800 hover:bg-slate-700 text-white"
                size="sm"
              >
                <Link to="/admission">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Apply Now
                </Link>
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
            <nav className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
                    isActive(link.path)
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-white"
                size="sm"
              >
                <Link to="/admission">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Apply Now
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
