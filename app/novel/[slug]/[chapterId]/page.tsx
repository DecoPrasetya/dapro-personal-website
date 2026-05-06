import { getNovelBySlug, getNovelChapterById, getNovelChapters } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

export const revalidate = 60;

export default async function ChapterReadingPage({
  params,
}: {
  params: Promise<{ slug: string; chapterId: string }>;
}) {
  const { slug, chapterId } = await params;
  
  let novel = null;
  let chapter = null;
  let allChapters = [];

  try {
    novel = await getNovelBySlug(slug);
    if (novel && novel.id) {
        // Fetch current chapter
        const chapterRes = await getNovelChapterById(novel.id, chapterId);
        chapter = chapterRes?.data || chapterRes;
        
        // Fetch all chapters to determine Next/Prev
        const chaptersRes = await getNovelChapters(novel.id, 1, 200);
        allChapters = chaptersRes?.novelChapters || chaptersRes?.data || chaptersRes || [];
    }
  } catch (error) {
    console.error(error);
  }

  if (!novel || !chapter) {
    notFound();
  }

  // Find Next and Prev chapters
  const currentIndex = allChapters.findIndex((c: any) => c.id === chapter.id);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 && currentIndex !== -1 ? allChapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#0f0f11] text-[#333333] dark:text-[#d1d5db] font-serif transition-colors duration-300">
      
      {/* Top Reading Navbar */}
      <header className="sticky top-0 z-40 bg-[#fdfbf7]/90 dark:bg-[#0f0f11]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between font-sans">
          <Link 
            href={`/novel/${novel.slug}`}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Daftar Bab</span>
          </Link>
          
          <div className="text-center flex-1 px-4 truncate">
            <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{novel.title}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{chapter.title}</p>
          </div>
          
          <Link 
            href={`/novel/${novel.slug}`}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            title="Daftar Bab"
          >
            <Menu className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Reading Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
        </div>
        
        <article 
          className="prose prose-lg dark:prose-invert max-w-none 
                     prose-p:leading-loose prose-p:mb-6 prose-p:text-lg md:prose-p:text-xl
                     text-[#2c2c2c] dark:text-[#c4c4c4]
                     [&_*]:whitespace-pre-wrap overflow-x-hidden"
          dangerouslySetInnerHTML={{ __html: chapter.content.replace(/&nbsp;/g, ' ') }}
        />
      </main>

      {/* Bottom Navigation */}
      <footer className="max-w-3xl mx-auto px-6 py-12 border-t border-gray-200 dark:border-gray-800 font-sans">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevChapter ? (
            <Link 
              href={`/novel/${novel.slug}/${prevChapter.id}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Bab Sebelumnya</span>
            </Link>
          ) : (
            <div className="w-full sm:w-auto px-6 py-3 rounded-xl text-gray-400 dark:text-gray-600 text-center cursor-not-allowed">
              Bab Pertama
            </div>
          )}

          <Link 
            href={`/novel/${novel.slug}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Daftar Bab
          </Link>

          {nextChapter ? (
            <Link 
              href={`/novel/${novel.slug}/${nextChapter.id}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg shadow-blue-500/20"
            >
              <span>Bab Selanjutnya</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div className="w-full sm:w-auto px-6 py-3 rounded-xl text-gray-400 dark:text-gray-600 text-center cursor-not-allowed">
              Bab Terakhir
            </div>
          )}
        </div>
      </footer>

    </div>
  );
}
