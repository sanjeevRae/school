import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdmissionInfo } from "@/hooks/useSchoolData";
import { defaultAdmissionInfo } from "@/lib/seedData";
import { Save, Plus, Trash2, ClipboardList, FileText } from "lucide-react";
import { toast } from "sonner";
import { RequireAdminAuth } from "../../lib/firebase/adminAuth";

export default function AdminAdmission() {
  const { data, loading, update } = useAdmissionInfo();

  const fallback = useMemo(() => defaultAdmissionInfo, []);

  const [form, setForm] = useState(fallback);

  useEffect(() => {
    if (data) {
      setForm({
        ...fallback,
        ...data,
        process: Array.isArray(data.process) && data.process.length ? data.process : fallback.process,
        requirements:
          Array.isArray(data.requirements) && data.requirements.length
            ? data.requirements
            : fallback.requirements,
      });
    }
  }, [data, fallback]);

  const updateProcess = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      process: prev.process.map((item, i) => (i === index ? value : item)),
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addProcess = () => {
    setForm((prev) => ({
      ...prev,
      process: [...prev.process, ""],
    }));
  };

  const addRequirement = () => {
    setForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeProcess = (index: number) => {
    setForm((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index),
    }));
  };

  const removeRequirement = (index: number) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      await update({
        ...form,
        title: form.title.trim() || fallback.title,
        content: form.content.trim() || fallback.content,
        fees: form.fees.trim() || fallback.fees,
        process: form.process.map((item) => item.trim()).filter(Boolean),
        requirements: form.requirements.map((item) => item.trim()).filter(Boolean),
        updatedAt: new Date().toISOString(),
      });
      toast.success("Admission content saved successfully.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save admission content.");
    }
  };

  return (
    <RequireAdminAuth>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admission Content</h1>
              <p className="text-slate-500">Update the public `/admission` page and save changes to Firestore.</p>
            </div>
            <Button onClick={handleSave} disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <Save className="mr-2 h-4 w-4" />
              Save Admission
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-500" />
                Admission Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Page Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Admission"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Introduction</label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Write the admission page introduction"
                  rows={6}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Fees / Notes</label>
                <Textarea
                  value={form.fees}
                  onChange={(e) => setForm((prev) => ({ ...prev, fees: e.target.value }))}
                  placeholder="Optional admission fees, notices, scholarship info, or office timing"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-amber-500" />
                  Admission Process
                </CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addProcess}>
                  <Plus className="mr-1 h-4 w-4" /> Add Step
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {form.process.map((step, index) => (
                  <div key={`process-${index}`} className="flex gap-2">
                    <Input
                      value={step}
                      onChange={(e) => updateProcess(index, e.target.value)}
                      placeholder={`Process step ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeProcess(index)}
                      disabled={form.process.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-amber-500" />
                  Requirements
                </CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                  <Plus className="mr-1 h-4 w-4" /> Add Item
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {form.requirements.map((item, index) => (
                  <div key={`requirement-${index}`} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRequirement(index)}
                      disabled={form.requirements.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </RequireAdminAuth>
  );
}
