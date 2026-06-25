import { useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useGalleryImages } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import { RequireAdminAuth } from "../../lib/firebase/adminAuth";

type NewImage = {
  title: string;
  category: string;
  image: string;
  isActive: boolean;
  updatedAt: string;
  order: number;
};

export default function AdminMedia() {

  const { data: images, update, add, remove, loading } = useGalleryImages();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [showNew, setShowNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<NewImage>({
    title: "",
    category: "Events",
    image: "",
    isActive: true,
    updatedAt: new Date().toISOString(),
    order: 0,
  });
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const multiFileRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setNewImageFiles(files);
    if (!newImage.title.trim() && files.length === 1) {
      setNewImage((prev) => ({
        ...prev,
        title: files[0].name.replace(/\.[^.]+$/, ""),
      }));
    }
  };

  const handleExistingImageUpload = async (sourceImage: { title: string; category: string; isActive: boolean }, file?: File) => {
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadImage(file);
      await add({
        title: sourceImage.title,
        category: sourceImage.category,
        image: result.url,
        isActive: sourceImage.isActive,
        updatedAt: new Date().toISOString(),
        order: images.length,
      });
      toast.success("Related picture added!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploading(false);
      setUploadingId(null);
    }
  };

  const handleAdd = async () => {
    if (!newImage.title.trim() || newImageFiles.length === 0) {
      toast.error("Title and at least one image are required");
      return;
    }

    try {
      setUploading(true);

      const startOrder = images.length;
      const uploadedUrls: string[] = [];

      for (const file of newImageFiles) {
        const result = await uploadImage(file);
        uploadedUrls.push(result.url);
      }

      await Promise.all(
        uploadedUrls.map((url, index) =>
          add({
            title: newImage.title.trim(),
            category: newImage.category,
            image: url,
            isActive: newImage.isActive,
            updatedAt: new Date().toISOString(),
            order: startOrder + index,
          }),
        ),
      );

      setShowNew(false);
      setNewImage({
        title: "",
        category: "Events",
        image: "",
        isActive: true,
        updatedAt: new Date().toISOString(),
        order: 0,
      });
      setNewImageFiles([]);
      if (multiFileRef.current) multiFileRef.current.value = "";
      toast.success(`${uploadedUrls.length} pictures added to this group!`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to add images");
    } finally {
      setUploading(false);
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
      toast.success("Image removed from gallery!");
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove image");
    }
  };

  return (
    <RequireAdminAuth>
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
              <h3 className="font-semibold">Create Image Group</h3>
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

              <div className="flex flex-wrap items-center gap-3">
                <input type="file" accept="image/*" multiple ref={multiFileRef} onChange={handleFileUpload} className="hidden" />
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="max-w-sm"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <Button type="button" variant="outline" onClick={() => multiFileRef.current?.click()} disabled={uploading}>
                  <Plus className="h-4 w-4 mr-1" />
                  {uploading ? "Uploading..." : "Add Pictures"}
                </Button>
                {newImageFiles.length > 0 && <span className="text-sm text-green-600">{newImageFiles.length} file(s) selected</span>}
              </div>

              {newImageFiles.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {newImageFiles.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="rounded-lg border border-slate-200 p-2 text-center">
                      <div className="h-20 w-full rounded bg-slate-100 flex items-center justify-center text-[11px] text-slate-500 px-2 text-center overflow-hidden">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700" disabled={uploading}>Add Group to Gallery</Button>
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
                  <img src={editing[`${img.id}.image`] ?? img.image} alt={img.title} className="w-full h-40 object-cover rounded-lg" />
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
                  <div className="flex flex-wrap items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      className="max-w-sm"
                      onChange={(e) => {
                        setUploadingId(img.id);
                        handleExistingImageUpload(
                          { title: editing[`${img.id}.title`] ?? img.title, category: editing[`${img.id}.category`] ?? img.category, isActive: editing[`${img.id}.isActive`] ?? img.isActive },
                          e.target.files?.[0],
                        );
                      }}
                    />
                    <span className="text-xs text-slate-500">Add related event picture</span>
                    {uploadingId === img.id && <span className="text-sm text-slate-500">Uploading...</span>}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={editing[`${img.id}.isActive`] ?? img.isActive} onCheckedChange={(v) => handleEdit(img.id, "isActive", v)} />
                      <span className="text-sm text-slate-600">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleRemove(img.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                      <Button size="sm" onClick={() => handleSave(img.id)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        </div>
      </AdminLayout>
    </RequireAdminAuth>
  );
}
