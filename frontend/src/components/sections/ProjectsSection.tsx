"use client";

import { useEffect, useState, useRef } from 'react';
import { Project } from '@/types';
import { getProjects } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        // Fallback to dummy projects for development if API unavailable
        setProjects([
          {
            id: 1,
            title: "Portfolio Website",
            description: "Min personlige portefølje bygget med Next.js og ASP.NET Core",
            imageUrl: "/images/projects/portfolio.jpg",
            technologies: ["Next.js", "ASP.NET Core", "TypeScript", "Tailwind CSS"],
            githubUrl: "https://github.com/hassanyusuf1/portfolio",
            liveUrl: "https://hassanyusuf.com",
            featured: true
          },
          {
            id: 2,
            title: "E-commerce Platform",
            description: "Fullstack e-handel plattform med produktadministrasjon og brukerautentisering",
            imageUrl: "/images/projects/ecommerce.jpg",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            githubUrl: "https://github.com/hassanyusuf1/ecommerce",
            liveUrl: "https://demo.hassanyusuf.com",
            featured: true
          },
          {
            id: 3,
            title: "Fitness Tracking App",
            description: "Mobilapp for sporing av treninger og ernæring med detaljert analytikk",
            imageUrl: "/images/projects/fitness.jpg",
            technologies: ["React Native", "Firebase", "Redux", "Express"],
            githubUrl: "https://github.com/hassanyusuf1/fitness-app",
            liveUrl: "https://fitness.hassanyusuf.com",
            featured: false
          }
        ]);
        setError("Kunne ikke koble til API. Viser demodata.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-neutral-800 relative overflow-hidden"
    >
      {/* Decorative background patterns */}
      <div className="absolute inset-0 bg-dots-pattern bg-dots-md opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            Mine Prosjekter
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Her er et utvalg av mine nyeste prosjekter. Hvert prosjekt er bygget med fokus på ytelse, 
            tilgjengelighet og brukeropplevelse.
          </p>
        </div>
        
        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-200">{error}</p>
              </div>
            </div>
          </div>
        ) : null}
        
        {/* Projects grid */}
        {projects.length > 0 && (
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="group bg-white dark:bg-neutral-700 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                      <h3 className="text-lg font-medium text-neutral-700 dark:text-white">{project.title}</h3>
                    </div>
                  )}
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Utvalgt
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-white">{project.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="inline-block bg-primary-100 dark:bg-primary-800/30 text-primary-800 dark:text-primary-200 text-xs font-medium px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Kode
                      </a>
                    )}
                    
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center transition-colors duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* No projects found */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-300 dark:text-neutral-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">Ingen prosjekter funnet</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">Prosjekter vil bli lagt til snart.</p>
          </div>
        )}
        
        {/* CTA at bottom */}
        <div className={`text-center mt-12 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Interessert i å samarbeide på et prosjekt eller ønsker du å se mer av mitt arbeid?
          </p>
          <Link 
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            La oss snakke sammen
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}