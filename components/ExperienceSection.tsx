"use client";
import { motion } from "framer-motion";
import { personalData } from "@/lib/personalData";

export default function ExperienceSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white"
        >
          Experience & Entrepreneurship
        </motion.h2>

        {personalData.experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className="mb-16 glass p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {exp.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{exp.subtitle}</p>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{exp.description}</p>
            {exp.pillars && (
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {exp.pillars.map((pillar, j) => (
                  <div
                    key={j}
                    className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                  >
                    <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
                      {pillar.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {exp.role && (
              <p className="mt-4 text-blue-600 dark:text-blue-300 text-sm italic">
                🧭 {exp.role}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}