"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  // For current year to avoid hydration issues
  const [currentYear, setCurrentYear] = useState("2025");
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
    
    // Observer for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2
      }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <footer 
      ref={footerRef}
      className="bg-neutral-900 text-white overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-800/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"></div>
        <svg className="absolute bottom-0 right-0 text-neutral-800 opacity-20 w-64 h-64" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="75" cy="75" r="25" />
          <circle cx="25" cy="25" r="25" />
        </svg>
        <svg className="absolute top-10 left-10 text-neutral-800 opacity-10 w-48 h-48" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <rect width="90" height="90" x="5" y="5" rx="10" strokeWidth="5" />
        </svg>
      </div>
      
      {/* Main footer content */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand section */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <div className="flex items-center mb-6">
              <div className="bg-primary-600 text-white p-2 rounded">
                <span className="font-bold">HY</span>
              </div>
              <span className="ml-2 font-bold text-2xl">Hassan Yusuf</span>
            </div>
            
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Utvikler med lidenskap for elegant problemløsning. Kombinerer teknisk
              kompetanse med erfaringer fra profesjonell idrett.
            </p>
            
            <div className="flex items-center space-x-4">
              <motion.a 
                href="https://github.com/hassanyusuf1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-primary-600 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-[#0077B5] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-[#1DA1F2] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Links columns */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Hurtiglenker</h3>
            <ul className="space-y-3">
              {['Hjem', 'Prosjekter', 'Om Meg', 'Kontakt'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 inline-flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Tjenester</h3>
            <ul className="space-y-3">
              {['Webutvikling', 'App Utvikling', 'UI/UX Design', 'Konsultasjon'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href="#contact" 
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-300 inline-flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Abonner på nyhetsbrev</h3>
            <p className="text-neutral-400 mb-4">
              Få oppdateringer om mine nyeste prosjekter og teknologitrender.
            </p>
            
            <form 
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Takk for påmeldingen til nyhetsbrevet! Du vil få oppdateringer om mine nyeste prosjekter.");
              }}
            >
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Din e-post" 
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-neutral-500"
                  required
                />
              </div>
              <motion.button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Abonner
              </motion.button>
            </form>
            
            <div className="mt-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Oslo, Norge</h4>
                  <p className="text-neutral-400 text-sm">Tilgjengelig for remote arbeid</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mt-3">
                <div className="mt-1 text-primary-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">kontakt@hassanyusuf.com</h4>
                  <p className="text-neutral-400 text-sm">Ta kontakt for samarbeid</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer bottom */}
        <motion.div 
          variants={itemVariants} 
          className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Hassan Yusuf. Alle rettigheter reservert.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/personvern" className="text-sm text-neutral-500 hover:text-white transition-colors duration-300">
              Personvern
            </Link>
            <Link href="/vilkar" className="text-sm text-neutral-500 hover:text-white transition-colors duration-300">
              Vilkår
            </Link>
            <Link href="/cookies" className="text-sm text-neutral-500 hover:text-white transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}