import { Link } from "react-router";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { usePrograms } from "@/hooks/useSchoolData";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Programs() {
  const { data: programs, loading } = usePrograms();
  const activePrograms = programs.filter((p) => p.isActive);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Page Header */}
      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Programs</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Comprehensive educational programs designed to nurture every aspect of a student's development
          </p>
        </div>
      </div>

      <main className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="grid lg:grid-cols-2 gap-8 items-center animate-pulse">
                    <div className="h-64 bg-slate-200 rounded-xl" />
                    <div className="space-y-3">
                      <div className="h-6 w-1/3 bg-slate-200 rounded" />
                      <div className="h-4 w-full bg-slate-200 rounded" />
                      <div className="h-4 w-5/6 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))
              : activePrograms.map((program, index) => (
                  <div
                    key={program.id}
                    className={`grid lg:grid-cols-2 gap-8 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <img
                        src={program.image}
                        alt={program.title}
                        className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="h-5 w-5 text-amber-500" />
                        <span className="text-sm text-amber-600 font-medium">Program</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                        {program.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {program.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {program.features.map((f) => (
                          <span
                            key={f}
                            className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/programs/${program.slug}`}
                        className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
