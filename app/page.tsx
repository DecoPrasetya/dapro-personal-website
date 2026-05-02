import Hero from "@/components/Hero";
import { getProjects, getBlogPosts } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import AboutSection from "@/components/AboutSection"; // <-- import
import ErrorMessage from "@/components/ErrorMessage";

export const revalidate = 60;

export default async function HomePage() {
  let featuredProjects = [];
  let latestPosts = [];

  try {
    const projectsData = await getProjects(1, 3, true);
    featuredProjects = projectsData?.projects || [];
  } catch (e) {
    console.error(e);
  }

  try {
    const postsData = await getBlogPosts(1, 3);
    latestPosts = postsData?.post || [];
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <Hero />
    </>
  );
}