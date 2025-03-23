// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Shared/Button';
import portfolioService, { Project } from '@/services/portfolioService';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await portfolioService.getProjects();
        // Sort by date and take the 3 most recent
        const sorted = projects
          .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
          .slice(0, 3);
        setFeaturedProjects(sorted);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Backend Developer <br />
              <span className="text-primary-600">Building Robust APIs</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Specializing in ASP.NET Core development with expertise in creating 
              scalable, high-performance web APIs and microservices.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/projects">
                <Button 
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  View Projects
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A selection of my recent backend development work
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={`${project.id}-${tech}`}
                          className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/projects/${project.id}`} 
                      className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline"
                    >
                      View details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
              
              {featuredProjects.length === 0 && !loading && (
                <div className="col-span-full text-center py-8">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No projects available at the moment.
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button>
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}