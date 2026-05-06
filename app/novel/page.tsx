import { getNovels } from "@/lib/api";
import NovelCard from "@/components/NovelCard";
import SectionHeading from "@/components/SectionHeading";
import ErrorMessage from "@/components/ErrorMessage";
import { BookOpen } from "lucide-react";

export const revalidate = 60;

export default async function NovelPage() {
  let novels = [];
  try {
    const data = await getNovels(1, 20);
    // Because backend returns result directly or inside data, handle appropriately
    novels = data?.data || data || [];
    // If backend uses Pagination response:
    if (data?.novels) {
        novels = data.novels;
    }
  } catch (e) {
    console.error(e);
  }

  // Handle case where it might be wrapped differently depending on how the backend returns
  if (!Array.isArray(novels) && novels.novel) {
      novels = novels.novel;
  }

  return (
    <section className="pt-36 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 justify-center mb-4">
          <BookOpen className="w-8 h-8 text-blue-500" />
        </div>
        <SectionHeading title="Ruang Baca" subtitle="Kumpulan cerita fiksi dan novel menarik" />
        
        {Array.isArray(novels) && novels.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {novels.map((novel: any, i: number) => (
              <NovelCard key={novel.id} novel={novel} index={i} />
            ))}
          </div>
        ) : (
          <ErrorMessage message="Belum ada novel yang tersedia." />
        )}
      </div>
    </section>
  );
}
