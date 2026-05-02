"use client";
import { motion } from "framer-motion";
import { personalData } from "@/lib/personalData";

export default function AboutSection() {
  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          Tentang Saya
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg mb-16"
        >
          {personalData.nickname} – {personalData.birthPlace},{" "}
          {personalData.birthDate}
        </motion.p>

        {/* Pendidikan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-violet-400 mb-6">
            🎓 Pendidikan
          </h3>
          <ul className="space-y-3">
            {personalData.education.map((school, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-500/20 text-violet-400 text-sm">
                  {i + 1}
                </span>
                {school}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Pengalaman */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-indigo-400 mb-8">
            💼 Pengalaman
          </h3>
          <div className="space-y-6">
            {personalData.experience.map((exp:any, i:any) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="glass p-6 rounded-2xl"
              >
                <h4 className="text-lg font-semibold text-white mb-4">
                  {exp.period}
                </h4>
                <ul className="space-y-2">
                  {exp.items.map((item:any, j:any) => (
                    <li
                      key={j}
                      className="text-gray-300 flex items-start gap-3"
                    >
                      <span className="text-indigo-400 mt-1">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}