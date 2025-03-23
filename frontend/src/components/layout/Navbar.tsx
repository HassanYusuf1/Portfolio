"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavLink } from '@/types';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks: NavLink[] = [
    { title: 'Hjem', href: '#home' },
    { title: 'Prosjekter', href: '#projects' },
    { title: 'Om Meg', href: '#about' },
    { title: 'Kontakt', href: '#contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/#home" className="flex items-center group">
          <div className="bg-primary-600 text-white p-2 rounded-md transition-all duration-300 group-hover:bg-primary-700">
            <span className="font-bold">HY</span>
          </div>
          <span className="ml-2 font-semibold text-xl text-neutral-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            Hassan Yusuf
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="relative font-medium text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.title}
            </Link>
          ))}
          
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <DarkModeToggle />
          <button 
            className="text-neutral-800 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Lukk meny" : "Åpne meny"}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="py-2 text-center font-medium text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}