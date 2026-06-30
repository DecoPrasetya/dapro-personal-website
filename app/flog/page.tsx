import { getFlogs } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";
import ErrorMessage from "@/components/ErrorMessage";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

export const revalidate = 60;

export default async function FlogPage() {
  let flogs = [];
  try {
    const data = await getFlogs(1, 20);
    flogs = data?.flogs || [];
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="pt-36 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Video Blog" subtitle="Berbagai cerita dan momen dalam format video" />
        {flogs.length > 0 ? (
          <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {flogs.map((flog: any) => (
              <div key={flog.id} className="flex flex-col md:flex-row bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300">
                <div className="w-full md:w-72 shrink-0 aspect-[9/16] relative bg-black">
                  <video 
                    src={flog.link} 
                    controls 
                    className="absolute inset-0 w-full h-full object-contain"
                    preload="metadata"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {formatDistanceToNow(new Date(flog.createdAt), {
                      addSuffix: true,
                      locale: localeId,
                    })}
                  </p>
                  <p className="text-gray-900 dark:text-white text-lg font-medium whitespace-pre-wrap leading-relaxed">
                    {flog.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ErrorMessage message="Belum ada video blog." />
        )}
      </div>
    </section>
  );
}
