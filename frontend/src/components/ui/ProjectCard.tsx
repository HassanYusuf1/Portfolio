import { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;
  
  return (
    <div 
      className="project-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay,
        transform: `perspective(1000px) rotateY(0deg) rotateX(0deg)`,
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
    >
      {/* Project Image with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-secondary-600/80 opacity-70 z-10"></div>
        
        {/* Image placeholder with color gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-200 to-secondary-100 transform group-hover:scale-110 transition-transform duration-700"></div>
        
        {/* Project title overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <span className="font-bold text-white text-lg tracking-wide">{project.title}</span>
        </div>
        
        {/* Hover effect buttons */}
        <div className={`absolute inset-0 flex items-center justify-center gap-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black/80 hover:bg-black text-white rounded-full transform hover:scale-105 transition-all duration-300"
          >
            GitHub
          </a>
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-secondary-500/90 hover:bg-secondary-500 text-white rounded-full transform hover:scale-105 transition-all duration-300"
          >
            Live Demo
          </a>
        </div>
      </div>
      
      {/* Project Info */}
      <div className="p-6 relative bg-white dark:bg-neutral-800">
        {/* Animated color bar top */}
        <div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"
          style={{
            width: isHovered ? '100%' : '0%',
            transition: 'width 0.4s ease-in-out',
          }}
        ></div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{project.title}</h3>
        
        <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="badge transform group-hover:translate-y-[-2px] transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-700 dark:hover:text-primary-300 font-medium inline-flex items-center text-sm group"
          >
            <span>GitHub</span>
            <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium inline-flex items-center text-sm group"
          >
            <span>Live Demo</span>
            <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}