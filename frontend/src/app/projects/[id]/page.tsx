// src/app/projects/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Github, Globe } from 'lucide-react';
import portfolioService, { Project } from '@/services/portfolioService';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id);
        if (isNaN(id)) {
          throw new Error('Invalid project ID');
        }
        
        const projectData = await portfolioService.getProject(id);
        if (!projectData) {
          throw new Error('Project not found');
        }
        
        setProject(projectData);
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message || 'Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error || 'Project not found'}</p>
          <Link 
            href="/projects" 
            className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-8"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-64 md:h-80 bg-neutral-200 dark:bg-neutral-700 relative">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  No image available
                </div>
              )}
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg">{project.description}</p>
                
                {/* Additional project details could go here */}
                
                <div className="border-t border-neutral-200 dark:border-neutral-700 mt-8 pt-8">
                  <h2 className="text-xl font-semibold mb-4">Project Links</h2>
                  <div className="flex space-x-4">
                    {project.gitHubUrl && (
                      
                        href={project.gitHubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-md text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                      >
                        <Github size={18} className="mr-2" />
                        GitHub Repository
                      </a>
                    )}
                    
                    {project.liveDemoUrl && (
                      
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                      >
                        <Globe size={18} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}