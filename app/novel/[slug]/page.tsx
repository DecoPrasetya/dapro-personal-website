import { getNovelBySlug, getNovelChapters, getNovelTotalLikes, getNovelTotalChapters } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";
import { BookOpen, BookMarked, Clock, CheckCircle, Tag, ChevronRight, User } from "lucide-react";

export const revalidate = 60;

export default async function NovelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let novel = null;
  let chaptersResponse = null;
  let totalLikes = 0;
  let totalChapters = 0;

  try {
    novel = await getNovelBySlug(slug);
    if (novel && novel.id) {
        chaptersResponse = await getNovelChapters(novel.id, 1, 100);
        totalLikes = await getNovelTotalLikes(novel.id);
        totalChapters = await getNovelTotalChapters(novel.id);
    }
  } catch (error) {
    console.error(error);
  }

  if (!novel) {
    notFound();
  }

  let chapters: any[] = [];
  if (chaptersResponse && chaptersResponse.novelChapters) {
      chapters = chaptersResponse.novelChapters;
  } else if (Array.isArray(chaptersResponse)) {
      chapters = chaptersResponse;
  } else if (chaptersResponse && chaptersResponse.data) {
      chapters = chaptersResponse.data;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/novel" className="hover:text-blue-500 transition-colors">Novel</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-gray-300 truncate">{novel.title}</span>
        </nav>

        {/* Novel Info Header */}
        <div className="glass p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-8 mb-12">
          {novel.coverImage ? (
            <div className="w-full md:w-64 h-96 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
              <img
                src={novel.coverImage}
                alt={novel.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full md:w-64 h-96 rounded-2xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 flex-shrink-0 shadow-lg">
              <BookOpen className="w-16 h-16" />
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {novel.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{novel.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-blue-500" />
                <span>{totalChapters} Bab</span>
              </div>
            </div>

            {/* Like Button - Client Component */}
            <div className="mb-6">
              <LikeButton novelId={novel.id} initialLikes={totalLikes} />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {novel.isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4" /> Tamat
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" /> Ongoing
                  </span>
                )}
                
                {novel.tags && novel.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    <Tag className="w-3.5 h-3.5" /> {tag}
                  </span>
                ))}
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 [&_*]:whitespace-pre-wrap overflow-x-hidden"
                 dangerouslySetInnerHTML={{ __html: novel.synopsis.replace(/&nbsp;/g, ' ') }} />
                 
            {chapters.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      href={`/novel/${novel.slug}/${chapters[0].id}`}
                      className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Mulai Membaca
                    </Link>
                </div>
            )}
          </div>
        </div>

        {/* Chapters List */}
        <div className="glass p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <BookMarked className="w-6 h-6 text-blue-500" />
                Daftar Bab
            </h2>
            
            {chapters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapters.map((chapter: any, index: number) => (
                        <Link 
                            key={chapter.id} 
                            href={`/novel/${novel.slug}/${chapter.id}`}
                            className="flex items-center p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all group"
                        >
                            <div className="w-10 text-center font-mono text-gray-400 group-hover:text-blue-500 transition-colors">
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0 ml-2">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {chapter.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {new Date(chapter.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    Belum ada bab yang dirilis untuk novel ini.
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
