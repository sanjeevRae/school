import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { GraduationCap, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-slate-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Begin Your Child's Journey to Excellence
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Join Samriddhi School and give your child the gift of quality education,
            character development, and a bright future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
            >
              <Link to="/admission">
                <GraduationCap className="h-5 w-5 mr-2" />
                Apply for Admission
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-grey hover:bg-white hover:text-slate-900"
            >
              <Link to="/contact">
                <Phone className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
