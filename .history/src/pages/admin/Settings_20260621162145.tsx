import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSettings } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, School, Phone, Mail, Globe, FileText } from "lucide-react";

export default function AdminSettings() {
  const navigate = useNavigate();
  if (!localStorage.getItem("admin_auth")) {
    navigate("/admin/login");
    return null;
  }

  const { data: settings, update, loading } = useSettings();
  const [form, setForm] = useState({
    schoolName: "",
    tagline: "",
    address: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        schoolName: settings.schoolName || "",
        tagline: settings.tagline || "",
        address: settings.address || "",
        phone: settings.phone || "",
        email: settings.email || "",
        facebook: settings.facebook || "",
        instagram: settings.instagram || "",
        youtube: settings.youtube || "",
        twitter: settings.twitter || "",
        metaTitle: settings.metaTitle || "",
        metaDescription: settings.metaDescription || "",
      });
    }
  }, [settings]);

  const handleSave = async () => {
    await update(form);
    toast.success("Settings saved successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
          <p className="text-slate-500">Manage your school website configuration</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="general">
              <School className="h-4 w-4 mr-1" /> General
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="h-4 w-4 mr-1" /> Contact
            </TabsTrigger>
            <TabsTrigger value="social">
              <Globe className="h-4 w-4 mr-1" /> Social Media
            </TabsTrigger>
            <TabsTrigger value="seo">
              <FileText className="h-4 w-4 mr-1" /> SEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-amber-500" />
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">School Name</label>
                    <Input value={form.schoolName} onChange={(e) => setForm((p) => ({ ...p, schoolName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Tagline</label>
                    <Input value={form.tagline} onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-amber-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <Textarea value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Phone</label>
                    <Input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-amber-500" />
                  Social Media Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Facebook</label>
                    <Input value={form.facebook} onChange={(e) => setForm((p) => ({ ...p, facebook: e.target.value }))} placeholder="https://facebook.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Instagram</label>
                    <Input value={form.instagram} onChange={(e) => setForm((p) => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">YouTube</label>
                    <Input value={form.youtube} onChange={(e) => setForm((p) => ({ ...p, youtube: e.target.value }))} placeholder="https://youtube.com/..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Twitter</label>
                    <Input value={form.twitter} onChange={(e) => setForm((p) => ({ ...p, twitter: e.target.value }))} placeholder="https://twitter.com/..." />
                  </div>
                </div>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-500" />
                  SEO Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Meta Title</label>
                  <Input value={form.metaTitle} onChange={(e) => setForm((p) => ({ ...p, metaTitle: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Meta Description</label>
                  <Textarea value={form.metaDescription} onChange={(e) => setForm((p) => ({ ...p, metaDescription: e.target.value }))} />
                </div>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
