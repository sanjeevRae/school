import { useState } from "react";
import { useNavigate } from "react-router";
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
import { Save } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";

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
  const navigate = useNavigate();
  if (!localStorage.getItem("admin_auth")) {
    navigate("/admin/login");
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
          <p className="text-slate-500">Manage all editable content sections of your website</p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="hero" className="text-xs sm:text-sm">Hero Slides</TabsTrigger>
            <TabsTrigger value="about" className="text-xs sm:text-sm">About & Vision</TabsTrigger>
            <TabsTrigger value="stats" className="text-xs sm:text-sm">Stats</TabsTrigger>
            <TabsTrigger value="values" className="text-xs sm:text-sm">Core Values</TabsTrigger>
            <TabsTrigger value="testimonials" className="text-xs sm:text-sm">Testimonials</TabsTrigger>
            <TabsTrigger value="team" className="text-xs sm:text-sm">Team</TabsTrigger>
            <TabsTrigger value="careers" className="text-xs sm:text-sm">Careers</TabsTrigger>
            <TabsTrigger value="partners" className="text-xs sm:text-sm">Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="hero"><HeroSlidesTab /></TabsContent>
          <TabsContent value="about"><AboutTab /></TabsContent>
          <TabsContent value="stats"><StatsTab /></TabsContent>
          <TabsContent value="values"><CoreValuesTab /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsTab /></TabsContent>
          <TabsContent value="team"><TeamTab /></TabsContent>
          <TabsContent value="careers"><CareersTab /></TabsContent>
          <TabsContent value="partners"><PartnersTab /></TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
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
    await update(id, updates);
    setEditing((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${id}.`)) delete next[k];
      });
      return next;
    });
    toast.success("Slide updated!");
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
                  <label className="text-sm font-medium text-slate-700">Image URL</label>
                  <Input
                    value={imageValue}
                    onChange={(e) => handleEdit(slide.id, "image", e.target.value)}
                    placeholder="Paste image URL or upload below"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Subtitle</label>
                <Input
                  defaultValue={slide.subtitle}
                  onChange={(e) => handleEdit(slide.id, "subtitle", e.target.value)}
                  placeholder="Write slide subtitle"
                />
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
  const [form, setForm] = useState({
    aboutText: "",
    visionText: "",
    missionText: "",
  });

  const currentForm = {
    aboutText: form.aboutText || settings?.aboutText || "",
    visionText: form.visionText || settings?.visionText || "",
    missionText: form.missionText || settings?.missionText || "",
  };

  const handleSave = async () => {
    await update(currentForm);
    toast.success("About content updated!");
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">About Text</label>
          <Textarea
            rows={8}
            value={currentForm.aboutText}
            placeholder="Write the main school introduction here"
            onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))}
          />
        </div>
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

function StatsTab() {
  const { data: stats, update, loading } = useStats();
  const [editing, setEditing] = useState<Record<string, any>>({});

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Stat updated!");
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
    await update(id, updates);
    toast.success("Value updated!");
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
    await update(id, updates);
    toast.success("Testimonial updated!");
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
              <Input value={imageValue} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.image`]: e.target.value }))} placeholder="Photo URL" />
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
  const { data: items, update, loading } = useTeamMembers();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Team member updated!");
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
        title="No team members found"
        description="Team member documents are missing. Seed or add team records so this section becomes editable."
      />
    );
  }

  return (
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
