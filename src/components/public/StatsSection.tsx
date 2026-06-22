import { useStats } from "@/hooks/useSchoolData";
import { Users, Award, Heart, Calendar } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Users,
  Award,
  Heart,
  Calendar,
};

export default function StatsSection() {
  const { data: stats, loading } = useStats();

  return (
    <section className="py-12 md:py-16 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-12 w-12 mx-auto bg-slate-700 rounded-full animate-pulse mb-3" />
                  <div className="h-8 w-16 mx-auto bg-slate-700 rounded animate-pulse mb-1" />
                  <div className="h-4 w-20 mx-auto bg-slate-700 rounded animate-pulse" />
                </div>
              ))
            : stats.map((stat) => {
                const Icon = iconMap[stat.icon] || Users;
                return (
                  <div key={stat.id} className="text-center group">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="h-8 w-8 text-amber-400" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {stat.value}
                      <span className="text-amber-400">{stat.suffix}</span>
                    </div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
