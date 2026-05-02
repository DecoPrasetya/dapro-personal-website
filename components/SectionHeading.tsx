"use client";
import { motion } from "framer-motion";

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 mt-3 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}