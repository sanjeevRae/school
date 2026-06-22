import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useSettings, useTeamMembers } from "@/hooks/useSchoolData";
import { Award, BookOpen, Users, Target, Clock, Shield } from "lucide-react";

const highlights = [
  { icon: BookOpen, title: "STEAM Curriculum", desc: "Integrated approach to Science, Technology, Engineering, Arts & Mathematics" },
  { icon: Users, title: "Small Class Sizes", desc: "Personalized attention with optimal student-teacher ratios" },
  { icon: Target, title: "Holistic Development", desc: "Focus on academic, physical, emotional, and social growth" },
  { icon: Award, title: "Quality Faculty", desc: "Experienced and passionate educators" },
  { icon: Shield, title: "Safe Environment", desc: "Secure campus with modern facilities" },
  { icon: Clock, title: "15+ Years", desc: "Established track record of excellence" },
];

export default function About() {
  const { data: settings } = useSettings();
  const { data: team } = useTeamMembers();
  const activeTeam = team.filter((m) => m.isActive);
  const schoolName = settings?.schoolName || "Samriddhi School";
  const aboutText = settings?.aboutText || "Loading...";
  const visionText = settings?.visionText || "We envision a dynamic and inspiring educational institution where every learner can thrive.";
  const missionText = settings?.missionText || "We nurture lifelong learners with strong values, academic confidence, and practical skills.";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Page Header */}
      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discover the story, vision, and people behind {schoolName}
          </p>
        </div>
      </div>

      <main>
        {/* Introduction */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/images/hero1.jpg"
                  alt="School Campus"
                  className="rounded-2xl shadow-lg w-full h-80 md:h-96 object-cover"
                />
              </div>
              <div>
                <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
                  {schoolName}
                </h2>
                <div className="prose prose-slate text-slate-600 leading-relaxed whitespace-pre-line">
                  {aboutText}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                What Sets Us Apart
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition-all"
                >
                  <div className="p-3 rounded-lg bg-amber-50 inline-flex mb-4">
                    <h.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{h.title}</h3>
                  <p className="text-sm text-slate-500">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">{visionText}</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">{missionText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
                Leadership
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mt-2">Our Team</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeTeam.map((member) => (
                <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-amber-600 mb-2">{member.role}</p>
                    <p className="text-xs text-slate-500">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
