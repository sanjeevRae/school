import { Link } from "react-router";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useBlogPosts } from "@/hooks/useSchoolData";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function NewsEvents() {
  const { data: posts, loading } = useBlogPosts();
  const activePosts = [...posts]
    .filter((p) => p.isActive)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="bg-slate-800 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">News & Events</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Stay updated with the latest happenings, articles, and events at our school
          </p>
        </div>
      </div>

      <main className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
                  <div className="h-48 bg-slate-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/news/${post.slug}`}
                  className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md border border-slate-100 transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-medium text-amber-600 mt-3">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
