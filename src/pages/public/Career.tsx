import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useCareerPosts } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, CheckCircle, Mail } from "lucide-react";
import { Link } from "react-router";

export default function Career() {
  const { data: careers, loading } = useCareerPosts();
  const activeCareers = careers.filter((c) => c.isActive);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Career Opportunities</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Join our team of dedicated educators and make a difference in students' lives
          </p>
        </div>
      </div>

      <main className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-slate-50 animate-pulse">
                  <div className="h-6 w-1/3 bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded mb-4" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : activeCareers.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Open Positions</h3>
              <p className="text-slate-500">
                Check back later for new career opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeCareers.map((career) => (
                <div
                  key={career.id}
                  className="p-6 rounded-xl bg-white border border-slate-200 hover:border-amber-200 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{career.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {career.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {career.type}
                        </span>
                        <span className="text-slate-400">
                          Posted {new Date(career.postedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-900 shrink-0">
                      <Link to="/contact">
                        <Mail className="h-4 w-4 mr-2" />
                        Apply Now
                      </Link>
                    </Button>
                  </div>

                  <p className="text-slate-600 text-sm mb-4">{career.description}</p>

                  <div>
                    <h4 className="font-medium text-slate-900 text-sm mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requirements.map((req) => (
                        <span
                          key={req}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                        >
                          <CheckCircle className="h-3 w-3 text-amber-500" />
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General Application */}
          <div className="mt-12 text-center p-8 bg-slate-50 rounded-2xl">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Don't see a suitable position?
            </h3>
            <p className="text-slate-600 mb-4">
              We're always looking for talented individuals. Send us your resume and we'll keep it on file.
            </p>
            <Button asChild variant="outline">
              <Link to="/contact">Send General Application</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
