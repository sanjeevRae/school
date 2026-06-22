import { Link } from "react-router";
import { usePrograms } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function ProgramsPreview() {
  const { data: programs, loading } = usePrograms();
  const activePrograms = programs.filter((p) => p.isActive).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              Academic Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Our Programs
            </h2>
            <p className="text-slate-600 mt-3 max-w-xl">
              Comprehensive education programs designed to nurture every aspect of a child's development
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-4 md:mt-0 border-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Link to="/programs">
              View All Programs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
                  <div className="h-48 bg-slate-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-2/3 bg-slate-200 rounded" />
                  </div>
                </div>
              ))
            : activePrograms.map((program) => (
                <Link
                  key={program.id}
                  to={`/programs/${program.slug}`}
                  className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md border border-slate-100 transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-amber-500" />
                      <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {program.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-amber-600 mt-3 group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
