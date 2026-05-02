"use client";
import { motion } from "framer-motion";
import { personalData } from "@/lib/personalData";

export default function JourneyTimeline() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white"
        >
          The Journey
        </motion.h2>

        <div className="relative border-l border-gray-200 dark:border-white/10 pl-8 space-y-16">
          {personalData.journey.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <span className="absolute -left-[41px] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm text-white shadow-lg shadow-blue-600/30">
                {i + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{step.label}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{step.period}</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}