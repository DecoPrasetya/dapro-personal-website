"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPublicSettings } from "@/lib/api";
import { personalData } from "@/lib/personalData";
import Link from "next/link";
import { FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

export default function Hero() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    getPublicSettings()
      .then(setSettings)
      .catch(console.error);
  }, []);

  const socialLinks = [
    { icon: FiGithub, href: settings.social_github },
    { icon: FiInstagram, href: settings.social_instagram },
    { icon: FiLinkedin, href: settings.social_linkedin },
    { icon: FiMail, href: `mailto:${settings.email}` },
  ].filter((l) => l.href);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent animate-gradient bg-[length:400%_400%]" />
      
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-3xl text-center relative z-10"
      >
        {settings.avatar_url && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-10 inline-block"
          >
            <img
              src={settings.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-white/20 shadow-xl dark:shadow-2xl mx-auto"
            />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-gradient">{personalData.hero.headline}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-10"
        >
          {personalData.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <Link
            href={personalData.hero.cta.href}
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
          >
            {personalData.hero.cta.label}
          </Link>
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              <social.icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}