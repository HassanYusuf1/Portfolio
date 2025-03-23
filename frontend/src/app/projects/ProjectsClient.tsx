// src/app/projects/ProjectsClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Github, Globe } from 'lucide-react';
import portfolioService, { Project } from '@/services/portfolioService';
import { isValidEmail } from '@/utils/helpers';

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getProjects();
        // Sort projects by created date (newest first)
        const sortedProjects = data.sort((a, b) => {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        });
        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects when filter changes
  useEffect(() => {
    if (filter) {
      const filtered = projects.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [filter, projects]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Get all unique technologies across projects
  const allTechnologies = [...new Set(
    projects.flatMap(project => project.technologies)
  )].sort();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            A collection of backend and full-stack projects I've worked on
          </p>
        </motion.div>

        {/* Filter section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Filter by technology..."
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                value={filter}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTechnologies.slice(0, 5).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(filter === tech ? '' : tech)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    filter === tech
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                  }`}
                >
                  {tech}
                </button>
              ))}
              {allTechnologies.length > 5 && (
                <button
                  className="px-3 py-1 text-sm rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  +{allTechnologies.length - 5} more
                </button>
              )}
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing {filteredProjects.length} of {projects.length} projects
            {filter && ` filtered by "${filter}"`}
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 bg-neutral-200 dark:bg-neutral-700 relative">
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
                
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline"
                    >
                      View details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                    
                    <div className="flex space-x-2">
                      {project.gitHubUrl && (
                        
                          href={project.gitHubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label="GitHub Repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label="Live Demo"
                        >
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              No projects found with the technology "{filter}".
            </p>
            <button
              onClick={() => setFilter('')}
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}