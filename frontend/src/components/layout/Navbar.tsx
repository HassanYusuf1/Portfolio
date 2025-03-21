"use client"

// I Navbar.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

// NavLink komponent med TypeScript-støtte
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-800 dark:text-gray-200 hover:text-primary-500 font-medium">
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="bg-primary-500 text-white p-2 rounded">
            <span className="font-bold">HY</span>
          </div>
          <span className="ml-2 font-bold text-xl">Hassan Yusuf</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="#home">Hjem</NavLink>
          <NavLink href="#projects">Prosjekter</NavLink>
          <NavLink href="#about">Om Meg</NavLink>
          <NavLink href="#contact">Kontakt</NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
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
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 px-6 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <NavLink href="#home">Hjem</NavLink>
            <NavLink href="#projects">Prosjekter</NavLink>
            <NavLink href="#about">Om Meg</NavLink>
            <NavLink href="#contact">Kontakt</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}