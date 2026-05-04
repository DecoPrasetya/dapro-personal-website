import { getProjectBySlug, getProjects } from "@/lib/api";
import { notFound } from "next/navigation";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import ErrorMessage from "@/components/ErrorMessage";

export async function generateStaticParams() {
  try {
    const data = await getProjects(1, 100);
    return (data.projects || []).map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch (e) {
    return <ErrorMessage message="Project tidak dapat dimuat." />;
  }

  if (!project) return notFound();

  return (
    <article className="pt-36 pb-32 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{project.description}</p>
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-800 dark:text-gray-200">
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              <FiGithub /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </div>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full rounded-3xl mb-12 border border-gray-200 dark:border-white/5"
        />
      )}

      <div
        className="prose dark:prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: project.content?.replace(/&nbsp;/g, ' ') }}
      />
    </article>
  );
}