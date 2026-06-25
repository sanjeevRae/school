import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useSettings,
  useHeroSlides,
  useStats,
  useCoreValues,
  useTestimonials,
  useTeamMembers,
  useCareerPosts,
  usePartners,
} from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Minus, Plus, Save } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import { RequireAdminAuth } from "../../lib/firebase/adminAuth";

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-8 text-center space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Content() {
  return (
    <RequireAdminAuth>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
            <p className="text-slate-500">Manage all editable content sections of your website</p>
          </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-2 shadow-sm">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
              <TabsTrigger value="hero" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Hero Slides</TabsTrigger>
              <TabsTrigger value="about-section" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">About</TabsTrigger>
              <TabsTrigger value="about-page" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">About Page</TabsTrigger>
              <TabsTrigger value="about" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Vision & Mission</TabsTrigger>
              <TabsTrigger value="stats" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Stats</TabsTrigger>
              <TabsTrigger value="values" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Core Values</TabsTrigger>
              <TabsTrigger value="testimonials" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Testimonials</TabsTrigger>
              <TabsTrigger value="team" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Team</TabsTrigger>
              <TabsTrigger value="careers" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Careers</TabsTrigger>
              <TabsTrigger value="partners" className="rounded-xl border border-transparent bg-white/70 px-4 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm sm:text-sm">Partners</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero"><HeroSlidesTab /></TabsContent>
          <TabsContent value="about"><AboutTab /></TabsContent>
          <TabsContent value="about-section"><AboutSectionTab /></TabsContent>
          <TabsContent value="about-page"><AboutPageTab /></TabsContent>
          <TabsContent value="stats"><StatsTab /></TabsContent>
          <TabsContent value="values"><CoreValuesTab /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsTab /></TabsContent>
          <TabsContent value="team"><TeamTab /></TabsContent>
          <TabsContent value="careers"><CareersTab /></TabsContent>
          <TabsContent value="partners"><PartnersTab /></TabsContent>
        </Tabs>
        </div>
      </AdminLayout>
    </RequireAdminAuth>
  );
}

