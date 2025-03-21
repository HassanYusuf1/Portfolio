// In ProjectsSection.tsx
import Image from 'next/image';
import ProjectCard from '../ui/ProjectCard';

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Birthday App",
      description: "Android app for tracking birthdays with SMS notifications.",
      image: "/images/projects/birthday-app.jpg",
      technologies: ["Java", "Android", "Room Database"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      id: 2,
      title: "Nest Platform",
      description: "Social platform with image sharing and commenting features.",
      image: "/images/projects/nest-platform.jpg",
      technologies: ["C#", "ASP.NET Core", "React"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Personal portfolio built with modern technologies.",
      image: "/images/projects/portfolio.jpg",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      githubUrl: "#",
      demoUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 slide-in">
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recent work showcasing my technical skills and creativity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
} 