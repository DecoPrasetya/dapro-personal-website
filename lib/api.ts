import { BlogPost, Project } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    next: { revalidate: 60 }, // ISR setiap 1 menit
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil data: ${res.statusText}`);
  }

  return res.json();
}

// ---------- SETTINGS ----------
export async function getPublicSettings(): Promise<Record<string, string>> {
  const { data } = await fetchAPI<{ success: boolean; data: Record<string, string> }>("/setting/public");
  return data;
}

export async function getSettingValue(key: string): Promise<string> {
  const settings = await getPublicSettings();
  return settings[key] || "";
}

// ---------- BLOG ----------
export async function getBlogPosts(page = 1, limit = 10) {
  const { data } = await fetchAPI<{ success: boolean; data: any }>(
    `/blog?page=${page}&limit=${limit}`
  );
  return data;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const { data } = await fetchAPI<{ success: boolean; data: BlogPost }>(
    `/blog/slug/${slug}`
  );
  return data;
}

// ---------- PROJECTS ----------
export async function getProjects(page = 1, limit = 9, featured = false) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (featured) params.append("featured", "true");
  const { data } = await fetchAPI<{ success: boolean; data: any }>(
    `/project-portofolio?${params.toString()}`
  );
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const { data } = await fetchAPI<{ success: boolean; data: Project }>(
    `/project-portofolio/slug/${slug}`
  );
  return data;
}

// ---------- NOVEL ----------
export async function getNovels(page = 1, limit = 9, query = "") {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (query) params.append("query", query);
  
  const { data } = await fetchAPI<{ success: boolean; data: any }>(
    `/novel?${params.toString()}`
  );
  return data;
}

export async function getNovelBySlug(slug: string): Promise<any> {
  const { data } = await fetchAPI<{ success: boolean; data: any }>(
    `/novel/${slug}`
  );
  return data;
}

export async function getNovelChapters(novelId: string, page = 1, limit = 50) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  const { data } = await fetchAPI<{ success: boolean; data: any }>(
    `/novel/${novelId}/chapters?${params.toString()}`
  );
  return data;
}

export async function getNovelTotalChapters(novelId: string): Promise<number> {
  const { data } = await fetchAPI<{ success: boolean; data: number }>(
    `/novel/${novelId}/chapters/total`
  );
  return data;
}

export async function getNovelChapterById(novelId: string, chapterId: string): Promise<any> {
  const { data } = await fetchAPI<{ success: boolean; data: any }>(
    `/novel/${novelId}/chapters/${chapterId}`
  );
  return data;
}

// ---------- NOVEL LIKES ----------
export async function getNovelTotalLikes(novelId: string): Promise<number> {
  const { data } = await fetchAPI<{ success: boolean; data: number }>(
    `/novel/${novelId}/likes/total`
  );
  return data;
}

export async function likeNovel(novelId: string, identifier: string): Promise<void> {
  const res = await fetch(`${API_BASE}/novel/${novelId}/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  });
  if (!res.ok) throw new Error("Gagal menyukai novel");
}

export async function unlikeNovel(novelId: string, identifier: string): Promise<void> {
  const res = await fetch(`${API_BASE}/novel/${novelId}/likes/${identifier}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal membatalkan suka");
}