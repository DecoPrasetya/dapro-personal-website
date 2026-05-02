"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="glass overflow-hidden rounded-3xl transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-2xl group-hover:shadow-violet-500/10">
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden relative">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg">
                Preview
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-6">
              <h3 className="text-white font-semibold text-xl">{project.title}</h3>
              <FiArrowUpRight className="text-white/70 text-2xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-400 line-clamp-2">{project.description}</p>
            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.slice(0, 4).map((tech: any) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}