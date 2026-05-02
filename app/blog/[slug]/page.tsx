import { getBlogPostBySlug, getBlogPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";

export async function generateStaticParams() {
  try {
    const data = await getBlogPosts(1, 100);
    return (data.post || []).map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    return <ErrorMessage message="Artikel tidak dapat dimuat." />;
  }

  if (!post) return notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="pt-36 pb-32 px-6 max-w-3xl mx-auto min-h-screen">
      <time className="text-gray-500 text-sm">{date}</time>
      <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">{post.title}</h1>
      {post.excerpt && (
        <p className="text-xl text-gray-400 mb-10">{post.excerpt}</p>
      )}
      {post.contentImage && (
        <img
          src={post.contentImage}
          alt={post.title}
          className="w-full rounded-3xl mb-10 border border-white/5"
        />
      )}
      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}