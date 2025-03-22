"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-neutral-800 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-200 dark:bg-primary-900"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary-200 dark:bg-secondary-900"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transform transition duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            Om Meg
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile */}
          <div className={`transform transition duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden relative bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center border-4 border-white dark:border-neutral-700 shadow-xl">
                <div className="font-bold text-primary-600 dark:text-primary-400 text-4xl">HY</div>
              </div>
              <div className="absolute inset-0 border-4 border-primary-500 dark:border-primary-400 rounded-full border-dashed animate-spin-slow opacity-30"></div>
            </div>
            
            {/* Social links */}
            <div className="flex justify-center mt-8 space-x-4">
              <a 
                href="https://github.com/hassanyusuf1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* About text */}
          <div className={`transform transition duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
               style={{ transitionDelay: '300ms' }}>
            <h3 className="text-2xl font-bold mb-2 text-neutral-800 dark:text-white">Hassan Yusuf</h3>
            <h4 className="text-primary-600 dark:text-primary-400 text-lg mb-4">Programvareutvikler & Profesjonell Idrettsutøver</h4>
            
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>
                Som programvareutvikler kombinerer jeg teknisk ekspertise med erfaringer fra min 
                bakgrunn i profesjonell idrett. Denne unike kombinasjonen har gitt meg evnen til 
                å takle komplekse utfordringer med utholdenhet, lagarbeid og presisjon.
              </p>
              <p>
                Jeg er spesialisert i moderne webteknologier, med fokus på React, Next.js, 
                TypeScript og ASP.NET Core. Min tilnærming til utvikling er å skape elegante
                løsninger som balanserer teknisk ytelse med brukervennlighet.
              </p>
              <p>
                Jeg trives i miljøer som verdsetter innovasjon og kontinuerlig læring,
                og er alltid på utkikk etter nye utfordringer som kan utvide mine ferdigheter.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="#projects" className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-center">
                Se Mine Prosjekter
              </Link>
              <Link href="#contact" className="px-8 py-3 bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 font-medium rounded-full border border-primary-200 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-500 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                Kontakt Meg
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}