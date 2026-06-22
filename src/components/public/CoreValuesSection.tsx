import { useCoreValues } from "@/hooks/useSchoolData";
import {
  Heart,
  HandHeart,
  HelpingHand,
  Star,
  Shield,
  Users,
  CheckCircle,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Heart,
  HandHeart,
  HelpingHand,
  Star,
  Shield,
  Users,
  CheckCircle,
  Zap,
};

export default function CoreValuesSection() {
  const { data: values, loading } = useCoreValues();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            What We Stand For
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Our Core Values
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Building quality lives and strong culture through these fundamental principles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-50 animate-pulse">
                  <div className="h-10 w-10 bg-slate-200 rounded-lg mb-3" />
                  <div className="h-5 w-24 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-full bg-slate-200 rounded" />
                </div>
              ))
            : values.map((value) => {
                const Icon = iconMap[value.icon] || Star;
                return (
                  <div
                    key={value.id}
                    className="p-6 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-white group-hover:bg-amber-100 inline-flex mb-3 transition-colors">
                      <Icon className="h-6 w-6 text-slate-600 group-hover:text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{value.name}</h3>
                    <p className="text-sm text-slate-500">{value.description}</p>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
