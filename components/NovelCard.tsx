"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Novel } from "@/types";
import { BookOpen, BookMarked, CheckCircle, Clock } from "lucide-react";

interface Props {
  novel: Novel;
  index: number;
}

export default function NovelCard({ novel, index }: Props) {
  const date = novel.createdAt
    ? new Date(novel.createdAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/novel/${novel.slug}`}>
        <div className="glass p-6 rounded-3xl transition-all duration-300 group-hover:bg-white/50 dark:group-hover:bg-white/10 group-hover:shadow-xl group-hover:shadow-blue-500/5 h-full flex flex-col">
          <div className="flex gap-4 mb-4">
            {novel.coverImage ? (
              <div className="w-24 h-36 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                <img
                  src={novel.coverImage}
                  alt={novel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-24 h-36 rounded-xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 flex-shrink-0">
                <BookOpen className="w-8 h-8" />
              </div>
            )}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {novel.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">oleh {novel.author}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {novel.isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Tamat
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> Ongoing
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                  <BookMarked className="w-3 h-3" /> {novel.totalChapter} Bab
                </span>
              </div>
            </div>
          </div>
          
          <div 
            className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mt-2"
            dangerouslySetInnerHTML={{ __html: novel.synopsis.replace(/&nbsp;/g, ' ') }}
          />
        </div>
      </Link>
    </motion.article>
  );
}
