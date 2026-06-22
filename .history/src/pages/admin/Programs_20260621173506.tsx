import { useState } from "react";
import { useNavigate } from "react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePrograms } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus } from "lucide-react";

export default function AdminPrograms() {
  const navigate = useNavigate();
  if (!localStorage.getItem("admin_auth")) {
    navigate("/admin/login");
    return null;
  }

  const { data: programs, update, add, loading } = usePrograms();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [showNew, setShowNew] = useState(false);
  const initialNewProgram = {
    title: "",
    slug: "",
    description: "",
    image: "/images/hero1.jpg",
    fullContent: "",
    features: [""],
    isActive: true,
    updatedAt: new Date().toISOString(),
    order: 0,
  };

  const [newProgram, setNewProgram] = useState<typeof initialNewProgram>({

    title: "",
    slug: "",
    description: "",
    image: "/images/hero1.jpg",
    fullContent: "",
    features: [""],
    isActive: true,
    updatedAt: new Date().toISOString(),
    order: 0,
  });




  const handleEdit = (id: string, field: string, value: any) => {
    setEditing((prev) => ({ ...prev, [`${id}.${field}`]: value }));
  };

  const handleSave = async (id: string) => {
    const updates: Record<string, any> = {};
    Object.entries(editing).forEach(([key, value]) => {
      if (key.startsWith(`${id}.`)) updates[key.replace(`${id}.`, "")] = value;
    });
    await update(id, updates);
    setEditing((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (k.startsWith(`${id}.`)) delete next[k];
      });
      return next;
    });
    toast.success("Program updated!");
  };

  const handleAdd = async () => {
    if (!newProgram.title || !newProgram.slug) {
      toast.error("Title and slug are required");
      return;
    }
    await add(newProgram);
    setShowNew(false);
    setNewProgram({
      title: "",
      slug: "",
      description: "",
      image: "/images/hero1.jpg",
      fullContent: "",
      features: [""],
      isActive: true,
      updatedAt: new Date().toISOString(),
      order: 0,
    } as typeof newProgram);

    toast.success("Program added!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Programs</h1>
            <p className="text-slate-500">Manage your academic programs</p>
          </div>
          <Button onClick={() => setShowNew(!showNew)}>
            <Plus className="h-4 w-4 mr-1" /> Add Program
          </Button>
        </div>

        {showNew && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold">New Program</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="Title" value={newProgram.title} onChange={(e) => setNewProgram((p) => ({ ...p, title: e.target.value }))} />
                <Input placeholder="Slug" value={newProgram.slug} onChange={(e) => setNewProgram((p) => ({ ...p, slug: e.target.value }))} />
              </div>
              <Textarea placeholder="Description" value={newProgram.description} onChange={(e) => setNewProgram((p) => ({ ...p, description: e.target.value }))} />
              <Textarea placeholder="Full Content" rows={4} value={newProgram.fullContent} onChange={(e) => setNewProgram((p) => ({ ...p, fullContent: e.target.value }))} />
              <Input placeholder="Image URL" value={newProgram.image} onChange={(e) => setNewProgram((p) => ({ ...p, image: e.target.value }))} />
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">Create Program</Button>
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {programs.map((program) => (
              <Card key={program.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500">Title</label>
                      <Input defaultValue={program.title} onChange={(e) => handleEdit(program.id, "title", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Slug</label>
                      <Input defaultValue={program.slug} onChange={(e) => handleEdit(program.id, "slug", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Description</label>
                    <Textarea defaultValue={program.description} onChange={(e) => handleEdit(program.id, "description", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Image URL</label>
                    <Input defaultValue={program.image} onChange={(e) => handleEdit(program.id, "image", e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch checked={editing[`${program.id}.isActive`] ?? program.isActive} onCheckedChange={(v) => handleEdit(program.id, "isActive", v)} />
                      <span className="text-sm text-slate-600">Active</span>
                    </div>
                    <Button size="sm" onClick={() => handleSave(program.id)}>
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
