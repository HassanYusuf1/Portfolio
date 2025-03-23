'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Shared/Button';

export default function Home() {
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
              <Button 
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                View Projects
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
              >
                Contact Me
              </Button>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards would go here, populated from API */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-commerce Platform</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Full stack e-commerce platform with product management and authentication
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Node.js', 'Express', 'MongoDB'].map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link 
                  href="/projects/1" 
                  className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center hover:underline"
                >
                  View details
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* More projects would be rendered here */}
          </div>
          
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