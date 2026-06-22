import { usePartners } from "@/hooks/useSchoolData";
import { Globe } from "lucide-react";

export default function PartnersSection() {
  const { data: partners, loading } = usePartners();
  const activePartners = partners.filter((p) => p.isActive);

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Collaborations
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Our Partners & Collaborators
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 w-40 bg-slate-100 rounded-lg animate-pulse" />
              ))
            : activePartners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all"
                  title={partner.name}
                >
                  <div className="h-16 w-40 flex items-center justify-center bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-12 max-w-32 object-contain"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Globe className="h-5 w-5" />
                        <span className="text-sm font-medium">{partner.name}</span>
                      </div>
                    )}
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}
