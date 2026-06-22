import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSettings } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, School, Phone, Globe, FileText, Image } from "lucide-react";
import { RequireAdminAuth } from "../../lib/firebase/adminAuth";

export default function AdminSettings() {

  const { data: settings, update } = useSettings();

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
    aboutSectionLabel: "",
    aboutSectionTitle: "",
    aboutText: "",
    aboutImage1: "",
    aboutImage2: "",
    aboutImage3: "",
    aboutImage4: "",
    aboutFeature1Title: "",
    aboutFeature1Desc: "",
    aboutFeature2Title: "",
    aboutFeature2Desc: "",
    aboutFeature3Title: "",
    aboutFeature3Desc: "",
    aboutFeature4Title: "",
    aboutFeature4Desc: "",
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
        aboutSectionLabel: settings.aboutSectionLabel || "",
        aboutSectionTitle: settings.aboutSectionTitle || "",
        aboutText: settings.aboutText || "",
        aboutImage1: settings.aboutImage1 || "",
        aboutImage2: settings.aboutImage2 || "",
        aboutImage3: settings.aboutImage3 || "",
        aboutImage4: settings.aboutImage4 || "",
        aboutFeature1Title: settings.aboutFeature1Title || "",
        aboutFeature1Desc: settings.aboutFeature1Desc || "",
        aboutFeature2Title: settings.aboutFeature2Title || "",
        aboutFeature2Desc: settings.aboutFeature2Desc || "",
        aboutFeature3Title: settings.aboutFeature3Title || "",
        aboutFeature3Desc: settings.aboutFeature3Desc || "",
        aboutFeature4Title: settings.aboutFeature4Title || "",
        aboutFeature4Desc: settings.aboutFeature4Desc || "",
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
    <RequireAdminAuth>
      <AdminLayout>
        <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
          <p className="text-slate-500">Manage your school website configuration</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="general">
              <School className="h-4 w-4 mr-1" /> General
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="h-4 w-4 mr-1" /> Contact
            </TabsTrigger>
            <TabsTrigger value="social">
              <Globe className="h-4 w-4 mr-1" /> Social Media
            </TabsTrigger>
            <TabsTrigger value="about">
              <Image className="h-4 w-4 mr-1" /> About Section
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

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-amber-500" />
                  About Section Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Section Label</label>
                    <Input value={form.aboutSectionLabel} onChange={(e) => setForm((p) => ({ ...p, aboutSectionLabel: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Section Title</label>
                    <Input value={form.aboutSectionTitle} onChange={(e) => setForm((p) => ({ ...p, aboutSectionTitle: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">About Description</label>
                  <Textarea rows={8} value={form.aboutText} onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">About Image 1</label>
                    <Input value={form.aboutImage1} onChange={(e) => setForm((p) => ({ ...p, aboutImage1: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">About Image 2</label>
                    <Input value={form.aboutImage2} onChange={(e) => setForm((p) => ({ ...p, aboutImage2: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">About Image 3</label>
                    <Input value={form.aboutImage3} onChange={(e) => setForm((p) => ({ ...p, aboutImage3: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">About Image 4</label>
                    <Input value={form.aboutImage4} onChange={(e) => setForm((p) => ({ ...p, aboutImage4: e.target.value }))} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Feature 1 Title</label>
                    <Input value={form.aboutFeature1Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature1Title: e.target.value }))} />
                    <label className="text-sm font-medium text-slate-700">Feature 1 Description</label>
                    <Textarea value={form.aboutFeature1Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature1Desc: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Feature 2 Title</label>
                    <Input value={form.aboutFeature2Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature2Title: e.target.value }))} />
                    <label className="text-sm font-medium text-slate-700">Feature 2 Description</label>
                    <Textarea value={form.aboutFeature2Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature2Desc: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Feature 3 Title</label>
                    <Input value={form.aboutFeature3Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature3Title: e.target.value }))} />
                    <label className="text-sm font-medium text-slate-700">Feature 3 Description</label>
                    <Textarea value={form.aboutFeature3Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature3Desc: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Feature 4 Title</label>
                    <Input value={form.aboutFeature4Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature4Title: e.target.value }))} />
                    <label className="text-sm font-medium text-slate-700">Feature 4 Description</label>
                    <Textarea value={form.aboutFeature4Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature4Desc: e.target.value }))} />
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
    </RequireAdminAuth>
  );
}
