'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './Header.module.css';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(
    scrollY, 
    [0, 50], 
    [1, scrolled ? 0.95 : 1]
  );
  
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      style={{ 
        opacity: headerOpacity,
        backgroundColor: headerBackground,
        boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-neutral-800 dark:text-white p-2 focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <X size={24} className="text-neutral-800 dark:text-white" />
            ) : (
              <Menu size={24} className="text-neutral-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-neutral-900 absolute top-full left-0 right-0 shadow-lg`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                className="text-neutral-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 text-lg"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;