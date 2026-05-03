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