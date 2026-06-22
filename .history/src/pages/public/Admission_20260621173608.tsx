import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useAdmissionInfo } from "@/hooks/useSchoolData";
import { CheckCircle, FileText, Phone, Mail, GraduationCap, ClipboardList, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Admission() {
  const { data: info, loading } = useAdmissionInfo();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Admission</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Join our community of learners and begin your journey toward academic excellence
          </p>
        </div>
      </div>

      <main>
        {/* Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
                  How to Apply
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
                  Admission Process
                </h2>
                {loading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed mb-8">{info?.content}</p>
                )}

                {/* Process Steps */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 text-lg">Admission Process</h3>
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex gap-3 animate-pulse">
                          <div className="h-8 w-8 bg-slate-200 rounded-full shrink-0" />
                          <div className="h-4 bg-slate-200 rounded w-full" />
                        </div>
                      ))
                    : info?.process.map((step, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-semibold text-sm shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-slate-600 pt-1">{step}</p>
                        </div>
                      ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-amber-500" />
                  Requirements
                </h3>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-2 mb-2 animate-pulse">
                        <div className="h-4 w-4 bg-slate-200 rounded" />
                        <div className="h-4 bg-slate-200 rounded w-full" />
                      </div>
                    ))
                  : info?.requirements.map((req, i) => (
                      <div key={i} className="flex gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{req}</span>
                      </div>
                    ))}

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3">Contact Admissions</h4>
                  <div className="space-y-2 text-sm">
                    <a href="tel:01-4970590" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">
                      <Phone className="h-4 w-4" /> 01-4970590
                    </a>
                    <a href="mailto:info@samriddhischool.edu.np" className="flex items-center gap-2 text-slate-600 hover:text-amber-600">
                      <Mail className="h-4 w-4" /> info@samriddhischool.edu.np
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Programs Available for Admission
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, title: "Pre-School", desc: "Ages 3-5", link: "/programs/pre-school" },
                { icon: GraduationCap, title: "Primary School", desc: "Grades 1-5", link: "/programs/primary-school" },
                { icon: BookOpen, title: "Secondary School", desc: "Grades 6-10", link: "/programs/secondary-school" },
                { icon: FileText, title: "Plus-2 Management", desc: "Grades 11-12", link: "/programs/plus2-management" },
              ].map((prog) => (
                <Link
                  key={prog.title}
                  to={prog.link}
                  className="bg-white rounded-xl p-6 border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all group"
                >
                  <prog.icon className="h-8 w-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-slate-900">{prog.title}</h3>
                  <p className="text-sm text-slate-500">{prog.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Apply?
            </h2>
            <p className="text-slate-600 mb-8">
              Take the first step towards quality education for your child.
              Visit our campus or contact our admissions office today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                <Link to="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Admissions
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
