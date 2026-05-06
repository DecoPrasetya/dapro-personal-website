"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicSettings } from "@/lib/api";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [siteTitle, setSiteTitle] = useState("Deco Prasetya");

  useEffect(() => {
    getPublicSettings()
      .then((s) => setSiteTitle(s.site_title || "Deco Prasetya"))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/journey", label: "Journey" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/novel", label: "Novel" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          <span className="text-gradient">{siteTitle}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-900 dark:hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
          <div className="ml-2 border-l border-gray-300 dark:border-gray-700 pl-6">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="text-gray-900 dark:text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6 text-lg font-medium">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}