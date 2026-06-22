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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";

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

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-4">
      {slides.map((slide) => (
        <Card key={slide.id}>
          <CardContent className="p-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Title</label>
                <Input
                  defaultValue={slide.title}
                  onChange={(e) => handleEdit(slide.id, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Image URL</label>
                <Input
                  defaultValue={slide.image}
                  onChange={(e) => handleEdit(slide.id, "image", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Subtitle</label>
              <Input
                defaultValue={slide.subtitle}
                onChange={(e) => handleEdit(slide.id, "subtitle", e.target.value)}
              />
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
      ))}
    </div>
  );
}

function AboutTab() {
  const { data: settings, update, loading } = useSettings();
  const [form, setForm] = useState({
    aboutText: settings?.aboutText || "",
    visionText: settings?.visionText || "",
    missionText: settings?.missionText || "",
  });

  const handleSave = async () => {
    await update(form);
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
            defaultValue={settings?.aboutText}
            onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Vision</label>
          <Textarea
            rows={4}
            defaultValue={settings?.visionText}
            onChange={(e) => setForm((p) => ({ ...p, visionText: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Mission</label>
          <Textarea
            rows={4}
            defaultValue={settings?.missionText}
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

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-500">Label</label>
                <Input
                  size={1}
                  defaultValue={stat.label}
                  onChange={(e) => setEditing((p) => ({ ...p, [`${stat.id}.label`]: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Value</label>
                <Input
                  defaultValue={stat.value}
                  onChange={(e) => setEditing((p) => ({ ...p, [`${stat.id}.value`]: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500">Suffix</label>
              <Input
                defaultValue={stat.suffix}
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

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {values.map((val) => (
        <Card key={val.id}>
          <CardContent className="p-4 space-y-2">
            <Input
              defaultValue={val.name}
              onChange={(e) => setEditing((p) => ({ ...p, [`${val.id}.name`]: e.target.value }))}
            />
            <Input
              defaultValue={val.description}
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

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Testimonial updated!");
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4 space-y-2">
            <div className="grid sm:grid-cols-2 gap-2">
              <Input defaultValue={item.name} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.name`]: e.target.value }))} placeholder="Name" />
              <Input defaultValue={item.role} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.role`]: e.target.value }))} placeholder="Role" />
            </div>
            <Textarea defaultValue={item.content} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.content`]: e.target.value }))} placeholder="Content" />
            <div className="flex items-center justify-between">
              <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
              <Button size="sm" onClick={() => handleSave(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TeamTab() {
  const { data: items, update, loading } = useTeamMembers();
  const [editing, setEditing] = useState<Record<string, any>>({});

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Team member updated!");
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4 space-y-2">
            <Input defaultValue={item.name} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.name`]: e.target.value }))} placeholder="Name" />
            <Input defaultValue={item.role} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.role`]: e.target.value }))} placeholder="Role" />
            <Textarea defaultValue={item.bio} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.bio`]: e.target.value }))} placeholder="Bio" />
            <div className="flex items-center justify-between">
              <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
              <Button size="sm" onClick={() => handleSave(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
            </div>
          </CardContent>
        </Card>
      ))}
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

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    toast.success("Partner updated!");
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4 space-y-2">
            <Input defaultValue={item.name} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.name`]: e.target.value }))} placeholder="Partner Name" />
            <Input defaultValue={item.website} onChange={(e) => setEditing((p) => ({ ...p, [`${item.id}.website`]: e.target.value }))} placeholder="Website URL" />
            <div className="flex items-center justify-between">
              <Switch checked={editing[`${item.id}.isActive`] ?? item.isActive} onCheckedChange={(v) => setEditing((p) => ({ ...p, [`${item.id}.isActive`]: v }))} />
              <Button size="sm" onClick={() => handleSave(item.id)}><Save className="h-4 w-4 mr-1" /> Save</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
