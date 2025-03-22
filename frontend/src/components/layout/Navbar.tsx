"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavLink } from '@/types';

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <div className="bg-primary-500 text-white p-2 rounded">
            <span className="font-bold">HY</span>
          </div>
          <span className="ml-2 font-bold text-xl">Hassan Yusuf</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="navbar-links">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className="navbar-link">
              {link.title}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden"
          onClick={toggleMobileMenu}
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
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="block md:hidden bg-white/95 dark:bg-gray-900/95 px-6 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href} className="navbar-link">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}