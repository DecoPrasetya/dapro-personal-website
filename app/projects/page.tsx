import { getProjects } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import ErrorMessage from "@/components/ErrorMessage";

export const revalidate = 60;

export default async function ProjectsPage() {
  let projects = [];
  try {
    const data = await getProjects(1, 20);
    projects = data?.projects || [];
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="pt-36 pb-32 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="All Projects" subtitle="Jelajahi semua karya dan eksperimen saya" />
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any, i: number) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <ErrorMessage message="Tidak ada project yang ditemukan." />
        )}
      </div>
    </section>
  );
}