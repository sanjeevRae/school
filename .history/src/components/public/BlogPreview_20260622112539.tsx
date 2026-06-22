import { Link } from "react-router";
import { useBlogPosts } from "@/hooks/useSchoolData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

export default function BlogPreview() {
  const { data: posts, loading } = useBlogPosts();
  const activePosts = [...posts]
    .filter((p) => p.isActive)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              News & Articles
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="mt-4 md:mt-0 border-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Link to="/news">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-white shadow-sm animate-pulse">
                  <div className="h-48 bg-slate-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-3 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-2/3 bg-slate-200 rounded" />
                  </div>
                </div>
              ))
            : activePosts.map((post) => (
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
                    <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
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
      </div>
    </section>
  );
}
