// Layout khusus halaman baca novel - tanpa Navbar & Footer global
export default function ChapterReadingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        #main-navbar { display: none !important; }
        #main-footer { display: none !important; }
        main { padding-top: 0 !important; margin-top: 0 !important; }
      `}</style>
      {children}
    </>
  );
}
