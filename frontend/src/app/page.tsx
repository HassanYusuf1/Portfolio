'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Database, Server, Github, Globe } from 'lucide-react';
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
        // Sort by date and take only the 2 most recent
        const sorted = projects
          .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
          .slice(0, 2);
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
      {/* Hero Section with Animation */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
                Backend Developer <br />
                <span className="text-primary-600 dark:text-primary-400">Building Robust APIs</span>
              </h1>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl">
                Specializing in ASP.NET Core development with expertise in creating 
                scalable, high-performance web APIs and microservices.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
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
              </div>
            </motion.div>

            <motion.div
              className="flex-1 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full h-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <pre className="text-sm font-mono">
{`
using Microsoft.AspNetCore.Mvc;
using Portfolio.API.Models;

namespace Portfolio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectRepository _repository;

        public ProjectsController(IProjectRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _repository.GetAllAsync();
            return Ok(projects);
        }
    }
}
`}
                  </pre>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-1 gap-6 p-4">
                    <motion.div 
                      className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-lg"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Server className="h-12 w-12 mb-4 text-primary-600 dark:text-primary-400" />
                      <h3 className="text-xl font-semibold mb-2">API Development</h3>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Building RESTful APIs with ASP.NET Core
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-white dark:bg-neutral-700 rounded-lg p-6 shadow-lg"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Database className="h-12 w-12 mb-4 text-primary-600 dark:text-primary-400" />
                      <h3 className="text-xl font-semibold mb-2">Database Design</h3>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Entity Framework Core & SQL Server
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              I'm a backend developer focused on building reliable and efficient web applications and APIs.
              With expertise in ASP.NET Core, C#, and database technologies, I create solutions
              that prioritize security, performance, and scalability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Writing maintainable, well-tested code following best practices
                </p>
              </div>
              <div className="p-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">API Design</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Creating intuitive, efficient, and well-documented APIs
                </p>
              </div>
              <div className="p-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Database Expertise</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Designing efficient database structures and optimizing queries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Here are a few of my recent projects. Check out the Projects page to see more.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {featuredProjects.map((project) => (
                <motion.div 
                  key={project.id} 
                  className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-56 bg-neutral-200 dark:bg-neutral-700 relative">
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
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span 
                          key={`${project.id}-${tech}`}
                          className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`/projects/${project.id}`} 
                        className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline"
                      >
                        View details
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                      <div className="flex space-x-3">
                        {project.gitHubUrl && (
                          <a
                            href={project.gitHubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <Globe size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
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