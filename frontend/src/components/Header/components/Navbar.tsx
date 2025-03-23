'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => {
        const isActive = pathname === item.path || 
          (item.path !== '/' && pathname.startsWith(item.path));
          
        return (
          <Link 
            key={item.name}
            href={item.path}
            className="relative py-2"
          >
            <span className={`text-base font-medium transition-colors duration-200 ${
              isActive 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
            }`}>
              {item.name}
            </span>
            {isActive && (
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full w-full"
                layoutId="navbar-indicator"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;