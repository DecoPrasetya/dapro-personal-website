export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 text-center text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} • Dibangun dengan Next.js & Framer Motion</p>
      </div>
    </footer>
  );
}