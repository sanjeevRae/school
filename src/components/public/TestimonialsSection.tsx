import { useTestimonials } from "@/hooks/useSchoolData";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials, loading } = useTestimonials();
  const activeTestimonials = testimonials.filter((t) => t.isActive);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            What People Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-50 animate-pulse">
                  <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-slate-200 rounded mb-4" />
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-slate-200" />
                    <div>
                      <div className="h-4 w-24 bg-slate-200 rounded mb-1" />
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : activeTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all"
                >
                  <Quote className="h-8 w-8 text-amber-400 mb-4" />
                  <p className="text-slate-600 leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
