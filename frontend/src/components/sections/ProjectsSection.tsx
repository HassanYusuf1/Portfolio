"use client"

import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import { Project } from '@/types';

export default function ProjectsSection() {
  // Sample project data - replace with your actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: "Responsive Portfolio Website",
      description: "Modern portfolio site built with Next.js and Tailwind CSS",
      image: "/projects/portfolio.jpg", // Replace with actual image
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/hassanyusuf1/portfolio",
      demoUrl: "https://hassanyusuf.com"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full stack e-commerce solution with payment processing",
      image: "/projects/ecommerce.jpg", // Replace with actual image
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/hassanyusuf1/ecommerce",
      demoUrl: "https://demo-shop.hassanyusuf.com"
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      description: "Mobile app for tracking workouts and nutrition",
      image: "/projects/fitness.jpg", // Replace with actual image
      technologies: ["React Native", "Firebase", "Redux"],
      githubUrl: "https://github.com/hassanyusuf1/fitness-app",
      demoUrl: "https://fitness.hassanyusuf.com"
    }
  ];

  return (
    <section id="projects" className="section bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slideIn">
          <h2 className="section-title">Mine Prosjekter</h2>
          <div className="section-divider"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Her er noen av mine nyeste prosjekter. Kombinerer kreativitet og teknisk kompetanse
            for å skape løsninger som utmerker seg.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card animate-fadeIn [animation-delay:200ms]">
      <div className="relative h-48 overflow-hidden">
        {/* Use placeholder if no image is available */}
        <div className="absolute inset-0 bg-primary-100 flex items-center justify-center">
          <span className="text-primary-500 font-bold">{project.title}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <Badge key={index} text={tech} />
          ))}
        </div>
        
        <div className="flex justify-between">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-700 font-medium inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
            GitHub
          </a>
          
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-700 font-medium inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}