import { useParams, Link } from "react-router";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { usePrograms } from "@/hooks/useSchoolData";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: programs, loading } = usePrograms();
  const program = programs.find((p) => p.slug === slug && p.isActive);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-20 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-slate-600 border-t-transparent rounded-full mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Program Not Found</h1>
          <Button asChild>
            <Link to="/programs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <div className="relative h-72 md:h-96">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to="/programs"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Programs
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{program.title}</h1>
          </div>
        </div>
      </div>

      <main className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-amber-600 font-medium">Academic Program</span>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {program.description}
          </p>

          {/* Features */}
          <div className="bg-slate-50 rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {program.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-500 shrink-0" />
                  <span className="text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Content */}
          <div className="prose prose-slate max-w-none">
            {program.fullContent.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 bg-slate-800 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              Interested in {program.title}?
            </h3>
            <p className="text-slate-300 mb-6">
              Apply now and secure your child's spot for the upcoming academic year.
            </p>
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <Link to="/admission">Apply Now</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
