// Layout khusus untuk semua halaman novel (list, detail, baca)
// Navbar dan Footer dari root layout masih muncul di sini
// tapi halaman chapter reading menggunakan nested layout sendiri
export default function NovelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
