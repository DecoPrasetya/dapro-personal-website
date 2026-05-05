import { getBlogPosts } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import ErrorMessage from "@/components/ErrorMessage";

export const revalidate = 60;

export default async function BlogPage() {
  let posts = [];
  try {
    const data = await getBlogPosts(1, 20);
    posts = data?.post || [];
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="pt-36 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Blog" subtitle="Cerita, tutorial, dan opini seputar lingkungan" />
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any, i: number) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <ErrorMessage message="Belum ada artikel." />
        )}
      </div>
    </section>
  );
}