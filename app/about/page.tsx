import { getPublicSettings } from "@/lib/api";
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const metadata = {
  title: "About | Deco Prasetya",
  description: "About Deco Prasetya",
};

export const revalidate = 60;

export default async function AboutPage() {
  let settings: Record<string, string> = {};
  
  try {
    settings = await getPublicSettings();
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white">
          About Me
        </h1>
        
        <div className="flex flex-col md:flex-row gap-12 items-start glass p-8 rounded-3xl mb-16">
          {settings.avatar_url && (
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10">
                <img
                  src={settings.avatar_url}
                  alt={settings.site_title || "Avatar"}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}

          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                {settings.site_title || "Deco Prasetya"}
              </h2>
              {settings.site_description && (
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {settings.site_description}
                </p>
              )}
            </div>

            {settings.bio && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                  {settings.bio}
                </p>
              </div>
            )}

            <div className="pt-8 border-t border-gray-200 dark:border-white/10">
              <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Let's Connect</h3>
              <div className="flex gap-4">
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Email"
                  >
                    <FaEnvelope className="text-xl" />
                  </a>
                )}
                {settings.social_github && (
                  <a
                    href={settings.social_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                )}
                {settings.social_linkedin && (
                  <a
                    href={settings.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                )}
                {settings.social_instagram && (
                  <a
                    href={settings.social_instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
