"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card group h-full transition-all duration-500 hover:transform hover:translate-y-[-8px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-48">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
            <h3 className="text-lg font-medium">{project.title}</h3>
          </div>
        )}
      </div>
      
      <div className="card-body flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-white">{project.title}</h3>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="badge">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <FiGithub size={20} />
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}