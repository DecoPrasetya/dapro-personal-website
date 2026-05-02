export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 py-10 px-6 text-center text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} decoprasetya.id All rights reserved.</p>
      </div>
    </footer>
  );
}