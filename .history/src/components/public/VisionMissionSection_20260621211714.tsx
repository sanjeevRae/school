import { useSettings } from "@/hooks/useSchoolData";
import { Eye, Target } from "lucide-react";

export default function VisionMissionSection() {
  const { data: settings, loading } = useSettings();
  const visionText = settings?.visionText || "We envision a dynamic and inspiring educational institution where every learner can thrive.";
  const missionText = settings?.missionText || "We nurture lifelong learners with strong values, academic confidence, and practical skills.";

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-blue-50">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6" />
              </div>
            ) : (
              <p className="text-slate-600 leading-relaxed">{visionText}</p>
            )}
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-50">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6" />
              </div>
            ) : (
              <p className="text-slate-600 leading-relaxed">{missionText}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
