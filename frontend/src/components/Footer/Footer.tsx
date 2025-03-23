'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SocialLinks from './components/SocialLinks';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-neutral-900 py-10 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="flex flex-col space-y-3">
            <Link href="/">
              <motion.div 
                className="text-xl font-bold text-neutral-800 dark:text-white inline-block"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-primary-600">Hassan</span>Yusuf
              </motion.div>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xs">
              Backend Developer specializing in ASP.NET Core, building robust, scalable solutions.
            </p>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Navigation
            </h3>
            <nav className="flex flex-col space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  className={`text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm ${styles.navLink}`}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Connect
            </h3>
            <SocialLinks />
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
              <a href="mailto:hello@hassanyusuf.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                hello@hassanyusuf.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {currentYear} Hassan Yusuf. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 md:mt-0">
            Built with Next.js & ASP.NET Core
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;