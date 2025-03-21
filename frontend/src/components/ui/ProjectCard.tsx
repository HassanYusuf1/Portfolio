"use client"

// In ProjectCard.tsx
import Image from 'next/image';
import { useState } from 'react';
import Badge from './Badge';

// Definer prosjekt-interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 slide-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>
      
      {/* Project Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <Badge key={i} text={tech} />
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <a 
            href={project.githubUrl} 
            className="px-4 py-2 border border-primary-500 text-primary-500 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
          >
            Vis
          </a>
          <a 
            href={project.demoUrl} 
            className="px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}