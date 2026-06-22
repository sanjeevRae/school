import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import AdminLayout from "@/components/admin/AdminLayout";
import { useGalleryImages } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, Save, Plus } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";

type NewImage = {
  title: string;
  category: string;
  image: string;
  isActive: boolean;
  updatedAt: string;
  order: number;
};

export default function AdminMedia() {

  const navigate = useNavigate();
  if (!localStorage.getItem("admin_auth")) {
    navigate("/admin/login");
    return null;
  }

  const { data: images, update, add, loading } = useGalleryImages();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [showNew, setShowNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState<NewImage>({
    title: "",
    category: "Events",
    image: "",
    isActive: true,
    updatedAt: new Date().toISOString(),
    order: 0,
  });


  const fileRef = useRef<HTMLInputElement>(null);

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
    toast.success("Image updated!");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadImage(file);
      setNewImage((p) => ({ ...p, image: result.url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed");
    }
    setUploading(false);
  };

  const handleAdd = async () => {
    if (!newImage.title || !newImage.image) {
      toast.error("Title and image are required");
      return;
    }
    await add(newImage);
    setShowNew(false);
    setNewImage({
      title: "",
      category: "Events",
      image: "",
      isActive: true,
      updatedAt: new Date().toISOString(),
      order: 0,
    });

    toast.success("Image added to gallery!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
            <p className="text-slate-500">Manage gallery images and media uploads</p>
          </div>
          <Button onClick={() => setShowNew(!showNew)}>
            <Plus className="h-4 w-4 mr-1" /> Add Image
          </Button>
        </div>

        {showNew && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold">Upload New Image</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="Title" value={newImage.title} onChange={(e) => setNewImage((p) => ({ ...p, title: e.target.value }))} />
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={newImage.category}
                  onChange={(e) => setNewImage((p) => ({ ...p, category: e.target.value }))}
                >
                  <option>Events</option>
                  <option>Academic</option>
                  <option>Sports</option>
                  <option>Arts</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" ref={fileRef} onChange={handleFileUpload} className="hidden" />
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
                {newImage.image && (
                  <div className="flex items-center gap-2">
                    <img src={newImage.image} alt="Preview" className="h-10 w-10 object-cover rounded" />
                    <span className="text-sm text-green-600">Uploaded</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">Add to Gallery</Button>
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <Card key={img.id}>
                <CardContent className="p-3 space-y-3">
                  <img src={img.image} alt={img.title} className="w-full h-40 object-cover rounded-lg" />
                  <Input defaultValue={img.title} onChange={(e) => handleEdit(img.id, "title", e.target.value)} placeholder="Title" />
                  <select
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    defaultValue={img.category}
                    onChange={(e) => handleEdit(img.id, "category", e.target.value)}
                  >
                    <option>Events</option>
                    <option>Academic</option>
                    <option>Sports</option>
                    <option>Arts</option>
                  </select>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch checked={editing[`${img.id}.isActive`] ?? img.isActive} onCheckedChange={(v) => handleEdit(img.id, "isActive", v)} />
                      <span className="text-sm text-slate-600">Active</span>
                    </div>
                    <Button size="sm" onClick={() => handleSave(img.id)}>
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
