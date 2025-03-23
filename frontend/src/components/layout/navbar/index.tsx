"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from '@/types';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const previousScrollPosition = useRef(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  
  const navLinks: NavLink[] = [
    { title: 'Hjem', href: '#home' },
    { title: 'Prosjekter', href: '#projects' },
    { title: 'Om Meg', href: '#about' },
    { title: 'Kontakt', href: '#contact' }
  ];
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Detect if scrolled down
      setIsScrolled(currentScrollPos > 10);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollPos > 100) {
        setNavbarVisible(previousScrollPosition.current > currentScrollPos || currentScrollPos < 100);
      } else {
        setNavbarVisible(true);
      }
      
      previousScrollPosition.current = currentScrollPos;
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Handle window resize events to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll behavior
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-md'
          : 'py-4 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ 
        y: navbarVisible ? 0 : -100,
        opacity: navbarVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/#home" 
          className="flex items-center group z-20"
          onClick={() => handleNavLinkClick('#home')}
        >
          <div className="relative overflow-hidden rounded-md">
            <div className="bg-primary-600 text-white p-2 rounded-md transition-all duration-300 group-hover:bg-primary-700">
              <span className="font-bold">HY</span>
            </div>
            <motion.div 
              className="absolute inset-0 bg-primary-500/20" 
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="ml-2 overflow-hidden">
            <motion.span 
              className="font-semibold text-xl text-neutral-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 inline-block"
              whileHover={{ y: -2 }}
            >
              Hassan Yusuf
            </motion.span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(link.href);
              }}
              className={`relative font-medium transition-colors duration-300 px-3 py-2 ${
                activeLink === link.href 
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400'
              }`}
            >
              {activeLink === link.href && (
                <motion.span
                  className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-lg z-[-1]"
                  layoutId="activeNavBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {link.title}
            </Link>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('#contact');
            }}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Ta Kontakt
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="block md:hidden z-20 text-neutral-800 dark:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Lukk meny" : "Åpne meny"}
        >
          <div className="relative w-6 h-5">
            <motion.span
              className="absolute top-0 left-0 w-6 h-0.5 bg-current rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 8 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-2 left-0 w-6 h-0.5 bg-current rounded-full"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
                x: isMobileMenuOpen ? 20 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute top-4 left-0 w-6 h-0.5 bg-current rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -4 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white dark:bg-neutral-900 z-10 flex flex-col justify-center items-center md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.href);
                    }}
                    className={`text-2xl font-medium ${
                      activeLink === link.href 
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-6"
              >
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick('#contact');
                  }}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Ta Kontakt
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              className="absolute bottom-10 text-neutral-500 dark:text-neutral-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              &copy; 2024 Hassan Yusuf
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}