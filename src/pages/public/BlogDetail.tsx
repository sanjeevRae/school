import { useParams, Link } from "react-router";
import Navigation from "@/components/public/Navigation";
import Footer from "@/components/public/Footer";
import { useBlogPosts } from "@/hooks/useSchoolData";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: posts, loading } = useBlogPosts();
  const post = posts.find((p) => p.slug === slug && p.isActive);
  const relatedPosts = posts.filter((p) => p.slug !== slug && p.isActive).slice(0, 3);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <Button asChild>
            <Link to="/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
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
      <div className="relative h-64 md:h-80">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <Link to="/news" className="inline-flex items-center text-white/80 hover:text-white mb-3 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to News
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{post.title}</h1>
          </div>
        </div>
      </div>

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/news/${rp.slug}`}
                    className="group rounded-lg overflow-hidden border border-slate-100 hover:shadow-md transition-all"
                  >
                    <img src={rp.image} alt={rp.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="font-medium text-slate-900 text-sm group-hover:text-amber-600 line-clamp-2">
                        {rp.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
