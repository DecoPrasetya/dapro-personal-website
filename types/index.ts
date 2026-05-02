export interface Setting {
  site_title: string;
  site_description: string;
  bio: string;
  social_instagram: string;
  social_github: string;
  social_linkedin: string;
  email: string;
  avatar_url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentImage: string | null;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  post?: BlogPost[];      // blog service uses "post"
  posts?: BlogPost[];     // fallback
  projects?: Project[];
  pagination: Pagination;
}