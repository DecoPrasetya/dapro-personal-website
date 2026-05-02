"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: Props) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
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
      <Link href={`/blog/${post.slug}`}>
        <div className="glass p-6 rounded-3xl transition-all duration-300 group-hover:bg-white/50 dark:group-hover:bg-white/10 group-hover:shadow-xl group-hover:shadow-blue-500/5">
          {post.contentImage && (
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-gray-800">
              <img
                src={post.contentImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <time className="text-gray-500 dark:text-gray-400 text-sm">{date}</time>
          <h3 className="text-xl font-semibold mt-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  );
}