function HeroSlidesTab() {
  const { data: slides, update, loading } = useHeroSlides();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleEdit = (id: string, field: string, value: any) => {
    setEditing((prev) => ({ ...prev, [`${id}.${field}`]: value }));
  };

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) {
        updates[key.replace(`${id}.`, "")] = value;
      }
    });

    try {
      await update(id, updates);
      setEditing((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          if (k.startsWith(`${id}.`)) delete next[k];
        });
        return next;
      });
      toast.success("Saved.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save.");
    }
  };

  const handleFileUpload = async (id: string, file?: File) => {
    if (!file) return;
    try {
      setUploadingId(id);
      const result = await uploadImage(file);
      handleEdit(id, "image", result.url);
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (slides.length === 0) {
    return (
      <EmptyState
        title="No hero slides found"
        description="Hero slide documents are missing. Seed or add hero slides so the admin can manage titles, subtitles, and images here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {slides.map((slide) => {
        const imageValue = editing[`${slide.id}.image`] ?? slide.image;

        return (
          <Card key={slide.id}>
            <CardContent className="p-4 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Title</label>
                  <Input
                    defaultValue={slide.title}
                    onChange={(e) => handleEdit(slide.id, "title", e.target.value)}
                    placeholder="Write slide title"
                  />
                </div>
                
             <div>
                <label className="text-sm font-medium text-slate-700">Subtitle</label>
                <Input
                  defaultValue={slide.subtitle}
                  onChange={(e) => handleEdit(slide.id, "subtitle", e.target.value)}
                  placeholder="Write slide subtitle"
                />
              </div>

              </div>
             
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Upload Image</label>
                <div className="flex flex-wrap items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    className="max-w-sm"
                    onChange={(e) => handleFileUpload(slide.id, e.target.files?.[0])}
                  />
                  {uploadingId === slide.id && <span className="text-sm text-slate-500">Uploading...</span>}
                </div>
                {imageValue ? (
                  <img src={imageValue} alt={slide.title} className="h-24 w-40 rounded object-cover border border-slate-200" />
                ) : (
                  <div className="h-24 w-40 rounded border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                    Image preview will appear here
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editing[`${slide.id}.isActive`] !== undefined ? editing[`${slide.id}.isActive`] : slide.isActive}
                    onCheckedChange={(v) => handleEdit(slide.id, "isActive", v)}
                  />
                  <span className="text-sm text-slate-600">Active</span>
                </div>
                <Button size="sm" onClick={() => handleSave(slide.id)}>
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function AboutTab() {
  const { data: settings, update, loading } = useSettings();
  const [form, setForm] = useState<{
    aboutText?: string;
    visionText?: string;
    missionText?: string;
  }>({});

  const currentForm = {
    aboutText: form.aboutText ?? settings?.aboutText ?? "",
    visionText: form.visionText ?? settings?.visionText ?? "",
    missionText: form.missionText ?? settings?.missionText ?? "",
  };

  const handleSave = async () => {
    try {
      await update(currentForm);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Vision</label>
          <Textarea
            rows={4}
            value={currentForm.visionText}
            placeholder="Write the school vision here"
            onChange={(e) => setForm((p) => ({ ...p, visionText: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Mission</label>
          <Textarea
            rows={4}
            value={currentForm.missionText}
            placeholder="Write the school mission here"
            onChange={(e) => setForm((p) => ({ ...p, missionText: e.target.value }))}
          />
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function AboutSectionTab() {
  const { data: settings, update, loading } = useSettings();
  const [uploadingImageKey, setUploadingImageKey] = useState<string | null>(null);
  const [form, setForm] = useState({
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
  });

  const currentForm = {
    aboutSectionLabel: form.aboutSectionLabel || settings?.aboutSectionLabel || "",
    aboutSectionTitle: form.aboutSectionTitle || settings?.aboutSectionTitle || "",
    aboutText: form.aboutText || settings?.aboutText || "",
    aboutImage1: form.aboutImage1 || settings?.aboutImage1 || "",
    aboutImage2: form.aboutImage2 || settings?.aboutImage2 || "",
    aboutImage3: form.aboutImage3 || settings?.aboutImage3 || "",
    aboutImage4: form.aboutImage4 || settings?.aboutImage4 || "",
    aboutFeature1Title: form.aboutFeature1Title || settings?.aboutFeature1Title || "",
    aboutFeature1Desc: form.aboutFeature1Desc || settings?.aboutFeature1Desc || "",
    aboutFeature2Title: form.aboutFeature2Title || settings?.aboutFeature2Title || "",
    aboutFeature2Desc: form.aboutFeature2Desc || settings?.aboutFeature2Desc || "",
    aboutFeature3Title: form.aboutFeature3Title || settings?.aboutFeature3Title || "",
    aboutFeature3Desc: form.aboutFeature3Desc || settings?.aboutFeature3Desc || "",
    aboutFeature4Title: form.aboutFeature4Title || settings?.aboutFeature4Title || "",
    aboutFeature4Desc: form.aboutFeature4Desc || settings?.aboutFeature4Desc || "",
  };

  const handleSave = async () => {
    try {
      await update(currentForm);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  const handleAboutImageUpload = async (
    imageKey: "aboutImage1" | "aboutImage2" | "aboutImage3" | "aboutImage4",
    file?: File,
  ) => {
    if (!file) return;

    try {
      setUploadingImageKey(imageKey);
      const result = await uploadImage(file);
      setForm((prev) => ({ ...prev, [imageKey]: result.url }));
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploadingImageKey(null);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Section Label</label>
            <Input value={currentForm.aboutSectionLabel} onChange={(e) => setForm((p) => ({ ...p, aboutSectionLabel: e.target.value }))} placeholder="About Us" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Section Title</label>
            <Input value={currentForm.aboutSectionTitle} onChange={(e) => setForm((p) => ({ ...p, aboutSectionTitle: e.target.value }))} placeholder="School name or custom title" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">About Description</label>
          <Textarea rows={8} value={currentForm.aboutText} onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))} placeholder="Write the homepage about section text" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">About Image 1</label>
            <div className="flex flex-wrap items-center gap-3">
              <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleAboutImageUpload("aboutImage1", e.target.files?.[0])} />
              {uploadingImageKey === "aboutImage1" && <span className="text-sm text-slate-500">Uploading...</span>}
            </div>
            {currentForm.aboutImage1 ? (
              <img src={currentForm.aboutImage1} alt="About image 1" className="h-24 w-40 rounded object-cover border border-slate-200" />
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">About Image 2</label>
            <div className="flex flex-wrap items-center gap-3">
              <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleAboutImageUpload("aboutImage2", e.target.files?.[0])} />
              {uploadingImageKey === "aboutImage2" && <span className="text-sm text-slate-500">Uploading...</span>}
            </div>
            {currentForm.aboutImage2 ? (
              <img src={currentForm.aboutImage2} alt="About image 2" className="h-24 w-40 rounded object-cover border border-slate-200" />
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">About Image 3</label>
            <div className="flex flex-wrap items-center gap-3">
              <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleAboutImageUpload("aboutImage3", e.target.files?.[0])} />
              {uploadingImageKey === "aboutImage3" && <span className="text-sm text-slate-500">Uploading...</span>}
            </div>
            {currentForm.aboutImage3 ? (
              <img src={currentForm.aboutImage3} alt="About image 3" className="h-24 w-40 rounded object-cover border border-slate-200" />
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">About Image 4</label>
            <div className="flex flex-wrap items-center gap-3">
              <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleAboutImageUpload("aboutImage4", e.target.files?.[0])} />
              {uploadingImageKey === "aboutImage4" && <span className="text-sm text-slate-500">Uploading...</span>}
            </div>
            {currentForm.aboutImage4 ? (
              <img src={currentForm.aboutImage4} alt="About image 4" className="h-24 w-40 rounded object-cover border border-slate-200" />
            ) : null}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Feature 1 Title</label>
            <Input value={currentForm.aboutFeature1Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature1Title: e.target.value }))} placeholder="Feature title" />
            <label className="text-sm font-medium text-slate-700">Feature 1 Description</label>
            <Textarea value={currentForm.aboutFeature1Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature1Desc: e.target.value }))} placeholder="Feature description" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Feature 2 Title</label>
            <Input value={currentForm.aboutFeature2Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature2Title: e.target.value }))} placeholder="Feature title" />
            <label className="text-sm font-medium text-slate-700">Feature 2 Description</label>
            <Textarea value={currentForm.aboutFeature2Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature2Desc: e.target.value }))} placeholder="Feature description" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Feature 3 Title</label>
            <Input value={currentForm.aboutFeature3Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature3Title: e.target.value }))} placeholder="Feature title" />
            <label className="text-sm font-medium text-slate-700">Feature 3 Description</label>
            <Textarea value={currentForm.aboutFeature3Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature3Desc: e.target.value }))} placeholder="Feature description" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Feature 4 Title</label>
            <Input value={currentForm.aboutFeature4Title} onChange={(e) => setForm((p) => ({ ...p, aboutFeature4Title: e.target.value }))} placeholder="Feature title" />
            <label className="text-sm font-medium text-slate-700">Feature 4 Description</label>
            <Textarea value={currentForm.aboutFeature4Desc} onChange={(e) => setForm((p) => ({ ...p, aboutFeature4Desc: e.target.value }))} placeholder="Feature description" />
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function AboutPageTab() {
  const { data: settings, update, loading } = useSettings();
  const [form, setForm] = useState({
    aboutText: "",
    aboutPageIntroVisible: true,
    aboutPageIntroLabel: "",
    aboutPageIntroTitle: "",
    aboutPageIntroImage: "",
    aboutPageHighlightsVisible: true,
    aboutPageHighlightsLabel: "",
    aboutPageHighlightsTitle: "",
    aboutPageHighlight1Title: "",
    aboutPageHighlight1Desc: "",
    aboutPageHighlight2Title: "",
    aboutPageHighlight2Desc: "",
    aboutPageHighlight3Title: "",
    aboutPageHighlight3Desc: "",
    aboutPageHighlight4Title: "",
    aboutPageHighlight4Desc: "",
    aboutPageHighlight5Title: "",
    aboutPageHighlight5Desc: "",
    aboutPageHighlight6Title: "",
    aboutPageHighlight6Desc: "",
  });
  const [uploadingIntroImage, setUploadingIntroImage] = useState(false);

  const currentForm = {
    aboutText: form.aboutText || settings?.aboutText || "",
    aboutPageIntroVisible: form.aboutPageIntroVisible,
    aboutPageIntroLabel: form.aboutPageIntroLabel || settings?.aboutPageIntroLabel || "",
    aboutPageIntroTitle: form.aboutPageIntroTitle || settings?.aboutPageIntroTitle || "",
    aboutPageIntroImage: form.aboutPageIntroImage || settings?.aboutPageIntroImage || "",
    aboutPageHighlightsVisible: form.aboutPageHighlightsVisible,
    aboutPageHighlightsLabel: form.aboutPageHighlightsLabel || settings?.aboutPageHighlightsLabel || "",
    aboutPageHighlightsTitle: form.aboutPageHighlightsTitle || settings?.aboutPageHighlightsTitle || "",
    aboutPageHighlight1Title: form.aboutPageHighlight1Title || settings?.aboutPageHighlight1Title || "",
    aboutPageHighlight1Desc: form.aboutPageHighlight1Desc || settings?.aboutPageHighlight1Desc || "",
    aboutPageHighlight2Title: form.aboutPageHighlight2Title || settings?.aboutPageHighlight2Title || "",
    aboutPageHighlight2Desc: form.aboutPageHighlight2Desc || settings?.aboutPageHighlight2Desc || "",
    aboutPageHighlight3Title: form.aboutPageHighlight3Title || settings?.aboutPageHighlight3Title || "",
    aboutPageHighlight3Desc: form.aboutPageHighlight3Desc || settings?.aboutPageHighlight3Desc || "",
    aboutPageHighlight4Title: form.aboutPageHighlight4Title || settings?.aboutPageHighlight4Title || "",
    aboutPageHighlight4Desc: form.aboutPageHighlight4Desc || settings?.aboutPageHighlight4Desc || "",
    aboutPageHighlight5Title: form.aboutPageHighlight5Title || settings?.aboutPageHighlight5Title || "",
    aboutPageHighlight5Desc: form.aboutPageHighlight5Desc || settings?.aboutPageHighlight5Desc || "",
    aboutPageHighlight6Title: form.aboutPageHighlight6Title || settings?.aboutPageHighlight6Title || "",
    aboutPageHighlight6Desc: form.aboutPageHighlight6Desc || settings?.aboutPageHighlight6Desc || "",
  };

  const handleSave = async () => {
    try {
      await update(currentForm);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  const handleIntroImageUpload = async (file?: File) => {
    if (!file) return;

    try {
      setUploadingIntroImage(true);
      const result = await uploadImage(file);
      setForm((p) => ({ ...p, aboutPageIntroImage: result.url }));
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploadingIntroImage(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Introduction Section</h3>
              <p className="text-sm text-slate-500">Show or hide the intro block on the About page.</p>
            </div>
            <Switch checked={currentForm.aboutPageIntroVisible} onCheckedChange={(value) => setForm((p) => ({ ...p, aboutPageIntroVisible: value }))} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Intro Label</label>
              <Input placeholder="Our Story" value={currentForm.aboutPageIntroLabel} onChange={(e) => setForm((p) => ({ ...p, aboutPageIntroLabel: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Intro Title</label>
              <Input placeholder="School name or custom title" value={currentForm.aboutPageIntroTitle} onChange={(e) => setForm((p) => ({ ...p, aboutPageIntroTitle: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Intro Image</label>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleIntroImageUpload(e.target.files?.[0])} />
            {uploadingIntroImage && <span className="text-sm text-slate-500">Uploading...</span>}
          </div>
          {currentForm.aboutPageIntroImage ? (
            <img src={currentForm.aboutPageIntroImage} alt="About page intro" className="h-24 w-40 rounded object-cover border border-slate-200" />
          ) : null}
          <div>
            <label className="text-sm font-medium text-slate-700">Intro Description</label>
            <Textarea placeholder="Write the About page introduction text" rows={8} value={currentForm.aboutText} onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))} />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Why Choose Us Section</h3>
              <p className="text-sm text-slate-500">Show or hide the highlights cards and edit each placeholder.</p>
            </div>
            <Switch checked={currentForm.aboutPageHighlightsVisible} onCheckedChange={(value) => setForm((p) => ({ ...p, aboutPageHighlightsVisible: value }))} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Section Label</label>
              <Input placeholder="Why Choose Us" value={currentForm.aboutPageHighlightsLabel} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlightsLabel: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Section Title</label>
              <Input placeholder="What Sets Us Apart" value={currentForm.aboutPageHighlightsTitle} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlightsTitle: e.target.value }))} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card 1 Title</label>
              <Input placeholder="STEAM Curriculum" value={currentForm.aboutPageHighlight1Title} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight1Title: e.target.value }))} />
              <label className="text-sm font-medium text-slate-700">Card 1 Description</label>
              <Textarea placeholder="Card 1 description" value={currentForm.aboutPageHighlight1Desc} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight1Desc: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card 2 Title</label>
              <Input placeholder="Small Class Sizes" value={currentForm.aboutPageHighlight2Title} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight2Title: e.target.value }))} />
              <label className="text-sm font-medium text-slate-700">Card 2 Description</label>
              <Textarea placeholder="Card 2 description" value={currentForm.aboutPageHighlight2Desc} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight2Desc: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card 3 Title</label>
              <Input placeholder="Holistic Development" value={currentForm.aboutPageHighlight3Title} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight3Title: e.target.value }))} />
              <label className="text-sm font-medium text-slate-700">Card 3 Description</label>
              <Textarea placeholder="Card 3 description" value={currentForm.aboutPageHighlight3Desc} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight3Desc: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card 4 Title</label>
              <Input placeholder="Quality Faculty" value={currentForm.aboutPageHighlight4Title} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight4Title: e.target.value }))} />
              <label className="text-sm font-medium text-slate-700">Card 4 Description</label>
              <Textarea placeholder="Card 4 description" value={currentForm.aboutPageHighlight4Desc} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight4Desc: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card 5 Title</label>
              <Input placeholder="Safe Environment" value={currentForm.aboutPageHighlight5Title} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight5Title: e.target.value }))} />
              <label className="text-sm font-medium text-slate-700">Card 5 Description</label>
              <Textarea placeholder="Card 5 description" value={currentForm.aboutPageHighlight5Desc} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight5Desc: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Card 6 Title</label>
              <Input placeholder="15+ Years" value={currentForm.aboutPageHighlight6Title} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight6Title: e.target.value }))} />
              <label className="text-sm font-medium text-slate-700">Card 6 Description</label>
              <Textarea placeholder="Card 6 description" value={currentForm.aboutPageHighlight6Desc} onChange={(e) => setForm((p) => ({ ...p, aboutPageHighlight6Desc: e.target.value }))} />
            </div>
          </div>
        </div>

        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" /> Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function StatsTab() {
  const { data: stats, update, loading } = useStats();
  const [editing, setEditing] = useState<Record<string, any>>({});

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });

    try {
      await update(id, updates);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (stats.length === 0) {
    return (
      <EmptyState
        title="No stats found"
        description="Stats documents are missing. Seed or add stat entries so the public stats section and admin editor can show data."
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-500">Label</label>
                <Input
                  defaultValue={stat.label}
                  placeholder="e.g. Students"
                  onChange={(e) => setEditing((p) => ({ ...p, [`${stat.id}.label`]: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Value</label>
                <Input
                  defaultValue={stat.value}
                  placeholder="e.g. 500"
                  onChange={(e) => setEditing((p) => ({ ...p, [`${stat.id}.value`]: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">Suffix</label>
              <Input
                defaultValue={stat.suffix}
                placeholder="+, %, etc"
                onChange={(e) => setEditing((p) => ({ ...p, [`${stat.id}.suffix`]: e.target.value }))}
              />
            </div>
            <Button size="sm" onClick={() => handleSave(stat.id)}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CoreValuesTab() {
  const { data: values, update, loading } = useCoreValues();
  const [editing, setEditing] = useState<Record<string, any>>({});

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });

    try {
      await update(id, updates);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (values.length === 0) {
    return (
      <EmptyState
        title="No core values found"
        description="Core value documents are missing. Seed or add values so this section has editable cards."
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {values.map((val) => (
        <Card key={val.id}>
          <CardContent className="p-4 space-y-2">
            <Input
              defaultValue={val.name}
              placeholder="Value title"
              onChange={(e) => setEditing((p) => ({ ...p, [`${val.id}.name`]: e.target.value }))}
            />
            <Input
              defaultValue={val.description}
              placeholder="Short description"
              onChange={(e) => setEditing((p) => ({ ...p, [`${val.id}.description`]: e.target.value }))}
            />
            <Button size="sm" onClick={() => handleSave(val.id)}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TestimonialsTab() {
  const { data: items, update, loading } = useTestimonials();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });

    try {
      await update(id, updates);
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  const handleFileUpload = async (id: string, file?: File) => {
    if (!file) return;
    try {
      setUploadingId(id);
      const result = await uploadImage(file);
      setEditing((p) => ({ ...p, [`${id}.image`]: result.url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (items.length === 0) {
    return (
      <EmptyState
        title="No testimonials found"
        description="Testimonial documents are missing. Seed or add testimonials so this section shows editable cards."
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const imageValue = editing[`${item.id}.image`] ?? item.image;

        return (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-2">
              <div className="grid sm:grid-cols-2 gap-2">
                <Input defaultValue={item.name} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.name`]: e.target.value }))} placeholder="Name" />
                <Input defaultValue={item.role} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.role`]: e.target.value }))} placeholder="Role" />
              </div>
              
               <div className="flex flex-wrap items-center gap-3">
                <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleFileUpload(item.id, e.target.files?.[0])} />
                {uploadingId === item.id && <span className="text-sm text-slate-500">Uploading...</span>}
              </div>
              {imageValue ? (
                <img src={imageValue} alt={item.name} className="h-16 w-16 rounded-full object-cover border border-slate-200" />
              ) : (
                <div className="h-16 w-16 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 text-center px-1">
                  No image
                </div>
              )}
              <Textarea defaultValue={item.content} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.content`]: e.target.value }))} placeholder="Content" />
              <div className="flex items-center justify-between">
                <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
                <Button size="sm" onClick={() => handleSave(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function TeamTab() {
  const { data: items, update, add, remove, loading } = useTeamMembers();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [uploadingNewImage, setUploadingNewImage] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
    isActive: true,
    order: 0,
    updatedAt: new Date().toISOString(),
  });

  const resetNewMember = () => {
    setNewMember({
      name: "",
      role: "",
      image: "",
      bio: "",
      isActive: true,
      order: items.length,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });

    try {
      await update(id, updates);
      setEditing((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (key.startsWith(`${id}.`)) delete next[key];
        });
        return next;
      });
      toast.success("Saved");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save");
    }
  };

  const handleAdd = async () => {
    if (!newMember.name.trim() || !newMember.role.trim()) {
      toast.error("Name and role are required");
      return;
    }

    try {
      await add({
        ...newMember,
        order: items.length,
      });
      resetNewMember();
      setShowNewForm(false);
      toast.success("Team member added");
    } catch (error: any) {
      toast.error(error?.message || "Failed to add team member");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await remove(id);
      setEditing((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (key.startsWith(`${id}.`)) delete next[key];
        });
        return next;
      });
      toast.success("Team member removed");
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove team member");
    }
  };

  const handleFileUpload = async (id: string, file?: File) => {
    if (!file) return;
    try {
      setUploadingId(id);
      const result = await uploadImage(file);
      setEditing((p) => ({ ...p, [`${id}.image`]: result.url }));
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  const handleNewFileUpload = async (file?: File) => {
    if (!file) return;
    try {
      setUploadingNewImage(true);
      const result = await uploadImage(file);
      setNewMember((prev) => ({ ...prev, image: result.url }));
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploadingNewImage(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
          <p className="text-sm text-slate-500">Add, edit, and remove team members from this section.</p>
        </div>
        <Button
          type="button"
          onClick={() => {
            if (!showNewForm) resetNewMember();
            setShowNewForm((prev) => !prev);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-1 h-4 w-4" /> {showNewForm ? "Close" : "Add Member"}
        </Button>
      </div>

      {showNewForm && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input value={newMember.name} onChange={(e) => setNewMember((prev) => ({ ...prev, name: e.target.value }))} placeholder="Name" />
              <Input value={newMember.role} onChange={(e) => setNewMember((prev) => ({ ...prev, role: e.target.value }))} placeholder="Role" />
            </div>
            <Input value={newMember.image} onChange={(e) => setNewMember((prev) => ({ ...prev, image: e.target.value }))} placeholder="Photo URL" />
            <div className="flex flex-wrap items-center gap-3">
              <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleNewFileUpload(e.target.files?.[0])} />
              {uploadingNewImage && <span className="text-sm text-slate-500">Uploading...</span>}
            </div>
            {newMember.image ? (
              <img src={newMember.image} alt={newMember.name || "New team member"} className="h-20 w-20 rounded object-cover border border-slate-200" />
            ) : (
              <div className="h-20 w-20 rounded border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 text-center px-1">
                No image
              </div>
            )}
            <Textarea value={newMember.bio} onChange={(e) => setNewMember((prev) => ({ ...prev, bio: e.target.value }))} placeholder="Bio" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch checked={newMember.isActive} onCheckedChange={(value) => setNewMember((prev) => ({ ...prev, isActive: value }))} />
                <span className="text-sm text-slate-600">Active</span>
              </div>
              <Button type="button" onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-1 h-4 w-4" /> Save Member
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {items.length === 0 ? (
        <EmptyState
          title="No team members found"
          description="Add your first team member using the button above."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item) => {
            const imageValue = editing[`${item.id}.image`] ?? item.image;

            return (
              <Card key={item.id}>
                <CardContent className="p-4 space-y-2">
                  <Input defaultValue={item.name} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.name`]: e.target.value }))} placeholder="Name" />
                  <Input defaultValue={item.role} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.role`]: e.target.value }))} placeholder="Role" />
                  <Input value={imageValue} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.image`]: e.target.value }))} placeholder="Photo URL" />
                  <div className="flex flex-wrap items-center gap-3">
                    <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleFileUpload(item.id, e.target.files?.[0])} />
                    {uploadingId === item.id && <span className="text-sm text-slate-500">Uploading...</span>}
                  </div>
                  {imageValue ? (
                    <img src={imageValue} alt={item.name} className="h-20 w-20 rounded object-cover border border-slate-200" />
                  ) : (
                    <div className="h-20 w-20 rounded border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400 text-center px-1">
                      No image
                    </div>
                  )}
                  <Textarea defaultValue={item.bio} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.bio`]: e.target.value }))} placeholder="Bio" />
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
                      <span className="text-sm text-slate-600">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button type="button" size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleRemove(item.id)}>
                        <Minus className="mr-1 h-4 w-4" /> Remove
                      </Button>
                      <Button type="button" size="sm" onClick={() => handleSave(item.id)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CareersTab() {
  const { data: items, update, loading } = useCareerPosts();
  const [editing, setEditing] = useState<Record<string, any>>({});

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Career post updated!");
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (items.length === 0) {
    return (
      <EmptyState
        title="No career posts found"
        description="Career post documents are missing. Seed or add open positions so this section becomes editable."
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4 space-y-2">
            <Input defaultValue={item.title} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.title`]: e.target.value }))} placeholder="Title" />
            <div className="grid grid-cols-2 gap-2">
              <Input defaultValue={item.department} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.department`]: e.target.value }))} placeholder="Department" />
              <Input defaultValue={item.type} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.type`]: e.target.value }))} placeholder="Type (Full-time/Part-time)" />
            </div>
            <Textarea defaultValue={item.description} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.description`]: e.target.value }))} placeholder="Description" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
                <span className="text-sm text-slate-600">Active</span>
              </div>
              <Button size="sm" onClick={() => handleSave(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PartnersTab() {
  const { data: items, update, loading } = usePartners();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Partner updated!");
  };

  const handleFileUpload = async (id: string, file?: File) => {
    if (!file) return;
    try {
      setUploadingId(id);
      const result = await uploadImage(file);
      setEditing((p) => ({ ...p, [`${id}.logo`]: result.url }));
      toast.success("Logo uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploadingId(null);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (items.length === 0) {
    return (
      <EmptyState
        title="No partners found"
        description="Partner documents are missing. Seed or add partner records so logo and website placeholders appear here."
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((item) => {
        const logoValue = editing[`${item.id}.logo`] ?? item.logo;

        return (
          <Card key={item.id}>
            <CardContent className="p-4 space-y-2">
              <Input defaultValue={item.name} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.name`]: e.target.value }))} placeholder="Partner Name" />
              <Input value={logoValue} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.logo`]: e.target.value }))} placeholder="Logo URL" />
              <Input defaultValue={item.website} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.website`]: e.target.value }))} placeholder="Website URL" />
              <div className="flex flex-wrap items-center gap-3">
                <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleFileUpload(item.id, e.target.files?.[0])} />
                {uploadingId === item.id && <span className="text-sm text-slate-500">Uploading...</span>}
              </div>
              {logoValue ? (
                <img src={logoValue} alt={item.name} className="h-16 w-32 rounded object-contain border border-slate-200 bg-slate-50 p-2" />
              ) : (
                <div className="h-16 w-32 rounded border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400">
                  No logo
                </div>
              )}
              <div className="flex items-center justify-between">
                <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
                <Button size="sm" onClick={() => handleSave(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
