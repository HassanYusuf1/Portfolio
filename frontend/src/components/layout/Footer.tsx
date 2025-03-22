"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  // Use state and useEffect to handle current year to avoid hydration issues
  const [currentYear, setCurrentYear] = useState("2025");
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);
  
  return (
    <footer className="relative bg-neutral-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-800/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Logo & Info */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <div className="bg-primary-600 text-white p-2 rounded">
                <span className="font-bold">HY</span>
              </div>
              <span className="ml-2 font-bold text-xl">Hassan Yusuf</span>
            </div>
            <p className="text-neutral-400 mb-6 max-w-md">
              Programvareutvikler med lidenskap for å skape elegante løsninger på komplekse problemer.
              Kombinerer teknisk kompetanse med erfaring fra profesjonell idrett.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/hassanyusuf1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 border-b border-neutral-800 pb-2">Hurtiglenker</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-neutral-400 hover:text-white transition-colors inline-block py-1">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-neutral-400 hover:text-white transition-colors inline-block py-1">
                  Prosjekter
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-neutral-400 hover:text-white transition-colors inline-block py-1">
                  Om Meg
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-neutral-400 hover:text-white transition-colors inline-block py-1">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 border-b border-neutral-800 pb-2">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="text-neutral-400">kontakt@hassanyusuf.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                </svg>
                <span className="text-neutral-400">Oslo, Norge</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter - Optional */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 border-b border-neutral-800 pb-2">Nyhetsbrev</h3>
            <p className="text-neutral-400 mb-4">Abonner for å få oppdateringer om mine nyeste prosjekter.</p>
            <form className="space-y-2" onSubmit={(e) => {
              e.preventDefault();
              alert('Takk for påmeldingen! Du vil få oppdateringer om mine nyeste prosjekter.');
            }}>
              <div className="flex">
                <input 
                  type="email"
                  placeholder="Din e-post adresse"
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} Hassan Yusuf. Alle rettigheter reservert.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Personvern</a>
            <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Vilkår</a>
          </div>
        </div>
      </div>
    </footer>
  );
}