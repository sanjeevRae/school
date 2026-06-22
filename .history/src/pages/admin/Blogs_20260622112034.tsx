import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useBlogPosts } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import { RequireAdminAuth } from "../../lib/firebase/adminAuth";


export default function AdminBlogs() {

  const { data: posts, update, add, loading } = useBlogPosts();
  const [editing, setEditing] = useState<Record<string, any>>({});
  const [showNew, setShowNew] = useState(false);
  const [uploadingNewImage, setUploadingNewImage] = useState(false);
  const [uploadingEditId, setUploadingEditId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    category: "",
    publishedAt: new Date().toISOString().split("T")[0],
    isActive: true,
    updatedAt: new Date().toISOString(),
    // Firestore/local mock requires these fields for type-safety
    // (backend-backed version should ignore/derive them).
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
    toast.success("Blog post updated!");
  };

  const handleAdd = async () => {
    if (!newPost.title || !newPost.slug) {
      toast.error("Title and slug are required");
      return;
    }
    await add(newPost);
    setShowNew(false);
    setNewPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      category: "",
      publishedAt: new Date().toISOString().split("T")[0],
      isActive: true,
      updatedAt: new Date().toISOString(),
      order: 0,
    } as typeof newPost);


    toast.success("Blog post created!");
  };

  const handleNewImageUpload = async (file?: File) => {
    if (!file) return;

    try {
      setUploadingNewImage(true);
      const result = await uploadImage(file);
      setNewPost((prev) => ({ ...prev, image: result.url }));
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploadingNewImage(false);
    }
  };

  const handleEditImageUpload = async (id: string, file?: File) => {
    if (!file) return;

    try {
      setUploadingEditId(id);
      const result = await uploadImage(file);
      handleEdit(id, "image", result.url);
      toast.success("Image uploaded!");
    } catch (error: any) {
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploadingEditId(null);
    }
  };

  return (
    <RequireAdminAuth>
      <AdminLayout>
        <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
            <p className="text-slate-500">Manage news articles and blog content</p>
          </div>
          <Button onClick={() => setShowNew(!showNew)}>
            <Plus className="h-4 w-4 mr-1" /> Add Post
          </Button>
        </div>

        {showNew && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold">New Blog Post</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="Title" value={newPost.title} onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))} />
                <Input placeholder="Slug" value={newPost.slug} onChange={(e) => setNewPost((p) => ({ ...p, slug: e.target.value }))} />
              </div>
              <Textarea placeholder="Excerpt" value={newPost.excerpt} onChange={(e) => setNewPost((p) => ({ ...p, excerpt: e.target.value }))} />
              <Textarea placeholder="Content" rows={4} value={newPost.content} onChange={(e) => setNewPost((p) => ({ ...p, content: e.target.value }))} />
              <div className="grid sm:grid-cols-3 gap-3">
                <Input placeholder="Author" value={newPost.author} onChange={(e) => setNewPost((p) => ({ ...p, author: e.target.value }))} />
                <Input placeholder="Category" value={newPost.category} onChange={(e) => setNewPost((p) => ({ ...p, category: e.target.value }))} />
                <Input type="date" value={newPost.publishedAt} onChange={(e) => setNewPost((p) => ({ ...p, publishedAt: e.target.value }))} />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleNewImageUpload(e.target.files?.[0])} />
                {uploadingNewImage && <span className="text-sm text-slate-500">Uploading...</span>}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">Create Post</Button>
                <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500">Title</label>
                      <Input defaultValue={post.title} onChange={(e) => handleEdit(post.id, "title", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Slug</label>
                      <Input defaultValue={post.slug} onChange={(e) => handleEdit(post.id, "slug", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Excerpt</label>
                    <Textarea defaultValue={post.excerpt} onChange={(e) => handleEdit(post.id, "excerpt", e.target.value)} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Input type="file" accept="image/*" className="max-w-sm" onChange={(e) => handleEditImageUpload(post.id, e.target.files?.[0])} />
                    {uploadingEditId === post.id && <span className="text-sm text-slate-500">Uploading...</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch checked={editing[`${post.id}.isActive`] ?? post.isActive} onCheckedChange={(v) => handleEdit(post.id, "isActive", v)} />
                      <span className="text-sm text-slate-600">Active</span>
                    </div>
                    <Button size="sm" onClick={() => handleSave(post.id)}>
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
    </RequireAdminAuth>
  );
}
