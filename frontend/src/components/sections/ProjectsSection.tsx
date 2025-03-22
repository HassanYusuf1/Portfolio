"use client"

import { useRef, useEffect, useState } from 'react';
import { Project } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Sample project data - you would replace this with API calls to your backend
  const projects: Project[] = [
    {
      id: 1,
      title: "Moderne Portefølje Nettside",
      description: "Moderne portefølje nettside bygget med Next.js, TypeScript og Tailwind CSS. Responsivt design for optimal visning på alle enheter.",
      image: "/projects/portfolio.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      githubUrl: "https://github.com/hassanyusuf1/portfolio",
      demoUrl: "https://hassanyusuf.com"
    },
    {
      id: 2,
      title: "E-handel Plattform",
      description: "Fullstack e-handelsløsning med betalingsbehandling, produktstyring og brukeradministrasjon. Optimalisert for konvertering og brukervennlighet.",
      image: "/projects/ecommerce.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      githubUrl: "https://github.com/hassanyusuf1/ecommerce",
      demoUrl: "https://demo-shop.hassanyusuf.com"
    },
    {
      id: 3,
      title: "Trenings App",
      description: "Mobil app for sporing av treningsøkter og ernæring. Inkluderer personlige mål, fremgangssporing og delingsalternativer.",
      image: "/projects/fitness.jpg",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      githubUrl: "https://github.com/hassanyusuf1/fitness-app",
      demoUrl: "https://fitness.hassanyusuf.com"
    },
    {
      id: 4,
      title: "Smart Hjem Kontrollpanel",
      description: "IoT-kontrollpanel for smarthjem-enheter med visualisering av energiforbruk og automatiseringsfunksjoner.",
      image: "/projects/smarthome.jpg",
      technologies: ["Vue.js", "D3.js", "Node.js", "MQTT", "WebSockets"],
      githubUrl: "https://github.com/hassanyusuf1/smart-home",
      demoUrl: "https://smarthome.hassanyusuf.com"
    },
    {
      id: 5,
      title: "AI Bildebehandling",
      description: "Nettapplikasjon som bruker maskinlæring til å forbedre og manipulere bilder i sanntid. Implementerer flere AI-modeller.",
      image: "/projects/ai-image.jpg",
      technologies: ["TensorFlow.js", "React", "WebGL", "Python", "FastAPI"],
      githubUrl: "https://github.com/hassanyusuf1/ai-image",
      demoUrl: "https://ai-image.hassanyusuf.com"
    },
    {
      id: 6,
      title: "Sosial Medie Dashboard",
      description: "Analyseverktøy for sosiale medier som samler data fra flere plattformer og gir innsiktsfulle visualiseringer og rapporter.",
      image: "/projects/social-dashboard.jpg",
      technologies: ["Angular", "Chart.js", "Node.js", "PostgreSQL", "Redis"],
      githubUrl: "https://github.com/hassanyusuf1/social-dashboard",
      demoUrl: "https://social-metrics.hassanyusuf.com"
    }
  ];
  
  // Intersection Observer to trigger animations when section is in view
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
      className="section bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern bg-dots-lg opacity-[0.03] dark:opacity-[0.05]"></div>
      
      {/* Optional floating elements for visual interest */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-800 dark:text-white mb-4">
            Mine Prosjekter
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Her er noen av mine nyeste prosjekter. Jeg kombinerer kreativitet og teknisk kompetanse
            for å skape løsninger som utmerker seg i både funksjonalitet og design.
          </p>
        </div>
        
        {/* Filter buttons - optional enhancement */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '200ms' }}
        >
          {['Alle', 'Web', 'Mobil', 'UI/UX', 'Backend'].map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${index === 0 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-neutral-700'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Projects grid with staggered animation */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`transform transition duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        
        {/* Show more button - optional enhancement */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 rounded-full shadow-soft hover:shadow-md transition-all duration-300 group">
            <span>Se flere prosjekter</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}